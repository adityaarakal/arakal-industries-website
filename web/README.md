# Arakal Industries Website

A modern, responsive promotional website for Arakal Industries, a premium towel manufacturer based in Solapur, Maharashtra.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** Tailwind CSS + Radix UI
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **CMS:** Sanity.io
- **Email:** Resend
- **CRM:** HubSpot
- **Analytics:** Google Analytics 4, Google Tag Manager, Hotjar
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 20+ and npm 10+
- PostgreSQL database (Neon recommended)
- Sanity.io account
- HubSpot account (for CRM integration)
- Environment variables configured (see `.env.example`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/adityaarakal/arakal-industries-website.git
cd arakal-industries-website/web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

5. Set up Sanity CMS:
```bash
# Install Sanity CLI (if not already installed)
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize Sanity project (if not already done)
sanity init

# Start Sanity Studio
npm run dev
# Visit http://localhost:3000/studio to access Sanity Studio
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
web/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── studio/       # Sanity Studio
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components (Radix UI)
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   └── sections/    # Page sections
│   ├── lib/             # Utility functions and configurations
│   │   └── sanity/      # Sanity CMS utilities
│   ├── cms/             # Sanity CMS schemas
│   │   └── schemas/     # Content schemas
│   ├── types/           # TypeScript type definitions
│   └── test/            # Test setup files
├── prisma/              # Prisma schema and migrations
├── public/              # Static assets
└── .github/             # GitHub Actions workflows
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type check
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run storybook` - Start Storybook

## Environment Variables

See `.env.example` for all required environment variables. Key variables include:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (default: "production")
- `SANITY_API_READ_TOKEN` - Sanity API read token
- `SANITY_API_WRITE_TOKEN` - Sanity API write token
- `HUBSPOT_API_KEY` - HubSpot API key
- `RESEND_API_KEY` - Resend API key
- `RESEND_FROM_EMAIL` - Resend from email address (optional, defaults to noreply@arakalindustries.com)
- `RESEND_TO_EMAIL` - Resend to email address for notifications (optional, defaults to company contact email)
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager container ID (e.g., GTM-XXXXXXX)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 measurement ID (e.g., G-XXXXXXXXXX)
- `NEXT_PUBLIC_HOTJAR_ID` - Hotjar site ID (optional, for session replay and heatmaps)
- `NEXT_PUBLIC_MAPPLS_API_KEY` - Mappls API key

## Sanity CMS

The project uses Sanity.io as the headless CMS. To access Sanity Studio:

1. Visit `/studio` in your browser (e.g., `http://localhost:3000/studio`)
2. Login with your Sanity credentials
3. Start creating content!

### Content Schemas

The following content types are available in Sanity:

- **Product** - Product catalog (terry towels, dobby towels, jacquard chaddars)
- **Location** - Manufacturing facilities (Gandhi Nagar, Solapur MIDC)
- **Heritage Timeline** - Company history timeline
- **Testimonial** - Customer testimonials and reviews
- **Industry** - Industries served (hospitality, healthcare, retail, wellness)
- **Resource** - Resources (brochures, buyer guides, certifications)
- **Page** - Custom page content
- **Settings** - Site settings (contact info, social links)

## ISR (Incremental Static Regeneration)

The site uses ISR for optimal performance:

- Pages are statically generated at build time
- Pages are revalidated every hour (3600 seconds)
- Content updates are reflected within the revalidation period
- Reduces server load while keeping content fresh

## Deployment

The project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to `main` branch

## CI/CD

GitHub Actions workflows are configured for:
- Linting and type checking
- Unit tests
- Build verification
- Lighthouse CI (on PRs)

## Documentation

- [Problem Statement](../docs/problem-statement.md)
- [Solution Approach](../docs/solution-approach.md)
- [Tech Stack](../docs/tech-stack.md)
- [Roadmap](../docs/roadmap.md)
- [Project Tracker](../docs/project-tracker.md)

## License

Private - All rights reserved
