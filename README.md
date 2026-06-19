# Integrate Fast

Manus-free rebuild of the Integrate Fast AI implementation consulting website.

This app replaces the original Manus-hosted site with a first-party Next.js implementation. It keeps the Integrate Fast consulting experience, AI audit flow, profit calculator, podcasts, lead capture, and AI consultant chat while removing all Manus runtime/editor dependencies and all OpenClaw product surfaces.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL in production
- OpenAI API for chat and audit snapshot generation
- Resend for internal lead/audit notifications

## Routes

- `/` - main Integrate Fast consulting landing page
- `/ai-audit` - free AI audit intake and generated business snapshot
- `/podcasts` - AI implementation case-study podcast page
- `/api/chat` - first-party AI consultant endpoint
- `/api/calculator-lead` - profit calculator lead capture
- `/api/audit/start` - starts an audit session and generates the snapshot
- `/api/audit/session/[sessionToken]` - fetches an audit session
- `/api/accounting/status` - reports whether optional accounting credentials are configured

Removed legacy routes intentionally return 404:

- `/openclaw-concierge`
- `/openclaw-concierge/configure`
- `/openclaw-concierge/dashboard`
- `/openclaw-podcast`
- `/admin`

## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill the values needed for your environment.

```bash
DATABASE_URL="postgresql://user:password@host:5432/integratefast?schema=public"
OPENAI_API_KEY=""
RESEND_API_KEY=""
LEADS_TO_EMAIL="hello@integratefast.com"
FROM_EMAIL="Integrate Fast <noreply@integratefast.com>"
PLAID_CLIENT_ID=""
PLAID_SECRET=""
QUICKBOOKS_CLIENT_ID=""
QUICKBOOKS_CLIENT_SECRET=""
```

Development fallbacks:

- Without `DATABASE_URL`, API routes use an in-memory store.
- Without `OPENAI_API_KEY`, chat and audit generation use deterministic fallback responses.
- Without `RESEND_API_KEY`, notification emails are skipped and logged.
- Plaid and QuickBooks are optional and only reported as enabled when their env vars exist.

## Database

Generate Prisma Client:

```bash
npm run build
```

For production, create the database from `prisma/schema.prisma` using your normal migration/deploy flow before enabling `DATABASE_URL`.

The schema stores:

- leads
- audit sessions
- chat transcripts

## Validation

Run the main checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

`npm run test` runs `scripts/route-audit.ts`, which checks that:

- no Manus domains or globals are present in source
- removed OpenClaw/Admin routes exist as explicit 404 pages

## Deployment

The app is Vercel-compatible.

Before deploying, configure production environment variables for:

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `LEADS_TO_EMAIL`
- `FROM_EMAIL`

Optional accounting integrations can be enabled later with Plaid and QuickBooks credentials.

## Notes

- No Manus runtime, editor globals, Manus CDN scripts, or Manus analytics are used.
- OpenClaw Concierge, checkout, deployment, dashboard, admin billing, and OpenClaw podcast content were intentionally removed.
- The contact email is `hello@integratefast.com`.
