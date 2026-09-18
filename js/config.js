/* ============================================================
   ARK GLOBAL CONNECT — Global Configuration
   ------------------------------------------------------------
   Edit this single file to configure the whole website.
   NOTE: This is a frontend-only project. Never place private
   server credentials (SMTP passwords, secret API keys) here.
   Only public identifiers (EmailJS public key, WhatsApp number)
   belong in frontend code.
   ============================================================ */

window.ARK_CONFIG = {
  /* ---------- Brand ---------- */
  SITE_NAME: "ARK Global Connect",
  TAGLINE: "Hire. Manage. Mobilise. Globally.",
  STATEMENT: "Workforce. HR. Global Mobility. One Partner.",

  /* ---------- Contact ---------- */
  CONTACT_NAME: "Raghavendra Shetty",
  CONTACT_ROLE: "Director",
  COMPANY_EMAIL: "arkglobalhm@gmail.com",
  HIRE_EMAIL: "arkglobalhm@gmail.com",
  PHONE_DISPLAY: "+91 85913 52276",
  PHONE_TEL: "+918591352276",

  /* WhatsApp number in international format, digits only (no + or spaces) */
  WHATSAPP_NUMBER: "918591352276",

  /* ---------- Address ---------- */
  ADDRESS_LINE1: "Star Plaza, B 2104, Mahatma Gandhi Rd",
  ADDRESS_LINE2: "Opposite Sanjay Restaurant, above MM Mithaiwala",
  ADDRESS_LINE3: "Chinchpada, Borivali East, Mumbai, Maharashtra 400066",
  ADDRESS_FULL: "Star Plaza, B 2104, Mahatma Gandhi Rd, opposite Sanjay Restaurant, above MM Mithaiwala, Chinchpada, Borivali East, Mumbai, Maharashtra 400066",
  MAP_QUERY: "Star Plaza, Mahatma Gandhi Road, Borivali East, Mumbai 400066",

  /* ---------- Admin (frontend-only login) ----------
     WARNING: Client-side auth is NOT secure. This is a lightweight
     management interface only. Use a real backend for production. */
  ADMIN_ID: "admin",
  ADMIN_PASSWORD: "ARK@2026",

  /* ---------- EmailJS (public identifiers only) ----------
     Create a free account at https://www.emailjs.com and paste your
     public key, service id and template id below. Leave the placeholders
     untouched to run in fallback mode (email step is skipped gracefully). */
  EMAILJS_PUBLIC_KEY: "YOUR_EMAILJS_PUBLIC_KEY",
  EMAILJS_SERVICE_ID: "YOUR_EMAILJS_SERVICE_ID",
  EMAILJS_TEMPLATE_ID: "YOUR_EMAILJS_TEMPLATE_ID",

  /* ---------- Uploads ---------- */
  MAX_CV_MB: 5,
  ALLOWED_CV_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ],

  /* ---------- Data ---------- */
  JOBS_JSON: "data/jobs.json",
  STORAGE_KEYS: {
    JOBS: "ark_jobs_v1",
    APPLICATIONS: "ark_applications_v1",
    SESSION: "ark_admin_session_v1",
    SEEDED: "ark_seeded_v1"
  },

  /* ---------- Social ---------- */
  SOCIAL: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/"
  }
};

/* Helper: is EmailJS configured? */
window.ARK_CONFIG.emailjsReady = function () {
  var c = window.ARK_CONFIG;
  return (
    c.EMAILJS_PUBLIC_KEY &&
    c.EMAILJS_PUBLIC_KEY.indexOf("YOUR_") !== 0 &&
    c.EMAILJS_SERVICE_ID &&
    c.EMAILJS_SERVICE_ID.indexOf("YOUR_") !== 0 &&
    c.EMAILJS_TEMPLATE_ID &&
    c.EMAILJS_TEMPLATE_ID.indexOf("YOUR_") !== 0
  );
};
