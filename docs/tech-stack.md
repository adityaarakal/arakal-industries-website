## Technology Stack & Architecture

### Frontend
- **Framework:** Next.js 15 (App Router) for hybrid static & dynamic rendering, superior SEO, and internationalization readiness.
- **UI Library:** Tailwind CSS with Radix UI primitives to rapidly build accessible, responsive components.
- **Design System:** Storybook for component documentation, visual regression testing, and design QA.
- **Forms:** React Hook Form + Zod validation for robust, accessible multi-step forms with server-side fallbacks.
- **Animations & Interactivity:** Framer Motion for subtle motion; GSAP reserved for hero sections or product showcases.
- **Media & Mapping:** Next/Image for responsive, optimized images; Cloudinary for DAM and transformations; Mappls JS SDK for dual-location maps with Digipin deep links and fallback Google Maps embed for international visitors.

### Backend & Integrations
- **Hosting:** Vercel for global edge network, serverless functions (form handling), and build pipeline.
- **Content Management:** Sanity.io as headless CMS enabling structured content, preview drafts, and localization.
- **Lead Capture Workflow:** Serverless API route storing submissions in PostgreSQL (Neon) and forwarding to HubSpot CRM via authenticated webhook with enrichment (directory referral, facility preference, product tags).
- **Directory Sync:** Ingest lightweight feeds/webhooks from IndiaMART & Justdial (where available) into a moderation queue to consolidate enquiries and maintain data parity.
- **Email & Notifications:** Resend for transactional emails (auto-responses, internal alerts) plus WhatsApp Business API (Phase 2) for high-intent follow-up.
- **Analytics & Tag Management:** Google Analytics 4, Google Tag Manager, server-side Segment workspace for event forwarding and downstream modeling.
- **Session Replay:** Hotjar integration with consent-aware loading.
- **Search & Recommendations:** Algolia (Phase 2) for catalogue search and personalization.

### Infrastructure & DevOps
- **Repository:** GitHub with trunk-based strategy, protected main branch, and required PR reviews.
- **CI/CD:** Vercel deployments on PR; GitHub Actions for lint, type-check, unit tests, Lighthouse CI budgets, and integration regression tests (Mappls, HubSpot).
- **Monitoring:** Vercel Analytics, Sentry for error tracking, Better Stack (or Pingdom) for uptime monitoring, and GA4 anomaly alerts for lead form drop-offs.
- **Environment Management:** Doppler for secrets management across environments (dev/staging/production).
- **Caching & CDN:** Vercel Edge CDN with ISR (Incremental Static Regeneration) for catalogue updates; Image CDN via Cloudinary.
- **Security:** OWASP best practices, SSL via Vercel, Content Security Policy, automated dependency scanning (Dependabot), and webhook signature verification for external enquiry sources.

### Data & Privacy
- **Database:** Neon PostgreSQL with Prisma ORM, row-level encryption for sensitive lead data and audit trails for enquiry provenance (web, IndiaMART, Justdial).
- **Compliance:** Cookie consent manager (OneTrust or Cookiebot) integrated with GTM; GDPR-compliant opt-in flows; privacy statements covering analytics, Mappls embeds, and directory data usage.
- **Data Lifecycle:** Automated retention policies (archive leads after 24 months), export tooling for DSAR requests, duplicate detection for multi-channel leads, and manual override process for verified production data updates.

### Tooling & Collaboration
- **Design:** Figma for UX/UI; shared component library synced with Storybook.
- **Project Management:** Linear (or Jira) integrated with GitHub for issue tracking and roadmap management; include “Data Verification” label for tasks requiring stakeholder confirmation.
- **Documentation:** Notion/Docs site for process docs, architecture decisions, and onboarding guides; embed reference summaries (from `docs/references.md`) to keep content aligned.
- **Communication:** Slack/Teams with automation (deployment notifications, alerting) plus CRM alerts for high-value leads routed to sales.

### Scalability & Future Enhancements
- Multi-language support via Next Intl (Phase 2) with Sanity localized content.
- B2B portal extension with authenticated partner login (Phase 3) leveraging Next.js middleware and Clerk authentication.
- Product information management integration for large catalogue synchronization and channel distribution (future PIM).
- Progressive Web App capabilities (offline brochures, add-to-home-screen) to aid sales teams on the go.
- Automated reputation management flows (pulling new reviews from Justdial/IndiaMART via API/scraper) with moderation before publishing on site.

