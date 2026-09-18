/* ============================================================
   ARK GLOBAL CONNECT — main.js
   Shared: header/footer injection, nav, reveal, counters,
   floating actions, FAQ, tabs, marquee, helpers.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.ARK_CONFIG || {};

  /* ---------- Icon helper (inline SVG, Lucide-style) ---------- */
  var ICONS = {
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>',
    trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
    fileText: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M4 6h16M4 18h16"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    graduation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
  };
  window.ARK_ICONS = ICONS;

  /* ---------- Navigation model ---------- */
  var NAV = [
    { label: "Home", href: "index.html" },
    { label: "Services", children: [
      { label: "Hire Talent", href: "hire-talent.html" },
      { label: "Permanent Recruitment", href: "permanent-recruitment.html" },
      { label: "Executive Search", href: "executive-search.html" },
      { label: "Staffing Solutions", href: "staffing.html" },
      { label: "RPO", href: "rpo.html" },
      { label: "Remote HR", href: "remote-hr.html" },
      { label: "Global Recruitment", href: "global-recruitment.html" },
      { label: "Global Mobility", href: "global-mobility.html" },
      { label: "Internships", href: "internships.html" }
    ] },
    { label: "Industries", mega: true, children: [
      { label: "All Industries", href: "industries.html" },
      { label: "Hospitality & Tourism", href: "industry-hospitality-tourism.html" },
      { label: "IT & Technology", href: "industry-it-technology.html" },
      { label: "Retail & E-commerce", href: "industry-retail-ecommerce.html" },
      { label: "BFSI", href: "industry-bfsi.html" },
      { label: "Real Estate & Construction", href: "industry-real-estate-construction.html" },
      { label: "Healthcare & Wellness", href: "industry-healthcare-wellness.html" },
      { label: "Logistics & Supply Chain", href: "industry-logistics-supply-chain.html" },
      { label: "Manufacturing & Engineering", href: "industry-manufacturing-engineering.html" },
      { label: "Education & Training", href: "industry-education-training.html" },
      { label: "Sales & Marketing", href: "industry-sales-marketing.html" },
      { label: "Human Resources", href: "industry-human-resources.html" },
      { label: "Facilities & Administration", href: "industry-facilities-administration.html" }
    ] },
    { label: "Global Reach", href: "global-reach.html" },
    { label: "For Candidates", href: "candidates.html" },
    { label: "About", href: "about.html" },
    { label: "Insights", href: "insights.html" },
    { label: "Contact", href: "contact.html" }
  ];

  function navItemHtml(n, page) {
    if (n.children) {
      var childActive = n.children.some(function (c) { return c.href === page; });
      var links = n.children.map(function (c) {
        return '<a href="' + c.href + '"' + (c.href === page ? ' class="active"' : "") + ">" + c.label + "</a>";
      }).join("");
      return '<div class="nav-drop' + (childActive ? " active" : "") + '">' +
        '<button type="button" class="nav-drop-toggle" aria-haspopup="true" aria-expanded="false">' +
          n.label + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>' +
        "</button>" +
        '<div class="nav-drop-menu' + (n.mega ? " cols-2" : "") + '">' + links + "</div>" +
      "</div>";
    }
    var active = n.href === page ? " active" : "";
    return '<a href="' + n.href + '" class="' + active.trim() + '">' + n.label + "</a>";
  }

  function currentPage() {
    var p = window.location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  /* ---------- Header ---------- */
  function buildHeader() {
    var page = currentPage();
    var navHtml = NAV.map(function (n) { return navItemHtml(n, page); }).join("");

    var header = document.createElement("header");
    header.className = "site-header";
    header.id = "siteHeader";
    header.innerHTML =
      '<div class="container header-inner">' +
        '<a href="index.html" class="logo" aria-label="ARK Global Connect home">' +
          '<img src="assets/logo.png" class="logo-img" alt="ARK Global Connect" width="54" height="54">' +
        "</a>" +
        '<nav class="nav" aria-label="Primary">' + navHtml + "</nav>" +
        '<div class="header-cta">' +
          '<a href="hire.html" class="btn btn-outline btn-sm">I Want to Hire</a>' +
          '<a href="jobs.html" class="btn btn-gold btn-sm">Find a Job</a>' +
          '<button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">' +
            "<span></span><span></span><span></span>" +
          "</button>" +
        "</div>" +
      "</div>";
    document.body.insertBefore(header, document.body.firstChild);

    // Mobile nav
    var mobile = document.createElement("div");
    mobile.className = "mobile-nav";
    mobile.id = "mobileNav";
    mobile.innerHTML =
      '<div class="mobile-nav-head">' +
        '<a href="index.html" class="logo">' +
          '<img src="assets/logo.png" class="logo-img" alt="ARK Global Connect" width="54" height="54"></a>' +
        '<button class="mobile-nav-close" id="mobileClose" aria-label="Close menu">' + ICONS.x + "</button>" +
      "</div>" +
      NAV.map(function (n) {
        if (n.children) {
          return '<div class="mobile-group"><span class="mobile-group-label">' + n.label + "</span>" +
            n.children.map(function (c) { return '<a href="' + c.href + '">' + c.label + "</a>"; }).join("") + "</div>";
        }
        return '<a href="' + n.href + '">' + n.label + "</a>";
      }).join("") +
      '<div class="mobile-cta">' +
        '<a href="hire.html" class="btn btn-primary btn-block">I Want to Hire</a>' +
        '<a href="jobs.html" class="btn btn-gold btn-block">Find a Job</a>' +
      "</div>";
    document.body.appendChild(mobile);

    var ham = document.getElementById("hamburger");
    var close = document.getElementById("mobileClose");
    ham.addEventListener("click", function () {
      mobile.classList.add("open");
      ham.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    });
    close.addEventListener("click", function () {
      mobile.classList.remove("open");
      ham.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("open");
        document.body.style.overflow = "";
      });
    });

    // Dropdown toggles (click; hover handled by CSS)
    header.querySelectorAll(".nav-drop-toggle").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var drop = btn.parentElement;
        var open = drop.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        header.querySelectorAll(".nav-drop").forEach(function (d) {
          if (d !== drop) { d.classList.remove("open"); var t = d.querySelector(".nav-drop-toggle"); if (t) t.setAttribute("aria-expanded", "false"); }
        });
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-drop")) {
        header.querySelectorAll(".nav-drop").forEach(function (d) {
          d.classList.remove("open");
          var t = d.querySelector(".nav-drop-toggle"); if (t) t.setAttribute("aria-expanded", "false");
        });
      }
    });

    // Scroll state
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            '<a href="index.html" class="logo">' +
              '<img src="assets/logo.png" class="logo-img" alt="ARK Global Connect" width="54" height="54"></a>' +
            '<p class="footer-tagline">Hire. Manage. Mobilise. Globally.</p>' +
            '<p>Workforce. HR. Global Mobility. One Partner. From finding the right talent to managing your workforce and moving people across borders, ARK Global Connect helps businesses build stronger teams.</p>' +
            '<ul class="footer-contact">' +
              '<li>' + ICONS.mapPin + '<span>' + (CFG.ADDRESS_FULL || "Mumbai, India") + '</span></li>' +
              '<li>' + ICONS.mail + '<a href="mailto:' + (CFG.COMPANY_EMAIL || "") + '">' + (CFG.COMPANY_EMAIL || "") + '</a></li>' +
              '<li>' + ICONS.phone + '<a href="tel:' + (CFG.PHONE_TEL || "") + '">' + (CFG.PHONE_DISPLAY || "") + '</a></li>' +
            '</ul>' +
            '<div class="footer-social">' +
              '<a href="' + CFG.SOCIAL.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + ICONS.linkedin + "</a>" +
              '<a href="' + CFG.SOCIAL.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.instagram + "</a>" +
              '<a href="' + CFG.SOCIAL.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.facebook + "</a>" +
              '<a href="' + CFG.SOCIAL.youtube + '" target="_blank" rel="noopener" aria-label="YouTube">' + ICONS.youtube + "</a>" +
            "</div>" +
          "</div>" +
          '<div class="footer-col"><h4>Employers</h4>' +
            '<a href="hire.html">Submit a Requirement</a>' +
            '<a href="hire-talent.html">Hire Talent</a>' +
            '<a href="remote-hr.html">Remote HR</a>' +
            '<a href="staffing.html">Staffing</a>' +
            '<a href="executive-search.html">Executive Search</a>' +
            '<a href="rpo.html">RPO</a>' +
            '<a href="global-recruitment.html">Global Recruitment</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Candidates</h4>' +
            '<a href="jobs.html">Search Jobs</a>' +
            '<a href="jobs-international.html">International Opportunities</a>' +
            '<a href="internships.html">Internships</a>' +
            '<a href="candidates.html">Submit Resume</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Company</h4>' +
            '<a href="about.html">About ARK</a>' +
            '<a href="industries.html">Industries</a>' +
            '<a href="insights.html">Insights</a>' +
            '<a href="contact.html">Contact</a>' +
            '<a href="contact.html">Careers</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Industries</h4>' +
            '<a href="industry-hospitality-tourism.html">Hospitality &amp; Tourism</a>' +
            '<a href="industry-it-technology.html">IT &amp; Technology</a>' +
            '<a href="industry-retail-ecommerce.html">Retail &amp; E-commerce</a>' +
            '<a href="industry-bfsi.html">BFSI</a>' +
            '<a href="industry-real-estate-construction.html">Real Estate &amp; Construction</a>' +
            '<a href="industry-healthcare-wellness.html">Healthcare &amp; Wellness</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Legal</h4>' +
            '<a href="legal.html#privacy">Privacy Policy</a>' +
            '<a href="legal.html#terms">Terms &amp; Conditions</a>' +
            '<a href="legal.html#candidate">Candidate Disclaimer</a>' +
            '<a href="legal.html#employer">Employer Terms</a>' +
            '<a href="legal.html#fraud">Recruitment Fraud Alert</a>' +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>© " + new Date().getFullYear() + " ARK Global Connect. All Rights Reserved.</span>" +
          '<span>Hire · Manage · Mobilise · <a href="admin.html">Admin</a></span>' +
        "</div>" +
      "</div>";
    document.body.appendChild(footer);
  }

  /* ---------- Floating actions ---------- */
  function buildFloating() {
    var wa = "https://wa.me/" + CFG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hello ARK Global Connect, I would like to know more about your services.");
    var wrap = document.createElement("div");
    wrap.className = "float-actions";
    wrap.innerHTML =
      '<a class="float-btn float-call" href="tel:' + CFG.PHONE_TEL + '" data-tip="Call ARK" aria-label="Call ARK Global Connect">' + ICONS.phone + "</a>" +
      '<a class="float-btn float-wa" href="' + wa + '" target="_blank" rel="noopener" data-tip="Chat on WhatsApp" aria-label="Chat on WhatsApp">' + ICONS.whatsapp + "</a>";
    document.body.appendChild(wrap);
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    function observeAll() {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (e) {
        if (!e.__arkObserved) { e.__arkObserved = true; io.observe(e); }
      });
    }
    observeAll();

    // Dynamically-injected .reveal elements (rendered after boot) must also be
    // observed, otherwise they stay at opacity:0 and sections look empty.
    if ("MutationObserver" in window) {
      var mo = new MutationObserver(function () { observeAll(); });
      mo.observe(document.body, { childList: true, subtree: true });
    }
    // Safety net: force-reveal anything still hidden after a short delay.
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) e.classList.add("in");
      });
    }, 1200);
  }

  /* ---------- Counters ---------- */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1600, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        // close siblings in same group
        var group = item.parentElement;
        group.querySelectorAll(".faq-item.open").forEach(function (o) {
          o.classList.remove("open");
          o.querySelector(".faq-a").style.maxHeight = null;
        });
        if (!open) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var tabs = group.querySelectorAll(".tab");
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var target = tab.getAttribute("data-tab");
          tabs.forEach(function (t) { t.classList.remove("active"); });
          tab.classList.add("active");
          var scope = group.getAttribute("data-tabs");
          document.querySelectorAll('[data-tab-panel="' + scope + '"]').forEach(function (p) {
            p.classList.toggle("hidden", p.getAttribute("data-panel") !== target);
          });
        });
      });
    });
  }

  /* ---------- Feature block interactivity ---------- */
  function initFeatureBlocks() {
    document.querySelectorAll(".feature-block").forEach(function (b) {
      b.addEventListener("click", function () {
        var group = b.parentElement;
        group.querySelectorAll(".feature-block").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
      });
    });
  }

  /* ---------- Helpers exposed globally ---------- */
  window.ARK = {
    icons: ICONS,
    initReveal: initReveal,
    initCounters: initCounters,
    escapeHtml: function (s) {
      if (s == null) return "";
      return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    },
    timeAgo: function (dateStr) {
      if (!dateStr) return "";
      var d = new Date(dateStr);
      if (isNaN(d)) return dateStr;
      var days = Math.floor((Date.now() - d.getTime()) / 86400000);
      if (days <= 0) return "Posted today";
      if (days === 1) return "Posted 1 day ago";
      if (days < 30) return "Posted " + days + " days ago";
      var months = Math.floor(days / 30);
      return "Posted " + months + (months === 1 ? " month ago" : " months ago");
    },
    formatDate: function (dateStr) {
      if (!dateStr) return "—";
      var d = new Date(dateStr);
      if (isNaN(d)) return dateStr;
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    },
    toast: function (msg, type) {
      var t = document.createElement("div");
      t.className = "alert alert-" + (type || "info");
      t.style.cssText = "position:fixed;top:100px;right:22px;z-index:3000;max-width:360px;box-shadow:var(--shadow-lg);background:#fff;";
      t.innerHTML = (type === "success" ? ICONS.checkCircle : type === "error" ? ICONS.alert : ICONS.info) + "<span>" + msg + "</span>";
      document.body.appendChild(t);
      setTimeout(function () { t.style.transition = "opacity .4s"; t.style.opacity = "0"; }, 3200);
      setTimeout(function () { t.remove(); }, 3700);
    }
  };

  /* ---------- Dynamic script loader ---------- */
  function loadScript(src, cb) {
    var s = document.createElement("script");
    s.src = src;
    s.onload = function () { if (cb) cb(); };
    s.onerror = function () { if (cb) cb(); };
    document.head.appendChild(s);
  }

  /* ---------- Boot ---------- */
  function boot() {
    var isAdmin = document.body && document.body.classList.contains("admin-body");
    if (!isAdmin) {
      buildHeader();
      buildFooter();
      buildFloating();
    }
    initReveal();
    initCounters();
    initFAQ();
    initTabs();
    initFeatureBlocks();

    // Global Reach section on every public page + client logo helpers.
    if (!isAdmin) {
      loadScript("js/clients.js", function () {
        loadScript("js/global-reach.js", function () {
          if (window.ARK_initGlobalReach) window.ARK_initGlobalReach();
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
