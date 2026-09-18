/* ============================================================
   ARK GLOBAL CONNECT — hire.js
   "I Want to Hire" multi-step requirement builder.
   Catalog of staffing types, industries and roles + wizard
   state, validation, email (EmailJS) and WhatsApp submission.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.ARK_CONFIG || {};
  var ICONS = window.ARK_ICONS || {};

  /* ---------- Staffing types ---------- */
  var TYPES = [
    { id: "permanent", label: "Permanent Recruitment", icon: "briefcase", desc: "Full-time hires for long-term roles across every level." },
    { id: "contract", label: "Contract & Staffing", icon: "layers", desc: "Flexible contract, project and temporary manpower." },
    { id: "executive", label: "Executive Search", icon: "award", desc: "Confidential senior and leadership appointments." },
    { id: "volume", label: "Volume / Bulk Hiring", icon: "users", desc: "Large-scale recruitment for new sites and projects." },
    { id: "overseas", label: "Overseas / Global Recruitment", icon: "globe", desc: "International placements with visa and mobility support." },
    { id: "internship", label: "Internship & Trainee", icon: "graduation", desc: "Structured internships and trainee programmes." }
  ];

  /* ---------- Industry categories with roles ---------- */
  var CATEGORIES = [
    { id: "hospitality", label: "Hospitality & Tourism", icon: "building", roles: [
      "Hotel Manager", "General Manager", "Front Office Manager", "Front Desk Agent", "Receptionist",
      "Guest Relations Executive", "Housekeeping Manager", "Housekeeping Supervisor", "Room Attendant",
      "Housekeeping Attendant", "Laundry Attendant", "Bell Boy", "Concierge", "Reservations Agent",
      "Revenue Manager", "Duty Manager", "Night Manager", "Resort Manager", "Banquet Manager",
      "Banquet Server", "Spa Manager", "Spa Therapist", "Tour Guide", "Travel Consultant"
    ]},
    { id: "fnb", label: "Food & Beverage / Restaurants", icon: "home", roles: [
      "Restaurant Manager", "F&B Manager", "F&B Supervisor", "Head Chef", "Sous Chef", "Chef de Partie",
      "Commis Chef", "Pastry Chef", "Baker", "Butcher", "Kitchen Helper", "Cook", "Barista",
      "Bartender", "Mixologist", "Waiter", "Waitress", "Steward", "Cashier", "Host / Hostess",
      "Cafe Manager", "QSR Crew Member", "Delivery Rider", "Food Safety Officer"
    ]},
    { id: "retail", label: "Retail & Sales", icon: "trending", roles: [
      "Store Manager", "Assistant Store Manager", "Retail Supervisor", "Sales Executive", "Sales Associate",
      "Salesman", "Saleswoman", "Cashier", "Billing Executive", "Visual Merchandiser", "Category Manager",
      "Buyer", "Merchandiser", "Area Sales Manager", "Regional Sales Manager", "Business Development Executive",
      "Business Development Manager", "Telecaller", "Customer Service Executive", "Showroom Manager"
    ]},
    { id: "healthcare", label: "Healthcare & Medical", icon: "heart", roles: [
      "Registered Nurse", "Staff Nurse", "Nursing Assistant", "Caregiver", "Patient Care Assistant",
      "Doctor / Physician", "General Practitioner", "Dentist", "Dental Assistant", "Pharmacist",
      "Pharmacy Assistant", "Lab Technician", "Radiographer", "Physiotherapist", "Dietitian",
      "Hospital Administrator", "Medical Receptionist", "Ambulance Driver", "Ward Boy", "Midwife"
    ]},
    { id: "construction", label: "Construction & Engineering", icon: "building", roles: [
      "Civil Engineer", "Site Engineer", "Project Manager", "Site Supervisor", "Foreman", "Mason",
      "Carpenter", "Plumber", "Electrician", "Welder", "Fitter", "Steel Fixer", "Painter",
      "Scaffolder", "Heavy Equipment Operator", "Crane Operator", "Surveyor", "Architect",
      "Quantity Surveyor", "Safety Officer", "General Labourer", "Helper"
    ]},
    { id: "manufacturing", label: "Manufacturing & Production", icon: "settings", roles: [
      "Production Manager", "Production Supervisor", "Machine Operator", "CNC Operator", "Assembly Line Worker",
      "Quality Control Inspector", "Quality Assurance Engineer", "Maintenance Technician", "Mechanical Engineer",
      "Electrical Engineer", "Industrial Engineer", "Packaging Operator", "Store Keeper", "Shift Incharge",
      "Plant Manager", "Boiler Operator", "Fitter", "Turner", "Millwright", "Helper"
    ]},
    { id: "logistics", label: "Logistics & Warehouse", icon: "layers", roles: [
      "Warehouse Manager", "Warehouse Supervisor", "Store Keeper", "Inventory Controller", "Picker / Packer",
      "Forklift Operator", "Loader / Unloader", "Delivery Driver", "Truck Driver", "Light Vehicle Driver",
      "Heavy Vehicle Driver", "Logistics Coordinator", "Dispatch Supervisor", "Fleet Supervisor",
      "Supply Chain Manager", "Procurement Officer", "Customs Clearance Officer", "Courier"
    ]},
    { id: "it", label: "IT & Technology", icon: "grid", roles: [
      "Software Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile App Developer",
      "DevOps Engineer", "Cloud Engineer", "Data Analyst", "Data Scientist", "Machine Learning Engineer",
      "QA Engineer", "Test Automation Engineer", "UI/UX Designer", "Product Manager", "Project Manager",
      "Business Analyst", "System Administrator", "Network Engineer", "Cybersecurity Analyst", "IT Support Engineer",
      "Database Administrator", "Scrum Master"
    ]},
    { id: "finance", label: "Finance & Accounting", icon: "dollar", roles: [
      "Accountant", "Senior Accountant", "Accounts Manager", "Finance Manager", "Financial Controller",
      "Chief Financial Officer", "Auditor", "Internal Auditor", "Tax Consultant", "GST Accountant",
      "Bookkeeper", "Accounts Payable Executive", "Accounts Receivable Executive", "Payroll Executive",
      "Credit Controller", "Investment Analyst", "Banking Officer", "Insurance Advisor", "Cashier"
    ]},
    { id: "admin", label: "Admin & Office Support", icon: "fileText", roles: [
      "Admin Manager", "Office Manager", "Administrative Assistant", "Executive Assistant", "Personal Assistant",
      "Receptionist", "Front Desk Executive", "Data Entry Operator", "Document Controller", "Back Office Executive",
      "HR Executive", "HR Manager", "Recruiter", "Payroll Officer", "Operations Executive",
      "Operations Manager", "Customer Support Executive", "Call Center Agent", "Virtual Assistant", "Clerk"
    ]},
    { id: "education", label: "Education & Training", icon: "graduation", roles: [
      "Teacher", "Primary Teacher", "Secondary Teacher", "Subject Teacher", "Lecturer", "Professor",
      "Tutor", "Academic Coordinator", "Principal", "Vice Principal", "School Administrator",
      "Curriculum Developer", "Special Education Teacher", "Montessori Teacher", "Language Trainer",
      "Corporate Trainer", "Soft Skills Trainer", "Counsellor", "Librarian", "Lab Assistant"
    ]},
    { id: "beauty", label: "Beauty & Wellness", icon: "heart", roles: [
      "Salon Manager", "Hair Stylist", "Barber", "Beautician", "Makeup Artist", "Nail Technician",
      "Spa Therapist", "Massage Therapist", "Aesthetician", "Cosmetologist", "Hair Colourist",
      "Waxing Specialist", "Threading Specialist", "Wellness Consultant", "Yoga Instructor", "Fitness Trainer"
    ]},
    { id: "security", label: "Security & Facilities", icon: "shield", roles: [
      "Security Manager", "Security Supervisor", "Security Guard", "Bouncer", "CCTV Operator",
      "Fire Safety Officer", "Facility Manager", "Facility Supervisor", "Housekeeping Supervisor",
      "Cleaner", "Janitor", "Gardener", "Maintenance Technician", "Plumber", "Electrician", "Pest Control Technician"
    ]},
    { id: "cruise", label: "Cruise & Marine", icon: "plane", roles: [
      "Cruise Ship Waiter", "Cruise Ship Steward", "Cruise Chef", "Cruise Bartender", "Cabin Steward",
      "Cruise Housekeeping", "Cruise Receptionist", "Cruise Entertainment Staff", "Cruise Spa Therapist",
      "Cruise Deckhand", "Cruise Engineer", "Cruise Security Officer", "Cruise Photographer", "Cruise Shop Assistant"
    ]},
    { id: "domestic", label: "Domestic & Household", icon: "home", roles: [
      "Housemaid", "Housekeeper", "Nanny", "Babysitter", "Elderly Caregiver", "Cook", "Maid",
      "Driver", "Family Driver", "Gardener", "Cleaner", "Laundry Staff", "Home Tutor", "Personal Assistant"
    ]},
    { id: "marketing", label: "Marketing & Creative", icon: "trending", roles: [
      "Marketing Manager", "Digital Marketing Executive", "SEO Specialist", "SEM Specialist", "Social Media Manager",
      "Content Writer", "Copywriter", "Graphic Designer", "Video Editor", "Motion Graphics Designer",
      "Brand Manager", "PR Executive", "Event Manager", "Photographer", "Videographer", "Influencer Marketing Executive"
    ]}
  ];

  /* ---------- State ---------- */
  var state = {
    step: 1,
    type: null,
    category: null,
    roles: [],
    benefits: [],
    contact: {}
  };

  var TOTAL = 5;

  /* ---------- Helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  /* ---------- Render: staffing types ---------- */
  function renderTypes() {
    var grid = $("typeGrid");
    if (!grid) return;
    grid.innerHTML = TYPES.map(function (t) {
      return '<button type="button" class="type-card" data-type="' + t.id + '">' +
        '<span class="tc-check">' + (ICONS.check || "") + "</span>" +
        '<span class="tc-icon">' + (ICONS[t.icon] || "") + "</span>" +
        "<h4>" + t.label + "</h4><p>" + t.desc + "</p></button>";
    }).join("");
    grid.querySelectorAll(".type-card").forEach(function (card) {
      card.addEventListener("click", function () {
        state.type = card.getAttribute("data-type");
        grid.querySelectorAll(".type-card").forEach(function (c) { c.classList.remove("selected"); });
        card.classList.add("selected");
        updateNav();
      });
    });
  }

  /* ---------- Render: categories ---------- */
  function renderCategories() {
    var grid = $("catGrid");
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map(function (c) {
      return '<button type="button" class="cat-card" data-cat="' + c.id + '">' +
        '<span class="cc-icon">' + (ICONS[c.icon] || "") + "</span>" +
        "<span>" + c.label + "</span><small>" + c.roles.length + " roles</small></button>";
    }).join("");
    grid.querySelectorAll(".cat-card").forEach(function (card) {
      card.addEventListener("click", function () {
        state.category = card.getAttribute("data-cat");
        grid.querySelectorAll(".cat-card").forEach(function (c) { c.classList.remove("selected"); });
        card.classList.add("selected");
        renderRoles();
        updateNav();
      });
    });
  }

  /* ---------- Render: roles ---------- */
  function currentRoles() {
    var cat = CATEGORIES.filter(function (c) { return c.id === state.category; })[0];
    return cat ? cat.roles : [];
  }

  function renderRoles(filter) {
    var grid = $("roleGrid");
    if (!grid) return;
    var roles = currentRoles();
    var q = (filter || "").toLowerCase().trim();
    var shown = q ? roles.filter(function (r) { return r.toLowerCase().indexOf(q) !== -1; }) : roles;

    if (!shown.length) {
      grid.innerHTML = '<div class="role-empty">No roles match your search. Add the exact title in the notes on the next step.</div>';
      return;
    }
    grid.innerHTML = shown.map(function (r) {
      var sel = state.roles.indexOf(r) !== -1 ? " selected" : "";
      return '<button type="button" class="role-chip' + sel + '" data-role="' + esc(r) + '">' +
        '<span class="rc-box">' + (ICONS.check || "") + "</span><span>" + esc(r) + "</span></button>";
    }).join("");
    grid.querySelectorAll(".role-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var role = chip.getAttribute("data-role");
        var i = state.roles.indexOf(role);
        if (i === -1) { state.roles.push(role); chip.classList.add("selected"); }
        else { state.roles.splice(i, 1); chip.classList.remove("selected"); }
        renderSelectedBar();
        updateNav();
      });
    });
  }

  function renderSelectedBar() {
    var bar = $("roleSelectedBar");
    if (!bar) return;
    var label = '<span class="rsb-label">Selected:</span>';
    if (!state.roles.length) {
      bar.innerHTML = label + '<span class="rsb-empty" id="rsbEmpty">No roles selected yet</span>';
    } else {
      bar.innerHTML = label + state.roles.map(function (r) {
        return '<span class="rsb-tag">' + esc(r) + '<button type="button" data-remove="' + esc(r) + '" aria-label="Remove ' + esc(r) + '">' + (ICONS.x || "×") + "</button></span>";
      }).join("");
      bar.querySelectorAll("[data-remove]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var role = btn.getAttribute("data-remove");
          var i = state.roles.indexOf(role);
          if (i !== -1) state.roles.splice(i, 1);
          renderRoles($("roleSearch") ? $("roleSearch").value : "");
          renderSelectedBar();
          updateNav();
        });
      });
    }
    var count = $("roleCount");
    if (count) count.innerHTML = "<b>" + state.roles.length + "</b> selected";
  }

  /* ---------- Benefits pills ---------- */
  function initBenefits() {
    var wrap = $("benefitPills");
    if (!wrap) return;
    wrap.querySelectorAll(".pill-opt").forEach(function (pill) {
      pill.addEventListener("click", function () {
        var val = pill.getAttribute("data-val");
        var i = state.benefits.indexOf(val);
        if (i === -1) { state.benefits.push(val); pill.classList.add("selected"); }
        else { state.benefits.splice(i, 1); pill.classList.remove("selected"); }
      });
    });
  }

  /* ---------- Summary ---------- */
  function typeLabel() {
    var t = TYPES.filter(function (x) { return x.id === state.type; })[0];
    return t ? t.label : "—";
  }
  function catLabel() {
    var c = CATEGORIES.filter(function (x) { return x.id === state.category; })[0];
    return c ? c.label : "—";
  }

  function buildSummary() {
    var card = $("summaryCard");
    if (!card) return;
    var rows = [
      ["Staffing Type", typeLabel()],
      ["Industry", catLabel()],
      ["Roles", state.roles.length ? state.roles.join(", ") : "—"],
      ["Positions", ($("positions") && $("positions").value) || "—"],
      ["Location", ($("workLocation") && $("workLocation").value) || "—"],
      ["Experience", ($("experience") && $("experience").value) || "—"],
      ["Timeline", ($("timeline") && $("timeline").value) || "—"],
      ["Salary / Budget", ($("salary") && $("salary").value) || "—"],
      ["Employment Type", ($("employmentType") && $("employmentType").value) || "—"],
      ["Benefits", state.benefits.length ? state.benefits.join(", ") : "—"]
    ];
    card.innerHTML = rows.map(function (r) {
      return '<div class="summary-row"><span class="sr-k">' + r[0] + '</span><span class="sr-v">' + esc(r[1]) + "</span></div>";
    }).join("");
  }

  /* ---------- Navigation ---------- */
  function updateNav() {
    var back = $("wzBack"), next = $("wzNext"), hint = $("wzHint");
    if (!back || !next) return;

    back.disabled = state.step <= 1;
    next.textContent = state.step === TOTAL ? "Submit Requirement" : "Continue";

    var ok = true, msg = "";
    if (state.step === 1) { ok = !!state.type; msg = "Select a staffing type to continue"; }
    else if (state.step === 2) { ok = !!state.category; msg = "Select an industry to continue"; }
    else if (state.step === 3) { ok = state.roles.length > 0; msg = "Select at least one role to continue"; }
    else if (state.step === 4) { ok = true; msg = "Fill in the requirement details"; }
    else if (state.step === 5) { ok = true; msg = "Review and submit your requirement"; }

    next.disabled = !ok;
    if (hint) hint.textContent = msg;
  }

  function goTo(step) {
    state.step = step;
    document.querySelectorAll(".wz-panel").forEach(function (p) {
      p.classList.toggle("active", p.getAttribute("data-panel") === String(step));
    });
    document.querySelectorAll(".wz-step").forEach(function (s) {
      var n = parseInt(s.getAttribute("data-step"), 10);
      s.classList.toggle("active", n === step);
      s.classList.toggle("done", n < step);
    });
    var bar = $("wzBar");
    if (bar) bar.style.width = ((step - 1) / (TOTAL - 1) * 88) + "%";
    if (step === 5) buildSummary();
    updateNav();
    var wiz = $("hireWizard");
    if (wiz) {
      var y = wiz.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  /* ---------- Validation ---------- */
  var RE = { email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, mobile: /^[+]?[\d\s\-()]{7,18}$/ };

  function setErr(input, msg) {
    input.classList.add("invalid");
    var f = input.closest(".field");
    var e = f ? f.querySelector(".error-msg") : null;
    if (e) { e.textContent = msg; e.classList.add("show"); }
  }
  function clearErr(input) {
    input.classList.remove("invalid");
    var f = input.closest(".field");
    var e = f ? f.querySelector(".error-msg") : null;
    if (e) { e.textContent = ""; e.classList.remove("show"); }
  }

  function validateStep4() {
    var ok = true;
    ["positions", "workLocation", "experience", "timeline"].forEach(function (id) {
      var el = $(id); if (!el) return;
      clearErr(el);
      if (!(el.value || "").trim()) { ok = false; setErr(el, "This field is required."); }
    });
    return ok;
  }

  function validateStep5() {
    var ok = true;
    ["contactName", "companyName", "contactEmail", "contactMobile"].forEach(function (id) {
      var el = $(id); if (!el) return;
      clearErr(el);
      var v = (el.value || "").trim();
      if (!v) { ok = false; setErr(el, "This field is required."); return; }
      if (el.type === "email" && !RE.email.test(v)) { ok = false; setErr(el, "Enter a valid email address."); }
      if (el.type === "tel" && !RE.mobile.test(v)) { ok = false; setErr(el, "Enter a valid mobile number."); }
    });
    var consent = $("hireConsent");
    var ce = $("hireConsentError");
    if (consent && !consent.checked) {
      ok = false;
      if (ce) { ce.textContent = "Please confirm to continue."; ce.classList.add("show"); }
    } else if (ce) { ce.textContent = ""; ce.classList.remove("show"); }
    return ok;
  }

  /* ---------- Build payload ---------- */
  function collect() {
    return {
      staffingType: typeLabel(),
      industry: catLabel(),
      roles: state.roles.join(", "),
      positions: ($("positions") && $("positions").value) || "",
      location: ($("workLocation") && $("workLocation").value) || "",
      experience: ($("experience") && $("experience").value) || "",
      timeline: ($("timeline") && $("timeline").value) || "",
      salary: ($("salary") && $("salary").value) || "",
      employmentType: ($("employmentType") && $("employmentType").value) || "",
      benefits: state.benefits.join(", "),
      notes: ($("notes") && $("notes").value) || "",
      name: ($("contactName") && $("contactName").value) || "",
      company: ($("companyName") && $("companyName").value) || "",
      email: ($("contactEmail") && $("contactEmail").value) || "",
      mobile: ($("contactMobile") && $("contactMobile").value) || "",
      role: ($("contactRole") && $("contactRole").value) || ""
    };
  }

  function emailBody(d) {
    return [
      "NEW HIRING REQUIREMENT",
      "",
      "Staffing Type: " + d.staffingType,
      "Industry: " + d.industry,
      "Roles: " + d.roles,
      "Positions: " + d.positions,
      "Location: " + d.location,
      "Experience: " + d.experience,
      "Timeline: " + d.timeline,
      "Salary / Budget: " + d.salary,
      "Employment Type: " + d.employmentType,
      "Benefits: " + d.benefits,
      "Notes: " + d.notes,
      "",
      "Contact: " + d.name + (d.role ? " (" + d.role + ")" : ""),
      "Company: " + d.company,
      "Email: " + d.email,
      "Mobile: " + d.mobile
    ].join("\n");
  }

  function waMessage(d) {
    return [
      "*NEW HIRING REQUIREMENT*",
      "",
      "Staffing Type: " + d.staffingType,
      "Industry: " + d.industry,
      "Roles: " + d.roles,
      "Positions: " + d.positions,
      "Location: " + d.location,
      "Experience: " + d.experience,
      "Timeline: " + d.timeline,
      "Salary / Budget: " + d.salary,
      "Employment Type: " + d.employmentType,
      "Benefits: " + d.benefits,
      "Notes: " + d.notes,
      "",
      "Contact: " + d.name + (d.role ? " (" + d.role + ")" : ""),
      "Company: " + d.company,
      "Email: " + d.email,
      "Mobile: " + d.mobile
    ].join("\n");
  }

  /* ---------- EmailJS ---------- */
  function loadEmailJS() {
    return new Promise(function (resolve) {
      if (window.emailjs) { resolve(true); return; }
      if (!CFG.emailjsReady || !CFG.emailjsReady()) { resolve(false); return; }
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      s.onload = function () {
        try { window.emailjs.init({ publicKey: CFG.EMAILJS_PUBLIC_KEY }); resolve(true); }
        catch (e) { resolve(false); }
      };
      s.onerror = function () { resolve(false); };
      document.head.appendChild(s);
    });
  }

  function sendEmail(payload) {
    return loadEmailJS().then(function (ready) {
      if (!ready) return { ok: false, fallback: true };
      return window.emailjs.send(CFG.EMAILJS_SERVICE_ID, CFG.EMAILJS_TEMPLATE_ID, payload)
        .then(function () { return { ok: true }; })
        .catch(function () { return { ok: false, fallback: false }; });
    });
  }

  /* ---------- Submit ---------- */
  function submit() {
    if (!validateStep5()) { if (window.ARK && window.ARK.toast) window.ARK.toast("Please correct the highlighted fields.", "error"); return; }
    var d = collect();
    var next = $("wzNext");
    next.disabled = true;
    next.textContent = "Submitting…";

    var payload = {
      to_email: CFG.HIRE_EMAIL || CFG.COMPANY_EMAIL,
      subject: "New Hiring Requirement – " + d.company + " – " + d.roles,
      staffing_type: d.staffingType, industry: d.industry, roles: d.roles,
      positions: d.positions, location: d.location, experience: d.experience,
      timeline: d.timeline, salary: d.salary, employment_type: d.employmentType,
      benefits: d.benefits, notes: d.notes,
      contact_name: d.name, company_name: d.company, contact_email: d.email,
      contact_mobile: d.mobile, contact_role: d.role,
      message: emailBody(d)
    };

    sendEmail(payload).then(function (res) {
      // Save locally as a record
      try {
        var list = JSON.parse(localStorage.getItem("ark_hire_requirements_v1")) || [];
        list.unshift({ id: "hire-" + Date.now(), date: new Date().toISOString(), data: d });
        localStorage.setItem("ark_hire_requirements_v1", JSON.stringify(list));
      } catch (e) {}

      var msg = $("successMsg");
      if (msg) {
        msg.textContent = res.ok
          ? "Thank you. Your hiring requirement has been emailed to the ARK Global Connect team. We'll review it and respond with a tailored plan shortly."
          : "Thank you. Your hiring requirement has been captured. Tap the WhatsApp button below to send it instantly to our team so we can respond right away.";
      }
      var wa = $("waSendBtn");
      if (wa) wa.href = "https://wa.me/" + CFG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(waMessage(d));

      // Hide nav, show success
      var nav = $("wzNav");
      if (nav) nav.style.display = "none";
      document.querySelectorAll(".wz-panel").forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-panel") === "done");
      });
      document.querySelectorAll(".wz-step").forEach(function (s) { s.classList.add("done"); s.classList.remove("active"); });
      var bar = $("wzBar"); if (bar) bar.style.width = "88%";
      var wiz = $("hireWizard");
      if (wiz) window.scrollTo({ top: wiz.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
      if (window.ARK && window.ARK.toast) window.ARK.toast("Requirement submitted successfully.", "success");
    });
  }

  /* ---------- Init ---------- */
  function init() {
    if (!$("hireWizard")) return;
    renderTypes();
    renderCategories();
    renderRoles();
    renderSelectedBar();
    initBenefits();
    updateNav();

    var next = $("wzNext"), back = $("wzBack");
    if (next) next.addEventListener("click", function () {
      if (state.step === 4 && !validateStep4()) { if (window.ARK && window.ARK.toast) window.ARK.toast("Please complete the required fields.", "error"); return; }
      if (state.step === TOTAL) { submit(); return; }
      if (state.step < TOTAL) goTo(state.step + 1);
    });
    if (back) back.addEventListener("click", function () { if (state.step > 1) goTo(state.step - 1); });

    var search = $("roleSearch");
    if (search) search.addEventListener("input", function () { renderRoles(search.value); });

    var restart = $("restartBtn");
    if (restart) restart.addEventListener("click", function () {
      state = { step: 1, type: null, category: null, roles: [], benefits: [], contact: {} };
      document.querySelectorAll(".type-card, .cat-card, .role-chip, .pill-opt").forEach(function (el) { el.classList.remove("selected"); });
      var form = document.querySelectorAll(".wz-panel input, .wz-panel select, .wz-panel textarea");
      form.forEach(function (el) { if (el.type === "checkbox") el.checked = false; else el.value = ""; });
      var nav = $("wzNav"); if (nav) nav.style.display = "";
      renderRoles(); renderSelectedBar();
      goTo(1);
    });

    // live clear errors
    document.addEventListener("input", function (ev) {
      if (ev.target.matches("input, select, textarea")) clearErr(ev.target);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
