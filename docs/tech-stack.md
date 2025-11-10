## Technology Stack & Architecture

### Frontend
- **Framework:** Next.js 15 (App Router) for hybrid static & dynamic rendering, superior SEO, and internationalization readiness.
- **UI Library:** Tailwind CSS with Radix UI primitives to rapidly build accessible, responsive components.
- **Design System:** Storybook for component documentation, visual regression testing, and design QA.
- **Forms:** React Hook Form + Zod validation for robust, accessible multi-step forms with server-side fallbacks.
- **Animations & Interactivity:** Framer Motion for subtle motion; GSAP reserved for hero sections or product showcases.
- **Media Handling:** Next/Image for responsive, optimized images; cloud storage via Cloudinary for DAM and transformations.

### Backend & Integrations
- **Hosting:** Vercel for global edge network, serverless functions (form handling), and build pipeline.
- **Content Management:** Sanity.io as headless CMS enabling structured content, preview drafts, and localization.
- **Lead Capture Workflow:** Serverless API route storing submissions in PostgreSQL (Neon) and forwarding to HubSpot CRM via authenticated webhook.
- **Email & Notifications:** Resend for transactional emails (auto-responses, internal alerts).
- **Analytics & Tag Management:** Google Analytics 4, Google Tag Manager, server-side Segment workspace for event forwarding.
- **Session Replay:** Hotjar integration with consent-aware loading.
- **Search & Recommendations:** Algolia (Phase 2) for catalogue search and personalization.

### Infrastructure & DevOps
- **Repository:** GitHub with trunk-based strategy, protected main branch, and required PR reviews.
- **CI/CD:** Vercel deployments on PR; GitHub Actions for lint, type-check, unit tests, Lighthouse CI budgets.
- **Monitoring:** Vercel Analytics, Sentry for error tracking, and Better Stack (or Pingdom) for uptime monitoring.
- **Environment Management:** Doppler for secrets management across environments (dev/staging/production).
- **Caching & CDN:** Vercel Edge CDN with ISR (Incremental Static Regeneration) for catalogue updates.
- **Security:** OWASP best practices, SSL via Vercel, Content Security Policy, automated dependency scanning (Dependabot).

### Data & Privacy
- **Database:** Neon PostgreSQL with Prisma ORM, row-level encryption for sensitive lead data.
- **Compliance:** Cookie consent manager (OneTrust or Cookiebot) integrated with GTM; GDPR-compliant opt-in flows.
- **Data Lifecycle:** Automated retention policies (archive leads after 24 months), export tooling for DSAR requests.

### Tooling & Collaboration
- **Design:** Figma for UX/UI; shared component library synced with Storybook.
- **Project Management:** Linear (or Jira) integrated with GitHub for issue tracking and roadmap management.
- **Documentation:** Notion/Docs site for process docs, architecture decisions, and onboarding guides.
- **Communication:** Slack/Teams with automation (deployment notifications, alerting).

### Scalability & Future Enhancements
- Multi-language support via Next Intl (Phase 2) with Sanity localized content.
- B2B portal extension with authenticated partner login (Phase 3) leveraging Next.js middleware and Clerk authentication.
- Product information management integration for large catalogue synchronization.
- Progressive Web App capabilities (offline brochures, add-to-home-screen) to aid sales teams on the go.

