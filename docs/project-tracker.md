## Project Plan & Tracker

### Current Focus
- **Phase:** M4 – Engineering & Integration kickoff
- **Active Stories:** S10 (Foundation Setup), S11 (Page & Component Development)
- **Objectives this cycle:** Scaffold Next.js 15 project with Tailwind/Radix, configure CI/CD, and ship baseline layout (header/footer/home shell) to staging.

### Phase Overview
1. **Discovery & Strategy (Week 1-2)**
   - Conduct stakeholder interviews, gather brand assets, validate production stats (capacity, certifications), and finalize KPI targets.
   - Perform competitive analysis, SEO keyword research, and audit existing digital listings (Justdial, IndiaMART, Handlooms, Tata nexarc, Mappls, LinkedIn) for consistency gaps.
   - Define content architecture, sitemap, and storytelling pillars anchored in verified heritage and facility data.
2. **Experience & Visual Design (Week 3-5)**
   - Compile mood boards and style tiles to lock visual direction (color, typography, imagery, iconography).
   - Develop responsive wireframes for key pages (homepage, catalogue, industry, manufacturing, locations, resources, contact).
   - Produce high-fidelity UI screens, component library, interaction states, and annotations in Figma; validate with stakeholders and iterate.
3. **Content Production (Week 4-6)**
   - Draft copy for all pages, product specs, CTAs, and resource assets leveraging validated facts and testimonials.
   - Coordinate photography/videography, edit assets, prepare downloadable brochures, and capture facility/location imagery (Gandhi Nagar & MIDC).
   - Load structured content into Sanity CMS with review workflow including compliance and data verification checkpoints.
4. **Engineering & Integration (Week 5-8)**
   - Set up repository, CI/CD, environments, and base Next.js project.
   - Implement responsive layouts, component library, and CMS integration.
   - Build forms, serverless lead pipeline, analytics instrumentation, and consent management.
   - Configure CRM sync, email notifications, and monitoring.
5. **Quality Assurance & Launch (Week 8-9)**
   - Execute functional, accessibility, performance, and cross-browser testing.
   - Run Lighthouse CI, fix regressions, and validate analytics events.
   - Prepare launch checklist, DNS cutover, and post-launch monitoring.
6. **Growth & Optimization (Ongoing)**
   - Track KPIs, analyze heatmaps, and iterate content/UX enhancements.
   - Launch blog cadence, run A/B tests on CTAs, and explore personalization pilots.

### Workstream Tracker
Use the table below to manage tasks. Update `Status`, `Owner`, and `Due` regularly. Add additional rows per phase task. For full milestone → story → task hierarchy, see `docs/roadmap.md`.

| ID | Phase | Task | Deliverables | Owner | Status | Due | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D1 | Discovery | Stakeholder workshop | Interview notes, KPI brief |  | In Progress |  | See `docs/discovery/stakeholder-interviews.md` for plan (running in parallel) |
| D2 | Discovery | Competitive & SEO audit | SWOT matrix, keyword list |  | Not Started |  |  |
| D3 | Discovery | Sitemap & content model | IA diagram, CMS schema draft |  | Not Started |  |  |
| D4 | Discovery | Directory & listing audit | Consolidated fact sheet (contacts, addresses, categories) |  | Not Started |  | Requires alignment across Justdial/IndiaMART/Mappls |
| X1 | Design | Mood board & style tiles | Visual direction deck, design principles |  | Not Started |  | Share for stakeholder sign-off |
| X2 | Design | Wireframe key pages | Low/high fidelity wireframes |  | Not Started |  | Include Locations & Heritage pages |
| X3 | Design | High-fidelity UI & components | Figma UI kit, component library |  | Not Started |  | Sync tokens with Tailwind/Radix |
| X4 | Design | Design QA & handoff | Annotated specs, asset exports, change log |  | Not Started |  | Pair with engineering for build readiness |
| C1 | Content | Draft page copy | Copy deck per page |  | Not Started |  | Incorporate validated production stats |
| C2 | Content | Produce media assets | Photo/video package, edited |  | Not Started |  | Capture both facilities & manufacturing lines |
| C3 | Content | Testimonial & case study curation | Approved quotes, success stories, review excerpts |  | Not Started |  | Source from Justdial/IndiaMART with consent |
| C4 | Content | Compliance & fact verification pass | Sign-off log, updated fact sheet |  | Not Started |  | Coordinate with operations/legal |
| E1 | Engineering | Initialize repo & CI | Repo, env config, lint/test setup |  | Completed |  | Next.js 15 scaffold, Tailwind CSS, Radix UI, Prisma, GitHub Actions CI/CD, testing setup (Vitest, Playwright), Storybook configured |
| E2 | Engineering | Implement frontend | Responsive components, routing |  | In Progress |  | Header, Footer, Homepage components created. Need to install dependencies and test. |
| E3 | Engineering | Integrate CMS & data | Sanity schemas, ISR workflows |  | Planned |  | Model products, locations, heritage timeline |
| E4 | Engineering | Lead capture workflow | GA4 events, serverless endpoints |  | Planned |  | CRM sync with referral tagging & directory integration |
| E5 | Engineering | Analytics & consent setup | GTM containers, consent manager, Hotjar config |  | Planned |  | Validate event naming with data team |
| Q1 | QA & Launch | Comprehensive testing | Test reports, bug fixes, sign-off |  | Not Started |  |  |
| Q2 | QA & Launch | Launch readiness | Checklist, DNS plan, comms draft |  | Not Started |  |  |
| G1 | Growth | Analytics review cadence | Monthly dashboards, insights |  | Not Started |  |  |
| G2 | Growth | Optimization backlog | Prioritized roadmap |  | Not Started |  |  |

### Tracking Guidelines
- Maintain tracker in shared workspace (Notion/Sheets) linked to this document; sync statuses during weekly stand-ups.
- Assign owners and due dates once the delivery team is finalized; color-code statuses for quick scanning.
- Record dependencies and blockers in the `Notes` column; escalate issues in project syncs.
- Align tracker IDs with issue tracker tickets (e.g., Linear `E2` -> `LIN-102`).
- Review metrics and qualitative feedback post-launch to feed into Growth phase backlog.

### Reporting Cadence
- **Weekly:** Progress summary, key decisions, risks, blockers.
- **Bi-weekly:** KPI review (traffic, leads, conversion rates), analytics insights.
- **Monthly:** Strategic review of content performance, SEO ranking shifts, and pipeline impact.
- **Quarterly:** Roadmap update covering Phase 2/3 initiatives and resource planning.

