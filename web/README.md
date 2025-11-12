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

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
web/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components (Radix UI)
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   └── sections/    # Page sections
│   ├── lib/             # Utility functions and configurations
│   ├── types/           # TypeScript type definitions
│   └── cms/             # Sanity CMS configuration
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
- `HUBSPOT_API_KEY` - HubSpot API key
- `RESEND_API_KEY` - Resend API key
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics ID
- `NEXT_PUBLIC_MAPPLS_API_KEY` - Mappls API key

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
