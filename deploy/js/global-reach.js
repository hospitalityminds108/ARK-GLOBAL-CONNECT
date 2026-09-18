/* ============================================================
   ARK GLOBAL CONNECT — global-reach.js
   Auto-injected "Global Reach" section on every page.
   Region selector (Gulf / Europe / Asia Pacific / All Regions)
   with an animated world map, pulsing route markers, live
   counters and animated region panels.
   ============================================================ */
(function () {
  "use strict";

  var REGIONS = {
    gulf: {
      label: "Gulf",
      sub: "Middle East markets",
      blurb: "Our strongest international corridor. We place hospitality, retail, engineering and healthcare talent across the GCC with full documentation and mobilisation support.",
      countries: ["UAE", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Kuwait"],
      stats: [
        { n: 6, suffix: "", label: "GCC Markets" },
        { n: 40, suffix: "%", label: "Of Placements" },
        { n: 14, suffix: " days", label: "Avg. Mobilisation" }
      ],
      roles: ["Hospitality & F&B", "Retail & Mall Ops", "Engineering", "Healthcare", "Facilities"]
    },
    europe: {
      label: "Europe",
      sub: "European operations",
      blurb: "Skilled trades, healthcare and technology professionals for European employers, with transparent visa pathways and relocation coordination.",
      countries: ["United Kingdom", "Germany", "Netherlands", "Ireland", "Poland", "Portugal"],
      stats: [
        { n: 6, suffix: "", label: "European Markets" },
        { n: 22, suffix: "%", label: "Of Placements" },
        { n: 21, suffix: " days", label: "Avg. Mobilisation" }
      ],
      roles: ["Healthcare & Nursing", "IT & Engineering", "Skilled Trades", "Logistics", "Hospitality"]
    },
    apac: {
      label: "Asia Pacific",
      sub: "APAC markets",
      blurb: "Fast-growing demand across the Maldives, Singapore, Malaysia and beyond. We support hospitality, services and technical hiring throughout the region.",
      countries: ["Maldives", "Singapore", "Malaysia", "Thailand", "Japan", "Australia"],
      stats: [
        { n: 6, suffix: "", label: "APAC Markets" },
        { n: 26, suffix: "%", label: "Of Placements" },
        { n: 12, suffix: " days", label: "Avg. Mobilisation" }
      ],
      roles: ["Hospitality & Resorts", "Services", "Technical Roles", "Retail", "Marine & Travel"]
    },
    all: {
      label: "All Regions",
      sub: "See full global reach",
      blurb: "From India to the Gulf, Europe and Asia Pacific — one partner connecting skilled talent with employers across the world, ethically and transparently.",
      countries: ["India", "Gulf", "Europe", "Asia Pacific", "Africa", "Americas"],
      stats: [
        { n: 10, suffix: "+", label: "Countries Reached" },
        { n: 500, suffix: "+", label: "Placements Supported" },
        { n: 24, suffix: "/7", label: "Support" }
      ],
      roles: ["Domestic Recruitment", "International Recruitment", "Global Mobility", "Remote HR", "RPO"]
    }
  };

  /* Animated world map with route arcs from India */
  function mapSvg() {
    return (
      '<svg class="gr-map" viewBox="0 0 640 380" fill="none" aria-label="World map showing ARK recruitment routes from India">' +
        '<defs>' +
          '<linearGradient id="grArc" x1="0" y1="0" x2="1" y2="0">' +
            '<stop offset="0%" stop-color="#D4AF37"/><stop offset="100%" stop-color="#2E7BA3"/>' +
          "</linearGradient>" +
        "</defs>" +
        /* faint latitude lines */
        '<path d="M20 120 Q320 90 620 120" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>' +
        '<path d="M20 190 Q320 170 620 190" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>' +
        '<path d="M20 260 Q320 280 620 260" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>' +
        /* route arcs */
        '<path class="gr-arc" data-region="gulf" d="M300 210 Q250 150 190 175" stroke="url(#grArc)" stroke-width="2" stroke-dasharray="6 7"/>' +
        '<path class="gr-arc" data-region="europe" d="M300 210 Q230 90 150 110" stroke="url(#grArc)" stroke-width="2" stroke-dasharray="6 7"/>' +
        '<path class="gr-arc" data-region="apac" d="M300 210 Q420 150 500 165" stroke="url(#grArc)" stroke-width="2" stroke-dasharray="6 7"/>' +
        '<path class="gr-arc" data-region="all" d="M300 210 Q470 250 545 235" stroke="url(#grArc)" stroke-width="2" stroke-dasharray="6 7"/>' +
        /* markers */
        '<g class="gr-node" data-region="gulf"><circle cx="190" cy="175" r="6" fill="#D4AF37"/><circle class="gr-pulse" cx="190" cy="175" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/><text x="190" y="158" fill="#D4AF37" font-size="11" font-family="Inter" text-anchor="middle">Gulf</text></g>' +
        '<g class="gr-node" data-region="europe"><circle cx="150" cy="110" r="6" fill="#2E7BA3"/><circle class="gr-pulse" cx="150" cy="110" r="6" fill="none" stroke="#2E7BA3" stroke-width="2"/><text x="150" y="93" fill="#2E7BA3" font-size="11" font-family="Inter" text-anchor="middle">Europe</text></g>' +
        '<g class="gr-node" data-region="apac"><circle cx="500" cy="165" r="6" fill="#6BA928"/><circle class="gr-pulse" cx="500" cy="165" r="6" fill="none" stroke="#6BA928" stroke-width="2"/><text x="500" y="148" fill="#6BA928" font-size="11" font-family="Inter" text-anchor="middle">Asia Pacific</text></g>' +
        '<g class="gr-node" data-region="all"><circle cx="545" cy="235" r="6" fill="#C84C54"/><circle class="gr-pulse" cx="545" cy="235" r="6" fill="none" stroke="#C84C54" stroke-width="2"/><text x="545" y="218" fill="#C84C54" font-size="11" font-family="Inter" text-anchor="middle">Americas</text></g>' +
        /* India hub */
        '<g class="gr-hub"><circle cx="300" cy="210" r="9" fill="#D4AF37"/><circle class="gr-pulse gr-pulse-hub" cx="300" cy="210" r="9" fill="none" stroke="#D4AF37" stroke-width="2.5"/><text x="300" y="238" fill="#fff" font-size="12" font-weight="600" font-family="Inter" text-anchor="middle">India</text></g>' +
      "</svg>"
    );
  }

  function buildSection() {
    var sec = document.createElement("section");
    sec.className = "section gr-section";
    sec.id = "globalReach";
    sec.setAttribute("aria-label", "Global reach");

    var tabs = Object.keys(REGIONS).map(function (k, i) {
      return '<button type="button" class="gr-tab' + (i === 0 ? " active" : "") + '" data-region="' + k + '">' +
        '<span class="gr-tab-label">' + REGIONS[k].label + "</span>" +
        '<span class="gr-tab-sub">' + REGIONS[k].sub + "</span>" +
      "</button>";
    }).join("");

    sec.innerHTML =
      '<div class="container">' +
        '<div class="text-center mb-4 reveal">' +
          '<span class="eyebrow center light">Global Reach</span>' +
          '<h2 class="h2" style="color:var(--light)">One Partner. Every Market.</h2>' +
          '<p class="lead max-720 mx-auto" style="color:rgba(255,255,255,0.75)">From India to the Gulf, Europe and Asia Pacific — we connect skilled talent with employers across the world, ethically and transparently.</p>' +
        "</div>" +
        '<div class="gr-tabs reveal" role="tablist">' + tabs + "</div>" +
        '<div class="gr-body">' +
          '<div class="gr-map-wrap reveal">' + mapSvg() + "</div>" +
          '<div class="gr-panel reveal reveal-delay-2" id="grPanel"></div>' +
        "</div>" +
      "</div>";

    return sec;
  }

  function renderPanel(key) {
    var r = REGIONS[key];
    var panel = document.getElementById("grPanel");
    if (!panel) return;
    panel.innerHTML =
      '<span class="gr-panel-eyebrow">' + r.label + "</span>" +
      "<h3>" + r.sub + "</h3>" +
      '<p class="gr-blurb">' + r.blurb + "</p>" +
      '<div class="gr-stats">' +
        r.stats.map(function (s) {
          return '<div class="gr-stat"><b data-gr-count="' + s.n + '" data-gr-suffix="' + s.suffix + '">0</b><span>' + s.label + "</span></div>";
        }).join("") +
      "</div>" +
      '<div class="gr-chips">' +
        r.roles.map(function (x) { return '<span class="gr-chip">' + x + "</span>"; }).join("") +
      "</div>" +
      '<div class="gr-countries">' +
        r.countries.map(function (c) { return '<span class="gr-country">' + c + "</span>"; }).join("") +
      "</div>";
    animateCounters(panel);
  }

  function animateCounters(scope) {
    scope.querySelectorAll("[data-gr-count]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-gr-count"));
      var suffix = el.getAttribute("data-gr-suffix") || "";
      var dur = 1100, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  function activate(key) {
    var sec = document.getElementById("globalReach");
    if (!sec) return;
    sec.querySelectorAll(".gr-tab").forEach(function (t) {
      t.classList.toggle("active", t.getAttribute("data-region") === key);
    });
    sec.querySelectorAll(".gr-arc").forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("data-region") === key || key === "all");
    });
    sec.querySelectorAll(".gr-node").forEach(function (n) {
      n.classList.toggle("on", n.getAttribute("data-region") === key || key === "all");
    });
    renderPanel(key);
  }

  function init() {
    if (document.getElementById("globalReach")) return;
    var footer = document.querySelector(".site-footer");
    var sec = buildSection();
    if (footer && footer.parentNode) footer.parentNode.insertBefore(sec, footer);
    else document.body.appendChild(sec);

    sec.querySelectorAll(".gr-tab").forEach(function (t) {
      t.addEventListener("click", function () { activate(t.getAttribute("data-region")); });
    });
    activate("gulf");
    if (window.ARK && window.ARK.initReveal) window.ARK.initReveal();
  }

  window.ARK_initGlobalReach = init;
})();
