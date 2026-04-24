import Link from "next/link";

const commitSha = (process.env.VERCEL_GIT_COMMIT_SHA ?? "local-dev").slice(
  0,
  7,
);

const exhibits = [
  {
    title: "Typesafe from DB to button",
    body: "The data behind this card would travel through Prisma → tRPC → Zod → React without a single `any`. If I'm lying, TypeScript refuses to compile.",
    tag: "TypeScript · tRPC · Prisma · Zod",
  },
  {
    title: "Auth that actually works",
    body: "Click sign-in and GitHub OAuth takes the wheel. Magic-link email works too. Session cookies are httpOnly. Try to break it — I dare you.",
    tag: "NextAuth.js",
  },
  {
    title: "Rate-limited like a grown-up",
    body: "Spam the endorsements form. Upstash Redis will politely stop you at request six. Your IP is fine. Your ego may not be.",
    tag: "Upstash Redis",
  },
  {
    title: "Deployed on every push",
    body: `You're reading commit ${commitSha}. Vercel shipped it roughly forty seconds after I ran \`git push\`. The preview URL was waiting on the PR before the coffee cooled.`,
    tag: "Vercel · GitHub Actions",
  },
  {
    title: "Tested before you clicked",
    body: "Playwright just simulated you clicking this exact button in CI. It passed. If it hadn't, this page wouldn't exist.",
    tag: "Vitest · Playwright",
  },
  {
    title: "Observed, not hoped",
    body: "If something breaks for you, Sentry tells me before you do. PostHog already knows you scrolled past this sentence.",
    tag: "Sentry · PostHog",
  },
];

const objections = [
  {
    q: "But can he center a div?",
    a: "You're looking at one. Flexbox, grid, and `place-items-center` are all on the table.",
  },
  {
    q: "Does he write tests?",
    a: "The button you're about to click is covered by a Playwright spec. Try not to feel watched.",
  },
  {
    q: "What about accessibility?",
    a: "Tab through this page. Every interactive element has focus states. axe-core agrees.",
  },
  {
    q: "Is this a real portfolio or a long joke?",
    a: "Yes.",
  },
];

const stack = [
  { name: "Next.js", href: "https://nextjs.org" },
  { name: "TypeScript", href: "https://www.typescriptlang.org" },
  { name: "Tailwind", href: "https://tailwindcss.com" },
  { name: "tRPC", href: "https://trpc.io" },
  { name: "Prisma", href: "https://www.prisma.io" },
  { name: "NextAuth", href: "https://next-auth.js.org" },
  { name: "Vercel", href: "https://vercel.com" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-mono text-sm tracking-tight text-zinc-400">
          hire-me.app
        </span>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          <Link href="/reasons" className="text-zinc-300 hover:text-white">
            Reasons
          </Link>
          <Link href="/endorsements" className="text-zinc-300 hover:text-white">
            Endorsements
          </Link>
          <Link
            href="/api/auth/signin"
            className="rounded-md border border-zinc-700 px-3 py-1.5 text-zinc-200 hover:border-zinc-500 hover:text-white"
          >
            Sign in
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <p className="mb-6 font-mono text-xs tracking-widest text-fuchsia-400 uppercase">
          A website built with employable technologies
        </p>
        <h1 className="text-5xl leading-[1.05] font-black tracking-tight sm:text-7xl md:text-8xl">
          HIRE ME:
          <br />
          <span className="text-fuchsia-400">THE WEB APP</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-zinc-300 sm:text-xl">
          This page server-rendered in Next.js 15 before you finished reading
          the headline. Keep scrolling — every section you see is a feature
          I&apos;m also listing on my résumé.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/reasons"
            className="rounded-md bg-fuchsia-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-fuchsia-400"
          >
            See the reasons →
          </Link>
          <Link
            href="/endorsements"
            className="rounded-md border border-zinc-700 px-6 py-3 font-semibold text-zinc-100 transition hover:border-zinc-500"
          >
            Leave an endorsement
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="exhibits-heading"
        className="border-t border-zinc-900 bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 font-mono text-xs tracking-widest text-fuchsia-400 uppercase">
                Exhibit A — F
              </p>
              <h2
                id="exhibits-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                The site is the résumé.
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm text-zinc-400 sm:block">
              Each card describes a feature of this app. Each feature is a
              technology I know. The fact that you&apos;re seeing it work is the
              argument.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exhibits.map((exhibit) => (
              <li
                key={exhibit.title}
                className="group relative rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-fuchsia-500/60 hover:bg-zinc-900"
              >
                <h3 className="text-lg font-semibold text-zinc-50">
                  {exhibit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {exhibit.body}
                </p>
                <p className="mt-6 font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
                  {exhibit.tag}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="objections-heading"
        className="border-t border-zinc-900"
      >
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="mb-2 font-mono text-xs tracking-widest text-fuchsia-400 uppercase">
            Objections, Handled
          </p>
          <h2
            id="objections-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Your concerns are valid. Briefly.
          </h2>

          <dl className="mt-10 divide-y divide-zinc-900 border-y border-zinc-900">
            {objections.map((item) => (
              <div
                key={item.q}
                className="grid gap-2 py-6 sm:grid-cols-[1fr_2fr] sm:gap-10"
              >
                <dt className="text-base font-semibold text-zinc-100">
                  {item.q}
                </dt>
                <dd className="text-base text-zinc-300">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-zinc-900 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            You&apos;ve seen the demo. Now hire the demo.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-zinc-300">
            Or at least leave an endorsement so the next person thinks other
            people already agreed. Social proof is a technology too.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/hire-bot"
              className="rounded-md bg-fuchsia-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-fuchsia-400"
            >
              Chat with hire-bot
            </Link>
            <Link
              href="/salary-negotiator"
              className="rounded-md border border-zinc-700 px-6 py-3 font-semibold text-zinc-100 transition hover:border-zinc-500"
            >
              Negotiate a salary
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            Built with{" "}
            {stack.map((tool, i) => (
              <span key={tool.name}>
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 underline-offset-4 hover:text-white hover:underline"
                >
                  {tool.name}
                </a>
                {i < stack.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
          <p className="font-mono text-xs text-zinc-600">
            commit {commitSha} · © {new Date().getFullYear()} Bob Zhang
          </p>
        </div>
      </footer>
    </main>
  );
}
