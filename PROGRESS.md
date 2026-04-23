# Progress

Objective checklist tracking development. Check items off (`- [x]`) as completed. Add a dated note under each phase about what clicked / what's still fuzzy.

---

## Phase 0 — Foundations (Week 1)

- [x] `PLAN.md` created
- [x] `PROGRESS.md` created
- [x] Run `npx create-t3-app@latest` (scaffolded into `web/`)
- [ ] Commit scaffolding to git
- [ ] ESLint + Prettier configured and passing
- [ ] Husky + lint-staged pre-commit hook
- [ ] GitHub Actions workflow: lint + typecheck on PR
- [ ] Connect repo to Vercel; first successful prod deploy
- [ ] Connect managed Postgres (Neon or Supabase); `DATABASE_URL` set in Vercel env

**Notes:**
- _(add learnings here)_

---

## Phase 1 — HTML/CSS/JS deepening (Weeks 2–3)

- [ ] Static landing page with Tailwind (semantic HTML, responsive, no JS frameworks yet)
- [ ] Refactor into React components (Hero, FeatureCard, Footer, Nav)
- [ ] Add shadcn/ui and install first components (Button, Card, Dialog)
- [ ] Set up Storybook; add stories for each custom component
- [ ] Add Framer Motion entrance animations on landing page
- [ ] Lighthouse check on landing page (baseline scores recorded)

**Notes:**

---

## Phase 2 — TypeScript + data layer (Weeks 4–5)

- [ ] Enable `"strict": true` in `tsconfig.json`; fix all errors
- [ ] `docker-compose.yml` with Postgres service
- [ ] Prisma schema: `User`, `Reason`, `Endorsement`, `ChatSession`, `Role`
- [ ] Initial migration run locally and on prod DB
- [ ] tRPC routers for `reason` (list/create/update/delete)
- [ ] Zod input schemas shared between client and server
- [ ] `/reasons` page: list + create + edit + delete with optimistic UI
- [ ] Seed script for dev data

**Notes:**

---

## Phase 3 — Auth + protected features (Weeks 6–7)

- [ ] NextAuth GitHub provider working locally
- [ ] Email magic link provider via Resend
- [ ] Session provider wired into app
- [ ] Route middleware: redirect unauthenticated users from protected routes
- [ ] `Role` enum enforced for `/admin`
- [ ] Upstash Redis account + rate limiter utility
- [ ] `/endorsements` page: public form, rate-limited, moderation queue
- [ ] `/dashboard` with server components and Recharts
- [ ] `/admin` CMS for moderating endorsements + editing reasons

**Notes:**

---

## Phase 4 — Fancy features (Weeks 8–9)

- [ ] `/hire-bot`: streaming chat via server actions + Claude API
- [ ] System prompt seeded with Bob's resume/persona
- [ ] `/salary-negotiator` interactive calculator
- [ ] Dark mode toggle (next-themes)
- [ ] Keyboard navigation audit
- [ ] `axe-core` a11y pass; all critical issues fixed

**Notes:**

---

## Phase 5 — Testing + observability (Week 10)

- [ ] Vitest configured; unit tests on utilities + tRPC routers (>70% coverage on core)
- [ ] Playwright configured; E2E tests for login, reasons CRUD, endorsements flow
- [ ] Sentry installed; source maps uploading from Vercel
- [ ] PostHog installed; key events tracked (signup, endorsement submit, chat start)
- [ ] GitHub Actions: test job added, required for merge

**Notes:**

---

## Phase 6 — Polish + ship (Weeks 11–12)

- [ ] Per-page metadata + OG images
- [ ] `sitemap.xml` and `robots.txt`
- [ ] Lighthouse ≥ 95 on landing, /reasons, /dashboard
- [ ] `README.md` rewritten as portfolio case study (problem, stack, architecture diagram, screenshots, live link)
- [ ] 60-second demo video recorded
- [ ] Shared publicly (LinkedIn, portfolio site, job applications)

**Notes:**

---

## Stretch Ideas (post-launch)

- [ ] Mobile-first redesign pass
- [ ] i18n (English + one other language)
- [ ] Blog section (MDX) — "what I learned building this"
- [ ] Swap one feature to use Server-Sent Events instead of polling
- [ ] Port one page to a different framework (SvelteKit / Remix) as a learning exercise
