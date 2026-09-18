/* ============================================================
   ARK GLOBAL CONNECT — clients.js
   Real client list (from the ARK Global Connect company profile).
   Used by the homepage roller slide and the About page
   "Our Clients" section.
   ============================================================ */
(function () {
  "use strict";

  /* Each client: name, country, monogram, accent colour */
  var CLIENTS = [
    { name: "ERAA Group of Companies", country: "Dubai", mono: "EG", color: "#2E7BA3" },
    { name: "Al Qadar Group", country: "Dubai", mono: "AQ", color: "#6BA928" },
    { name: "TRIBUS Gastro Pub", country: "Malaysia", mono: "TB", color: "#C84C54" },
    { name: "Olive Tree", country: "Malaysia", mono: "OT", color: "#D4AF37" },
    { name: "Big Barber Deluxe", country: "Australia", mono: "BB", color: "#1A3A52" },
    { name: "Lebanon Island Resort", country: "Dubai", mono: "LI", color: "#2E7BA3" },
    { name: "Simpra Foods Ltd", country: "Dubai & Oman", mono: "SF", color: "#6BA928" },
    { name: "Dalchini", country: "Dubai & Oman", mono: "DL", color: "#C84C54" },
    { name: "Yugo Sushi", country: "Dubai", mono: "YS", color: "#D4AF37" },
    { name: "Scott's Cafe", country: "Malaysia", mono: "SC", color: "#1A3A52" },
    { name: "Desi Village Restaurant", country: "Dubai", mono: "DV", color: "#2E7BA3" },
    { name: "Hookin Restaurant & Cafe", country: "Dubai", mono: "HK", color: "#6BA928" },
    { name: "Annam (Kumar Restaurant)", country: "Malaysia", mono: "AN", color: "#C84C54" },
    { name: "Shri Bring Chan", country: "Malaysia", mono: "SB", color: "#D4AF37" },
    { name: "Mercure Gold", country: "Dubai", mono: "MG", color: "#1A3A52" },
    { name: "A-yajin", country: "Malaysia", mono: "AY", color: "#2E7BA3" },
    { name: "Tawa Gluten", country: "Dubai", mono: "TG", color: "#6BA928" },
    { name: "Marco Polo", country: "Dubai", mono: "MP", color: "#C84C54" },
    { name: "Palazzo Versace", country: "Dubai", mono: "PV", color: "#D4AF37" }
  ];

  /* Build a single logo mark (SVG monogram) */
  function logoMark(c, size) {
    var s = size || 46;
    return (
      '<span class="client-logo-mark" style="--cl:' + c.color + ';width:' + s + "px;height:" + s + 'px">' +
        '<svg viewBox="0 0 48 48" aria-hidden="true">' +
          '<rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="none" stroke="currentColor" stroke-width="2.4"/>' +
          '<text x="24" y="31" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="18" font-weight="700" fill="currentColor">' + c.mono + "</text>" +
        "</svg>" +
      "</span>"
    );
  }

  /* Full logo tile: mark + wordmark + country */
  function logoTile(c) {
    return (
      '<div class="client-tile" title="' + c.name + ' \u2014 ' + c.country + '">' +
        logoMark(c) +
        '<span class="client-tile-text"><b>' + c.name + "</b><span>" + c.country + "</span></span>" +
      "</div>"
    );
  }

  /* Compact logo for the marquee roller (mark + name inline) */
  function logoRoll(c) {
    return (
      '<div class="client-roll-item">' +
        logoMark(c, 40) +
        '<span class="client-roll-name">' + c.name + "</span>" +
      "</div>"
    );
  }

  window.ARK_CLIENTS = CLIENTS;
  window.ARK_clientLogoMark = logoMark;
  window.ARK_clientTile = logoTile;
  window.ARK_clientRoll = logoRoll;

  /* Auto-render any placeholders present on the page */
  function autoRender() {
    var rollHtml = CLIENTS.map(logoRoll).join("");
    ["clientRollA", "clientRollB"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !el.innerHTML.trim()) el.innerHTML = rollHtml + rollHtml;
    });
    var grid = document.getElementById("clientGrid");
    if (grid && !grid.innerHTML.trim()) grid.innerHTML = CLIENTS.map(logoTile).join("");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoRender);
  } else {
    autoRender();
  }
})();
