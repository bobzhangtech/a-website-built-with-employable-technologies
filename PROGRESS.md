# Progress

Objective checklist tracking development. Check items off (`- [x]`) as completed. Add a dated note under each phase about what clicked / what's still fuzzy.

---

## Phase 0 — Foundations (Week 1)

- [x] `PLAN.md` created
- [x] `PROGRESS.md` created
- [x] Run `npx create-t3-app@latest` (scaffolded into `web/`)
- [x] Commit scaffolding to git
- [x] ESLint + Prettier configured and passing
- [x] Husky + lint-staged pre-commit hook
- [x] GitHub Actions workflow: lint + typecheck on PR
- [x] Connect repo to Vercel; first successful prod deploy
- [x] Connect managed Postgres (Neon); `DATABASE_URL` set in Vercel env

**Notes:**

### Step-by-step recap (2026-04-23)

**1. Scaffold the app**
- Ran `npx create-t3-app@latest` in the project root, named the app `web`.
- Chose: TypeScript, Tailwind, tRPC, Prisma, NextAuth, App Router.
- Result: `web/` contains a working Next.js app; `PLAN.md` / `PROGRESS.md` live at repo root (outside the app).
- Verified locally with `cd web && npm run dev` → visited `http://localhost:3000`.

**2. Commit to GitHub**
- `git init` (if needed), `git add .`, `git commit -m "initial scaffold"`.
- Created a new empty repo on GitHub.
- Linked and pushed: `git remote add origin <url>` → `git push -u origin main`.

**3. Lint + format sanity check**
- `npm run lint` → passed (ESLint already configured by create-t3-app).
- `npm run typecheck` → passed (TypeScript strict mode).
- Prettier wired in; runs via `npm run format:write`.

**4. GitHub Actions CI**
- Created `.github/workflows/ci.yml` at repo root (not inside `web/`).
- Workflow runs on every PR and push to `main`: checks out code, sets up Node 20, runs `npm ci`, `npm run lint`, `npm run typecheck`.
- Key detail: `working-directory: web` because the app lives in a subfolder.
- First run failed: `next lint` imports `src/env.js`, which validates env vars. CI has no `.env`, so it crashed.
- Fix: added `env: SKIP_ENV_VALIDATION: "1"` at the job level. CI only lints/typechecks — doesn't need a real DB.

**5. Deploy to Vercel**
- Signed up at vercel.com with GitHub, enabled 2FA.
- "Add New Project" → selected the GitHub repo.
- Set **Root Directory** to `web` (critical — Vercel needs to know where `package.json` is).
- Pasted all env vars from local `.env` into Vercel's env var UI.
- First deploy succeeded; got a `*.vercel.app` URL.
- Renamed the project in Settings → General because the auto-generated URL was truncated.

**6. Connect Neon (managed Postgres)**
- Signed up at neon.com, enabled 2FA.
- Created project: region **us-west-2 (Oregon)** (closest to Vancouver), Postgres 17.
- Copied the connection string into `web/.env` as `DATABASE_URL` (replaced the local Docker placeholder).
- Ran `npm run db:push` → Prisma created tables on Neon from `prisma/schema.prisma`.
- Added the same `DATABASE_URL` to Vercel env vars (Production + Preview).
- Deleted the now-unnecessary `SKIP_ENV_VALIDATION` from Vercel → redeployed clean.

**7. Husky + lint-staged pre-commit hook**
- `cd web && npm install --save-dev husky lint-staged`.
- `npx husky init` failed with ".git can't be found" because `.git` is at repo root but `package.json` is in `web/`.
- Fix: ran husky manually from git root pointing at `web/.husky`; rewrote the `prepare` script to `cd .. && husky web/.husky || true`.
- Wrote `web/.husky/pre-commit` to run `cd web && npx lint-staged`.
- Added `lint-staged` config in `package.json`: runs ESLint + Prettier on staged `.ts/.tsx/.js/.jsx` files; Prettier on `.json/.md/.css`.
- Verified: committing a file triggered the hook and auto-formatted staged files.

**8. Skip Vercel builds for doc-only changes**
- Vercel was rebuilding on every push, even PROGRESS.md edits.
- Settings → Build and Deployment → **Ignored Build Step** → command: `git diff --quiet HEAD^ HEAD -- web/`.
- Behavior: exit 0 (no diff in `web/`) → skip build; exit 1 (changes in `web/`) → build.
- Also enabled "Skip deployments when there are no changes to the root directory" toggle as a belt-and-suspenders.
- Verified: a PROGRESS-only push flashed in Deployments and was marked Skipped, prod URL stayed on the last real build.

### What I understand now
- **create-t3-app** gives you a prod-ready full-stack scaffold — hours of setup done in one command.
- **CI** is the net: it runs the same lint/typecheck on every PR so a broken commit can't reach `main`.
- **Env validation (`src/env.js` via `@t3-oss/env-nextjs`)** parses `process.env` with Zod at import time — that's why missing vars crash the build, not just runtime.
- **Vercel + Neon** is a zero-infra prod stack: push to `main` → auto-deploy → connects to managed Postgres. No servers to run.
- **Husky hooks** catch issues locally *before* CI does; lint-staged keeps hooks fast by only running on staged files.

### Still fuzzy
- Prisma `db:push` vs `db:migrate dev` vs `db:migrate deploy` — push is a dev shortcut, migrations are the real deal. Will revisit in Phase 2.
- How NextAuth's placeholder Discord credentials behave when I try to actually sign in.
- When preview deploys get their own `DATABASE_URL` vs. share prod's (answer: they share it because I added it to both envs — will separate later if needed).

---

## Phase 1 — HTML/CSS/JS deepening (Weeks 2–3)

- [x] Static landing page with Tailwind (semantic HTML, responsive, no JS frameworks yet)
- [x] Refactor into React components (Hero, FeatureCard, Footer, Nav)
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
