/* ============================================================
   ARK GLOBAL CONNECT — admin.js
   Frontend-only admin: login, dashboard, job CRUD,
   applications, import/export, settings.
   NOTE: Client-side auth is NOT secure. Management interface only.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.ARK_CONFIG;
  var ICONS = window.ARK_ICONS || {};
  var K = CFG.STORAGE_KEYS;
  var e = function (s) { return window.ARK.escapeHtml(s); };

  /* ---------- Session ---------- */
  function isLoggedIn() {
    try { return sessionStorage.getItem(K.SESSION) === "1"; } catch (x) { return false; }
  }
  function login(id, pw) {
    if (id === CFG.ADMIN_ID && pw === CFG.ADMIN_PASSWORD) {
      try { sessionStorage.setItem(K.SESSION, "1"); } catch (x) {}
      return true;
    }
    return false;
  }
  function logout() {
    try { sessionStorage.removeItem(K.SESSION); } catch (x) {}
    location.reload();
  }

  /* ---------- Applications store ---------- */
  function getApps() {
    try { return JSON.parse(localStorage.getItem(K.APPLICATIONS)) || []; } catch (x) { return []; }
  }
  function setApps(a) { try { localStorage.setItem(K.APPLICATIONS, JSON.stringify(a)); } catch (x) {} }

  /* ---------- Views ---------- */
  var VIEWS = ["dashboard", "jobs", "add", "applications", "settings"];
  var currentView = "dashboard";

  function showView(v) {
    currentView = v;
    VIEWS.forEach(function (name) {
      var el = document.getElementById("view-" + name);
      if (el) el.classList.toggle("hidden", name !== v);
    });
    document.querySelectorAll(".admin-nav a[data-view]").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-view") === v);
    });
    if (v === "dashboard") renderDashboard();
    if (v === "jobs") renderJobsTable();
    if (v === "applications") renderApplications();
    if (v === "settings") renderSettings();
    if (v === "add") resetJobForm();
    window.scrollTo(0, 0);
  }

  /* ---------- Dashboard ---------- */
  function renderDashboard() {
    var jobs = window.ARKStore.all();
    var apps = getApps();
    var stats = {
      total: jobs.length,
      active: jobs.filter(function (j) { return j.status === "active"; }).length,
      expired: jobs.filter(function (j) { return j.status === "closed"; }).length,
      domestic: jobs.filter(function (j) { return j.scope === "Domestic"; }).length,
      international: jobs.filter(function (j) { return j.scope === "International"; }).length,
      draft: jobs.filter(function (j) { return j.status === "draft"; }).length,
      applications: apps.length
    };
    var cards = [
      ["Total Jobs", stats.total, ICONS.briefcase],
      ["Active Jobs", stats.active, ICONS.checkCircle],
      ["Expired / Closed", stats.expired, ICONS.clock],
      ["Domestic Jobs", stats.domestic, ICONS.home],
      ["International Jobs", stats.international, ICONS.globe],
      ["Applications", stats.applications, ICONS.inbox],
      ["Draft Jobs", stats.draft, ICONS.fileText]
    ];
    var el = document.getElementById("dashCards");
    if (el) el.innerHTML = cards.map(function (c) {
      return '<div class="admin-card"><div class="ac-icon">' + c[2] + '</div><div class="ac-label">' + c[0] + '</div><div class="ac-value">' + c[1] + "</div></div>";
    }).join("");

    var recent = jobs.slice(0, 6);
    var rEl = document.getElementById("recentJobs");
    if (rEl) {
      if (!recent.length) rEl.innerHTML = emptyRow("No jobs yet. Add your first job to get started.");
      else rEl.innerHTML = recent.map(function (j) {
        return '<tr><td><b>' + e(j.title) + "</b><br><span class=\"small muted\">" + e(j.company) + "</span></td>" +
          "<td>" + e(j.location) + "</td><td>" + e(j.scope) + "</td>" +
          '<td><span class="status-badge status-' + j.status + '">' + j.status + "</span></td>" +
          "<td>" + window.ARK.formatDate(j.postedDate) + "</td></tr>";
      }).join("");
    }
  }

  function emptyRow(msg) {
    return '<tr><td colspan="8"><div class="empty-state" style="padding:40px">' + ICONS.inbox + "<p>" + msg + "</p></div></td></tr>";
  }

  /* ---------- Jobs table ---------- */
  function renderJobsTable() {
    var jobs = window.ARKStore.all();
    var q = (document.getElementById("jobSearch") || {}).value || "";
    if (q) {
      var lq = q.toLowerCase();
      jobs = jobs.filter(function (j) { return (j.title + j.company + j.location + j.country).toLowerCase().indexOf(lq) !== -1; });
    }
    var tbody = document.getElementById("jobsTbody");
    if (!tbody) return;
    if (!jobs.length) { tbody.innerHTML = emptyRow("No jobs found."); return; }
    tbody.innerHTML = jobs.map(function (j) {
      var apps = getApps().filter(function (a) { return a.jobId === j.id; }).length;
      return "<tr>" +
        "<td><b>" + e(j.title) + "</b><br><span class=\"small muted\">" + e(j.referenceId || j.id) + "</span></td>" +
        "<td>" + e(j.location) + "</td>" +
        "<td>" + e(j.country) + "</td>" +
        "<td>" + e(j.type) + "</td>" +
        "<td>" + e(j.scope) + "</td>" +
        "<td>" + window.ARK.formatDate(j.postedDate) + "</td>" +
        "<td>" + window.ARK.formatDate(j.deadline) + "</td>" +
        '<td><span class="status-badge status-' + j.status + '">' + j.status + "</span></td>" +
        "<td>" + apps + "</td>" +
        '<td><div class="action-row">' +
          '<button class="icon-btn" title="Edit" onclick="ARKAdmin.editJob(\'' + j.id + '\')">' + ICONS.edit + "</button>" +
          '<a class="icon-btn" title="Preview" target="_blank" href="job-detail.html?id=' + encodeURIComponent(j.id) + '">' + ICONS.eye + "</a>" +
          '<button class="icon-btn" title="Duplicate" onclick="ARKAdmin.duplicateJob(\'' + j.id + '\')">' + ICONS.copy + "</button>" +
          '<button class="icon-btn" title="Close" onclick="ARKAdmin.closeJob(\'' + j.id + '\')">' + ICONS.clock + "</button>" +
          '<button class="icon-btn danger" title="Delete" onclick="ARKAdmin.deleteJob(\'' + j.id + '\')">' + ICONS.trash + "</button>" +
        "</div></td>" +
      "</tr>";
    }).join("");
  }

  /* ---------- Applications ---------- */
  function renderApplications() {
    var apps = getApps();
    var tbody = document.getElementById("appsTbody");
    if (!tbody) return;
    if (!apps.length) { tbody.innerHTML = emptyRow("No applications yet."); return; }
    var statuses = ["New", "Screening", "Shortlisted", "Interview", "Selected", "Rejected"];
    tbody.innerHTML = apps.map(function (a) {
      var opts = statuses.map(function (s) { return '<option' + (s === a.status ? " selected" : "") + ">" + s + "</option>"; }).join("");
      return "<tr>" +
        "<td><b>" + e(a.name) + "</b><br><span class=\"small muted\">" + e(a.email) + "</span></td>" +
        "<td>" + e(a.jobTitle) + "</td>" +
        "<td>" + e(a.location) + "</td>" +
        "<td>" + e(a.experience) + "</td>" +
        "<td>" + window.ARK.formatDate(a.appliedDate) + "</td>" +
        '<td><select class="status-select" onchange="ARKAdmin.setAppStatus(\'' + a.id + '\', this.value)">' + opts + "</select></td>" +
        '<td><button class="icon-btn danger" onclick="ARKAdmin.deleteApp(\'' + a.id + '\')">' + ICONS.trash + "</button></td>" +
      "</tr>";
    }).join("");
  }

  /* ---------- Settings ---------- */
  function renderSettings() {
    var el = document.getElementById("settingsInfo");
    if (!el) return;
    el.innerHTML =
      '<div class="alert alert-warn mb-3">' + ICONS.alert +
        "<span><b>Security notice:</b> This admin panel is a frontend-only interface. Credentials live in <code>js/config.js</code> and are visible to anyone. It is <b>not</b> suitable for protecting confidential production data. Use a real backend for production authentication.</span></div>" +
      '<div class="alert alert-info mb-3">' + ICONS.info +
        "<span><b>Static hosting limitation:</b> Jobs you create are saved in this browser's LocalStorage. They persist on this device but will <b>not</b> automatically appear for every public visitor on Vercel/Netlify. To publish jobs globally, export the JSON and commit it to <code>data/jobs.json</code>, or connect a backend (Supabase, Firebase, REST API, CMS) later without rebuilding the UI.</span></div>" +
      '<div class="detail-meta-grid">' +
        metaRow("Admin ID", CFG.ADMIN_ID) +
        metaRow("EmailJS", CFG.emailjsReady() ? "Configured" : "Not configured") +
        metaRow("WhatsApp", "+" + CFG.WHATSAPP_NUMBER) +
        metaRow("Company Email", CFG.COMPANY_EMAIL) +
      "</div>";
  }
  function metaRow(l, v) { return '<div class="detail-meta-row"><span class="dm-label">' + e(l) + '</span><span class="dm-value">' + e(v) + "</span></div>"; }

  /* ---------- Job form ---------- */
  var editingId = null;

  function resetJobForm() {
    editingId = null;
    var form = document.getElementById("jobForm");
    if (!form) return;
    form.reset();
    document.getElementById("jobFormTitle").textContent = "Add New Job";
    document.getElementById("jobFormSubmit").textContent = "Publish Job";
    document.getElementById("jobId").value = "";
  }

  function editJob(id) {
    var j = window.ARKStore.get(id);
    if (!j) return;
    editingId = id;
    showView("add");
    document.getElementById("jobFormTitle").textContent = "Edit Job";
    document.getElementById("jobFormSubmit").textContent = "Save Changes";
    var form = document.getElementById("jobForm");
    Object.keys(j).forEach(function (key) {
      var input = form.elements[key];
      if (!input) return;
      if (input.type === "checkbox") input.checked = !!j[key];
      else if (Array.isArray(j[key])) input.value = j[key].join("\n");
      else input.value = j[key];
    });
    window.ARK.toast("Editing: " + j.title, "info");
  }

  function collectJobForm() {
    var form = document.getElementById("jobForm");
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = typeof v === "string" ? v.trim() : v; });
    // arrays from textareas
    ["responsibilities", "requirements", "skills", "benefits"].forEach(function (k) {
      data[k] = (data[k] || "").split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
    });
    data.featured = !!form.elements.featured.checked;
    data.urgent = !!form.elements.urgent.checked;
    data.new = !!form.elements.new.checked;
    if (!data.id) data.id = "ark-" + (data.title || "job").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 5);
    if (!data.referenceId) data.referenceId = "ARK-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    if (!data.postedDate) data.postedDate = new Date().toISOString().slice(0, 10);
    data.scope = data.scope || (data.country && data.country !== "India" ? "International" : "Domestic");
    return data;
  }

  function saveJob(ev) {
    if (ev) ev.preventDefault();
    var form = document.getElementById("jobForm");
    if (!form.elements.title.value.trim()) { window.ARK.toast("Job title is required.", "error"); return; }
    var data = collectJobForm();
    var jobs = window.ARKStore.all().slice();
    if (editingId) {
      var idx = jobs.findIndex(function (j) { return j.id === editingId; });
      data.id = editingId;
      if (idx > -1) jobs[idx] = window.ARKStore.normalize(data);
      else jobs.unshift(window.ARKStore.normalize(data));
      window.ARK.toast("Job updated successfully.", "success");
    } else {
      jobs.unshift(window.ARKStore.normalize(data));
      window.ARK.toast("Job published successfully.", "success");
    }
    window.ARKStore.save(jobs);
    resetJobForm();
    showView("jobs");
  }

  /* ---------- Actions ---------- */
  function duplicateJob(id) {
    var j = window.ARKStore.get(id);
    if (!j) return;
    var copy = JSON.parse(JSON.stringify(j));
    copy.id = j.id + "-copy-" + Math.random().toString(36).slice(2, 5);
    copy.title = j.title + " (Copy)";
    copy.status = "draft";
    var jobs = window.ARKStore.all().slice();
    jobs.unshift(copy);
    window.ARKStore.save(jobs);
    renderJobsTable();
    window.ARK.toast("Job duplicated as draft.", "success");
  }

  function closeJob(id) {
    confirmModal("Close this job?", "The job will be marked as closed and hidden from public listings.", function () {
      var jobs = window.ARKStore.all().slice();
      var j = jobs.find(function (x) { return x.id === id; });
      if (j) j.status = "closed";
      window.ARKStore.save(jobs);
      renderJobsTable();
      window.ARK.toast("Job closed.", "success");
    });
  }

  function deleteJob(id) {
    confirmModal("Delete this job?", "This action cannot be undone.", function () {
      var jobs = window.ARKStore.all().filter(function (x) { return x.id !== id; });
      window.ARKStore.save(jobs);
      renderJobsTable();
      window.ARK.toast("Job deleted.", "success");
    });
  }

  function setAppStatus(id, status) {
    var apps = getApps();
    var a = apps.find(function (x) { return x.id === id; });
    if (a) { a.status = status; setApps(apps); window.ARK.toast("Status updated to " + status, "success"); }
  }
  function deleteApp(id) {
    confirmModal("Delete this application?", "The application record will be removed from this browser.", function () {
      setApps(getApps().filter(function (x) { return x.id !== id; }));
      renderApplications();
      window.ARK.toast("Application deleted.", "success");
    });
  }

  /* ---------- Import / Export ---------- */
  function exportJobs() {
    var data = { meta: { exported: new Date().toISOString(), count: window.ARKStore.all().length }, jobs: window.ARKStore.all() };
    download("ark-jobs-export.json", JSON.stringify(data, null, 2));
    window.ARK.toast("Jobs exported.", "success");
  }
  function downloadBackup() {
    var data = { jobs: window.ARKStore.all(), applications: getApps(), exported: new Date().toISOString() };
    download("ark-backup.json", JSON.stringify(data, null, 2));
    window.ARK.toast("Backup downloaded.", "success");
  }
  function download(name, content) {
    var blob = new Blob([content], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  }
  function importJobs(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        var jobs = (parsed.jobs || parsed).map(window.ARKStore.normalize);
        if (!Array.isArray(jobs) || !jobs.length) throw new Error("empty");
        window.ARKStore.save(jobs);
        if (parsed.applications) setApps(parsed.applications);
        window.ARK.toast("Imported " + jobs.length + " jobs.", "success");
        renderDashboard(); renderJobsTable();
      } catch (err) {
        window.ARK.toast("Invalid JSON file.", "error");
      }
    };
    reader.readAsText(file);
  }
  function restoreBackup(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        if (parsed.jobs) window.ARKStore.save(parsed.jobs.map(window.ARKStore.normalize));
        if (parsed.applications) setApps(parsed.applications);
        window.ARK.toast("Backup restored.", "success");
        renderDashboard(); renderJobsTable();
      } catch (err) { window.ARK.toast("Invalid backup file.", "error"); }
    };
    reader.readAsText(file);
  }
  function resetData() {
    confirmModal("Reset data?", "This clears your local changes and reloads the original jobs from jobs.json.", function () {
      try { localStorage.removeItem(K.JOBS); localStorage.removeItem(K.APPLICATIONS); } catch (x) {}
      location.reload();
    });
  }

  /* ---------- Confirm modal ---------- */
  function confirmModal(title, msg, onYes) {
    var overlay = document.getElementById("confirmModal");
    if (!overlay) { if (confirm(title + "\n" + msg)) onYes(); return; }
    overlay.querySelector("#cmTitle").textContent = title;
    overlay.querySelector("#cmMsg").textContent = msg;
    overlay.classList.add("open");
    var yes = overlay.querySelector("#cmYes");
    var no = overlay.querySelector("#cmNo");
    function close() { overlay.classList.remove("open"); yes.onclick = null; no.onclick = null; }
    yes.onclick = function () { close(); onYes(); };
    no.onclick = close;
  }

  /* ---------- Login UI ---------- */
  function initLogin() {
    var form = document.getElementById("loginForm");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var id = form.elements.adminId.value.trim();
      var pw = form.elements.adminPassword.value;
      var err = document.getElementById("loginError");
      if (login(id, pw)) {
        document.getElementById("loginScreen").classList.add("hidden");
        document.getElementById("adminApp").classList.remove("hidden");
        bootApp();
      } else {
        err.textContent = "Invalid Admin ID or password.";
        err.classList.add("show");
      }
    });
  }

  /* ---------- Boot ---------- */
  function bootApp() {
    window.ARKStore.load().then(function () {
      showView("dashboard");
      // nav
      document.querySelectorAll(".admin-nav a[data-view]").forEach(function (a) {
        a.addEventListener("click", function (ev) { ev.preventDefault(); showView(a.getAttribute("data-view")); });
      });
      var logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) logoutBtn.addEventListener("click", logout);
      var jobForm = document.getElementById("jobForm");
      if (jobForm) jobForm.addEventListener("submit", saveJob);
      var search = document.getElementById("jobSearch");
      if (search) search.addEventListener("input", renderJobsTable);
      // sidebar toggle (mobile)
      var toggle = document.getElementById("adminMenuToggle");
      if (toggle) toggle.addEventListener("click", function () {
        document.querySelector(".admin-sidebar").classList.toggle("open");
      });
      // import/export
      bind("exportJobsBtn", "click", exportJobs);
      bind("backupBtn", "click", downloadBackup);
      bind("resetBtn", "click", resetData);
      var importInput = document.getElementById("importInput");
      if (importInput) importInput.addEventListener("change", function () { if (this.files[0]) importJobs(this.files[0]); });
      var restoreInput = document.getElementById("restoreInput");
      if (restoreInput) restoreInput.addEventListener("change", function () { if (this.files[0]) restoreBackup(this.files[0]); });
    });
  }
  function bind(id, ev, fn) { var el = document.getElementById(id); if (el) el.addEventListener(ev, fn); }

  /* ---------- Public API ---------- */
  window.ARKAdmin = {
    editJob: editJob, duplicateJob: duplicateJob, closeJob: closeJob,
    deleteJob: deleteJob, setAppStatus: setAppStatus, deleteApp: deleteApp,
    showView: showView, resetJobForm: resetJobForm
  };

  /* ---------- Init ---------- */
  function init() {
    initLogin();
    if (isLoggedIn()) {
      var ls = document.getElementById("loginScreen");
      var app = document.getElementById("adminApp");
      if (ls) ls.classList.add("hidden");
      if (app) app.classList.remove("hidden");
      bootApp();
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
