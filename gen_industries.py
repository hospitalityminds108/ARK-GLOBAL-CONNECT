#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ARK Global Connect — Industry landing page generator.
Produces 12 SEO/AEO-optimised industry pages at project root,
matching the existing design system (css/style.css + js/main.js).
"""
import os, json, html

OUT = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- ICON KEYS
# (keys must exist in window.ARK_ICONS in js/main.js)
ICON = {
    "target": "target", "users": "users", "globe": "globe", "shield": "shield",
    "clock": "clock", "award": "award", "layers": "layers", "trending": "trending",
    "zap": "zap", "heart": "heart", "checkCircle": "checkCircle", "search": "search",
    "briefcase": "briefcase", "building": "building", "graduation": "graduation",
    "plane": "plane", "home": "home", "dollar": "dollar", "star": "star",
    "fileText": "fileText", "mapPin": "mapPin", "calendar": "calendar",
}

# ---------------------------------------------------------------- INDUSTRIES
INDUSTRIES = [
    {
        "slug": "hospitality-tourism",
        "name": "Hospitality & Tourism",
        "short": "Hospitality",
        "cat": "hospitality",
        "hero": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Luxury hotel lobby with staff welcoming international guests",
        "split": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Hotel front-desk team serving guests at a resort",
        "title": "Hospitality & Tourism Recruitment | Hotels, Resorts & F&B Hiring | ARK Global Connect",
        "desc": "Hospitality recruitment specialists for hotels, resorts, restaurants and travel operators. We hire chefs, front-office, F&B, housekeeping and management talent across India and the Gulf.",
        "keywords": "hospitality recruitment, hotel recruitment, resort staffing, chef recruitment, F&B hiring, tourism jobs, hospitality staffing agency, Gulf hospitality jobs",
        "eyebrow": "Hospitality & Tourism Recruitment",
        "h1": "Hospitality Talent That<br>Delivers Five-Star Service.",
        "lead": "In hospitality, the difference between a good stay and an unforgettable one is the people. ARK Global Connect recruits chefs, front-office, food & beverage, housekeeping and management professionals for hotels, resorts, restaurants and travel businesses across India and international markets.",
        "introH2": "Hiring for Hospitality Is a People Business.",
        "introLead": "Hospitality runs on warmth, pace and precision. A great hire lifts guest satisfaction, reviews and revenue \u2014 a poor one shows up in every interaction.",
        "introBody": "We understand the rhythm of hotels and restaurants: seasonal peaks, opening teams, pre-opening mobilisation and the constant need for reliable, well-presented staff. Our consultants have placed front-of-house and back-of-house talent across luxury resorts, restaurant groups and travel operators, and we know exactly what a strong hospitality CV looks like.",
        "tags": ["Hotels & Resorts", "Restaurants & QSR", "Front Office", "F&B Service", "Kitchen & Culinary", "Housekeeping", "Travel & Tourism"],
        "roles": [
            ("Hotel General Manager", "Full P&L ownership of a property, from revenue and guest experience to team leadership."),
            ("Executive & Sous Chef", "Menu development, kitchen leadership and consistent food quality at volume."),
            ("Front Office Manager", "Reception, reservations, guest relations and check-in/check-out excellence."),
            ("F&B Service Manager", "Restaurant and banquet operations, upselling and service standards."),
            ("Housekeeping Manager", "Room standards, laundry, hygiene and team scheduling."),
            ("Restaurant Manager", "Day-to-day restaurant operations, staffing, cost control and guest recovery."),
            ("Barista & Bartender", "Specialty coffee, cocktails and high-volume beverage service."),
            ("Guest Relations Executive", "VIP handling, complaint resolution and loyalty building."),
            ("Spa & Wellness Therapist", "Treatments, retail and guest wellbeing experiences."),
            ("Travel & Tour Coordinator", "Itineraries, bookings and on-ground guest support."),
        ],
        "process": [
            ("Understand the Property", "We learn your concept, service standards, guest profile and the exact shift patterns and skills the role demands."),
            ("Source Hospitality Talent", "We tap our hospitality network, hotel-school alumni and international talent pools to reach both active and passive candidates."),
            ("Assess Service Aptitude", "Beyond skills, we screen for presentation, communication, attitude and the genuine warmth that hospitality guests notice."),
            ("Shortlist & Present", "You receive a concise shortlist with our assessment notes, references and a clear recommendation."),
            ("Coordinate Interviews", "We schedule trials, tastings and interviews, and manage candidate communication end to end."),
            ("Offer & Onboard", "We support offer negotiation, documentation and joining \u2014 including visa and mobilisation for international roles."),
        ],
        "why": [
            ("Sector Fluency", "We know the difference between a caf\u00e9 and a fine-dining kitchen \u2014 and we hire accordingly.", "target"),
            ("International Reach", "Strong pipelines from India to the Gulf, Maldives and beyond for hospitality employers.", "globe"),
            ("Volume & Niche", "From a single executive chef to a full pre-opening team of 80, we scale to your need.", "layers"),
            ("Speed for Openings", "Pre-opening timelines are unforgiving. We mobilise fast without lowering standards.", "clock"),
            ("Presentation Matters", "We screen for grooming, communication and guest-facing polish, not just experience.", "star"),
            ("Retention Focus", "We match candidates to culture and shift realities so your team stays.", "heart"),
        ],
        "stats": [("12", "+", "Hospitality Roles"), ("10", "+", "Countries"), ("48", "hr", "Shortlist Turnaround"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit for hotels and resorts?", "We combine a specialist hospitality network, hotel-school alumni pipelines and international talent pools with structured screening for service aptitude. For each role we agree the brief, source and assess candidates, then present a documented shortlist with our recommendation."),
            ("Can you hire a full pre-opening team?", "Yes. Pre-opening mobilisation is one of our strengths. We can build complete teams \u2014 from general manager and department heads to front-office, F&B, kitchen and housekeeping \u2014 on a coordinated timeline so your property opens fully staffed."),
            ("Do you recruit hospitality staff for the Gulf and Maldives?", "Absolutely. We place hospitality professionals from India with employers across the UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait and the Maldives, with full documentation, visa and mobilisation support."),
            ("What hospitality roles do you cover?", "We recruit across the full spectrum: hotel and resort management, executive and sous chefs, front office, F&B service, housekeeping, spa and wellness, restaurant management, baristas and bartenders, guest relations and travel coordination."),
            ("Do you charge candidates for hospitality placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation \u2014 and we actively warn against agencies that do."),
        ],
        "related": ["restaurants-qsr", "retail-ecommerce", "facilities-administration"],
    },
    {
        "slug": "it-technology",
        "name": "IT & Technology",
        "short": "IT & Technology",
        "cat": "tech",
        "hero": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Software engineers collaborating on code in a modern technology office",
        "split": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Technology team working together on a digital product",
        "title": "IT & Technology Recruitment | Software, Data & Cloud Hiring | ARK Global Connect",
        "desc": "Technology recruitment for software engineers, data, cloud, DevOps, cybersecurity and IT support. ARK Global Connect hires technical talent across India and global markets, fast and accurately.",
        "keywords": "IT recruitment, technology recruitment, software engineer hiring, developer recruitment, data scientist jobs, cloud engineer, DevOps recruitment, cybersecurity hiring, tech staffing agency",
        "eyebrow": "IT & Technology Recruitment",
        "h1": "Engineering Teams<br>Built to Ship.",
        "lead": "Great technology companies are built by great engineers. ARK Global Connect recruits software developers, data specialists, cloud and DevOps engineers, cybersecurity professionals and IT support talent for product companies, startups, agencies and enterprises across India and international markets.",
        "introH2": "Technical Hiring Demands Technical Understanding.",
        "introLead": "You cannot screen a backend engineer with a generic checklist. Technology hiring needs consultants who understand stacks, systems and what separates a strong engineer from a keyword match.",
        "introBody": "We work with founders, CTOs and hiring managers to define the real technical bar, then source and assess candidates against it. Whether you are scaling a product team, filling a niche infrastructure role or building an offshore capability, we bring a structured, fast and honest approach to technical recruitment.",
        "tags": ["Software Engineering", "Data & AI", "Cloud & DevOps", "Cybersecurity", "QA & Testing", "IT Support", "Product & Design"],
        "roles": [
            ("Full-Stack Developer", "End-to-end web application development across front-end and back-end."),
            ("Backend Engineer", "APIs, services, databases and scalable server-side systems."),
            ("Frontend Engineer", "Modern UI development with React, Vue or Angular."),
            ("Mobile Developer", "iOS, Android and cross-platform application development."),
            ("Data Scientist", "Modelling, experimentation and machine-learning solutions."),
            ("Data Engineer", "Pipelines, warehousing and data infrastructure at scale."),
            ("DevOps Engineer", "CI/CD, automation, cloud infrastructure and reliability."),
            ("Cloud Architect", "Design and governance of cloud-native architectures."),
            ("Cybersecurity Analyst", "Threat detection, security operations and risk management."),
            ("QA Engineer", "Manual and automated testing, quality and release confidence."),
            ("IT Support Engineer", "End-user support, systems administration and troubleshooting."),
            ("Product Manager", "Roadmap, discovery and delivery of digital products."),
        ],
        "process": [
            ("Define the Technical Bar", "We agree the stack, seniority, must-have skills and the outcomes the hire must deliver."),
            ("Source Technical Talent", "We search our developer network, communities and talent pools to reach active and passive engineers."),
            ("Assess Skills & Fit", "Structured technical screening, portfolio and code review, plus motivation and culture alignment."),
            ("Present a Shortlist", "A concise, documented shortlist with our technical assessment and a clear recommendation."),
            ("Coordinate the Process", "We manage interviews, technical rounds and candidate communication to keep momentum."),
            ("Close & Onboard", "We support offer negotiation, counter-offers and a smooth start for the new engineer."),
        ],
        "why": [
            ("Technically Literate", "Our consultants understand stacks and systems, so briefs and shortlists are accurate.", "target"),
            ("Passive Talent Access", "Most strong engineers are not applying. We reach them directly.", "search"),
            ("Speed Without Compromise", "Warm talent pools mean faster shortlists without lowering the technical bar.", "clock"),
            ("Global Capability", "Hire locally or source from India for international technology teams.", "globe"),
            ("Startup to Enterprise", "From a first engineer to a 50-person engineering function.", "layers"),
            ("Honest Feedback", "Clear, candid assessment \u2014 so you spend interview time on real contenders.", "shield"),
        ],
        "stats": [("12", "+", "Tech Roles"), ("7", "days", "Avg. First Shortlist"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit software engineers?", "We start with a detailed technical brief, then source candidates through our developer network, communities and talent pools. Every candidate is screened for skills, portfolio and motivation before we present a documented shortlist with our assessment."),
            ("Can you help a startup hire its first engineers?", "Yes. We regularly help founders and CTOs build early engineering teams. We can define roles, benchmark salaries and run a fast, focused search for the first few critical hires."),
            ("Do you recruit for niche or senior technical roles?", "Specialist and senior roles are where we add the most value. We map the market, approach passive candidates directly and assess against a clearly defined technical bar."),
            ("Do you offer contract or contract-to-hire technology staffing?", "Yes. Alongside permanent hiring we support contract, contract-to-hire and project-based technology staffing that flexes with your roadmap."),
            ("Can you source technology talent from India for international companies?", "Absolutely. We place Indian technology professionals with employers across the Gulf, Europe and Asia Pacific, with documentation and relocation support where required."),
        ],
        "related": ["bfsi", "sales-marketing", "education-training"],
    },
    {
        "slug": "retail-ecommerce",
        "name": "Retail & E-commerce",
        "short": "Retail",
        "cat": "retail",
        "hero": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Bright modern retail store with staff assisting shoppers",
        "split": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Retail team managing store operations and merchandising",
        "title": "Retail & E-commerce Recruitment | Store, Merchandising & Category Hiring | ARK Global Connect",
        "desc": "Retail and e-commerce recruitment for store managers, merchandisers, category managers, buyers and supply-chain talent. ARK Global Connect hires retail teams across India and the Gulf.",
        "keywords": "retail recruitment, e-commerce hiring, store manager jobs, merchandising recruitment, category manager, retail staffing agency, mall recruitment, buyer jobs",
        "eyebrow": "Retail & E-commerce Recruitment",
        "h1": "Retail Teams That<br>Convert Footfall to Loyalty.",
        "lead": "Retail and e-commerce live or die on the shop floor and the fulfilment line. ARK Global Connect recruits store managers, merchandisers, category and buying specialists, visual merchandisers and supply-chain talent for retailers, malls, brands and online businesses across India and international markets.",
        "introH2": "Retail Hiring Is About Pace, People and Numbers.",
        "introLead": "A strong retail hire drives sales, reduces shrinkage and keeps customers coming back. A weak one costs you margin and reputation \u2014 fast.",
        "introBody": "We understand retail's realities: seasonal peaks, store openings, high-attrition roles and the need for staff who are reliable, presentable and commercially aware. From flagship store leadership to warehouse and last-mile operations, we help retailers and e-commerce businesses build teams that perform under pressure.",
        "tags": ["Store Operations", "Merchandising", "Category & Buying", "Visual Merchandising", "E-commerce Ops", "Warehouse & Fulfilment", "Customer Service"],
        "roles": [
            ("Store Manager", "Full store P&L, team leadership, stock and customer experience."),
            ("Area / Regional Manager", "Multi-store performance, standards and people leadership."),
            ("Merchandiser", "Range planning, stock allocation and sell-through optimisation."),
            ("Category Manager", "Assortment, pricing and supplier strategy for a category."),
            ("Buyer", "Sourcing, negotiation and margin management."),
            ("Visual Merchandiser", "In-store displays that drive footfall and conversion."),
            ("E-commerce Operations Manager", "Online store operations, fulfilment and marketplace management."),
            ("Warehouse Supervisor", "Inbound, picking, packing and dispatch performance."),
            ("Customer Service Executive", "Front-line support across store and online channels."),
            ("Retail Sales Associate", "Product knowledge, upselling and customer service."),
        ],
        "process": [
            ("Understand the Format", "We learn your format, footfall, product mix and the commercial outcomes the role must deliver."),
            ("Source Retail Talent", "We tap our retail network, mall ecosystems and e-commerce talent pools to reach the right candidates."),
            ("Assess Commercial Fit", "We screen for sales aptitude, reliability, presentation and the ability to perform in peak periods."),
            ("Shortlist & Present", "A concise shortlist with our assessment notes and a clear recommendation for each candidate."),
            ("Coordinate Interviews", "We schedule interviews and manage candidate communication to keep hiring on track."),
            ("Offer & Onboard", "We support offer negotiation and joining, including mobilisation for international retail roles."),
        ],
        "why": [
            ("Retail Fluency", "We know the difference between luxury, mass and value retail \u2014 and hire accordingly.", "target"),
            ("Volume Capability", "From a single store manager to a full store-opening team, we scale.", "layers"),
            ("Peak-Season Ready", "We help you staff up for festive and sale peaks without panic hiring.", "clock"),
            ("Gulf & International", "Strong pipelines for retail and mall operations across the GCC.", "globe"),
            ("Low-Attrition Focus", "We match candidates to shift patterns and culture to improve retention.", "heart"),
            ("Commercial Mindset", "We screen for sales and margin awareness, not just experience.", "trending"),
        ],
        "stats": [("10", "+", "Retail Roles"), ("48", "hr", "Shortlist Turnaround"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit for retail stores and malls?", "We combine a specialist retail network with structured screening for sales aptitude, reliability and presentation. For each role we agree the brief, source candidates and present a documented shortlist with our recommendation."),
            ("Can you staff a new store opening?", "Yes. Store-opening mobilisation is a core strength. We can build complete teams \u2014 from store manager and supervisors to sales associates and back-of-house \u2014 on a coordinated timeline."),
            ("Do you recruit for e-commerce and warehouse operations?", "Absolutely. We hire e-commerce operations managers, fulfilment and warehouse supervisors, and last-mile and supply-chain talent alongside traditional retail roles."),
            ("Do you place retail staff in the Gulf?", "Yes. We place retail and mall operations professionals from India with employers across the UAE, Saudi Arabia, Qatar and Oman, with full documentation and mobilisation support."),
            ("Do you charge candidates for retail placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["hospitality-tourism", "logistics-supply-chain", "sales-marketing"],
    },
    {
        "slug": "bfsi",
        "name": "BFSI",
        "short": "BFSI",
        "cat": "bfsi",
        "hero": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Financial services professionals reviewing reports in a modern office",
        "split": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Banking and finance team analysing financial data",
        "title": "BFSI Recruitment | Banking, Financial Services & Insurance Hiring | ARK Global Connect",
        "desc": "BFSI recruitment for banking, financial services and insurance. ARK Global Connect hires relationship managers, credit, risk, compliance, wealth and insurance talent across India and the Gulf.",
        "keywords": "BFSI recruitment, banking jobs, financial services hiring, insurance recruitment, relationship manager jobs, credit analyst, risk and compliance recruitment, wealth management hiring",
        "eyebrow": "BFSI Recruitment",
        "h1": "Financial Talent<br>You Can Bank On.",
        "lead": "In banking, financial services and insurance, trust is everything \u2014 and it starts with the people you hire. ARK Global Connect recruits relationship managers, credit and risk specialists, compliance officers, wealth advisors and insurance professionals for banks, NBFCs, fintechs and insurers across India and international markets.",
        "introH2": "BFSI Hiring Rewards Precision.",
        "introLead": "Regulated, relationship-driven and numbers-led, BFSI roles demand candidates who combine technical competence with integrity and commercial instinct.",
        "introBody": "We understand the BFSI landscape: the difference between retail and corporate banking, the compliance weight of a risk role, and the sales discipline a relationship manager needs. Our consultants screen for regulatory awareness, track record and the trustworthiness that financial employers cannot compromise on.",
        "tags": ["Retail Banking", "Corporate Banking", "Credit & Risk", "Compliance", "Wealth Management", "Insurance", "Fintech"],
        "roles": [
            ("Relationship Manager", "Client acquisition, portfolio growth and cross-sell across banking products."),
            ("Branch Manager", "Branch P&L, team leadership and customer service standards."),
            ("Credit Analyst", "Credit appraisal, underwriting and portfolio risk assessment."),
            ("Risk Manager", "Enterprise and credit risk frameworks, monitoring and mitigation."),
            ("Compliance Officer", "Regulatory adherence, audits and policy implementation."),
            ("Wealth Manager", "Investment advisory, portfolio management and HNI relationships."),
            ("Insurance Sales Manager", "Agency and channel sales, targets and team building."),
            ("Operations Manager", "Back-office processing, settlements and service delivery."),
            ("Treasury Analyst", "Liquidity, funding and market risk support."),
            ("Financial Controller", "Reporting, controls and financial governance."),
        ],
        "process": [
            ("Understand the Mandate", "We learn the product, portfolio, regulatory context and the exact competencies the role requires."),
            ("Source BFSI Talent", "We tap our banking, insurance and fintech networks to reach active and passive professionals."),
            ("Assess Competence & Integrity", "Structured screening for technical skill, track record, regulatory awareness and trustworthiness."),
            ("Shortlist & Present", "A documented shortlist with our assessment notes and a clear recommendation."),
            ("Coordinate Interviews", "We manage interviews and candidate communication with discretion and speed."),
            ("Offer & Onboard", "We support offer negotiation, notice periods and a compliant, smooth joining."),
        ],
        "why": [
            ("Regulatory Awareness", "We understand the compliance weight of BFSI roles and screen accordingly.", "shield"),
            ("Discretion", "Sensitive and confidential searches handled with complete discretion.", "target"),
            ("Track-Record Focus", "We verify performance and integrity, not just titles.", "award"),
            ("Gulf & International", "Strong pipelines for banking and insurance talent across the GCC.", "globe"),
            ("Speed & Precision", "Efficient processes that respect the pace of financial hiring.", "clock"),
            ("Relationship Depth", "A single consultant owns your mandate end to end.", "users"),
        ],
        "stats": [("10", "+", "BFSI Roles"), ("7", "days", "Avg. First Shortlist"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit for banking and financial services?", "We start with a detailed mandate brief, then source candidates through our BFSI network. Every candidate is screened for technical competence, track record, regulatory awareness and integrity before we present a documented shortlist."),
            ("Do you handle confidential or replacement searches?", "Yes. We regularly run discreet searches for sensitive or replacement roles in banking and insurance. All communication is handled with strict confidentiality."),
            ("Can you recruit for fintech companies?", "Absolutely. We hire across fintech \u2014 from product and risk to compliance and relationship roles \u2014 for startups and established players alike."),
            ("Do you place BFSI professionals in the Gulf?", "Yes. We place banking, insurance and financial services professionals from India with employers across the UAE, Saudi Arabia, Qatar and Oman, with documentation and mobilisation support."),
            ("Do you charge candidates for BFSI placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["it-technology", "real-estate-construction", "sales-marketing"],
    },
    {
        "slug": "real-estate-construction",
        "name": "Real Estate & Construction",
        "short": "Real Estate",
        "cat": "realestate",
        "hero": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Modern high-rise buildings under construction in a city skyline",
        "split": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Construction engineers reviewing project plans on site",
        "title": "Real Estate & Construction Recruitment | Property, Project & Site Hiring | ARK Global Connect",
        "desc": "Real estate and construction recruitment for sales, project management, engineering and site leadership. ARK Global Connect hires property and construction talent across India and the Gulf.",
        "keywords": "real estate recruitment, construction recruitment, property sales jobs, project manager construction, civil engineer jobs, site engineer, real estate staffing agency, Gulf construction jobs",
        "eyebrow": "Real Estate & Construction Recruitment",
        "h1": "Building Teams That<br>Build Landmarks.",
        "lead": "Real estate and construction projects succeed on the strength of their people \u2014 from the sales team that fills a tower to the engineers who deliver it on time. ARK Global Connect recruits property sales professionals, project managers, civil and MEP engineers and site leadership for developers, contractors and consultancies across India and international markets.",
        "introH2": "Projects Are Won and Lost on People.",
        "introLead": "A delayed project or a slow sales pipeline is rarely a materials problem \u2014 it is a people problem. The right hires protect timelines, budgets and margins.",
        "introBody": "We understand the construction and real estate lifecycle: land, approvals, execution, handover and sales. Our consultants know the difference between a site engineer and a planning engineer, and between a broker and a genuine property sales professional. We help developers and contractors build teams that deliver.",
        "tags": ["Property Sales", "Project Management", "Civil Engineering", "MEP", "Site Supervision", "Quantity Surveying", "Facilities"],
        "roles": [
            ("Project Manager", "End-to-end delivery of construction projects on time and budget."),
            ("Site Engineer", "Day-to-day site execution, quality and coordination."),
            ("Civil Engineer", "Structural design, drawings and construction supervision."),
            ("MEP Engineer", "Mechanical, electrical and plumbing systems design and delivery."),
            ("Quantity Surveyor", "Cost estimation, BOQs and commercial control."),
            ("Planning Engineer", "Schedules, progress tracking and resource planning."),
            ("Property Sales Manager", "Sales strategy, team leadership and revenue targets."),
            ("Real Estate Sales Executive", "Lead conversion, site visits and deal closure."),
            ("Project Architect", "Design development and coordination with consultants."),
            ("HSE Officer", "Health, safety and environment compliance on site."),
        ],
        "process": [
            ("Understand the Project", "We learn the project type, stage, technical requirements and the outcomes the role must deliver."),
            ("Source Industry Talent", "We tap our construction and real estate networks to reach active and passive professionals."),
            ("Assess Technical Fit", "Structured screening for technical competence, project experience and site readiness."),
            ("Shortlist & Present", "A documented shortlist with our assessment notes and a clear recommendation."),
            ("Coordinate Interviews", "We manage interviews and candidate communication to keep projects moving."),
            ("Offer & Onboard", "We support offer negotiation and joining, including mobilisation for international projects."),
        ],
        "why": [
            ("Project Fluency", "We understand construction stages and the roles each one demands.", "target"),
            ("Technical Screening", "We assess real project experience, not just job titles.", "award"),
            ("Gulf Strength", "Deep pipelines for construction and real estate talent across the GCC.", "globe"),
            ("Volume & Niche", "From a single project director to a full site team, we scale.", "layers"),
            ("Speed for Deadlines", "We mobilise fast to protect project timelines.", "clock"),
            ("Compliance Support", "Documentation, attestation and mobilisation coordinated end to end.", "shield"),
        ],
        "stats": [("10", "+", "Roles Covered"), ("7", "days", "Avg. First Shortlist"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit for construction and real estate?", "We start with a detailed project and role brief, then source candidates through our construction and property networks. Every candidate is screened for technical competence and relevant project experience before we present a documented shortlist."),
            ("Can you staff a full project team?", "Yes. We can build complete project teams \u2014 from project director and planning engineers to site engineers, MEP specialists and HSE officers \u2014 on a coordinated timeline."),
            ("Do you recruit property sales teams?", "Absolutely. We hire property sales managers and executives for developers, brokerages and real estate firms, screening for conversion ability and market knowledge."),
            ("Do you place construction talent in the Gulf?", "Yes. We place civil, MEP and project professionals from India with contractors and developers across the UAE, Saudi Arabia, Qatar and Oman, with full documentation and mobilisation support."),
            ("Do you charge candidates for placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["manufacturing-engineering", "facilities-administration", "bfsi"],
    },
    {
        "slug": "healthcare-wellness",
        "name": "Healthcare & Wellness",
        "short": "Healthcare",
        "cat": "healthcare",
        "hero": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Healthcare professionals caring for patients in a modern hospital",
        "split": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Medical team collaborating in a clinical setting",
        "title": "Healthcare & Wellness Recruitment | Clinical & Medical Staffing | ARK Global Connect",
        "desc": "Healthcare and wellness recruitment for doctors, nurses, allied health, clinical and administrative staff. ARK Global Connect hires medical talent across India and international markets.",
        "keywords": "healthcare recruitment, medical staffing, nurse recruitment, doctor jobs, allied health hiring, hospital staffing agency, clinical recruitment, wellness jobs",
        "eyebrow": "Healthcare & Wellness Recruitment",
        "h1": "Care Teams That<br>Put Patients First.",
        "lead": "Healthcare is a vocation as much as a career. ARK Global Connect recruits doctors, nurses, allied-health professionals, clinical and administrative staff for hospitals, clinics, diagnostic centres and wellness businesses across India and international markets \u2014 with the diligence that patient care demands.",
        "introH2": "In Healthcare, Competence and Compassion Both Matter.",
        "introLead": "A clinical hire must be technically sound, credential-verified and genuinely caring. There is no room for shortcuts.",
        "introBody": "We understand healthcare's demands: registration and credential requirements, shift realities, specialisation and the empathy that defines great care. Our consultants screen rigorously for qualifications, experience and the human qualities that patients and colleagues notice.",
        "tags": ["Nursing", "Medical Practitioners", "Allied Health", "Diagnostics", "Clinical Administration", "Wellness & Spa", "Pharmacy"],
        "roles": [
            ("Staff Nurse", "Patient care, medication and clinical support across departments."),
            ("Nursing Supervisor", "Team leadership, rosters and clinical standards."),
            ("General Physician", "Diagnosis, treatment and patient management."),
            ("Specialist Consultant", "Specialised clinical expertise and patient care."),
            ("Physiotherapist", "Rehabilitation, mobility and recovery programmes."),
            ("Radiographer", "Imaging, diagnostics and patient safety."),
            ("Medical Lab Technician", "Sample processing, testing and quality control."),
            ("Hospital Administrator", "Operations, compliance and service delivery."),
            ("Pharmacist", "Dispensing, inventory and patient guidance."),
            ("Wellness Therapist", "Spa, holistic and wellbeing treatments."),
        ],
        "process": [
            ("Understand the Setting", "We learn the facility, department, specialisation and the exact credentials the role requires."),
            ("Source Clinical Talent", "We tap our healthcare network and talent pools to reach qualified professionals."),
            ("Verify & Assess", "We screen for qualifications, registration, experience and the compassion that care demands."),
            ("Shortlist & Present", "A documented shortlist with our assessment notes and a clear recommendation."),
            ("Coordinate Interviews", "We manage interviews and candidate communication with sensitivity and speed."),
            ("Offer & Onboard", "We support offer negotiation, credentialing and joining, including international mobilisation."),
        ],
        "why": [
            ("Credential Rigour", "We verify qualifications and registration \u2014 no shortcuts in clinical hiring.", "shield"),
            ("Compassion Screening", "We assess the human qualities that define great care.", "heart"),
            ("International Pathways", "Strong pipelines for healthcare talent across the Gulf and Europe.", "globe"),
            ("Shift-Reality Fit", "We match candidates to rosters and settings so they stay.", "clock"),
            ("Specialist Reach", "From nursing to allied health, we cover the clinical spectrum.", "target"),
            ("Ethical Practice", "Transparent, ethical recruitment \u2014 always.", "award"),
        ],
        "stats": [("10", "+", "Clinical Roles"), ("7", "days", "Avg. First Shortlist"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit healthcare professionals?", "We start with a detailed clinical brief, then source candidates through our healthcare network. Every candidate is screened for qualifications, registration, experience and suitability before we present a documented shortlist."),
            ("Do you verify medical credentials?", "Yes. Credential and registration verification is central to our clinical screening. We confirm qualifications and experience so employers can hire with confidence."),
            ("Can you recruit nurses for international hospitals?", "Absolutely. We place nurses and allied-health professionals from India with hospitals across the Gulf and Europe, with full documentation, credentialing and mobilisation support."),
            ("Do you recruit for wellness and spa businesses?", "Yes. Alongside clinical roles we hire wellness therapists, spa professionals and holistic practitioners for resorts, clinics and wellness centres."),
            ("Do you charge candidates for healthcare placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["hospitality-tourism", "education-training", "facilities-administration"],
    },
    {
        "slug": "logistics-supply-chain",
        "name": "Logistics & Supply Chain",
        "short": "Logistics",
        "cat": "logistics",
        "hero": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Warehouse operations with forklifts and logistics staff",
        "split": "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Supply chain team coordinating warehouse and distribution",
        "title": "Logistics & Supply Chain Recruitment | Warehouse & Distribution Hiring | ARK Global Connect",
        "desc": "Logistics and supply chain recruitment for warehouse, distribution, fleet, procurement and operations talent. ARK Global Connect hires logistics professionals across India and the Gulf.",
        "keywords": "logistics recruitment, supply chain hiring, warehouse manager jobs, distribution recruitment, procurement jobs, fleet management, logistics staffing agency",
        "eyebrow": "Logistics & Supply Chain Recruitment",
        "h1": "Supply Chains<br>Powered by People.",
        "lead": "Every on-time delivery is a people achievement. ARK Global Connect recruits warehouse and distribution managers, procurement specialists, fleet and transport professionals and supply-chain analysts for logistics companies, retailers, manufacturers and 3PLs across India and international markets.",
        "introH2": "Logistics Runs on Reliability.",
        "introLead": "In logistics, a single unreliable hire can break a delivery promise. Reliability, pace and process discipline are non-negotiable.",
        "introBody": "We understand the logistics landscape: warehousing, distribution, last-mile, freight and procurement. Our consultants know the difference between a warehouse supervisor and an operations manager, and we screen for the process discipline and stamina that high-volume operations demand.",
        "tags": ["Warehousing", "Distribution", "Procurement", "Fleet & Transport", "Last-Mile", "Freight & 3PL", "Supply Chain Planning"],
        "roles": [
            ("Warehouse Manager", "Inbound, storage, picking and dispatch performance."),
            ("Distribution Manager", "Network, routing and delivery performance."),
            ("Supply Chain Manager", "End-to-end planning, sourcing and logistics strategy."),
            ("Procurement Specialist", "Sourcing, negotiation and supplier management."),
            ("Fleet Manager", "Vehicle utilisation, maintenance and driver management."),
            ("Logistics Coordinator", "Shipments, documentation and carrier coordination."),
            ("Inventory Controller", "Stock accuracy, cycle counts and reconciliation."),
            ("Last-Mile Operations Lead", "Delivery network, riders and customer experience."),
            ("Freight Forwarding Executive", "Customs, documentation and international freight."),
            ("Operations Supervisor", "Shift leadership and process compliance."),
        ],
        "process": [
            ("Understand the Operation", "We learn your network, volumes, shift patterns and the outcomes the role must deliver."),
            ("Source Logistics Talent", "We tap our logistics and supply-chain networks to reach active and passive professionals."),
            ("Assess Process Fit", "Structured screening for operational discipline, reliability and volume experience."),
            ("Shortlist & Present", "A documented shortlist with our assessment notes and a clear recommendation."),
            ("Coordinate Interviews", "We manage interviews and candidate communication to keep operations covered."),
            ("Offer & Onboard", "We support offer negotiation and joining, including mobilisation for international roles."),
        ],
        "why": [
            ("Operational Fluency", "We understand warehousing, distribution and procurement roles in depth.", "target"),
            ("Volume Capability", "From a single manager to a full shift team, we scale to your need.", "layers"),
            ("Reliability Screening", "We assess the process discipline that logistics demands.", "shield"),
            ("Gulf & International", "Strong pipelines for logistics talent across the GCC.", "globe"),
            ("Speed for Peaks", "We help you staff up for seasonal and festive peaks.", "clock"),
            ("Retention Focus", "We match candidates to shift realities to reduce churn.", "heart"),
        ],
        "stats": [("10", "+", "Roles Covered"), ("48", "hr", "Shortlist Turnaround"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit for logistics and supply chain?", "We start with a detailed operational brief, then source candidates through our logistics network. Every candidate is screened for process discipline, reliability and relevant volume experience before we present a documented shortlist."),
            ("Can you staff a new warehouse or distribution centre?", "Yes. We can build complete teams \u2014 from warehouse and distribution managers to supervisors, inventory controllers and shift staff \u2014 on a coordinated timeline."),
            ("Do you recruit for procurement and freight forwarding?", "Absolutely. We hire procurement specialists, supply-chain managers and freight-forwarding professionals alongside warehouse and transport roles."),
            ("Do you place logistics talent in the Gulf?", "Yes. We place logistics and supply-chain professionals from India with employers across the UAE, Saudi Arabia, Qatar and Oman, with documentation and mobilisation support."),
            ("Do you charge candidates for logistics placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["retail-ecommerce", "manufacturing-engineering", "facilities-administration"],
    },
    {
        "slug": "manufacturing-engineering",
        "name": "Manufacturing & Engineering",
        "short": "Manufacturing",
        "cat": "manufacturing",
        "hero": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Engineers operating machinery on a modern manufacturing floor",
        "split": "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Production team working on an industrial manufacturing line",
        "title": "Manufacturing & Engineering Recruitment | Production & Plant Hiring | ARK Global Connect",
        "desc": "Manufacturing and engineering recruitment for production, quality, maintenance and plant leadership. ARK Global Connect hires industrial talent across India and the Gulf.",
        "keywords": "manufacturing recruitment, engineering jobs, production manager, quality engineer, maintenance engineer, plant manager, industrial staffing agency, Gulf engineering jobs",
        "eyebrow": "Manufacturing & Engineering Recruitment",
        "h1": "Industrial Teams<br>Built for Precision.",
        "lead": "Manufacturing rewards precision, safety and uptime. ARK Global Connect recruits production, quality, maintenance and plant leadership talent for manufacturers, engineering firms and industrial businesses across India and international markets.",
        "introH2": "On the Factory Floor, Skill Shows.",
        "introLead": "A skilled production or maintenance hire protects output, quality and safety. A weak one shows up in downtime, defects and accidents.",
        "introBody": "We understand industrial environments: production lines, quality systems, maintenance regimes and lean operations. Our consultants know the difference between a production supervisor and a plant manager, and we screen for the technical depth and safety mindset that manufacturing demands.",
        "tags": ["Production", "Quality", "Maintenance", "Plant Leadership", "Mechanical", "Electrical", "Lean & Process"],
        "roles": [
            ("Production Manager", "Output, efficiency and team leadership on the line."),
            ("Plant Manager", "Full plant P&L, safety, quality and delivery."),
            ("Quality Engineer", "Quality systems, audits and continuous improvement."),
            ("Maintenance Engineer", "Preventive and breakdown maintenance, uptime."),
            ("Mechanical Engineer", "Design, installation and mechanical systems."),
            ("Electrical Engineer", "Power, controls and electrical systems."),
            ("Production Supervisor", "Shift leadership, targets and process compliance."),
            ("Process Engineer", "Process design, optimisation and lean initiatives."),
            ("HSE Officer", "Health, safety and environment compliance."),
            ("CNC Machinist", "Precision machining and quality output."),
        ],
        "process": [
            ("Understand the Plant", "We learn your process, equipment, shift patterns and the technical outcomes the role must deliver."),
            ("Source Industrial Talent", "We tap our manufacturing and engineering networks to reach active and passive professionals."),
            ("Assess Technical Depth", "Structured screening for technical competence, safety awareness and relevant plant experience."),
            ("Shortlist & Present", "A documented shortlist with our assessment notes and a clear recommendation."),
            ("Coordinate Interviews", "We manage interviews and candidate communication to keep production covered."),
            ("Offer & Onboard", "We support offer negotiation and joining, including mobilisation for international plants."),
        ],
        "why": [
            ("Industrial Fluency", "We understand production, quality and maintenance roles in depth.", "target"),
            ("Technical Screening", "We assess real plant experience, not just job titles.", "award"),
            ("Safety First", "We screen for the safety mindset manufacturing cannot compromise on.", "shield"),
            ("Gulf Strength", "Deep pipelines for engineering talent across the GCC.", "globe"),
            ("Volume & Niche", "From a single plant manager to a full production team, we scale.", "layers"),
            ("Speed for Shutdowns", "We mobilise fast to cover critical maintenance windows.", "clock"),
        ],
        "stats": [("10", "+", "Roles Covered"), ("7", "days", "Avg. First Shortlist"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit for manufacturing and engineering?", "We start with a detailed technical brief, then source candidates through our industrial network. Every candidate is screened for technical competence, safety awareness and relevant plant experience before we present a documented shortlist."),
            ("Can you staff a new plant or production line?", "Yes. We can build complete teams \u2014 from plant and production managers to quality, maintenance and shift staff \u2014 on a coordinated timeline."),
            ("Do you recruit for maintenance and shutdowns?", "Absolutely. We help manufacturers cover planned shutdowns and breakdowns with qualified maintenance engineers and technicians, often at short notice."),
            ("Do you place engineering talent in the Gulf?", "Yes. We place mechanical, electrical and production professionals from India with manufacturers across the UAE, Saudi Arabia, Qatar and Oman, with documentation and mobilisation support."),
            ("Do you charge candidates for placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["real-estate-construction", "logistics-supply-chain", "facilities-administration"],
    },
    {
        "slug": "education-training",
        "name": "Education & Training",
        "short": "Education",
        "cat": "education",
        "hero": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Students and faculty in a modern university campus setting",
        "split": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Teacher engaging with students in a classroom",
        "title": "Education & Training Recruitment | Academic & EdTech Hiring | ARK Global Connect",
        "desc": "Education and training recruitment for academic, admissions, training and edtech roles. ARK Global Connect hires educators and education professionals across India and international markets.",
        "keywords": "education recruitment, teacher jobs, academic hiring, edtech recruitment, admissions jobs, training manager, education staffing agency, school recruitment",
        "eyebrow": "Education & Training Recruitment",
        "h1": "Educators Who<br>Shape Futures.",
        "lead": "Education transforms lives \u2014 and it depends entirely on the quality of the people who deliver it. ARK Global Connect recruits teachers, academic leaders, admissions and training professionals for schools, colleges, universities, training institutes and edtech companies across India and international markets.",
        "introH2": "Teaching Is a Calling and a Craft.",
        "introLead": "A great educator combines subject mastery, classroom skill and genuine care for learners. Finding that combination takes more than a CV screen.",
        "introBody": "We understand education's realities: curriculum requirements, board and affiliation standards, admissions cycles and the growing edtech landscape. Our consultants screen for subject depth, teaching aptitude and the empathy that great educators bring to every classroom.",
        "tags": ["School Teaching", "Higher Education", "Academic Leadership", "Admissions", "Training & L&D", "EdTech", "Counselling"],
        "roles": [
            ("School Teacher", "Subject teaching, classroom management and student progress."),
            ("Principal / Head of School", "Academic leadership, staff and school performance."),
            ("Lecturer / Professor", "Higher-education teaching and research."),
            ("Academic Coordinator", "Curriculum, scheduling and academic standards."),
            ("Admissions Counsellor", "Student recruitment, guidance and enrolment."),
            ("Training Manager", "Learning programmes, delivery and outcomes."),
            ("Instructional Designer", "Digital learning content and curriculum design."),
            ("EdTech Product Specialist", "Learning platforms and product support."),
            ("Student Counsellor", "Wellbeing, guidance and student support."),
            ("Special Educator", "Inclusive teaching and individual learning support."),
        ],
        "process": [
            ("Understand the Institution", "We learn your curriculum, board, learner profile and the exact qualifications the role requires."),
            ("Source Education Talent", "We tap our education and edtech networks to reach active and passive professionals."),
            ("Assess Teaching Aptitude", "Structured screening for subject depth, classroom skill and genuine care for learners."),
            ("Shortlist & Present", "A documented shortlist with our assessment notes and a clear recommendation."),
            ("Coordinate Interviews", "We manage demo classes, interviews and candidate communication."),
            ("Offer & Onboard", "We support offer negotiation and joining, including international mobilisation."),
        ],
        "why": [
            ("Education Fluency", "We understand curricula, boards and the realities of the classroom.", "target"),
            ("Aptitude Screening", "We assess teaching skill and care, not just qualifications.", "heart"),
            ("International Reach", "Strong pipelines for educators across the Gulf and beyond.", "globe"),
            ("EdTech Ready", "We hire across the fast-growing digital learning sector.", "trending"),
            ("Volume & Niche", "From a single principal to a full faculty, we scale.", "layers"),
            ("Ethical Practice", "Transparent, ethical recruitment \u2014 always.", "award"),
        ],
        "stats": [("10", "+", "Roles Covered"), ("7", "days", "Avg. First Shortlist"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit teachers and educators?", "We start with a detailed role brief covering curriculum, board and learner profile, then source candidates through our education network. Every candidate is screened for subject depth, teaching aptitude and suitability before we present a documented shortlist."),
            ("Can you recruit for international schools?", "Yes. We place teachers and academic leaders from India with international schools across the Gulf and beyond, with full documentation, credentialing and mobilisation support."),
            ("Do you recruit for edtech companies?", "Absolutely. We hire instructional designers, edtech product specialists and training professionals alongside traditional academic roles."),
            ("Can you staff a full faculty or academic team?", "Yes. We can build complete academic teams \u2014 from principal and coordinators to subject teachers and counsellors \u2014 on a coordinated timeline."),
            ("Do you charge candidates for education placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["it-technology", "healthcare-wellness", "human-resources"],
    },
    {
        "slug": "sales-marketing",
        "name": "Sales & Marketing",
        "short": "Sales & Marketing",
        "cat": "sales",
        "hero": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Marketing team collaborating on a campaign strategy",
        "split": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Sales and marketing professionals reviewing performance data",
        "title": "Sales & Marketing Recruitment | Business Development & Growth Hiring | ARK Global Connect",
        "desc": "Sales and marketing recruitment for business development, brand, digital and growth roles. ARK Global Connect hires revenue-driving talent across India and international markets.",
        "keywords": "sales recruitment, marketing recruitment, business development jobs, digital marketing hiring, brand manager, growth marketing, sales staffing agency",
        "eyebrow": "Sales & Marketing Recruitment",
        "h1": "Revenue Teams<br>That Move the Number.",
        "lead": "Sales and marketing are the engines of growth \u2014 and they run on the right people. ARK Global Connect recruits business development, sales leadership, brand, digital and growth professionals for companies across India and international markets.",
        "introH2": "Growth Is a People Outcome.",
        "introLead": "A strong sales or marketing hire moves revenue, pipeline and brand. A weak one burns budget and momentum.",
        "introBody": "We understand the commercial realities of sales and marketing: quotas, funnels, brand equity and the difference between activity and results. Our consultants screen for track record, commercial instinct and the drive that revenue roles demand.",
        "tags": ["Business Development", "Sales Leadership", "Digital Marketing", "Brand", "Performance Marketing", "Content", "Growth"],
        "roles": [
            ("Business Development Manager", "New business, pipeline and revenue growth."),
            ("Sales Director", "Sales strategy, team leadership and targets."),
            ("Key Account Manager", "Client retention, growth and relationship depth."),
            ("Digital Marketing Manager", "Paid, organic and lifecycle marketing performance."),
            ("Brand Manager", "Brand strategy, positioning and campaigns."),
            ("Performance Marketer", "ROI-driven paid campaigns across channels."),
            ("Content Marketing Lead", "Content strategy, production and distribution."),
            ("Growth Manager", "Experimentation, funnels and scalable growth."),
            ("Inside Sales Executive", "Lead qualification and outbound sales."),
            ("Marketing Analytics Specialist", "Data, attribution and marketing performance."),
        ],
        "process": [
            ("Understand the Target", "We learn your market, product, quota and the commercial outcomes the role must deliver."),
            ("Source Commercial Talent", "We tap our sales and marketing networks to reach active and passive professionals."),
            ("Assess Track Record", "Structured screening for results, commercial instinct and drive."),
            ("Shortlist & Present", "A documented shortlist with our assessment notes and a clear recommendation."),
            ("Coordinate Interviews", "We manage interviews and candidate communication to keep momentum."),
            ("Offer & Onboard", "We support offer negotiation, counter-offers and a strong start."),
        ],
        "why": [
            ("Commercial Fluency", "We understand quotas, funnels and what drives revenue.", "target"),
            ("Track-Record Focus", "We assess results and drive, not just experience.", "trending"),
            ("Speed to Hire", "Revenue roles cannot wait. We move fast without lowering the bar.", "clock"),
            ("Global Capability", "Hire locally or source from India for international teams.", "globe"),
            ("Startup to Enterprise", "From a first sales hire to a full revenue function.", "layers"),
            ("Honest Assessment", "Candid feedback so you interview only real contenders.", "shield"),
        ],
        "stats": [("10", "+", "Roles Covered"), ("7", "days", "Avg. First Shortlist"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit for sales and marketing?", "We start with a detailed commercial brief covering market, product and targets, then source candidates through our sales and marketing networks. Every candidate is screened for track record, commercial instinct and drive before we present a documented shortlist."),
            ("Can you help a startup build its first sales team?", "Yes. We regularly help founders hire their first sales and marketing people, defining roles, benchmarking packages and running a fast, focused search."),
            ("Do you recruit for digital and performance marketing?", "Absolutely. We hire digital marketing managers, performance marketers, content leads and growth specialists alongside traditional sales roles."),
            ("Do you place sales talent in the Gulf?", "Yes. We place sales and marketing professionals from India with employers across the Gulf, with documentation and mobilisation support where required."),
            ("Do you charge candidates for placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["it-technology", "retail-ecommerce", "bfsi"],
    },
    {
        "slug": "human-resources",
        "name": "Human Resources",
        "short": "HR",
        "cat": "hr",
        "hero": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "HR professionals collaborating in a modern office",
        "split": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "HR manager leading a team discussion",
        "title": "Human Resources Recruitment | HR Generalist & Specialist Hiring | ARK Global Connect",
        "desc": "Human resources recruitment for HR generalists, talent acquisition, payroll, L&D and HR business partners. ARK Global Connect hires HR professionals across India and international markets.",
        "keywords": "HR recruitment, human resources jobs, HR generalist, talent acquisition hiring, payroll jobs, HR business partner, L&D recruitment, HR staffing agency",
        "eyebrow": "Human Resources Recruitment",
        "h1": "HR Talent That<br>Builds Better Workplaces.",
        "lead": "Great HR turns strategy into culture, compliance and performance. ARK Global Connect recruits HR generalists, talent acquisition specialists, payroll and L&D professionals and HR business partners for organisations across India and international markets.",
        "introH2": "HR Is the Backbone of Every Business.",
        "introLead": "The right HR hire builds teams, protects compliance and shapes culture. The wrong one creates friction across the whole organisation.",
        "introBody": "We understand the HR function in depth: recruitment, onboarding, payroll, employee relations, performance and compliance. Our consultants screen for functional depth, judgement and the people skills that make HR a trusted partner rather than a gatekeeper.",
        "tags": ["HR Generalist", "Talent Acquisition", "Payroll & Compliance", "L&D", "HR Business Partner", "Employee Relations", "HR Operations"],
        "roles": [
            ("HR Generalist", "End-to-end HR operations and employee support."),
            ("Talent Acquisition Specialist", "Sourcing, screening and hiring delivery."),
            ("HR Business Partner", "Strategic HR partnering with business leaders."),
            ("Payroll Specialist", "Payroll processing, statutory compliance and reporting."),
            ("L&D Manager", "Learning strategy, programmes and capability building."),
            ("Employee Relations Manager", "Grievances, policy and workplace harmony."),
            ("HR Operations Manager", "HR systems, processes and service delivery."),
            ("Compensation & Benefits Analyst", "Salary benchmarking and reward design."),
            ("Recruitment Coordinator", "Interview scheduling and candidate experience."),
            ("HRIS Analyst", "HR systems, data and reporting."),
        ],
        "process": [
            ("Understand the Function", "We learn your organisation, HR maturity and the exact competencies the role requires."),
            ("Source HR Talent", "We tap our HR network and talent pools to reach active and passive professionals."),
            ("Assess Functional Fit", "Structured screening for functional depth, judgement and people skills."),
            ("Shortlist & Present", "A documented shortlist with our assessment notes and a clear recommendation."),
            ("Coordinate Interviews", "We manage interviews and candidate communication to keep hiring on track."),
            ("Offer & Onboard", "We support offer negotiation and a smooth joining."),
        ],
        "why": [
            ("HR Fluency", "We understand the full HR spectrum, from operations to strategy.", "target"),
            ("Judgement Screening", "We assess the discretion and people skills HR demands.", "heart"),
            ("Compliance Awareness", "We screen for statutory and regulatory knowledge.", "shield"),
            ("Global Capability", "Hire locally or source from India for international HR teams.", "globe"),
            ("Startup to Enterprise", "From a first HR hire to a full HR function.", "layers"),
            ("Speed & Precision", "Efficient processes that respect your timeline.", "clock"),
        ],
        "stats": [("10", "+", "Roles Covered"), ("7", "days", "Avg. First Shortlist"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit HR professionals?", "We start with a detailed role brief covering HR maturity and required competencies, then source candidates through our HR network. Every candidate is screened for functional depth, judgement and people skills before we present a documented shortlist."),
            ("Can you help a startup hire its first HR person?", "Yes. We regularly help founders hire their first HR generalist or talent acquisition specialist, defining the role and running a fast, focused search."),
            ("Do you recruit for payroll and compliance roles?", "Absolutely. We hire payroll specialists, HR operations managers and compensation analysts alongside generalist and strategic HR roles."),
            ("Do you place HR talent internationally?", "Yes. We place HR professionals from India with employers across the Gulf and beyond, with documentation and mobilisation support where required."),
            ("Do you charge candidates for HR placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["sales-marketing", "education-training", "facilities-administration"],
    },
    {
        "slug": "facilities-administration",
        "name": "Facilities & Administration",
        "short": "Facilities",
        "cat": "facilities",
        "hero": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Facilities team maintaining a modern corporate office building",
        "split": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
        "splitAlt": "Administration and facilities staff coordinating office operations",
        "title": "Facilities & Administration Recruitment | FM & Admin Hiring | ARK Global Connect",
        "desc": "Facilities and administration recruitment for facility managers, admin, front-office and support services. ARK Global Connect hires FM and admin talent across India and the Gulf.",
        "keywords": "facilities recruitment, facility management jobs, administration hiring, office manager, front office jobs, FM staffing agency, admin recruitment",
        "eyebrow": "Facilities & Administration Recruitment",
        "h1": "Facilities Teams That<br>Keep Business Running.",
        "lead": "Behind every smooth-running organisation is a facilities and administration team that few notice and everyone depends on. ARK Global Connect recruits facility managers, administrators, front-office and support-services professionals for corporates, malls, hospitals and residential communities across India and international markets.",
        "introH2": "Facilities Is the Quiet Engine of Every Business.",
        "introLead": "When facilities work well, nobody notices. When they fail, everyone does. Reliability and service mindset are everything.",
        "introBody": "We understand facilities and administration in depth: hard and soft FM, housekeeping, security, maintenance, front-office and vendor management. Our consultants screen for service mindset, reliability and the operational discipline that keeps buildings and businesses running.",
        "tags": ["Facility Management", "Administration", "Front Office", "Housekeeping", "Security", "Maintenance", "Vendor Management"],
        "roles": [
            ("Facility Manager", "Hard and soft FM, vendors and service standards."),
            ("Assistant Facility Manager", "Day-to-day FM operations and team coordination."),
            ("Administration Manager", "Office administration, procurement and support services."),
            ("Front Office Executive", "Reception, guest handling and first impressions."),
            ("Housekeeping Manager", "Cleaning standards, teams and hygiene."),
            ("Security Manager", "Site security, access control and safety."),
            ("Maintenance Supervisor", "Building systems, repairs and uptime."),
            ("Office Manager", "Workplace operations and employee support."),
            ("Vendor Coordinator", "Contractor and service-provider management."),
            ("Executive Assistant", "Senior leadership support and coordination."),
        ],
        "process": [
            ("Understand the Site", "We learn your facility type, service standards and the exact competencies the role requires."),
            ("Source FM Talent", "We tap our facilities and administration networks to reach active and passive professionals."),
            ("Assess Service Fit", "Structured screening for service mindset, reliability and operational discipline."),
            ("Shortlist & Present", "A documented shortlist with our assessment notes and a clear recommendation."),
            ("Coordinate Interviews", "We manage interviews and candidate communication to keep sites covered."),
            ("Offer & Onboard", "We support offer negotiation and joining, including mobilisation for international roles."),
        ],
        "why": [
            ("FM Fluency", "We understand hard and soft FM, and the roles each demands.", "target"),
            ("Service Screening", "We assess the service mindset facilities work requires.", "heart"),
            ("Gulf Strength", "Deep pipelines for FM and admin talent across the GCC.", "globe"),
            ("Volume & Niche", "From a single facility manager to a full site team, we scale.", "layers"),
            ("Reliability Focus", "We screen for the dependability that keeps sites running.", "shield"),
            ("Speed for Mobilisation", "We mobilise fast for new sites and contracts.", "clock"),
        ],
        "stats": [("10", "+", "Roles Covered"), ("48", "hr", "Shortlist Turnaround"), ("10", "+", "Countries"), ("98", "%", "Client Retention")],
        "faqs": [
            ("How do you recruit for facilities and administration?", "We start with a detailed site and role brief, then source candidates through our facilities network. Every candidate is screened for service mindset, reliability and operational discipline before we present a documented shortlist."),
            ("Can you staff a new site or contract?", "Yes. We can build complete FM and admin teams \u2014 from facility managers to front-office, housekeeping, security and maintenance staff \u2014 on a coordinated timeline."),
            ("Do you recruit for corporate administration roles?", "Absolutely. We hire administration managers, office managers, executive assistants and front-office professionals alongside FM roles."),
            ("Do you place facilities talent in the Gulf?", "Yes. We place FM and administration professionals from India with employers across the UAE, Saudi Arabia, Qatar and Oman, with documentation and mobilisation support."),
            ("Do you charge candidates for placements?", "Never. ARK Global Connect is paid by employers. Candidates are never charged for placement, interviews or documentation."),
        ],
        "related": ["real-estate-construction", "hospitality-tourism", "logistics-supply-chain"],
    },
]

# ---------------------------------------------------------------- HELPERS
def esc(s):
    return html.escape(s, quote=True)

def slug_to_file(slug):
    return "industry-%s.html" % slug

def by_slug(slug):
    for i in INDUSTRIES:
        if i["slug"] == slug:
            return i
    return None

def jsonld(ind):
    """Service + FAQPage structured data for SEO/AEO."""
    service = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "%s Recruitment" % ind["name"],
        "provider": {
            "@type": "Organization",
            "name": "ARK Global Connect",
            "url": "https://arkglobalconnect.com/",
            "logo": "https://arkglobalconnect.com/assets/logo.png",
            "telephone": "+91 85913 52276",
            "email": "arkglobalhm@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Star Plaza, B 2104, Mahatma Gandhi Rd, Borivali East",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "postalCode": "400066",
                "addressCountry": "IN"
            }
        },
        "areaServed": ["India", "United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Kuwait", "Maldives", "Europe", "Asia Pacific"],
        "description": ind["desc"],
        "url": "https://arkglobalconnect.com/%s" % slug_to_file(ind["slug"]),
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "%s Roles" % ind["name"],
            "itemListElement": [
                {"@type": "Offer", "itemOffered": {"@type": "Occupation", "name": r[0]}}
                for r in ind["roles"]
            ]
        }
    }
    faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a}
            } for q, a in ind["faqs"]
        ]
    }
    breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://arkglobalconnect.com/"},
            {"@type": "ListItem", "position": 2, "name": "Industries", "item": "https://arkglobalconnect.com/industries.html"},
            {"@type": "ListItem", "position": 3, "name": ind["name"], "item": "https://arkglobalconnect.com/%s" % slug_to_file(ind["slug"])}
        ]
    }
    return json.dumps([service, faq, breadcrumb], ensure_ascii=False, indent=2)

def roles_html(ind):
    out = []
    for i, (name, desc) in enumerate(ind["roles"]):
        d = " reveal-delay-%d" % (i % 3)
        out.append(
            '<article class="card reveal%s">'
            '<div class="card-icon" data-icon="briefcase"></div>'
            '<h3>%s</h3><p>%s</p></article>' % (d, esc(name), esc(desc))
        )
    return "\n      ".join(out)

def process_html(ind):
    out = []
    for i, (title, desc) in enumerate(ind["process"]):
        out.append(
            '<div class="process-step"><span class="ps-num">%02d</span><div><h4>%s</h4><p>%s</p></div></div>'
            % (i + 1, esc(title), esc(desc))
        )
    return "\n        ".join(out)

def why_html(ind):
    out = []
    for i, (title, desc, icon) in enumerate(ind["why"]):
        d = " reveal-delay-%d" % (i % 3)
        out.append(
            '<div class="card reveal%s"><div class="card-icon" data-icon="%s"></div>'
            '<h3>%s</h3><p>%s</p></div>' % (d, icon, esc(title), esc(desc))
        )
    return "\n      ".join(out)

def stats_html(ind):
    out = []
    for i, (n, suf, label) in enumerate(ind["stats"]):
        d = " reveal-delay-%d" % (i % 4)
        out.append(
            '<div class="stat-block reveal%s"><b data-count="%s" data-suffix="%s">0</b><span>%s</span></div>'
            % (d, n, suf, esc(label))
        )
    return "\n      ".join(out)

def faq_html(ind):
    out = []
    for q, a in ind["faqs"]:
        out.append(
            '<div class="faq-item"><button class="faq-q">%s<span></span></button>'
            '<div class="faq-a"><p>%s</p></div></div>' % (esc(q), esc(a))
        )
    return "\n    ".join(out)

def related_html(ind):
    out = []
    for i, slug in enumerate(ind["related"]):
        r = by_slug(slug)
        if not r:
            continue
        d = " reveal-delay-%d" % (i % 3)
        out.append(
            '<a href="%s" class="card reveal%s"><div class="card-icon" data-icon="layers"></div>'
            '<h3>%s</h3><p>%s recruitment \u2014 sector-specific hiring expertise.</p>'
            '<span class="link-arrow">Explore %s \u2192</span></a>'
            % (slug_to_file(slug), d, esc(r["name"]), esc(r["short"]), esc(r["short"]))
        )
    return "\n      ".join(out)

def tags_html(ind):
    return "\n          ".join('<span class="tag">%s</span>' % esc(t) for t in ind["tags"])

# ---------------------------------------------------------------- TEMPLATE
TEMPLATE = """\ufeff<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="keywords" content="{keywords}">
<meta name="author" content="ARK Global Connect">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:title" content="{name} Recruitment | ARK Global Connect">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://arkglobalconnect.com/{file}">
<meta property="og:image" content="{hero}">
<meta property="og:site_name" content="ARK Global Connect">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{name} Recruitment | ARK Global Connect">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{hero}">
<link rel="canonical" href="https://arkglobalconnect.com/{file}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json">
{jsonld}
</script>
<script src="https://sites.super.myninja.ai/_assets/ninja-daytona-script.js"></script>
</head>
<body>

<!-- ============ PAGE HERO ============ -->
<section class="page-hero">
  <div class="hero-media" aria-hidden="true">
    <img src="{hero}" alt="{heroAlt}" loading="eager" fetchpriority="high">
  </div>
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="industries.html">Industries</a><span>/</span><span>{name}</span></nav>
    <span class="eyebrow">{eyebrow}</span>
    <h1 class="h1">{h1}</h1>
    <p class="lead max-720">{lead}</p>
    <div class="hero-actions mt-3">
      <a href="hire.html" class="btn btn-gold btn-lg">Hire {short} Talent</a>
      <a href="jobs.html" class="btn btn-ghost-light btn-lg">Browse {short} Jobs</a>
    </div>
  </div>
</section>

<!-- ============ INTRO SPLIT ============ -->
<section class="section bg-ivory">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow">Why ARK for {short}</span>
        <h2 class="h2">{introH2}</h2>
        <p class="lead mt-2">{introLead}</p>
        <p class="muted">{introBody}</p>
        <div class="tag-list mt-3">
          {tags}
        </div>
      </div>
      <div class="split-media reveal reveal-delay-2">
        <div class="curved-img" style="aspect-ratio:4/5">
          <img src="{split}" alt="{splitAlt}" loading="lazy" style="width:100%;height:100%;object-fit:cover">
        </div>
        <div class="media-badge"><b>{badgeNum}</b><span>{badgeLabel}</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ ROLES WE HIRE ============ -->
<section class="section bg-cream">
  <div class="container">
    <div class="text-center mb-4 reveal">
      <span class="eyebrow center">Roles We Hire</span>
      <h2 class="h2">{name} Roles We Recruit</h2>
      <p class="lead max-720 mx-auto">From specialist to leadership level, we recruit the full spectrum of {shortLower} talent \u2014 across India and international markets.</p>
    </div>
    <div class="grid g3">
      {roles}
    </div>
  </div>
</section>

<!-- ============ PROCESS ============ -->
<section class="section bg-beige">
  <div class="container">
    <div class="text-center mb-4 reveal">
      <span class="eyebrow center">Our Process</span>
      <h2 class="h2">How We Hire {short} Talent.</h2>
      <p class="lead max-720 mx-auto">A disciplined, transparent search process \u2014 so you always know where your hiring stands.</p>
    </div>
    <div class="grid g2">
      <div class="reveal">
        {processA}
      </div>
      <div class="reveal reveal-delay-2">
        {processB}
        <div class="card mt-3" style="background:var(--grad-dark);color:var(--light);border:none">
          <h3 style="color:var(--light)">Replacement Guarantee</h3>
          <p style="color:rgba(255,255,255,0.72)">If a placed candidate leaves within the agreed guarantee period, we re-run the search at no additional recruitment fee. Terms are confirmed in writing before we begin.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ WHY ARK ============ -->
<section class="section bg-ivory">
  <div class="container">
    <div class="text-center mb-4 reveal">
      <span class="eyebrow center">Why ARK</span>
      <h2 class="h2">Sector Expertise That Shows in the Shortlist.</h2>
    </div>
    <div class="grid g3">
      {why}
    </div>
  </div>
</section>

<!-- ============ STATS ============ -->
<section class="section-sm bg-dark">
  <div class="container">
    <div class="grid g4">
      {stats}
    </div>
  </div>
</section>

<!-- ============ RELATED INDUSTRIES ============ -->
<section class="section bg-cream">
  <div class="container">
    <div class="text-center mb-4 reveal"><span class="eyebrow center">Explore More</span><h2 class="h2">Related Industries</h2></div>
    <div class="grid g3">
      {related}
    </div>
  </div>
</section>

<!-- ============ FAQ (AEO) ============ -->
<section class="section bg-beige">
  <div class="container max-820">
    <div class="text-center mb-3 reveal"><span class="eyebrow center">FAQ</span><h2 class="h2">{short} Recruitment Questions</h2></div>
    {faqs}
  </div>
</section>

<!-- ============ CTA ============ -->
<section class="section bg-dark">
  <div class="container text-center">
    <span class="eyebrow center light reveal">Let's Begin</span>
    <h2 class="h2 reveal" style="color:var(--light)">Ready to Hire {short} Talent?</h2>
    <p class="lead max-720 mx-auto reveal" style="color:rgba(255,255,255,0.75)">Tell us about the role. We'll tell you honestly how we'd approach it, how long it should take and what it will cost.</p>
    <div class="hero-actions reveal mt-3" style="justify-content:center">
      <a href="hire.html" class="btn btn-gold btn-lg">Start a Search</a>
      <a href="contact.html" class="btn btn-ghost-light btn-lg">Talk to an ARK Consultant</a>
    </div>
  </div>
</section>

<script src="js/config.js"></script>
<script src="js/main.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    var k = el.getAttribute("data-icon");
    if (window.ARK_ICONS && window.ARK_ICONS[k]) el.innerHTML = window.ARK_ICONS[k];
  });
});
</script>
</body>
</html>
"""

def build(ind):
    proc = ind["process"]
    half = (len(proc) + 1) // 2
    procA = "\n        ".join(
        '<div class="process-step"><span class="ps-num">%02d</span><div><h4>%s</h4><p>%s</p></div></div>'
        % (i + 1, esc(t), esc(d)) for i, (t, d) in enumerate(proc[:half])
    )
    procB = "\n        ".join(
        '<div class="process-step"><span class="ps-num">%02d</span><div><h4>%s</h4><p>%s</p></div></div>'
        % (i + 1 + half, esc(t), esc(d)) for i, (t, d) in enumerate(proc[half:])
    )
    badgeNum, badgeLabel = ind["stats"][0][0] + ind["stats"][0][1], ind["stats"][0][2]
    vals = {
        "title": esc(ind["title"]),
        "desc": esc(ind["desc"]),
        "keywords": esc(ind["keywords"]),
        "name": esc(ind["name"]),
        "short": esc(ind["short"]),
        "shortLower": esc(ind["short"].lower()),
        "file": slug_to_file(ind["slug"]),
        "hero": ind["hero"],
        "heroAlt": esc(ind["heroAlt"]),
        "split": ind["split"],
        "splitAlt": esc(ind["splitAlt"]),
        "eyebrow": esc(ind["eyebrow"]),
        "h1": ind["h1"],
        "lead": esc(ind["lead"]),
        "introH2": esc(ind["introH2"]),
        "introLead": esc(ind["introLead"]),
        "introBody": esc(ind["introBody"]),
        "tags": tags_html(ind),
        "roles": roles_html(ind),
        "processA": procA,
        "processB": procB,
        "why": why_html(ind),
        "stats": stats_html(ind),
        "related": related_html(ind),
        "faqs": faq_html(ind),
        "jsonld": jsonld(ind),
        "badgeNum": badgeNum,
        "badgeLabel": esc(badgeLabel),
    }
    out = TEMPLATE
    for k, v in vals.items():
        out = out.replace("{" + k + "}", str(v))
    return out

def main():
    for ind in INDUSTRIES:
        path = os.path.join(OUT, slug_to_file(ind["slug"]))
        with open(path, "w", encoding="utf-8") as f:
            f.write(build(ind))
        print("wrote", slug_to_file(ind["slug"]))
    print("\nTotal: %d industry pages" % len(INDUSTRIES))

if __name__ == "__main__":
    main()
