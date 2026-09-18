# -*- coding: utf-8 -*-
"""
Generator for ARK Global Connect Insights / Blog article pages.
Produces 9 standalone article pages at project root: insight-{slug}.html
Each page: unique SEO meta, BlogPosting + BreadcrumbList + FAQPage JSON-LD,
rich prose body, pull-quotes, callouts, author box, share, FAQ (AEO),
related articles + related industries interlinking, and CTA.
"""
import os, json, html

OUT = os.path.dirname(os.path.abspath(__file__))

def esc(s):
    return html.escape(str(s), quote=True)

# ---------------------------------------------------------------- ARTICLES
ARTICLES = [
    {
        "slug": "best-hire-not-best-cv",
        "cat": "Hiring",
        "title": "Why the Best Hire Isn't Always the Best CV",
        "seoTitle": "Why the Best Hire Isn't Always the Best CV | Hiring Insights | ARK Global Connect",
        "desc": "A polished CV tells you what someone has done, not what they will do next. Learn how to look beyond the paper and hire for potential, fit and future performance.",
        "keywords": "best hire, CV screening, hiring for potential, recruitment assessment, talent evaluation, hiring beyond resume, candidate fit, structured interview",
        "date": "12 Feb 2026",
        "dateISO": "2026-02-12",
        "read": "6 min",
        "author": "Raghavendra Shetty",
        "authorRole": "Founder & Managing Director, ARK Global Connect",
        "hero": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Hiring manager reviewing a candidate CV during an interview",
        "lead": "A polished CV tells you what someone has done. It rarely tells you what they will do next. Here is how to look beyond the paper and hire for the things that actually predict performance.",
        "intro": "Every hiring manager has felt the sting of a perfect-on-paper candidate who turned out to be the wrong fit. The CV was immaculate, the interview answers were rehearsed, and the references checked out. Yet within six months the relationship had soured. The lesson is uncomfortable but important: a CV is a marketing document, not a prediction. It summarises a past, but it cannot describe a future.",
        "sections": [
            {"h2": "A CV is a highlight reel, not a forecast", "paras": [
                "Candidates write CVs to get interviews, not to tell the whole truth. They emphasise wins, compress failures and use language that flatters. That is rational behaviour, but it means the document you are reading has been optimised for persuasion rather than accuracy.",
                "The problem is that past titles and polished bullet points are weak predictors of future performance in a new context. What predicts success is a combination of capability, motivation, adaptability and fit with the specific team and culture you are hiring into. None of those things live on a single page."
            ]},
            {"h2": "What actually predicts performance", "paras": [
                "Decades of hiring research point to a handful of signals that consistently outperform the CV: structured interviews, work samples, cognitive ability and conscientiousness, and reference conversations that go beyond dates and titles.",
                "Structured interviews matter because they ask every candidate the same questions and score answers against a defined rubric. Work samples matter because they let you watch someone think. Reference conversations matter because a former manager will tell you far more in ten minutes than a CV ever could."
            ], "list": [
                "Structured, scored interviews instead of free-flowing chats",
                "A short, relevant work sample or task",
                "Behavioural questions that probe how someone handled real situations",
                "Reference calls that ask about strengths, blind spots and coachability",
                "A clear scorecard agreed before the first interview"
            ]},
            {"h2": "Hire for the gap you can close, not the gap you can't", "paras": [
                "Some gaps are trainable: a missing tool, an unfamiliar industry, a software package. Others are much harder to fix: attitude, reliability, how someone treats colleagues under pressure. The best hires often have a small skills gap but no character gap.",
                "When you over-index on the CV, you tend to hire the person who has already done the exact job. When you hire for potential, you hire the person who can grow into the next version of the role. In fast-changing businesses, the second person is usually the better long-term bet."
            ]},
            {"h2": "The cost of getting it wrong", "paras": [
                "A bad hire is expensive in ways that rarely appear on a spreadsheet: lost momentum, team friction, customer impact and the management time spent trying to rescue a poor fit. Recruitment fees are the smallest part of the bill.",
                "That is why the extra hour spent designing a scorecard, or the extra reference call, is almost always worth it. You are not slowing down hiring; you are protecting the business from a far more expensive mistake."
            ]}
        ],
        "pullquote": "A CV tells you what someone has done. A great hiring process tells you what they will do next.",
        "faqs": [
            ("Should I ignore the CV entirely?", "No. The CV is a useful first filter for baseline requirements such as qualifications, experience level and relevance. The mistake is treating it as the final decision rather than the opening of a conversation."),
            ("How many interview stages do I really need?", "For most roles, two well-designed stages plus a reference call is enough: a structured competency interview and a practical work sample. More stages rarely improve the decision and often cost you good candidates."),
            ("What is the single best predictor of a good hire?", "A structured interview combined with a relevant work sample. Together they reveal both how someone thinks and how they actually perform, which the CV cannot show."),
            ("How do I hire for potential when I need someone productive now?", "Look for a candidate who meets the core requirements and shows fast learning, strong motivation and coachability. They will often be productive within weeks and outperform a static 'perfect match' over a year."),
            ("Can a recruiter help me see beyond the CV?", "Yes. A specialist recruiter screens for motivation, fit and trajectory, not just keywords, and presents a documented shortlist with an assessment so you can compare candidates on substance rather than formatting.")
        ],
        "related": ["true-cost-of-a-bad-hire", "volume-hiring-without-losing-quality", "five-signs-of-a-great-employer"],
        "industries": ["human-resources", "sales-marketing", "it-technology"]
    },
    {
        "slug": "hiring-across-borders-checklist",
        "cat": "Global Mobility",
        "title": "Hiring Across Borders: A Practical Checklist",
        "seoTitle": "Hiring Across Borders: A Practical Checklist | Global Mobility | ARK Global Connect",
        "desc": "From visas to accommodation, international hiring has more moving parts than most employers expect. Use this practical checklist to avoid the common traps.",
        "keywords": "international hiring, cross-border recruitment, work visa checklist, global mobility, overseas hiring, relocation compliance, hiring abroad",
        "date": "04 Feb 2026",
        "dateISO": "2026-02-04",
        "read": "8 min",
        "author": "Raghavendra Shetty",
        "authorRole": "Founder & Managing Director, ARK Global Connect",
        "hero": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Airplane wing above clouds representing international hiring and mobility",
        "lead": "From visas to accommodation, international hiring has more moving parts than most employers expect. Use this checklist to avoid the common traps and get your overseas hire started on time.",
        "intro": "Hiring across borders is one of the most rewarding things a business can do, and one of the easiest to get wrong. The role may be identical to a domestic one, but the process around it is not. Immigration rules, tax residency, payroll, accommodation and cultural onboarding all behave differently once a border is involved. The employers who succeed treat international hiring as a project with a checklist, not a single transaction.",
        "sections": [
            {"h2": "Start with the right to work, not the offer", "paras": [
                "The most common and most expensive mistake is making an offer before confirming that the candidate can legally work in the destination country. Visa categories, processing times and eligibility rules vary enormously between markets, and a rejected application can set a start date back by months.",
                "Confirm the visa route, the expected processing time and the documents required before you commit to a start date. Build the timeline backwards from the visa, not forwards from the interview."
            ], "list": [
                "Identify the correct work visa or permit category",
                "Confirm eligibility for the candidate's nationality and qualifications",
                "Check realistic processing times for the season",
                "Gather attested documents early (degrees, experience letters, police clearance)",
                "Plan for dependants if the candidate is relocating with family"
            ]},
            {"h2": "Get the money right before the move", "paras": [
                "Salary is only part of the picture. Tax residency, social contributions, cost of living and the treatment of allowances all affect what a candidate actually takes home. A package that looks generous on paper can feel like a pay cut once local deductions and living costs are applied.",
                "Be transparent about the full package: base salary, housing or housing allowance, transport, medical cover, flights home and end-of-service benefits where applicable. Candidates who feel misled about money rarely stay long."
            ]},
            {"h2": "Relocation is a service, not a formality", "paras": [
                "A smooth relocation is about more than flights and paperwork. The first ninety days determine whether an international hire settles and stays. Practical support, a clear point of contact and a warm welcome do more for retention than a slightly higher salary.",
                "Assign someone to own the relocation. It can be an internal HR lead or an external partner, but it must be someone whose job it is to make sure the candidate is not left to figure everything out alone."
            ]},
            {"h2": "Onboard for culture, not just compliance", "paras": [
                "International hires often arrive into a workplace culture that differs from what they expected. Small things, from communication style to working hours to how feedback is given, can create friction if they are never explained.",
                "Pair the new hire with a buddy, set expectations explicitly in the first week, and check in more often than you would for a local hire. The investment in cultural onboarding pays back in loyalty and performance."
            ]}
        ],
        "pullquote": "Treat international hiring as a project with a checklist, not a single transaction.",
        "faqs": [
            ("How long does international hiring usually take?", "Plan for eight to sixteen weeks from offer to start, depending on the destination, visa category and document readiness. Some markets are faster; some, especially with dependants, take longer."),
            ("Who is responsible for the work visa?", "In most cases the employer sponsors and drives the visa process, often with a licensed immigration partner. The candidate provides documents, but the employer should own the timeline."),
            ("What should an international package include?", "At minimum: base salary, housing or allowance, medical cover, transport, annual flights home and any statutory end-of-service benefits. Transparency about the full package prevents early attrition."),
            ("How do I reduce the risk of an overseas hire leaving early?", "Invest in relocation support and cultural onboarding, assign a buddy, and check in frequently during the first ninety days. Practical settling-in support is the strongest retention lever."),
            ("Can a recruitment partner manage the whole process?", "Yes. A global recruitment partner can source candidates, coordinate visa documentation, arrange relocation and support onboarding, giving you a single point of accountability across borders.")
        ],
        "related": ["relocation-support-what-employees-need", "international-interview-preparation", "remote-hr-when-it-makes-sense"],
        "industries": ["hospitality-tourism", "logistics-supply-chain", "healthcare-wellness"]
    },
    {
        "slug": "remote-hr-when-it-makes-sense",
        "cat": "HR",
        "title": "Remote HR: When Does It Make Sense?",
        "seoTitle": "Remote HR: When Does It Make Sense? | HR Insights | ARK Global Connect",
        "desc": "Not every business needs a full in-house HR team. Learn how to decide whether outsourced or remote HR is right for your stage of growth, and what to expect.",
        "keywords": "remote HR, outsourced HR, HR outsourcing, fractional HR, HR for startups, virtual HR services, HR support small business",
        "date": "28 Jan 2026",
        "dateISO": "2026-01-28",
        "read": "5 min",
        "author": "Raghavendra Shetty",
        "authorRole": "Founder & Managing Director, ARK Global Connect",
        "hero": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "HR professional working remotely on a laptop during a video call",
        "lead": "Not every business needs a full HR team. Here is how to decide whether outsourced or remote HR is right for your stage of growth, and what you should expect from it.",
        "intro": "For a business of five people, a full-time HR manager is a luxury. For a business of fifty, going without one is a risk. Somewhere in between, most companies face the same question: do we hire HR, or do we outsource it? The answer depends less on headcount and more on complexity, risk and how much of your leadership time is being consumed by people problems.",
        "sections": [
            {"h2": "The signals that you need HR support", "paras": [
                "You do not need a formal HR department to need HR expertise. The signals are usually practical: contracts that were never properly drafted, onboarding that happens differently for every hire, leave and payroll questions landing on the founder's desk, or a nagging worry about compliance.",
                "When people administration starts to eat into the time you should be spending on customers and growth, it is time to bring in structured HR support, whether internal or external."
            ], "list": [
                "You are hiring regularly but have no consistent onboarding",
                "Contracts, policies or handbooks are outdated or missing",
                "Founders or managers are handling routine HR admin themselves",
                "You are expanding into a new country or a new employment model",
                "You have had a people issue you were not equipped to handle"
            ]},
            {"h2": "What remote HR actually covers", "paras": [
                "Remote or outsourced HR is not a call centre for complaints. Done well, it provides a senior HR function on a fractional basis: policy and handbook design, contracts and compliance, onboarding and offboarding, performance frameworks, and a confidential point of contact for employee matters.",
                "The advantage is access to experience without the cost of a full-time senior hire. The trade-off is that an external partner is not on-site every day, so clear communication and defined responsibilities matter."
            ]},
            {"h2": "When in-house is the better choice", "paras": [
                "If your business is large, fast-growing or heavily regulated, an in-house HR team is usually the right answer. Culture, conflict and rapid change need someone who is present and embedded.",
                "The pragmatic path for many companies is a hybrid: a lean in-house HR coordinator for day-to-day matters, supported by an external partner for strategy, compliance and specialist projects."
            ]},
            {"h2": "How to choose a remote HR partner", "paras": [
                "Look for demonstrable experience in your sector and size of business, clear scope and pricing, and a named senior contact rather than a rotating pool. Ask how they handle confidentiality and how quickly they respond to urgent employee matters.",
                "Most importantly, ask what they will not do. A good partner is honest about the limits of remote support and will tell you when you have outgrown it."
            ]}
        ],
        "pullquote": "You do not need a formal HR department to need HR expertise.",
        "faqs": [
            ("At what headcount should I consider remote HR?", "There is no fixed number, but many businesses start exploring outsourced HR between ten and fifty employees, or earlier if they operate in a regulated sector or across borders."),
            ("Is remote HR suitable for startups?", "Yes. Early-stage companies often benefit most, because they need senior HR judgement without the cost of a full-time hire while they find their feet."),
            ("What is the difference between remote HR and a PEO?", "Remote HR typically provides advice, policy and process support. A Professional Employer Organisation (PEO) also employs staff on your behalf and manages payroll and compliance. Some providers offer both."),
            ("Can remote HR handle employee grievances?", "A good partner can provide a confidential channel, advise on process and help you handle matters fairly and legally. Serious or sensitive cases may still need on-site involvement from leadership."),
            ("How is remote HR priced?", "Usually as a monthly retainer based on headcount and scope, or as project fees for specific work such as a handbook or compliance review. Ask for a clear scope before you commit.")
        ],
        "related": ["employee-handbook-people-read", "hiring-across-borders-checklist", "five-signs-of-a-great-employer"],
        "industries": ["human-resources", "facilities-administration", "bfsi"]
    },
    {
        "slug": "international-interview-preparation",
        "cat": "Candidates",
        "title": "How to Prepare for an International Interview",
        "seoTitle": "How to Prepare for an International Interview | Candidate Insights | ARK Global Connect",
        "desc": "Cross-border interviews have their own etiquette and expectations. Learn how to prepare, what to research and how to show up confident for an international role.",
        "keywords": "international interview, overseas job interview, interview preparation, cross-border interview tips, global job search, interview etiquette, relocation interview",
        "date": "20 Jan 2026",
        "dateISO": "2026-01-20",
        "read": "7 min",
        "author": "Raghavendra Shetty",
        "authorRole": "Founder & Managing Director, ARK Global Connect",
        "hero": "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Candidate preparing for an international job interview on a video call",
        "lead": "Cross-border interviews have their own etiquette and expectations. Here is how to prepare, what to research and how to show up confident for an international role.",
        "intro": "Interviewing for a role in another country is not simply the same interview with a different time zone. The questions, the etiquette and the things employers worry about are subtly different. Candidates who prepare for those differences stand out immediately, because they signal that they understand what relocating really involves.",
        "sections": [
            {"h2": "Research the market, not just the company", "paras": [
                "Before an international interview, learn the basics of the destination market: the cost of living, typical working hours, public holidays and the local business culture. Employers notice when a candidate has clearly thought about life there, not just the job.",
                "Understand the company's local presence too. Are you joining an established office or a new team? Is the role client-facing with local customers? The answers shape the questions you should ask."
            ], "list": [
                "Cost of living and typical salary ranges in the destination city",
                "Working hours, weekend patterns and public holidays",
                "Local business etiquette and communication style",
                "The company's history and reputation in that market",
                "Visa and relocation expectations for the role"
            ]},
            {"h2": "Prepare for the relocation questions", "paras": [
                "International employers almost always probe your motivation and your readiness to move. They want to know why this country, why now, and whether you have thought about the practicalities. Vague answers create doubt.",
                "Have a clear, honest reason for wanting to relocate, and be ready to talk about family, housing and timelines. If you have lived abroad before, say so; it reassures employers that you can adapt."
            ]},
            {"h2": "Mind the format and the etiquette", "paras": [
                "Many first-round international interviews happen over video, often across awkward time zones. Test your technology, find a quiet, well-lit space and be punctual in the employer's time zone, not your own.",
                "Dress as you would for an in-person interview, even on video. Small signals of professionalism carry more weight when the employer cannot meet you in person."
            ]},
            {"h2": "Ask questions that show you are serious", "paras": [
                "The questions you ask reveal as much as your answers. Ask about onboarding for international hires, how the team supports relocation, and what success looks like in the first six months.",
                "Avoid leading with salary and leave in a first interview. Those conversations matter, but timing affects how you are perceived. Let the employer raise logistics, or raise them respectfully once interest is mutual."
            ]}
        ],
        "pullquote": "Employers notice when a candidate has thought about life there, not just the job.",
        "faqs": [
            ("What should I wear to an international video interview?", "Dress as you would for an in-person interview in that country. When in doubt, choose smart business attire; it signals respect and professionalism."),
            ("Should I mention that I need a visa?", "Yes, but frame it positively. Be clear about your eligibility and readiness, and show that you understand the process. Hiding it wastes everyone's time."),
            ("How do I handle a big time-zone difference?", "Confirm the time in the employer's zone, set multiple alarms, and schedule the interview for a time when you are naturally alert if you can. Never assume the employer has converted the time for you."),
            ("What if I have never lived abroad?", "Emphasise your adaptability, research and genuine motivation. Show that you have thought through the practicalities and are prepared for the change."),
            ("Can a recruiter help me prepare?", "Yes. A good recruitment partner will brief you on the employer, the market and the interview format, and coach you on the relocation questions that international employers always ask.")
        ],
        "related": ["hiring-across-borders-checklist", "five-signs-of-a-great-employer", "relocation-support-what-employees-need"],
        "industries": ["it-technology", "hospitality-tourism", "healthcare-wellness"]
    },
    {
        "slug": "true-cost-of-a-bad-hire",
        "cat": "Hiring",
        "title": "The True Cost of a Bad Hire",
        "seoTitle": "The True Cost of a Bad Hire | Hiring Insights | ARK Global Connect",
        "desc": "Recruitment fees are the smallest part of the cost. We break down what a wrong hire really costs a business, from lost productivity to team impact and customer damage.",
        "keywords": "cost of a bad hire, bad hire cost, recruitment ROI, hiring mistakes, employee turnover cost, hiring risk, talent acquisition cost",
        "date": "14 Jan 2026",
        "dateISO": "2026-01-14",
        "read": "6 min",
        "author": "Raghavendra Shetty",
        "authorRole": "Founder & Managing Director, ARK Global Connect",
        "hero": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Business team meeting discussing the cost of a bad hire",
        "lead": "Recruitment fees are the smallest part of the cost. Here is what a wrong hire really costs a business, and why the cheapest hire is rarely the least expensive.",
        "intro": "When a hire goes wrong, the first number people reach for is the recruitment fee. It is the most visible cost and the easiest to quantify. But it is almost never the biggest. The real expense of a bad hire is spread across productivity, management time, team morale and customer relationships, and it rarely appears on a single line of a spreadsheet.",
        "sections": [
            {"h2": "The visible costs are only the beginning", "paras": [
                "The obvious costs include the recruitment fee, the salary paid during the underperformance period, and the cost of re-hiring. Add onboarding and training time, and the figure already climbs well beyond the original fee.",
                "For a mid-level role, the total direct cost of a bad hire is commonly estimated at several months of salary. For senior or specialist roles, it can be far higher."
            ], "list": [
                "Recruitment and agency fees",
                "Salary and benefits during the underperformance period",
                "Onboarding, training and equipment costs",
                "The cost of re-advertising and re-hiring",
                "Severance or notice-period costs"
            ]},
            {"h2": "The hidden costs do the real damage", "paras": [
                "The most expensive consequences are the ones you cannot easily measure. A poor performer drags down the team, consumes a manager's time, and can drive good people to leave. In customer-facing roles, the damage reaches clients.",
                "There is also an opportunity cost. Every month spent managing a bad hire is a month not spent on growth, and every role left unfilled or filled badly is value the business never captures."
            ]},
            {"h2": "Why bad hires happen", "paras": [
                "Bad hires are rarely the result of bad luck. They usually come from a rushed process, an unclear role definition, a decision made on likeability rather than evidence, or a failure to check references properly.",
                "When a role is urgent, the temptation is to lower the bar to fill the seat. That decision almost always costs more than waiting for the right person."
            ]},
            {"h2": "How to reduce the risk", "paras": [
                "Define the role clearly before you advertise it. Use structured interviews and a work sample. Check references properly. And be willing to walk away from a candidate who does not meet the bar, however tired you are of searching.",
                "A specialist recruitment partner earns their fee not by filling seats quickly, but by protecting you from the far larger cost of filling them badly."
            ]}
        ],
        "pullquote": "The cheapest hire is rarely the least expensive.",
        "faqs": [
            ("How much does a bad hire really cost?", "Common estimates put the total cost at several months of salary for a mid-level role, and considerably more for senior or specialist positions once productivity, management time and turnover are included."),
            ("What is the biggest hidden cost of a bad hire?", "The impact on team morale and the risk of losing good employees who are affected by a poor performer. That knock-on turnover is often the most expensive consequence."),
            ("How can I avoid making a bad hire?", "Define the role clearly, use structured interviews and work samples, check references properly, and be prepared to wait rather than lower the bar to fill a seat quickly."),
            ("Is it cheaper to hire quickly or to wait?", "Waiting for the right candidate is almost always cheaper in the long run. The cost of a bad hire typically dwarfs the cost of a slightly longer search."),
            ("How does a recruiter reduce hiring risk?", "A specialist recruiter screens for fit and motivation, validates references and presents a documented shortlist, which reduces the chance of a costly mismatch.")
        ],
        "related": ["best-hire-not-best-cv", "volume-hiring-without-losing-quality", "remote-hr-when-it-makes-sense"],
        "industries": ["bfsi", "sales-marketing", "manufacturing-engineering"]
    },
    {
        "slug": "employee-handbook-people-read",
        "cat": "HR",
        "title": "Building an Employee Handbook That People Read",
        "seoTitle": "Building an Employee Handbook That People Read | HR Insights | ARK Global Connect",
        "desc": "Most handbooks gather dust. A few simple changes can turn yours into a tool employees actually use, improving clarity, compliance and culture.",
        "keywords": "employee handbook, HR policy, staff handbook, workplace policies, employee onboarding, HR documentation, company culture",
        "date": "06 Jan 2026",
        "dateISO": "2026-01-06",
        "read": "5 min",
        "author": "Raghavendra Shetty",
        "authorRole": "Founder & Managing Director, ARK Global Connect",
        "hero": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "HR manager reviewing an employee handbook with a colleague",
        "lead": "Most handbooks gather dust. A few simple changes can turn yours into a tool employees actually use, improving clarity, compliance and culture at the same time.",
        "intro": "The employee handbook occupies an awkward place in most companies. It is written once, usually in a hurry, and then ignored until something goes wrong. Employees do not read it, managers do not reference it, and it slowly drifts out of date. Yet a good handbook is one of the cheapest and most effective HR tools available, if it is built to be used rather than filed.",
        "sections": [
            {"h2": "Write for people, not for lawyers", "paras": [
                "A handbook has to be legally sound, but it does not have to read like a contract. Plain language, short sections and clear headings make policies easier to understand and easier to follow.",
                "Where a rule exists, explain why. Employees follow policies they understand far more willingly than policies that feel arbitrary."
            ], "list": [
                "Use plain language and short sentences",
                "Lead with the most-used policies, not the legal boilerplate",
                "Explain the reason behind important rules",
                "Use headings and a table of contents so people can find things fast",
                "Keep it consistent with how the company actually operates"
            ]},
            {"h2": "Cover the things people actually ask about", "paras": [
                "Most day-to-day questions are predictable: leave and holidays, working hours and flexibility, pay dates, expenses, sickness, remote work and how to raise a concern. If these are clear, you remove a huge amount of routine admin.",
                "Compliance topics such as conduct, confidentiality, data protection and anti-harassment still belong in the handbook, but they should sit alongside the practical policies rather than burying them."
            ]},
            {"h2": "Make it easy to find and easy to update", "paras": [
                "A handbook that lives only as a PDF attachment is a handbook nobody reads. Put it somewhere accessible, link to it during onboarding, and reference it in relevant moments rather than expecting people to memorise it.",
                "Review it at least annually, and whenever the law or your working practices change. An out-of-date handbook is worse than none, because it creates false confidence."
            ]},
            {"h2": "Use it to shape culture, not just compliance", "paras": [
                "The best handbooks do more than protect the company. They communicate what the company values, how decisions are made and what employees can expect from their managers. That makes them a cultural document as much as a legal one.",
                "When a handbook reflects the real culture, new hires settle faster and managers have a shared reference point for difficult conversations."
            ]}
        ],
        "pullquote": "An out-of-date handbook is worse than none, because it creates false confidence.",
        "faqs": [
            ("How long should an employee handbook be?", "As short as it can be while still covering the essentials. Many effective handbooks run to twenty or thirty pages of clear, well-organised content rather than a hundred pages of boilerplate."),
            ("How often should a handbook be updated?", "At least once a year, and immediately whenever employment law or your working practices change. Assign someone to own the review so it does not slip."),
            ("Should the handbook be digital or printed?", "Digital is usually better because it is easier to update and access. Provide a printed copy only if employees request one or if local rules require it."),
            ("Does a handbook protect the company legally?", "It helps, provided it is accurate, up to date and consistently applied. A handbook that contradicts actual practice can create more risk than it removes."),
            ("Can an HR partner write our handbook?", "Yes. An HR partner can draft a compliant, plain-language handbook tailored to your sector and size, and set up a review cycle so it stays current.")
        ],
        "related": ["remote-hr-when-it-makes-sense", "five-signs-of-a-great-employer", "best-hire-not-best-cv"],
        "industries": ["human-resources", "facilities-administration", "education-training"]
    },
    {
        "slug": "relocation-support-what-employees-need",
        "cat": "Global Mobility",
        "title": "Relocation Support: What Employees Really Need",
        "seoTitle": "Relocation Support: What Employees Really Need | Global Mobility | ARK Global Connect",
        "desc": "A smooth relocation is about more than flights and paperwork. Learn what actually helps international employees settle in and stay for the long term.",
        "keywords": "relocation support, employee relocation, international relocation, relocation assistance, global mobility, settling in abroad, relocation package",
        "date": "18 Dec 2025",
        "dateISO": "2025-12-18",
        "read": "6 min",
        "author": "Raghavendra Shetty",
        "authorRole": "Founder & Managing Director, ARK Global Connect",
        "hero": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Employee relocating internationally with luggage at an airport",
        "lead": "A smooth relocation is about more than flights and paperwork. Here is what actually helps international employees settle in and stay for the long term.",
        "intro": "Relocation support is often treated as a logistics problem: book the flight, arrange the visa, find a flat. Those things matter, but they are not what determines whether an international hire thrives. What determines success is how supported the person feels during the first few months, when everything is unfamiliar and small problems feel large.",
        "sections": [
            {"h2": "The practical basics still matter", "paras": [
                "Start with the essentials: a place to live, a way to get around, a bank account, a phone number and a clear understanding of how pay and benefits work locally. Getting these right early removes a huge amount of stress.",
                "Housing is usually the biggest concern. Temporary accommodation for the first few weeks, followed by help finding something permanent, is far more valuable than a lump sum with no guidance."
            ], "list": [
                "Temporary accommodation on arrival",
                "Help finding permanent housing",
                "Local bank account and phone setup",
                "Transport or a clear explanation of local options",
                "A named contact for practical questions"
            ]},
            {"h2": "The human side is what people remember", "paras": [
                "Beyond logistics, employees need to feel welcomed. A buddy, a team lunch, an introduction to the neighbourhood and a manager who checks in regularly all make a measurable difference to how quickly someone settles.",
                "Loneliness and culture shock are real, especially for employees who relocate alone. Acknowledging that and providing a support network is not soft; it is retention strategy."
            ]},
            {"h2": "Get the paperwork right before day one", "paras": [
                "Visas, work permits, tax registration and local compliance are the parts of relocation that cause the most anxiety, and rightly so. A delay in a work permit can leave a new hire unable to start, and a misunderstanding about tax can create problems that take months to unwind.",
                "The fix is to start early and keep the employee informed. A clear timeline of what happens when, who is responsible for each step, and what documents are needed removes the guesswork and prevents last-minute panic."
            ], "list": [
                "Visa and work permit handled before the start date",
                "Tax and social security registration explained clearly",
                "A document checklist shared well in advance",
                "Regular status updates so nothing is a surprise"
            ]},
            {"h2": "Support the family, not just the employee", "paras": [
                "When someone relocates with a partner or children, the whole family relocates. If the partner cannot work or the children cannot settle into school, the employee will often leave, however much they like the job.",
                "Practical help with partner employment, schooling and community connections is one of the most effective retention investments an employer can make."
            ]},
            {"h2": "Check in beyond the first month", "paras": [
                "Many employers focus on the first week and then move on. But the three-to-six month mark is when the novelty fades and the real adjustment happens. Structured check-ins at thirty, sixty and ninety days catch problems before they become resignations.",
                "Ask specific questions: how is the housing, how is the team, how is the family settling. Vague reassurance hides real issues."
            ]}
        ],
        "pullquote": "Loneliness and culture shock are real. Acknowledging that is not soft; it is retention strategy.",
        "faqs": [
            ("What should a relocation package include?", "At minimum: temporary accommodation, help finding permanent housing, visa and documentation support, and a named contact. Family support and language help add significant value for longer assignments."),
            ("How long should relocation support last?", "Practical support should cover at least the first ninety days, with check-ins at thirty, sixty and ninety days. Many employers extend support to six months for family relocations."),
            ("Is a lump sum better than managed support?", "A lump sum is simpler for the employer but often less effective. Managed support, especially for housing and settling in, tends to produce better outcomes and lower early attrition."),
            ("How do I support a relocating family?", "Help with partner employment, schooling and community connections. When the family settles, the employee stays; when the family struggles, the employee usually leaves."),
            ("Can a mobility partner handle relocation end to end?", "Yes. A global mobility partner can manage visas, housing, settling-in support and check-ins, giving the employee a single point of contact and the employer peace of mind.")
        ],
        "related": ["hiring-across-borders-checklist", "international-interview-preparation", "remote-hr-when-it-makes-sense"],
        "industries": ["hospitality-tourism", "logistics-supply-chain", "manufacturing-engineering"]
    },
    {
        "slug": "five-signs-of-a-great-employer",
        "cat": "Candidates",
        "title": "Five Signs of a Great Employer",
        "seoTitle": "Five Signs of a Great Employer | Candidate Insights | ARK Global Connect",
        "desc": "Before you accept an offer, look for these five signals that a company genuinely invests in its people, from how it hires to how it treats employees day to day.",
        "keywords": "great employer, how to evaluate a job offer, signs of a good company, choosing an employer, workplace culture, employee wellbeing, job offer checklist",
        "date": "10 Dec 2025",
        "dateISO": "2025-12-10",
        "read": "4 min",
        "author": "Raghavendra Shetty",
        "authorRole": "Founder & Managing Director, ARK Global Connect",
        "hero": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Happy employees collaborating in a positive workplace",
        "lead": "Before you accept an offer, look for these five signals that a company genuinely invests in its people. They will tell you more than any salary figure.",
        "intro": "Choosing an employer is one of the biggest decisions you will make, and it is easy to be swayed by a strong brand or a generous offer. But the things that determine whether you will be happy and successful two years from now are rarely visible on the offer letter. They show up in how the company behaves during the hiring process and how it treats people once they are in.",
        "sections": [
            {"h2": "1. They run a thoughtful hiring process", "paras": [
                "How a company hires is a preview of how it manages. A structured, respectful process with clear communication suggests an organisation that values people and plans ahead. A chaotic process, with missed interviews and vague answers, is a warning sign.",
                "Notice whether they ask about your goals, not just your skills. Employers who care about fit and growth tend to keep people longer."
            ]},
            {"h2": "2. Employees stay and grow", "paras": [
                "Ask how long people typically stay and whether the team has grown internally. High turnover, or a habit of hiring senior people from outside while ignoring internal talent, tells you something important.",
                "If you can, speak to a current employee. Their enthusiasm, or lack of it, is hard to fake."
            ]},
            {"h2": "3. They are honest about the hard parts", "paras": [
                "Great employers do not pretend the job is perfect. They are candid about challenges, expectations and what success looks like. Honesty during hiring builds trust and reduces the chance of a painful surprise later.",
                "Be wary of employers who only sell. The best ones tell you what is difficult as well as what is exciting."
            ]},
            {"h2": "4. They invest in development", "paras": [
                "Look for real evidence of learning and development: budgets, mentoring, clear progression paths and time set aside for growth. Vague promises of 'opportunities to develop' mean little without specifics.",
                "Ask what happened to the last person in the role. Their trajectory is a strong signal of what yours might be."
            ]},
            {"h2": "5. They respect your time and boundaries", "paras": [
                "From the first email to the final offer, notice how the company treats your time. Do they respond promptly? Do they respect the interview schedule? Do they pressure you to decide instantly?",
                "Employers who respect candidates during hiring usually respect employees afterwards. The reverse is also true."
            ]}
        ],
        "pullquote": "How a company hires is a preview of how it manages.",
        "faqs": [
            ("What is the most important sign of a good employer?", "How they treat people during the hiring process. It is the most reliable preview of how they will treat you as an employee."),
            ("Should I ask about turnover in an interview?", "Yes, and it is a fair question. Ask how long people typically stay and how the team has grown. A confident employer will answer openly."),
            ("How do I check if a company really invests in development?", "Ask for specifics: training budgets, mentoring, progression examples and what happened to the last person in the role. Concrete answers are a good sign."),
            ("Is a high salary a sign of a great employer?", "Not on its own. Pay matters, but culture, growth and how people are treated determine whether you will be happy and stay. A high salary in a poor culture rarely ends well."),
            ("Can a recruiter tell me what a company is really like?", "Yes. A good recruiter has placed people there before and can give you an honest view of the culture, the manager and the realistic day-to-day experience.")
        ],
        "related": ["international-interview-preparation", "best-hire-not-best-cv", "remote-hr-when-it-makes-sense"],
        "industries": ["it-technology", "sales-marketing", "bfsi"]
    },
    {
        "slug": "volume-hiring-without-losing-quality",
        "cat": "Hiring",
        "title": "Volume Hiring Without Losing Quality",
        "seoTitle": "Volume Hiring Without Losing Quality | Hiring Insights | ARK Global Connect",
        "desc": "Scaling headcount fast usually means cutting corners. It doesn't have to. Learn how to keep the hiring bar high while recruiting at volume.",
        "keywords": "volume hiring, bulk recruitment, mass hiring, high volume recruitment, scaling headcount, recruitment process, hiring at scale",
        "date": "02 Dec 2025",
        "dateISO": "2025-12-02",
        "read": "7 min",
        "author": "Raghavendra Shetty",
        "authorRole": "Founder & Managing Director, ARK Global Connect",
        "hero": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80",
        "heroAlt": "Recruitment team managing a high volume hiring campaign",
        "lead": "Scaling headcount fast usually means cutting corners. It does not have to. Here is how to keep the hiring bar high while recruiting at volume.",
        "intro": "Volume hiring is where good recruitment processes go to die. Under pressure to fill dozens or hundreds of roles, teams abandon the discipline that made their hiring work and start making decisions on gut feel. The result is a wave of poor hires that costs far more than the delay would have. But volume and quality are not opposites. With the right process, you can hire fast and hire well.",
        "sections": [
            {"h2": "Standardise before you scale", "paras": [
                "The single most important step is to standardise the process before the volume arrives. Define the role once, build a scorecard, and use the same structured interview and assessment for every candidate. Consistency is what protects quality at scale.",
                "When every interviewer asks the same questions and scores against the same rubric, you can compare candidates fairly and make faster decisions without lowering the bar."
            ], "list": [
                "One clear role definition and scorecard per position",
                "A structured interview guide used by every interviewer",
                "A short, relevant assessment or work sample",
                "A defined decision rule for advancing candidates",
                "A single source of truth for candidate status"
            ]},
            {"h2": "Build a pipeline, not a scramble", "paras": [
                "Volume hiring fails when it starts too late. Instead of reacting to each vacancy, build a standing pipeline of pre-screened candidates for the roles you hire most often. When demand spikes, you are selecting from a warm pool rather than starting from zero.",
                "Talent pools, referrals and community partnerships all feed a pipeline. The investment pays off every time you need to hire quickly."
            ]},
            {"h2": "Use technology for the routine, people for the judgement", "paras": [
                "Applicant tracking systems, automated scheduling and structured assessments handle the repetitive work so your recruiters can focus on judgement and candidate experience. Technology should speed up the process, not replace the human decisions that matter.",
                "Be careful not to automate the parts that need a human touch. Candidates remember how they were treated, even when they are not hired."
            ]},
            {"h2": "Protect the candidate experience", "paras": [
                "At volume, it is easy to treat candidates as numbers. But every candidate is a potential customer, referrer or future employee. Clear communication, timely updates and respectful rejection all protect your employer brand.",
                "A poor experience at volume damages your reputation in the market, making the next round of hiring even harder. Speed and courtesy are not in conflict."
            ]}
        ],
        "pullquote": "Volume and quality are not opposites. With the right process, you can hire fast and hire well.",
        "faqs": [
            ("How do I hire at volume without lowering standards?", "Standardise the process first: one role definition, one scorecard, one structured interview and assessment used for every candidate. Consistency is what protects quality at scale."),
            ("What is the biggest mistake in volume hiring?", "Starting too late and reacting to each vacancy instead of building a standing pipeline of pre-screened candidates for the roles you hire most often."),
            ("Should I use technology for high-volume hiring?", "Yes, for the routine work such as scheduling, tracking and assessments. Keep human judgement for the decisions that matter, and protect the candidate experience."),
            ("How do I keep candidates engaged during a long process?", "Communicate clearly and often, set expectations about timelines, and give timely updates even when the news is not positive. Respect protects your employer brand."),
            ("Can a recruitment partner handle volume hiring?", "Yes. A staffing partner can build and manage a talent pipeline, run structured screening and assessments, and deliver a steady flow of quality candidates without you lowering the bar.")
        ],
        "related": ["true-cost-of-a-bad-hire", "best-hire-not-best-cv", "hiring-across-borders-checklist"],
        "industries": ["logistics-supply-chain", "retail-ecommerce", "manufacturing-engineering"]
    }
]

def by_slug(s):
    for a in ARTICLES:
        if a["slug"] == s:
            return a
    return None

def file_for(slug):
    return "insight-%s.html" % slug

# ---------------------------------------------------------------- JSON-LD
def jsonld(a):
    url = "https://arkglobalconnect.com/%s" % file_for(a["slug"])
    blog = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": a["title"],
        "description": a["desc"],
        "image": a["hero"],
        "datePublished": a["dateISO"],
        "dateModified": a["dateISO"],
        "author": {"@type": "Person", "name": a["author"]},
        "publisher": {
            "@type": "Organization",
            "name": "ARK Global Connect",
            "logo": {"@type": "ImageObject", "url": "https://arkglobalconnect.com/assets/logo.png"}
        },
        "mainEntityOfPage": {"@type": "WebPage", "@id": url},
        "articleSection": a["cat"],
        "keywords": a["keywords"]
    }
    crumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://arkglobalconnect.com/index.html"},
            {"@type": "ListItem", "position": 2, "name": "Insights", "item": "https://arkglobalconnect.com/insights.html"},
            {"@type": "ListItem", "position": 3, "name": a["title"], "item": url}
        ]
    }
    faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": ans}}
            for q, ans in a["faqs"]
        ]
    }
    return json.dumps([blog, crumb, faq], ensure_ascii=False, indent=2)

# ---------------------------------------------------------------- HTML helpers
def sections_html(a):
    out = []
    for s in a["sections"]:
        if not s.get("h2"):
            continue
        block = ['<h2>%s</h2>' % esc(s["h2"])]
        for p in s.get("paras", []):
            block.append("<p>%s</p>" % esc(p))
        if s.get("list"):
            block.append("<ul>" + "".join("<li>%s</li>" % esc(li) for li in s["list"]) + "</ul>")
        out.append("\n".join(block))
    return "\n".join(out)

def faq_html(a):
    return "\n".join(
        '<div class="faq-item"><button class="faq-q">%s<span></span></button><div class="faq-a"><p>%s</p></div></div>'
        % (esc(q), esc(ans)) for q, ans in a["faqs"]
    )

def related_articles_html(a):
    cards = []
    for i, slug in enumerate(a["related"]):
        r = by_slug(slug)
        if not r:
            continue
        cards.append(
            '<a href="%s" class="insight-card reveal reveal-delay-%d">'
            '<div class="insight-img"><img src="%s" alt="%s" loading="lazy"></div>'
            '<div class="insight-body"><span class="insight-cat">%s</span>'
            '<h3>%s</h3><p>%s</p>'
            '<span class="link-arrow">Read article &rarr;</span></div></a>'
            % (file_for(slug), i % 3, r["hero"], esc(r["title"]), esc(r["cat"]), esc(r["title"]), esc(r["desc"][:110] + ("..." if len(r["desc"]) > 110 else "")))
        )
    return "\n".join(cards)

IND_NAMES = {
    "hospitality-tourism": "Hospitality & Tourism",
    "it-technology": "IT & Technology",
    "retail-ecommerce": "Retail & E-commerce",
    "bfsi": "BFSI",
    "real-estate-construction": "Real Estate & Construction",
    "healthcare-wellness": "Healthcare & Wellness",
    "logistics-supply-chain": "Logistics & Supply Chain",
    "manufacturing-engineering": "Manufacturing & Engineering",
    "education-training": "Education & Training",
    "sales-marketing": "Sales & Marketing",
    "human-resources": "Human Resources",
    "facilities-administration": "Facilities & Administration",
}

def related_industries_html(a):
    cards = []
    for i, slug in enumerate(a["industries"]):
        name = IND_NAMES.get(slug, slug)
        cards.append(
            '<a href="industry-%s.html" class="card reveal reveal-delay-%d">'
            '<div class="card-icon" data-icon="layers"></div>'
            '<h3>%s</h3><p>%s recruitment &mdash; sector-specific hiring expertise.</p>'
            '<span class="link-arrow">Explore %s &rarr;</span></a>'
            % (slug, i % 3, esc(name), esc(name), esc(name))
        )
    return "\n".join(cards)

# ---------------------------------------------------------------- TEMPLATE
TEMPLATE = """\ufeff<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{seoTitle}</title>
<meta name="description" content="{desc}">
<meta name="keywords" content="{keywords}">
<meta name="author" content="{author}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:title" content="{title} | ARK Global Connect">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://arkglobalconnect.com/{file}">
<meta property="og:image" content="{hero}">
<meta property="og:site_name" content="ARK Global Connect">
<meta property="article:published_time" content="{dateISO}">
<meta property="article:section" content="{cat}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title} | ARK Global Connect">
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

<!-- ============ ARTICLE HERO ============ -->
<section class="page-hero article-hero">
  <div class="hero-media" aria-hidden="true">
    <img src="{hero}" alt="{heroAlt}" loading="eager" fetchpriority="high">
  </div>
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="insights.html">Insights</a><span>/</span><span>{cat}</span></nav>
    <span class="eyebrow">{cat}</span>
    <h1 class="h1">{title}</h1>
    <p class="lead max-720">{lead}</p>
    <div class="article-meta">
      <span class="am-author">{author}</span>
      <span class="am-dot">&middot;</span>
      <time datetime="{dateISO}">{date}</time>
      <span class="am-dot">&middot;</span>
      <span>{read} read</span>
    </div>
  </div>
</section>

<!-- ============ ARTICLE BODY ============ -->
<section class="section bg-ivory">
  <div class="container">
    <div class="article-layout">
      <article class="article-body prose reveal">
        <p class="article-intro">{intro}</p>
        {sections}
        <blockquote class="pull-quote">{pullquote}</blockquote>
        <div class="article-share">
          <span>Share this article</span>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://arkglobalconnect.com/{file}" target="_blank" rel="noopener" aria-label="Share on LinkedIn">LinkedIn</a>
          <a href="https://twitter.com/intent/tweet?url=https://arkglobalconnect.com/{file}&text={title}" target="_blank" rel="noopener" aria-label="Share on X">X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https://arkglobalconnect.com/{file}" target="_blank" rel="noopener" aria-label="Share on Facebook">Facebook</a>
          <a href="https://wa.me/?text={title}%20https://arkglobalconnect.com/{file}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">WhatsApp</a>
        </div>
        <div class="author-box">
          <div class="author-avatar">{authorInitials}</div>
          <div>
            <h4>{author}</h4>
            <p class="muted">{authorRole}</p>
          </div>
        </div>
      </article>
      <aside class="article-side reveal reveal-delay-2">
        <div class="side-card">
          <h4>Talk to ARK</h4>
          <p class="muted">Need help applying this to your business? Our consultants are happy to help.</p>
          <a href="hire.html" class="btn btn-gold btn-block">Start a Search</a>
          <a href="contact.html" class="btn btn-outline btn-block mt-2">Contact Us</a>
        </div>
        <div class="side-card">
          <h4>Explore Industries</h4>
          <a href="industries.html" class="link-arrow">All Industries &rarr;</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<!-- ============ FAQ (AEO) ============ -->
<section class="section bg-beige">
  <div class="container max-820">
    <div class="text-center mb-3 reveal"><span class="eyebrow center">FAQ</span><h2 class="h2">Frequently Asked Questions</h2></div>
    {faqs}
  </div>
</section>

<!-- ============ RELATED ARTICLES ============ -->
<section class="section bg-cream">
  <div class="container">
    <div class="text-center mb-4 reveal"><span class="eyebrow center">Keep Reading</span><h2 class="h2">Related Insights</h2></div>
    <div class="grid g3">
      {related}
    </div>
  </div>
</section>

<!-- ============ RELATED INDUSTRIES ============ -->
<section class="section bg-ivory">
  <div class="container">
    <div class="text-center mb-4 reveal"><span class="eyebrow center">Where We Hire</span><h2 class="h2">Related Industries</h2></div>
    <div class="grid g3">
      {industries}
    </div>
  </div>
</section>

<!-- ============ CTA ============ -->
<section class="section bg-dark">
  <div class="container text-center">
    <span class="eyebrow center light reveal">Let's Begin</span>
    <h2 class="h2 reveal" style="color:var(--light)">Ready to Hire Better?</h2>
    <p class="lead max-720 mx-auto reveal" style="color:rgba(255,255,255,0.75)">Tell us about the role. We'll tell you honestly how we'd approach it, how long it should take and what it will cost.</p>
    <div class="hero-actions reveal mt-3" style="justify-content:center">
      <a href="hire.html" class="btn btn-gold btn-lg">Start a Search</a>
      <a href="insights.html" class="btn btn-ghost-light btn-lg">More Insights</a>
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

def build(a):
    initials = "".join(w[0] for w in a["author"].split()[:2]).upper()
    vals = {
        "seoTitle": esc(a["seoTitle"]),
        "desc": esc(a["desc"]),
        "keywords": esc(a["keywords"]),
        "author": esc(a["author"]),
        "authorRole": esc(a["authorRole"]),
        "authorInitials": initials,
        "title": esc(a["title"]),
        "cat": esc(a["cat"]),
        "date": esc(a["date"]),
        "dateISO": a["dateISO"],
        "read": esc(a["read"]),
        "hero": a["hero"],
        "heroAlt": esc(a["heroAlt"]),
        "lead": esc(a["lead"]),
        "intro": esc(a["intro"]),
        "sections": sections_html(a),
        "pullquote": esc(a["pullquote"]),
        "faqs": faq_html(a),
        "related": related_articles_html(a),
        "industries": related_industries_html(a),
        "jsonld": jsonld(a),
        "file": file_for(a["slug"]),
    }
    out = TEMPLATE
    for k, v in vals.items():
        out = out.replace("{" + k + "}", str(v))
    return out

def main():
    for a in ARTICLES:
        path = os.path.join(OUT, file_for(a["slug"]))
        with open(path, "w", encoding="utf-8") as f:
            f.write(build(a))
        print("wrote", file_for(a["slug"]))
    print("\nTotal: %d insight pages" % len(ARTICLES))

if __name__ == "__main__":
    main()
