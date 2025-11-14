## Project Roadmap: Milestones, Stories, Tasks

### Timeline Summary
| Milestone | Duration | Primary Output |
| --- | --- | --- |
| M1. Discovery & Strategy | Week 1–2 | Strategy brief, IA draft, verified fact sheet |
| M2. Experience & Visual Design | Week 3–5 | Approved Figma kit, design QA checklist |
| M3. Content Production | Week 4–6 | Finalized copy, media assets, CMS population |
| M4. Engineering & Integration | Week 5–8 | Functional website, integrations wired |
| M5. Quality Assurance & Launch | Week 8–9 | Tested build, launch plan, communication pack |
| M6. Post-Launch Optimization | Week 10+ | Performance monitoring, growth backlog |

---

### M1. Discovery & Strategy
**Goal:** Align on objectives, verify business facts, and define experience blueprint.

- **Story S1. Brand & Stakeholder Alignment**
  - T1.1 Schedule and conduct stakeholder interviews (owners, sales, operations).
  - T1.2 Capture business goals, buyer personas, KPIs, success metrics.
  - T1.3 Draft strategy brief; circulate for approval.
- **Story S2. Market & Listing Intelligence**
  - T2.1 Audit competing towel manufacturers and best-in-class textile sites.
  - T2.2 Review existing directory listings (Justdial, IndiaMART, Handlooms, Tata nexarc, Mappls, LinkedIn) for data discrepancies.
  - T2.3 Compile authoritative fact sheet (addresses, contacts, capacity stats, certifications); validate with stakeholders.
- **Story S3. Experience Blueprint**
  - T3.1 Map buyer journeys and required content touchpoints.
  - T3.2 Produce sitemap and navigation model.
  - T3.3 Outline analytics measurement plan and success dashboards.

**Milestone Exit Criteria:** Signed-off strategy brief, verified fact sheet, approved IA & measurement plan.

---

### M2. Experience & Visual Design
**Goal:** Translate strategy into a complete, developer-ready design system.

- **Story S4. Visual Direction**
  - T4.1 Develop mood boards blending premium textile cues, Solapur heritage, and modern B2B aesthetics.
  - T4.2 Create style tiles (color palette, typography, iconography, photography treatment).
  - T4.3 Document design principles, accessibility tokens, and stakeholder feedback.
- **Story S5. Wireframing & Prototyping**
  - T5.1 Produce responsive wireframes for key flows (`Home`, `Products`, `Industries`, `Manufacturing`, `Locations`, `Resources`, `About`, `Contact`, lead form).
  - T5.2 Review and iterate wireframes with stakeholders and engineering.
  - T5.3 Build click-through prototype to validate information hierarchy.
- **Story S6. High-Fidelity UI & Design QA**
  - T6.1 Design pixel-perfect screens in Figma; componentize UI elements.
  - T6.2 Sync design tokens with Storybook (spacing, radii, shadows, motion).
  - T6.3 Prepare annotations/redlines, asset exports, and create design QA checklist.
  - T6.4 Conduct joint design/engineering review; log change requests.

**Milestone Exit Criteria:** Approved high-fidelity designs, component library, and design QA pack stored in `design/`.

---

### M3. Content Production
**Goal:** Deliver accurate, compelling content and assets ready for CMS ingestion.

- **Story S7. Content Authoring**
  - T7.1 Draft copy for all page types leveraging validated business facts.
  - T7.2 Produce long-form assets (brochures, spec sheets, blog outlines).
  - T7.3 Translate testimonials/reviews into approved quotes with owner consent.
- **Story S8. Media Capture & Editing**
  - T8.1 Plan and execute photography/videography for facilities and product lines.
  - T8.2 Edit images/videos to match design treatment; export in responsive formats.
  - T8.3 Organize DAM structure within Cloudinary (naming, metadata).
- **Story S9. Content Governance**
  - T9.1 Run compliance and legal review for all copy and assets.
  - T9.2 Populate Sanity schemas; configure review workflows.
  - T9.3 Conduct stakeholder sign-off; log version history.

**Milestone Exit Criteria:** Signed-off copy deck, curated media library, populated CMS ready for engineering integration.

---

### M4. Engineering & Integration
**Goal:** Build the website, integrate services, and ensure data fidelity.

- **Story S10. Foundation Setup**
  - T10.1 Initialize Next.js repo, Tailwind/Radix config, Storybook scaffolding.
  - T10.2 Configure CI/CD (Vercel preview, GitHub Actions for tests/lint/Lighthouse).
  - T10.3 Implement base layout, navigation, and shared components.
- **Story S11. Page & Component Development**
  - T11.1 Build responsive templates for each page; align with design tokens.
  - T11.2 Integrate Mappls maps with facility toggles and Digipin deep links; provide Google Maps fallback.
  - T11.3 Implement product catalogue filters, sustainability & heritage modules, resource library.
  - T11.4 Wire CMS content via Sanity; set up ISR and caching strategy.
- **Story S12. Lead Pipeline & Integrations**
  - T12.1 Develop multi-step RFQ form with server-side validation and progressive profiling.
  - T12.2 Create serverless lead handler (PostgreSQL storage, HubSpot webhook enrichment, directory referral tagging).
  - T12.3 Implement CRM notifications, transactional email via Resend, and WhatsApp CTA logging.
  - T12.4 Instrument analytics (GA4, GTM, server-side Segment) and consent manager; enable Hotjar with rules.
- **Story S13. Operational Tooling**
  - T13.1 Integrate error reporting (Sentry), uptime monitoring, and GA4 anomaly alerts.
  - T13.2 Develop admin utilities (lead export scripts, DSAR data handling).
  - T13.3 Document deployment procedures and environment variables in Notion/README.

**Milestone Exit Criteria:** Feature-complete site in staging with integrations functioning end-to-end and automated pipelines passing.

---

### M5. Quality Assurance & Launch
**Goal:** Validate experience, ensure reliability, and execute launch plan.

- **Story S14. Comprehensive Testing**
  - T14.1 Run functional QA across devices/browsers; log defects in tracker.
  - T14.2 Validate accessibility (WCAG 2.1 AA) via automated scans and manual tests.
  - T14.3 Execute performance tests (Lighthouse CI budgets, Core Web Vitals).
  - T14.4 Confirm analytics events, GA4 dashboards, CRM entries, and consent flows.
- **Story S15. Content & Data Finalization**
  - T15.1 Final content sweep in CMS; ensure SEO metadata, schema markup, and sitemaps are correct.
  - T15.2 Verify map pins, contact details, and external listings cross-links.
  - T15.3 Prepare multilingual/Phase 2 placeholders (where applicable).
- **Story S16. Launch Readiness**
  - T16.1 Build launch checklist: DNS changes, redirects, SSL verification, backup plan.
  - T16.2 Draft communication assets (announcement, email, LinkedIn, IndiaMART/Justdial updates).
  - T16.3 Conduct go/no-go review; secure stakeholder approvals.
  - T16.4 Execute production deployment; monitor immediate post-launch metrics.

**Milestone Exit Criteria:** Production site live, monitoring green, stakeholders notified, launch retrospectives logged.

---

### M6. Post-Launch Optimization & Handoff
**Goal:** Transition to steady-state operations and plan continual improvement.

- **Story S17. Performance Monitoring**
  - T17.1 Track KPIs (traffic, leads, conversions) and heatmaps weekly for first month. ✅
  - T17.2 Create analytics dashboard snapshots and insights report. ✅
  - T17.3 Establish alerts and escalation paths for anomalies. ✅
- **Story S18. Growth Initiatives**
  - T18.1 Populate optimization backlog (A/B tests, personalization pilots, content gaps). ✅
  - T18.2 Plan blog/editorial calendar for next quarter. ✅ (Blog section implemented, ready for content)
  - T18.3 Outline Phase 2 roadmap (multilingual rollout, Algolia search, B2B portal).
- **Story S19. Documentation & Handoff**
  - T19.1 Deliver operations handbook covering CMS workflows, deployment, and integrations.
  - T19.2 Conduct training session with client team (marketing, ops, IT).
  - T19.3 Archive design/engineering artifacts; tag repository release and produce changelog.

**Milestone Exit Criteria:** Client enablement complete, monitoring running, continuous improvement backlog prioritized.

---

### Master Backlog Index
| Milestone | Story | Tasks |
| --- | --- | --- |
| M1 | S1–S3 | T1.1–T3.3 |
| M2 | S4–S6 | T4.1–T6.4 |
| M3 | S7–S9 | T7.1–T9.3 |
| M4 | S10–S13 | T10.1–T13.3 |
| M5 | S14–S16 | T14.1–T16.4 |
| M6 | S17–S19 | T17.1–T19.3 |

Use this index to create milestone-based epics in your chosen PM tool (Linear/Jira) and map IDs (`Sx`, `Tx`) to issue numbers for traceability.

