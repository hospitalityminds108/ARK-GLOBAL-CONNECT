/* ============================================================
   ARK GLOBAL KONNEXT — job-detail.js
   Dynamic job page: render, SEO meta, JSON-LD, apply flow.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.ARK_CONFIG;
  var ICONS = window.ARK_ICONS || {};
  var e = function (s) { return window.ARK.escapeHtml(s); };

  function getId() {
    var p = new URLSearchParams(window.location.search);
    return p.get("id");
  }

  function listHtml(items, icon) {
    if (!items || !items.length) return "";
    return '<ul class="detail-list">' + items.map(function (i) {
      return "<li>" + (icon || ICONS.check) + "<span>" + e(i) + "</span></li>";
    }).join("") + "</ul>";
  }

  function metaRow(label, value) {
    if (!value) return "";
    return '<div class="detail-meta-row"><span class="dm-label">' + e(label) + '</span><span class="dm-value">' + e(value) + "</span></div>";
  }

  function renderNotFound() {
    var main = document.getElementById("jobRoot");
    if (!main) return;
    main.innerHTML =
      '<div class="container section">' +
        '<div class="empty-state">' +
          ICONS.search +
          "<h3>Job Opportunity Not Found</h3>" +
          "<p>The position you are looking for may have been filled, closed, or the link is incorrect. Explore our current openings instead.</p>" +
          '<a href="jobs.html" class="btn btn-primary">Return to Jobs ' + ICONS.arrowRight + "</a>" +
        "</div>" +
      "</div>";
    document.title = "Job Not Found | ARK Global Connect";
  }

  function setMeta(j) {
    var title = j.title + " Jobs in " + j.location + " | ARK Global Connect";
    document.title = title;
    function setTag(attr, key, val) {
      var el = document.querySelector('meta[' + attr + '="' + key + '"]');
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", val);
    }
    var desc = (j.title + " opportunity in " + j.location + ", " + j.country + ". " + (j.description || "")).slice(0, 158);
    setTag("name", "description", desc);
    setTag("property", "og:title", title);
    setTag("property", "og:description", desc);
    setTag("property", "og:type", "website");
    setTag("name", "twitter:card", "summary_large_image");
    setTag("name", "twitter:title", title);
    setTag("name", "twitter:description", desc);
    // canonical
    var link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = window.location.origin + window.location.pathname + "?id=" + encodeURIComponent(j.id);
  }

  function injectJsonLd(j) {
    var data = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": j.title,
      "description": "<p>" + e(j.description) + "</p>",
      "datePosted": j.postedDate,
      "validThrough": j.deadline || undefined,
      "employmentType": (j.jobType || j.type || "FULL_TIME").toUpperCase().replace(/\s+/g, "_"),
      "hiringOrganization": { "@type": "Organization", "name": j.company },
      "jobLocation": {
        "@type": "Place",
        "address": { "@type": "PostalAddress", "addressLocality": j.city, "addressCountry": j.country }
      },
      "identifier": { "@type": "PropertyValue", "name": "ARK Global Connect", "value": j.referenceId || j.id }
    };
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  function renderJob(j) {
    var root = document.getElementById("jobRoot");
    if (!root) return;
    var applyUrl = "#apply";
    var scopeBadge = j.scope === "International"
      ? '<span class="badge badge-international">International</span>'
      : '<span class="badge badge-domestic">Domestic</span>';

    root.innerHTML =
      '<section class="page-hero dark" style="padding-bottom:50px">' +
        '<div class="container">' +
          '<nav class="breadcrumbs" aria-label="Breadcrumb">' +
            '<a href="index.html">Home</a>' + ICONS.chevronRight +
            '<a href="jobs.html">Jobs</a>' + ICONS.chevronRight +
            "<span>" + e(j.title) + "</span>" +
          "</nav>" +
          '<div class="job-badges mb-2">' + scopeBadge +
            (j.featured ? '<span class="badge badge-featured">Featured</span>' : "") +
            (j.urgent ? '<span class="badge badge-urgent">Urgent</span>' : "") +
            (j.new ? '<span class="badge badge-new">New</span>' : "") +
          "</div>" +
          "<h1>" + e(j.title) + "</h1>" +
          '<div class="job-meta mt-2" style="color:rgba(255,255,255,.75)">' +
            "<span>" + ICONS.building + e(j.company) + "</span>" +
            "<span>" + ICONS.mapPin + e(j.location) + ", " + e(j.country) + "</span>" +
            "<span>" + ICONS.briefcase + e(j.type) + "</span>" +
            "<span>" + ICONS.clock + e(j.experience) + "</span>" +
          "</div>" +
          '<div class="hero-actions mt-3">' +
            '<a href="#apply" class="btn btn-primary">Apply Now ' + ICONS.arrowRight + "</a>" +
            '<a href="jobs.html" class="btn btn-ghost-light">Back to Jobs</a>' +
          "</div>" +
        "</div>" +
      "</section>" +

      '<section class="section">' +
        '<div class="container">' +
          '<div class="detail-layout">' +
            '<div class="detail-main">' +
              '<div class="detail-block reveal">' +
                "<h2 class=\"h3\">About the Role</h2>" +
                "<p>" + e(j.description) + "</p>" +
              "</div>" +
              (j.responsibilities.length ? '<div class="detail-block reveal"><h2 class="h3">Key Responsibilities</h2>' + listHtml(j.responsibilities) + "</div>" : "") +
              '<div class="detail-block reveal"><h2 class="h3">Requirements</h2>' +
                '<div class="detail-meta-grid">' +
                  metaRow("Education", j.education) +
                  metaRow("Experience", j.experience) +
                  metaRow("Certifications", j.certifications) +
                  metaRow("Languages", j.languages) +
                "</div>" +
                (j.requirements.length ? listHtml(j.requirements) : "") +
                (j.skills.length ? '<div class="mt-3"><h4 class="h4 mb-2">Skills</h4><div class="tag-list">' + j.skills.map(function (s) { return '<span class="tag">' + e(s) + "</span>"; }).join("") + "</div></div>" : "") +
              "</div>" +
              (j.benefits.length ? '<div class="detail-block reveal"><h2 class="h3">What We Offer</h2>' + listHtml(j.benefits, ICONS.checkCircle) + "</div>" : "") +
              (j.scope === "International" ? '<div class="detail-block reveal"><h2 class="h3">Relocation &amp; Support</h2><div class="detail-meta-grid">' +
                metaRow("Accommodation", j.accommodation) + metaRow("Food", j.food) +
                metaRow("Transportation", j.transportation) + metaRow("Visa Information", j.visa) + "</div></div>" : "") +
              '<div class="detail-block reveal"><h2 class="h3">Job Location</h2>' +
                '<div class="map-embed"><div class="map-pin">' + ICONS.mapPin + "</div><div><b>" + e(j.location) + "</b><span>" + e(j.country) + "</span></div></div>" +
              "</div>" +
              (j.employerDescription ? '<div class="detail-block reveal"><h2 class="h3">About the Employer</h2><p>' + e(j.employerDescription) + "</p></div>" : "") +
            "</div>" +

            '<aside class="detail-side">' +
              '<div class="detail-card reveal">' +
                "<h3 class=\"h4 mb-2\">Job Overview</h3>" +
                metaRow("Reference ID", j.referenceId || j.id) +
                metaRow("Department", j.department) +
                metaRow("Industry", j.industry) +
                metaRow("Employment Type", j.type) +
                metaRow("Job Type", j.jobType) +
                metaRow("Experience", j.experience) +
                metaRow("Salary", j.salary) +
                metaRow("Posted", window.ARK.formatDate(j.postedDate)) +
                metaRow("Deadline", window.ARK.formatDate(j.deadline)) +
                '<a href="#apply" class="btn btn-primary btn-block mt-3">Apply Now</a>' +
                '<a href="' + waLink(j) + '" target="_blank" rel="noopener" class="btn btn-outline btn-block mt-1">' + ICONS.whatsapp + " Ask on WhatsApp</a>" +
              "</div>" +
              '<div class="detail-card reveal mt-2">' +
                "<h3 class=\"h4 mb-2\">Share this Job</h3>" +
                '<div class="share-row">' +
                  '<button class="icon-btn" onclick="navigator.clipboard&&navigator.clipboard.writeText(location.href);ARK.toast(\'Link copied\',\'success\')" aria-label="Copy link">' + ICONS.copy + "</button>" +
                  '<a class="icon-btn" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(location.href) + '" aria-label="Share on LinkedIn">' + ICONS.linkedin + "</a>" +
                  '<a class="icon-btn" target="_blank" rel="noopener" href="' + waLink(j) + '" aria-label="Share on WhatsApp">' + ICONS.whatsapp + "</a>" +
                "</div>" +
              "</div>" +
            "</aside>" +
          "</div>" +
        "</div>" +
      "</section>" +

      /* Application section */
      '<section class="section bg-beige" id="apply">' +
        '<div class="container">' +
          '<div class="max-820 mx-auto text-center mb-3 reveal">' +
            '<span class="eyebrow center">Apply</span>' +
            '<h2 class="h2">Apply for this Position</h2>' +
            '<p class="lead">Complete the form below. Your application will be sent to the ARK recruitment team, and you can also forward it instantly on WhatsApp.</p>' +
          "</div>" +
          '<div class="max-820 mx-auto">' +
            '<form id="applyForm" class="apply-form" novalidate data-job-id="' + e(j.id) + '" data-job-title="' + e(j.title) + '">' +
              '<div class="form-grid two">' +
                field("Full Name", "name", "text", true, "Your full name") +
                field("Email", "email", "email", true, "you@example.com") +
                field("Mobile", "mobile", "tel", true, "+91 85913 52276") +
                field("Current Location", "location", "text", true, "City, Country") +
                field("Experience", "experience", "text", true, "e.g. 5 years") +
                field("Current Company", "company", "text", false, "Current or last employer") +
                field("Expected Salary", "salary", "text", false, "e.g. ₹10 LPA") +
                field("Notice Period", "notice", "text", false, "e.g. 30 days") +
              "</div>" +
              '<div class="field mt-2"><label for="linkedin">LinkedIn URL</label><input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/..."></div>' +
              '<div class="field mt-2"><label for="cover">Cover Letter</label><textarea id="cover" name="cover" placeholder="Tell us why you are a great fit for this role..."></textarea></div>' +
              '<div class="field mt-2"><label>Upload CV <span class="req">*</span></label>' +
                '<div class="file-drop" id="cvDrop">' + ICONS.upload +
                  "<p>Drag &amp; drop your CV here or click to browse</p>" +
                  '<p class="small">PDF, DOC or DOCX · Max ' + CFG.MAX_CV_MB + "MB</p>" +
                  '<input type="file" id="cvInput" name="cv" accept=".pdf,.doc,.docx" hidden>' +
                "</div>" +
                '<div class="file-selected" id="cvSelected"><div class="fs-info">' + ICONS.fileText + '<span id="cvName"></span></div><button type="button" class="fs-remove" id="cvRemove">Remove</button></div>' +
                '<span class="error-msg" id="cvError"></span>' +
              "</div>" +
              '<div class="checkbox-field mt-3">' +
                '<input type="checkbox" id="confirm" name="confirm" required>' +
                '<label for="confirm">I confirm that the information provided is accurate and I consent to ARK Global Connect processing my application.</label>' +
              "</div>" +
              '<span class="error-msg" id="confirmError"></span>' +
              '<button type="submit" class="btn btn-primary btn-lg btn-block mt-3" id="applyBtn">Apply Now ' + ICONS.arrowRight + "</button>" +
              '<p class="small muted text-center mt-2">By applying you agree to our candidate terms. We never charge candidates for job placement.</p>' +
            "</form>" +
            '<div id="applySuccess" class="hidden"></div>' +
          "</div>" +
        "</div>" +
      "</section>" +

      /* Suggested jobs */
      '<section class="section" id="suggestedSection">' +
        '<div class="container">' +
          '<div class="flex justify-between items-center mb-3 reveal">' +
            '<div><span class="eyebrow">More Opportunities</span><h2 class="h2">Similar Roles</h2></div>' +
            '<a href="jobs.html" class="link-arrow">View all jobs ' + ICONS.arrowRight + "</a>" +
          "</div>" +
          '<div class="grid g3" id="suggestedJobs"></div>' +
        "</div>" +
      "</section>";

    // suggested jobs
    var all = window.ARKStore.active().filter(function (x) { return x.id !== j.id; });
    var same = all.filter(function (x) { return x.industry === j.industry || x.scope === j.scope; });
    var picks = (same.length ? same : all).slice(0, 3);
    var sc = document.getElementById("suggestedJobs");
    if (sc) {
      if (picks.length) sc.innerHTML = picks.map(window.ARK_jobCardHtml).join("");
      else sc.innerHTML = '<div class="empty-state" style="grid-column:1/-1">' + ICONS.briefcase + "<h3>No similar roles right now</h3><p>Explore all current openings.</p><a href=\"jobs.html\" class=\"btn btn-outline\">Browse Jobs</a></div>";
      sc.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }

    // init apply form
    if (window.ARK_initApplyForm) window.ARK_initApplyForm(j);
  }

  function field(label, name, type, required, ph) {
    return '<div class="field"><label for="' + name + '">' + label + (required ? ' <span class="req">*</span>' : "") + "</label>" +
      '<input type="' + type + '" id="' + name + '" name="' + name + '" placeholder="' + ph + '"' + (required ? " required" : "") + ">" +
      '<span class="error-msg" data-for="' + name + '"></span></div>';
  }

  function waLink(j) {
    var msg = "Hello ARK Global Connect, I am interested in the " + j.title + " role (" + (j.referenceId || j.id) + ") in " + j.location + ".";
    return "https://wa.me/" + CFG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
  }

  /* ---------- Boot ---------- */
  function boot() {
    var id = getId();
    window.ARKStore.load().then(function () {
      var j = id ? window.ARKStore.get(id) : null;
      if (!j || j.status === "draft") { renderNotFound(); return; }
      setMeta(j);
      injectJsonLd(j);
      renderJob(j);
      if (window.ARK && window.ARK.revealRefresh) window.ARK.revealRefresh();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
