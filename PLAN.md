# "Hire Me: The Web App" — Full-Stack Learning Project Plan

> Living document. Update as scope shifts. Source of truth for technical direction.

## Context

Bob knows basic HTML/CSS/JS and wants to level up into a full-stack web developer using the most employable technologies in 2026. The project doubles as a portfolio piece: a humorous parody site framed as an over-the-top sales pitch, where each feature intentionally showcases a specific technology. Pacing is steady over ~3 months with a full DevOps pipeline.

**The twist is meta.** The copy on each page openly names the technology powering what the visitor is currently interacting with, so the site doubles as its own argument for hiring Bob. "You're reading this server-rendered page, so I clearly know Next.js. You got rate-limited on the endorsements form, so I clearly know Redis." The site *is* the résumé — every feature the employer sees and touches is evidence, and the tone says so out loud.

## Chosen Stack (T3 + full pipeline)

**Frontend**
- Next.js 15 (App Router) + React 19
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod (validation)
- Framer Motion (tasteful animations)

**Backend / Data**
- Next.js API routes + tRPC (end-to-end typesafe API)
- Prisma ORM
- PostgreSQL (local via Docker; prod via Neon or Supabase free tier)
- NextAuth.js (GitHub + email auth)
- Upstash Redis (rate limiting, simple caching)

**Quality / Tooling**
- ESLint + Prettier
- Vitest (unit), Playwright (E2E)
- Storybook (component gallery — also a portfolio artifact)

**DevOps**
- Docker + docker-compose (local Postgres, optionally app container)
- GitHub Actions: lint → typecheck → test → build on every PR
- Vercel deploy (preview per PR, prod on main)
- Sentry (error tracking), PostHog (analytics)

## Theme & Feature Map

Site concept: a parody "Hire Me" landing page + app. Each feature is deliberately picked to exercise one piece of the stack.

| Page / Feature | What it demonstrates |
|---|---|
| Landing page — "HIRE ME: THE WEB APP" | Next.js SSR, Tailwind, responsive design, Framer Motion |
| `/login` — "Prove you're serious about me" | NextAuth (GitHub OAuth + email magic link) |
| `/dashboard` — "My KPIs" | Protected route, server components, real-time chart (Recharts) |
| `/reasons` — "Reasons to hire me" (CRUD) | Prisma CRUD, tRPC mutations, optimistic UI, Zod validation |
| `/endorsements` — visitors leave a note | Form handling, rate limiting via Upstash, spam protection |
| `/salary-negotiator` — interactive calculator | Client state, React Hook Form, fun UI |
| `/hire-bot` — chat with an AI version of me | Streaming responses (Anthropic or OpenAI API), server actions |
| `/admin` — private CMS for editing content | Role-based auth, complex forms |
| `/404` — "Reasons not to hire me (empty)" | Custom error page |
| Sitewide — dark/light mode, i18n hooks | Accessibility, theming |

## Milestones (≈3 months, ~10–12 weeks)

### Phase 0 — Foundations (Week 1)
- Create `PLAN.md` and `PROGRESS.md`.
- `npx create-t3-app@latest` scaffolding with TS, Tailwind, tRPC, Prisma, NextAuth.
- Initialize ESLint, Prettier, commit hooks (Husky + lint-staged).
- Push to GitHub; set up GitHub Actions (lint + typecheck job).
- Deploy empty app to Vercel to confirm pipeline works end-to-end.

### Phase 1 — HTML/CSS/JS deepening via Tailwind + React (Weeks 2–3)
- Build static landing page with Tailwind only — practice layout/responsive/semantic HTML.
- Convert parts into React components; introduce props/state.
- Add shadcn/ui components; build a component library in Storybook.
- Outcome: polished, responsive marketing page deployed.

### Phase 2 — TypeScript + data layer (Weeks 4–5)
- Introduce TS types gradually; enable strict mode.
- Set up Postgres via Docker Compose locally.
- Design Prisma schema: `User`, `Reason`, `Endorsement`, `ChatSession`, `Role`.
- Build tRPC routers + Zod input schemas.
- Implement `/reasons` CRUD end-to-end with optimistic updates.

### Phase 3 — Auth + protected features (Weeks 6–7)
- NextAuth with GitHub provider + email magic link (Resend).
- Role-based middleware for `/admin`.
- Implement `/endorsements` with Upstash rate limiting.
- Implement `/dashboard` with server components and Recharts.

### Phase 4 — Fancy features (Weeks 8–9)
- `/hire-bot` streaming AI chat (server actions + Claude/OpenAI API).
- `/salary-negotiator` interactive UI with Framer Motion.
- Dark mode, keyboard navigation, a11y pass (axe).

### Phase 5 — Testing + observability (Week 10)
- Vitest unit tests on utils + tRPC routers.
- Playwright E2E for login, CRUD, endorsement flows.
- Add Sentry + PostHog.
- Extend GitHub Actions: run tests, block merge on failure.

### Phase 6 — Polish + ship (Weeks 11–12)
- SEO: metadata, OG images, sitemap, robots.
- Lighthouse > 95 on all pages.
- Write a `README.md` that reads like a portfolio case study (architecture diagram, screenshots, demo link).
- Record a 60-second demo video.
- Share on LinkedIn / in job applications.

## Learning Scaffolding

For each phase:
1. Read the official docs for the new tool (no tutorial hell).
2. Implement the minimum feature that uses it.
3. Write a short note in `PROGRESS.md` about what clicked / what's still fuzzy.
4. Ask Claude follow-up questions on the fuzzy parts.

## Verification

- After Phase 0: CI green on GitHub + successful Vercel prod deploy of scaffolded app.
- After each phase: feature(s) work locally AND in the Vercel preview, with relevant tests passing in CI.
- Final: Lighthouse ≥ 95 performance/a11y/best-practices/SEO on landing page; E2E suite green; public demo URL shareable with employers.

## Explicit Non-Goals

- No native mobile app.
- No Kubernetes / self-hosted infra.
- No microservices — monolith is correct at this scale.
