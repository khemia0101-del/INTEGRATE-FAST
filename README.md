# Integrate Fast

Manus-free rebuild of the Integrate Fast AI implementation consulting site.

## What Is Included

- Next.js App Router public site for Integrate Fast consulting.
- AI consultant chat via `/api/chat`.
- Profit calculator lead capture via `/api/calculator-lead`.
- AI audit intake and generated snapshot via `/api/audit/start`.
- Database schema for leads, audit sessions, and chat transcripts.
- Resend notification support through environment variables.
- Explicit 404s for removed OpenClaw/Admin routes.

## Environment

Copy `.env.example` to `.env.local` and fill production values:

```bash
DATABASE_URL=
OPENAI_API_KEY=
RESEND_API_KEY=
LEADS_TO_EMAIL=hello@integratefast.com
FROM_EMAIL="Integrate Fast <noreply@integratefast.com>"
```

Without `DATABASE_URL`, the API routes use an in-memory local fallback for development. Without
`OPENAI_API_KEY`, chat and audit generation use deterministic fallback responses.

## Commands

```bash
npm run dev
npm run typecheck
npm run build
npm run test
```
