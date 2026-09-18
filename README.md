# ARK Global Connect — Website

**Hire. Manage. Mobilise. Globally.**
Workforce. HR. Global Mobility. One Partner.

A premium, production-quality, multi-page marketing website and lightweight job platform for **ARK Global Connect**, a global recruitment, staffing, HR outsourcing and global mobility company.

Built with **HTML5, custom CSS and vanilla JavaScript (ES6+)** — no frameworks, no build step, no database. It deploys as a static site to **Vercel, Netlify, GitHub Pages, Cloudflare Pages** or any static host.

---

## 1. Quick Start

### Option A — Open directly
Because the site loads `data/jobs.json` via `fetch()`, most browsers block that over `file://`. Use a local server.

### Option B — Local server (recommended)
From the project root:

```bash
# Python 3
python3 -m http.server 8080

# or Node
npx serve .
```

Then open <http://localhost:8080/index.html>.

### Option C — Deploy
Drag the folder into Netlify Drop, or connect the repo to Vercel/Netlify. No build command is required; the publish directory is the project root.

---

## 2. Project Structure

```
/
├── index.html                  # Homepage (15+ sections)
├── hire-talent.html            # Flagship service page
├── permanent-recruitment.html
├── executive-search.html
├── staffing.html
├── rpo.html
├── remote-hr.html
├── global-recruitment.html
├── global-mobility.html
├── internships.html
├── jobs.html                   # Job platform with live filters
├── jobs-india.html             # Domestic roles
├── jobs-international.html     # International roles
├── job-detail.html             # Dynamic job page (?id=...)
├── candidates.html             # For Candidates + CV submission
├── industries.html             # 12 sectors (animated grid + filters)
├── global-reach.html           # Global Reach (Gulf / Europe / APAC / All)
├── about.html                  # Story, clients, leadership (Raghavendra Shetty)
├── insights.html               # Blog / insights
├── contact.html
├── legal.html                  # Privacy, Terms, Candidate, Employer, Fraud
├── admin.html                  # Admin console (login + dashboard)
├── thank-you.html
├── css/
│   └── style.css               # Full design system
├── js/
│   ├── config.js               # ← EDIT THIS: brand, contact, admin, EmailJS
│   ├── main.js                 # Header/footer injection, nav, reveal, counters
│   ├── jobs.js                 # Job store, filtering, card rendering
│   ├── job-detail.js           # Dynamic job page, SEO, JSON-LD, apply flow
│   ├── forms.js                # Validation, EmailJS, WhatsApp, file upload
│   ├── clients.js              # Client logo set (roller + about grid)
│   ├── global-reach.js         # Auto-injected Global Reach section (all pages)
│   └── admin.js                # Admin login, CRUD, import/export
├── data/
│   └── jobs.json               # 16 sample jobs (6 international, 10 domestic)
└── README.md
```

---

## 3. Configuration (single file)

Almost everything is controlled from **`js/config.js`**:

| Setting | Purpose |
|---|---|
| `SITE_NAME`, `TAGLINE`, `STATEMENT` | Brand copy |
| `COMPANY_EMAIL`, `HIRE_EMAIL` | Where enquiries are sent |
| `PHONE_DISPLAY`, `PHONE_TEL` | Phone links |
| `WHATSAPP_NUMBER` | Digits only, international format (e.g. `919000000000`) |
| `ADMIN_ID`, `ADMIN_PASSWORD` | Admin login (default `admin` / `ARK@2026`) |
| `EMAILJS_*` | Public EmailJS identifiers (see below) |
| `MAX_CV_MB`, `ALLOWED_CV_TYPES` | Upload rules |
| `SOCIAL` | Footer social links |

> **Security note:** This is a frontend-only project. Never place SMTP passwords or secret API keys in `js/config.js` — anything here is visible to visitors. Only *public* identifiers belong in frontend code.

---

## 4. Email Setup (EmailJS)

Forms work out of the box in **fallback mode**: submissions are captured locally and the user is offered a WhatsApp handoff. To send real emails:

1. Create a free account at <https://www.emailjs.com>.
2. Add an email service and a template.
3. Paste your **public key**, **service ID** and **template ID** into `js/config.js`.
4. Your template should accept variables such as `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`.

Once configured, `emailjsReady()` returns `true` and forms send automatically.

**CV attachments:** Browsers cannot attach files to an EmailJS request without a backend. The site is honest about this — after submitting, candidates are prompted to send their CV via WhatsApp. To support true file uploads, connect a backend (see §7).

---

## 5. Admin Console

Open `admin.html` and sign in with the credentials from `js/config.js` (default **admin / ARK@2026**).

Features:
- **Dashboard** — live stat cards (total, active, closed, domestic, international, drafts, applications) and recent jobs.
- **Manage Jobs** — search, edit, preview, duplicate, close, delete.
- **Add / Edit Job** — full job schema including responsibilities, requirements, skills, benefits, visa, accommodation, food, transport, and flags (featured / urgent / new).
- **Applications** — view submissions and move them through New → Screening → Shortlisted → Interview → Selected / Rejected.
- **Settings** — export jobs JSON, download a full backup, import jobs, restore a backup, reset data.

### How data is stored
Jobs and applications are saved in the browser's **LocalStorage** (`ark_jobs_v1`, `ark_applications_v1`). On first load, the site seeds LocalStorage from `data/jobs.json`.

**Important limitation:** LocalStorage is per-browser. Jobs you add in the admin panel appear on *your* device only — they will **not** automatically appear for every public visitor on a static host. To publish jobs globally, use **Export Jobs** and commit the JSON to `data/jobs.json`, or connect a backend (§7).

---

## 6. Adding or Editing Jobs

### Via the admin panel
Use **Add Job**, fill the form, and click **Publish Job**. Then **Export Jobs** to download the updated JSON.

### Via the JSON file
Edit `data/jobs.json` directly. Each job supports:

```json
{
  "id": "ark-hotel-manager-goa",
  "referenceId": "ARK-HOS-1001",
  "title": "Hotel Manager",
  "company": "ARK Client — Luxury Resort",
  "department": "Operations",
  "industry": "Hospitality & Tourism",
  "category": "Hospitality",
  "location": "Goa, India",
  "city": "Goa",
  "country": "India",
  "scope": "Domestic",
  "type": "Permanent",
  "jobType": "Full Time",
  "experience": "5-8 Years",
  "salary": "₹8-12 LPA",
  "description": "…",
  "responsibilities": ["…"],
  "requirements": ["…"],
  "skills": ["…"],
  "education": "…",
  "certifications": "…",
  "languages": "…",
  "benefits": ["…"],
  "accommodation": "…",
  "food": "…",
  "transportation": "…",
  "visa": "…",
  "employerDescription": "…",
  "contact": "careers@arkglobalconnect.com",
  "postedDate": "2026-01-02",
  "deadline": "2026-02-15",
  "status": "active",
  "featured": true,
  "urgent": false,
  "new": true
}
```

`scope` is auto-derived from `country` if omitted (`India` → Domestic, otherwise International).

---

## 7. Going to Production (optional backend)

The UI is backend-agnostic. To make jobs and applications truly global:

1. Stand up a REST API or a BaaS (Supabase, Firebase, Airtable, a Node/Express service).
2. Replace the `fetch`/LocalStorage logic in `js/jobs.js` (`Store.load`, `Store.save`) with API calls.
3. Replace the LocalStorage application store in `js/forms.js` / `js/admin.js` with API calls.
4. Add real authentication (server-side sessions or a provider) to replace the frontend admin login.

No UI changes are required — the components read from the same data shape.

---

## 8. SEO & Accessibility

- Semantic HTML5 landmarks, breadcrumbs, and descriptive headings.
- Per-page `<title>`, meta description, keywords, canonical and OpenGraph tags.
- **JSON-LD structured data**: `Organization`, `Service`, `JobPosting`, `ContactPage`, `Blog`, `AboutPage`.
- Job detail pages inject `JobPosting` schema dynamically for rich results.
- Keyboard-accessible navigation, focus styles, ARIA labels, and `alt` text.
- `prefers-reduced-motion` respected for animations.

---

## 9. Responsive & Performance

- Fluid layouts tested at **1440 / 1280 / 1024 / 768 / 480 / 390 / 375 px**.
- Mobile navigation drawer, responsive grids, and horizontally scrollable admin tables.
- No heavy dependencies — only Google Fonts (Playfair Display + Inter) and optional EmailJS (lazy-loaded).
- Scroll-reveal and counters use `IntersectionObserver` for efficiency.

---

## 10. Customisation Tips

- **Colours & type:** all design tokens live in `:root` at the top of `css/style.css`.
- **Navigation:** edit the `NAV` array in `js/main.js`.
- **Footer:** edit `buildFooter()` in `js/main.js`.
- **Icons:** the inline SVG set lives in the `ICONS` object in `js/main.js`; use `data-icon="name"` in HTML.
- **Images:** pages use Unsplash URLs. Replace with your own licensed imagery for production.

---

## 11. Sample Data Notice

Jobs in `data/jobs.json` are sample listings for the platform. Replace them with real vacancies before going live. The admin credentials and contact details are placeholders — update them in `js/config.js`.

---

## 12. Browser Support

Modern evergreen browsers: Chrome, Edge, Firefox, Safari (desktop and mobile). Requires JavaScript enabled (header, footer, jobs and forms are rendered client-side).

---

© ARK Global Connect. Frontend-only build.
