/* ============================================================
   ARK GLOBAL CONNECT — jobs.js
   Job data store (JSON + LocalStorage), filtering, rendering.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.ARK_CONFIG;
  var ICONS = window.ARK_ICONS || {};
  var K = CFG.STORAGE_KEYS;

  /* ---------- Data store ---------- */
  var Store = {
    _jobs: null,

    /* Load jobs: prefer LocalStorage (admin edits), else fetch jobs.json */
    load: function () {
      var self = this;
      return new Promise(function (resolve) {
        var local = null;
        try { local = JSON.parse(localStorage.getItem(K.JOBS)); } catch (e) { local = null; }
        if (local && Array.isArray(local) && local.length) {
          self._jobs = local;
          resolve(local);
          return;
        }
        fetch(CFG.JOBS_JSON)
          .then(function (r) { return r.json(); })
          .then(function (data) {
            var jobs = (data.jobs || data || []).map(self.normalize);
            self._jobs = jobs;
            // seed localStorage so admin can manage
            try { localStorage.setItem(K.JOBS, JSON.stringify(jobs)); localStorage.setItem(K.SEEDED, "1"); } catch (e) {}
            resolve(jobs);
          })
          .catch(function () {
            self._jobs = [];
            resolve([]);
          });
      });
    },

    normalize: function (j) {
      j = j || {};
      return {
        id: j.id || "job-" + Math.random().toString(36).slice(2, 8),
        referenceId: j.referenceId || "",
        title: j.title || "Untitled Role",
        company: j.company || "ARK Client",
        department: j.department || "",
        industry: j.industry || "",
        category: j.category || "",
        location: j.location || j.city || "",
        city: j.city || j.location || "",
        country: j.country || "India",
        scope: j.scope || (j.country && j.country !== "India" ? "International" : "Domestic"),
        type: j.type || "Permanent",
        jobType: j.jobType || "Full Time",
        experience: j.experience || "",
        salary: j.salary || "",
        description: j.description || "",
        responsibilities: j.responsibilities || [],
        requirements: j.requirements || [],
        skills: j.skills || [],
        education: j.education || "",
        certifications: j.certifications || "",
        languages: j.languages || "",
        benefits: j.benefits || [],
        accommodation: j.accommodation || "",
        food: j.food || "",
        transportation: j.transportation || "",
        visa: j.visa || "",
        employerDescription: j.employerDescription || "",
        contact: j.contact || CFG.COMPANY_EMAIL,
        postedDate: j.postedDate || new Date().toISOString().slice(0, 10),
        deadline: j.deadline || "",
        status: (j.status || "active").toLowerCase(),
        featured: !!j.featured,
        urgent: !!j.urgent,
        new: !!j.new
      };
    },

    all: function () { return this._jobs || []; },
    active: function () { return this.all().filter(function (j) { return j.status === "active"; }); },
    get: function (id) { return this.all().find(function (j) { return j.id === id; }); },
    save: function (jobs) {
      this._jobs = jobs;
      try { localStorage.setItem(K.JOBS, JSON.stringify(jobs)); } catch (e) {}
    }
  };
  window.ARKStore = Store;

  /* ---------- Card rendering ---------- */
  function badgeHtml(j) {
    var b = [];
    if (j.scope === "International") b.push('<span class="badge badge-international">International</span>');
    else b.push('<span class="badge badge-domestic">Domestic</span>');
    if (j.featured) b.push('<span class="badge badge-featured">Featured</span>');
    if (j.urgent) b.push('<span class="badge badge-urgent">Urgent</span>');
    if (j.new) b.push('<span class="badge badge-new">New</span>');
    return b.join("");
  }

  function jobCardHtml(j) {
    var e = window.ARK.escapeHtml;
    var url = "job-detail.html?id=" + encodeURIComponent(j.id);
    var extra = "";
    if (j.scope === "International" && j.accommodation && j.accommodation !== "Not applicable") {
      extra = '<span>' + ICONS.home + "Accommodation: " + e(j.accommodation) + "</span>";
    }
    return (
      '<article class="job-card reveal">' +
        '<div class="job-card-top">' +
          '<div class="job-badges">' + badgeHtml(j) + "</div>" +
          '<span class="job-posted">' + window.ARK.timeAgo(j.postedDate) + "</span>" +
        "</div>" +
        "<h3><a href=\"" + url + "\">" + e(j.title) + "</a></h3>" +
        '<div class="job-company">' + ICONS.building + e(j.company) + "</div>" +
        '<div class="job-meta">' +
          "<span>" + ICONS.mapPin + e(j.location) + (j.country ? ", " + e(j.country) : "") + "</span>" +
          "<span>" + ICONS.briefcase + e(j.type) + "</span>" +
          "<span>" + ICONS.clock + e(j.experience) + "</span>" +
          extra +
        "</div>" +
        '<div class="job-card-foot">' +
          '<span class="job-salary">' + e(j.salary || "Competitive") + "</span>" +
          '<a href="' + url + '" class="link-arrow">View Job ' + ICONS.arrowRight + "</a>" +
        "</div>" +
      "</article>"
    );
  }
  window.ARK_jobCardHtml = jobCardHtml;

  /* ---------- Filtering ---------- */
  function applyFilters(jobs, f) {
    return jobs.filter(function (j) {
      if (f.status && j.status !== f.status) return false;
      if (f.scope && f.scope !== "all" && j.scope !== f.scope) return false;
      if (f.country && f.country !== "all" && j.country !== f.country) return false;
      if (f.city && f.city !== "all" && j.city !== f.city) return false;
      if (f.industry && f.industry !== "all" && j.industry !== f.industry) return false;
      if (f.department && f.department !== "all" && j.department !== f.department) return false;
      if (f.type && f.type !== "all" && j.type !== f.type) return false;
      if (f.jobType && f.jobType !== "all" && j.jobType !== f.jobType) return false;
      if (f.category && f.category !== "all" && j.category !== f.category) return false;
      if (f.experience && f.experience !== "all") {
        var min = parseInt((j.experience.match(/\d+/) || [0])[0], 10);
        if (f.experience === "0-2" && min > 2) return false;
        if (f.experience === "3-5" && (min < 3 || min > 5)) return false;
        if (f.experience === "6-10" && (min < 6 || min > 10)) return false;
        if (f.experience === "10+" && min < 10) return false;
      }
      if (f.q) {
        var q = f.q.toLowerCase();
        var hay = [j.title, j.company, j.location, j.country, j.industry, j.department, j.category, j.description, (j.skills || []).join(" ")].join(" ").toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }
  window.ARK_applyFilters = applyFilters;

  /* ---------- Render helpers ---------- */
  function renderJobs(container, jobs, emptyMsg) {
    if (!container) return;
    if (!jobs.length) {
      container.innerHTML =
        '<div class="empty-state" style="grid-column:1/-1">' +
          ICONS.search +
          "<h3>No Jobs Found</h3>" +
          "<p>" + (emptyMsg || "We couldn't find any opportunities matching your search. Try adjusting your filters or clearing them.") + "</p>" +
          '<button class="btn btn-outline" onclick="window.ARK_clearFilters && window.ARK_clearFilters()">Clear Filters</button>' +
        "</div>";
      return;
    }
    container.innerHTML = jobs.map(jobCardHtml).join("");
    // re-run reveal for injected cards
    if (window.ARK && window.ARK.revealRefresh) window.ARK.revealRefresh();
    else {
      container.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }
  }
  window.ARK_renderJobs = renderJobs;

  /* ---------- Populate a <select> ---------- */
  function fillSelect(sel, values, placeholder) {
    if (!sel) return;
    var current = sel.value;
    var opts = '<option value="all">' + (placeholder || "All") + "</option>";
    values.forEach(function (v) { opts += '<option value="' + window.ARK.escapeHtml(v) + '">' + window.ARK.escapeHtml(v) + "</option>"; });
    sel.innerHTML = opts;
    if (current) sel.value = current;
  }
  window.ARK_fillSelect = fillSelect;

  function unique(arr) {
    return arr.filter(function (v, i, a) { return v && a.indexOf(v) === i; }).sort();
  }
  window.ARK_unique = unique;
})();
