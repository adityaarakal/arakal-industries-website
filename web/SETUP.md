# Setup Guide - Arakal Industries Website

## Task E1: Initialize Repository & CI ✅

This document outlines what was completed in Task E1: Initialize Repository & CI.

### Completed Tasks

#### 1. Project Structure ✅
- Created Next.js 15 project with App Router
- Set up proper directory structure:
  - `src/app/` - Next.js App Router pages
  - `src/components/` - React components (ui, layout, sections)
  - `src/lib/` - Utility functions and configurations
  - `src/types/` - TypeScript type definitions
  - `src/test/` - Test setup files
  - `prisma/` - Database schema and migrations
  - `.github/workflows/` - CI/CD workflows
  - `e2e/` - End-to-end tests

#### 2. Dependencies Installed ✅
- **Framework:** Next.js 15.1.5
- **UI Library:** Radix UI components (accordion, dialog, dropdown, navigation, select, tabs, toast, etc.)
- **Forms:** React Hook Form + Zod + @hookform/resolvers
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS 4.0, tailwind-merge, tailwindcss-animate
- **Database:** Prisma ORM + @prisma/client
- **CMS:** Sanity.io client libraries
- **Email:** Resend
- **Analytics:** PostHog
- **Icons:** Lucide React
- **Utilities:** class-variance-authority, clsx, cmdk

#### 3. Development Dependencies ✅
- **Testing:** Vitest, @testing-library/react, @testing-library/jest-dom, Playwright
- **Linting:** ESLint, Prettier, eslint-config-prettier
- **Type Checking:** TypeScript 5.7
- **Storybook:** Configured with Next.js and Vite
- **Build Tools:** @vitejs/plugin-react

#### 4. Configuration Files ✅
- **Next.js:** `next.config.ts` with image optimization, security headers, experimental features
- **TypeScript:** `tsconfig.json` with path aliases and strict mode
- **ESLint:** `eslint.config.mjs` with Next.js, Prettier, and Storybook plugins
- **Prettier:** `.prettierrc` with Tailwind plugin
- **Tailwind CSS:** Configured via `globals.css` with design tokens
- **Prisma:** `prisma/schema.prisma` with Lead, NewsletterSubscription, and AnalyticsEvent models
- **Vitest:** `vitest.config.ts` for unit testing
- **Playwright:** `playwright.config.ts` for end-to-end testing
- **Lighthouse:** `.lighthouserc.json` for performance testing
- **Vercel:** `vercel.json` for deployment configuration
- **Git:** `.gitignore` with appropriate exclusions
- **Node:** `.nvmrc` and `.node-version` for Node.js version management

#### 5. CI/CD Setup ✅
- **GitHub Actions:** `.github/workflows/ci.yml` with:
  - Lint and type check job
  - Test job with coverage
  - Build job
  - Lighthouse CI job (on PRs)
- **Workflow Features:**
  - Node.js 20 setup with npm caching
  - Parallel job execution
  - Artifact uploads on failure
  - Coverage reporting

#### 6. Environment Variables ✅
- Created `.env.example` with all required variables:
  - Database (DATABASE_URL)
  - Next.js (NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_SITE_NAME, etc.)
  - Sanity CMS (NEXT_PUBLIC_SANITY_PROJECT_ID, etc.)
  - HubSpot CRM (HUBSPOT_API_KEY, etc.)
  - Resend Email (RESEND_API_KEY, etc.)
  - Analytics (NEXT_PUBLIC_GA_MEASUREMENT_ID, etc.)
  - Hotjar (NEXT_PUBLIC_HOTJAR_ID, etc.)
  - Mappls (NEXT_PUBLIC_MAPPLS_API_KEY)
  - Cloudinary (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, etc.)
  - Sentry (NEXT_PUBLIC_SENTRY_DSN, etc.)

#### 7. Core Utilities ✅
- **`src/lib/utils.ts`:** Utility functions (cn, formatPhoneNumber, formatDate, getInitials, slugify, truncate)
- **`src/lib/constants.ts`:** Application constants (SITE_CONFIG, COMPANY_INFO, NAVIGATION, SOCIAL_LINKS, EXTERNAL_LISTINGS)
- **`src/lib/design-tokens.ts`:** Design tokens (colors, typography, spacing, borderRadius, shadows, breakpoints, zIndex)
- **`src/types/index.ts`:** TypeScript type definitions

#### 8. Base Components ✅
- **`src/components/ui/button.tsx`:** Reusable Button component with Radix UI Slot and class-variance-authority
- Configured with variants (default, destructive, outline, secondary, ghost, link) and sizes (default, sm, lg, icon)

#### 9. App Structure ✅
- **`src/app/layout.tsx`:** Root layout with metadata, fonts (Geist Sans, Geist Mono), and global styles
- **`src/app/page.tsx`:** Homepage with basic structure and buttons
- **`src/app/globals.css`:** Global styles with Tailwind CSS 4.0, design tokens, and dark mode support

#### 10. Documentation ✅
- **`README.md`:** Comprehensive project documentation with setup instructions, available scripts, project structure, environment variables, deployment, CI/CD, and documentation links
- **`SETUP.md`:** This document outlining Task E1 completion

### Next Steps

1. **Install Dependencies:**
   ```bash
   cd web
   npm install
   ```

2. **Set Up Environment Variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Set Up Database:**
   ```bash
   npm run db:generate
   npm run db:push
   # Or
   npm run db:migrate
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Run Tests:**
   ```bash
   npm run test
   npm run test:e2e
   ```

6. **Run Linting:**
   ```bash
   npm run lint
   npm run format:check
   ```

### Project Status

- ✅ **Task E1:** Initialize Repository & CI - **COMPLETED**
- ⏭️ **Next Task:** E2 - Implement Frontend (Base layout, navigation, footer, home shell)

### Notes

- All dependencies are configured and ready for installation
- CI/CD pipeline is set up and ready for GitHub Actions
- Testing infrastructure is in place (Vitest for unit tests, Playwright for E2E tests)
- Database schema is defined and ready for Prisma migrations
- Design tokens and utilities are set up for consistent styling
- Base components are created with Radix UI and Tailwind CSS
- Project structure follows Next.js 15 App Router best practices

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)

