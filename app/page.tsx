import Link from "next/link";
import { AIChat } from "@/components/AIChat";
import { HomeActions } from "@/components/HomeActions";

const stats = [
  ["Fortune 500", "AI deployment experience now available to business owners."],
  ["$25K-$75K", "Typical value of a professional QoE report."],
  ["40%", "Our fee from verified AI-attributed gains only."],
];

const process = [
  ["01", "Free AI Business Audit", "Identify the highest-value automation opportunities."],
  ["02", "QoE Baseline", "Normalize EBITDA, add-backs, and operational cost leakage."],
  ["03", "Performance Agreement", "Align on the measurement model before implementation."],
  ["04", "Agent Deployment", "Launch workflow-specific AI agents with adoption support."],
  ["05", "Attribution Review", "Measure verified gains and report the client net increase."],
  ["06", "Scale", "Expand into the next workflow only after the first result is measured."],
];

const agents = [
  "Invoice and payment follow-up",
  "Customer support triage",
  "Sales operations and lead scoring",
  "Document review and reporting",
  "Scheduling and inbox workflows",
  "Management dashboards",
];

export default function Home() {
  return (
    <main>
      <Header />
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#ddd6fe,transparent_36%),linear-gradient(135deg,#f8fafc,#eef2ff)] py-20 md:py-28">
        <div className="container grid items-center gap-12 md:grid-cols-[1fr_420px]">
          <div>
            <p className="font-space inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-indigo-700 shadow-sm">
              Performance-Based AI Consulting · Zero Upfront Cost
            </p>
            <h1 className="font-display mt-7 text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
              AI That Pays For <span className="gradient-text">Itself.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-700">
              Our team has deployed AI agents inside large enterprises. Now we bring the same
              operating leverage to small and mid-size businesses, charging only 40% of verified
              profit increases our agents generate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <HomeActions />
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-slate-600">
              <span>Zero upfront cost</span>
              <span>Free QoE-style snapshot</span>
              <span>Performance-based only</span>
            </div>
          </div>
          <AIChat />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
            Trusted by business owners
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-6xl">
            Real results. Real operators.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Testimonial
              quote="The QoE snapshot alone showed us $340K in add-backs we had never accounted for."
              name="Robert M."
              role="Owner, Midwest Distribution Co."
            />
            <Testimonial
              quote="Within 60 days, invoice processing went from three days to four hours."
              name="Sandra K."
              role="CEO, Regional Healthcare Group"
            />
            <Testimonial
              quote="The performance model made it easy to say yes. No risk, and the upside was clear."
              name="David T."
              role="President, Commercial Real Estate Firm"
            />
          </div>
        </div>
      </section>

      <section className="section bg-slate-950 text-white">
        <div className="container grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-violet-300">
              Why we built this
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold md:text-6xl">
              Enterprise AI. Small business economics.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-9 text-slate-300">
            <p>
              The AI agents changing large-company operations are no longer out of reach. Integrate
              Fast gives business owners the same playbook without the enterprise implementation
              bill.
            </p>
            <p>
              We start by measuring the business, then deploy targeted agents into workflows where
              profit impact can be attributed. If profit does not go up, you pay nothing.
            </p>
          </div>
        </div>
        <div className="container mt-12 grid gap-4 md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div className="rounded-3xl bg-white/10 p-6" key={value}>
              <p className="text-4xl font-black text-violet-200">{value}</p>
              <p className="mt-3 text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-indigo-50" id="how-it-works">
        <div className="container">
          <div className="max-w-3xl">
            <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
              Our Process
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold md:text-6xl">
              From audit to autonomous AI.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {process.map(([number, title, body]) => (
              <div className="rounded-3xl bg-white p-6 shadow-sm" key={number}>
                <p className="font-space text-sm font-black text-indigo-600">{number}</p>
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white" id="agents">
        <div className="container grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
              AI Agents
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold md:text-6xl">
              Built around measurable workflows.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We do not sell generic AI adoption. We build agents around the operational processes
              where profit impact can be measured, reviewed, and expanded.
            </p>
          </div>
          <div className="grid gap-3">
            {agents.map((agent) => (
              <div className="rounded-2xl border border-slate-200 p-4 font-semibold" key={agent}>
                {agent}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-100" id="pricing">
        <div className="container grid gap-8 md:grid-cols-[1fr_420px]">
          <div>
            <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
              Pricing
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold md:text-6xl">
              40% of gains only.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              We establish a baseline, deploy AI against measurable workflows, then share only in
              verified profit increases. Your net gain stays 60% of the AI-attributed upside.
            </p>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              Performance Agreement
            </p>
            <p className="mt-4 text-6xl font-black">40%</p>
            <p className="mt-3 leading-7 text-slate-600">
              of verified AI-attributed profit increase. No payment if profits do not increase.
            </p>
            <Link className="btn btn-primary mt-6 w-full" href="/ai-audit">
              Start Free Audit
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white" id="roi-calculator">
        <div className="container rounded-[36px] bg-slate-950 p-8 text-center text-white md:p-12">
          <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-violet-300">
            ROI Calculator
          </p>
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-4xl font-bold md:text-6xl">
            Estimate the profit upside before we ever touch your systems.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <HomeActions />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="container flex h-20 items-center justify-between gap-6">
        <Link className="font-space text-xl font-black" href="/">
          Integrate Fast
        </Link>
        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          <a href="#how-it-works">How It Works</a>
          <a href="#agents">AI Agents</a>
          <a href="#pricing">Pricing</a>
          <Link href="/podcasts">Podcasts</Link>
        </div>
        <Link className="btn btn-primary" href="/ai-audit">
          Free AI Audit
        </Link>
      </nav>
    </header>
  );
}

function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 p-6">
      <p className="text-lg leading-8 text-slate-700">&ldquo;{quote}&rdquo;</p>
      <p className="mt-6 font-bold">{name}</p>
      <p className="text-sm text-slate-500">{role}</p>
    </article>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="container flex flex-col justify-between gap-8 md:flex-row">
        <div>
          <p className="font-space text-xl font-black">Integrate Fast</p>
          <p className="mt-3 max-w-md text-slate-400">
            Performance-based AI implementation consulting for business owners.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-slate-300 md:text-right">
          <Link href="/ai-audit">Free AI Audit</Link>
          <Link href="/podcasts">Podcasts</Link>
          <a href="mailto:hello@integratefast.com">hello@integratefast.com</a>
          <p className="text-sm text-slate-500">© 2026 Integrate Fast LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
