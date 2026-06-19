"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type Snapshot = {
  healthScore: number;
  executiveSummary: string;
  topOpportunities: Array<{ title: string; impact: string; timeline: string }>;
  riskFactors: string[];
  nextSteps: string[];
};

const industries = [
  "Manufacturing",
  "Retail & E-Commerce",
  "Professional Services",
  "Healthcare",
  "Financial Services",
  "Technology / SaaS",
  "Real Estate",
  "Hospitality & Food Service",
  "Construction",
  "Logistics & Distribution",
  "Education",
  "Media & Marketing",
  "Legal Services",
  "Accounting & Tax",
  "Other",
];

const revenueRanges = [
  "$500K - $1M",
  "$1M - $2.5M",
  "$2.5M - $5M",
  "$5M - $10M",
  "$10M - $25M",
  "$25M - $50M",
  "$50M+",
];

const employeeRanges = ["1-10", "11-25", "26-50", "51-100", "101-250", "251-500", "500+"];

export function AuditFlow() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [accounting, setAccounting] = useState({ plaidEnabled: false, quickBooksEnabled: false });
  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    annualRevenue: "",
    employees: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    fetch("/api/accounting/status")
      .then((response) => response.json())
      .then(setAccounting)
      .catch(() => undefined);
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const response = await fetch("/api/audit/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const body = (await response.json().catch(() => null)) as
      | { error?: string; sessionToken?: string; snapshot?: Snapshot }
      | null;

    if (!response.ok || !body?.snapshot || !body.sessionToken) {
      setStatus("error");
      setError(body?.error ?? "We could not generate your snapshot.");
      return;
    }

    setSessionToken(body.sessionToken);
    setSnapshot(body.snapshot);
    setStep(2);
    setStatus("idle");
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-5xl">
        <StepHeader current={step} />

        {step === 1 && (
          <form className="mt-10 rounded-[32px] bg-white p-6 shadow-soft md:p-8" onSubmit={submit}>
            <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
              Free Instant AI Audit
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">
              Get your free business intelligence snapshot
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              In 60 seconds, our AI analyzes your business profile and identifies your top automation
              opportunities. No credit card and no financial connection required for the first
              snapshot.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Field label="Company Name *">
                <input
                  className="field"
                  placeholder="Acme Corp"
                  value={form.companyName}
                  onChange={(event) => setForm({ ...form, companyName: event.target.value })}
                />
              </Field>
              <Field label="Industry *">
                <select
                  className="field"
                  value={form.industry}
                  onChange={(event) => setForm({ ...form, industry: event.target.value })}
                >
                  <option value="">Select industry...</option>
                  {industries.map((industry) => (
                    <option key={industry}>{industry}</option>
                  ))}
                </select>
              </Field>
              <Field label="Annual Revenue *">
                <select
                  className="field"
                  value={form.annualRevenue}
                  onChange={(event) => setForm({ ...form, annualRevenue: event.target.value })}
                >
                  <option value="">Select range...</option>
                  {revenueRanges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
              </Field>
              <Field label="Employees *">
                <select
                  className="field"
                  value={form.employees}
                  onChange={(event) => setForm({ ...form, employees: event.target.value })}
                >
                  <option value="">Select range...</option>
                  {employeeRanges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
              </Field>
              <div className="md:col-span-2">
                <p className="mb-4 mt-4 text-lg font-bold">Where should we send your report?</p>
                <div className="grid gap-5 md:grid-cols-3">
                  <Field label="Your Name *">
                    <input
                      className="field"
                      placeholder="John Smith"
                      value={form.contactName}
                      onChange={(event) => setForm({ ...form, contactName: event.target.value })}
                    />
                  </Field>
                  <Field label="Email Address *">
                    <input
                      className="field"
                      placeholder="john@company.com"
                      type="email"
                      value={form.contactEmail}
                      onChange={(event) => setForm({ ...form, contactEmail: event.target.value })}
                    />
                  </Field>
                  <Field label="Phone (optional)">
                    <input
                      className="field"
                      placeholder="+1 (555) 000-0000"
                      value={form.contactPhone}
                      onChange={(event) => setForm({ ...form, contactPhone: event.target.value })}
                    />
                  </Field>
                </div>
              </div>
            </div>

            <button className="btn btn-primary mt-8" disabled={status === "loading"} type="submit">
              {status === "loading" ? "Analyzing your business..." : "Get My Free Snapshot"}
            </button>
            {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-red-700">{error}</p>}
          </form>
        )}

        {step === 2 && snapshot && (
          <SnapshotPanel
            companyName={form.companyName}
            snapshot={snapshot}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <ContractPanel
            contactName={form.contactName}
            companyName={form.companyName}
            onContinue={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <ConnectionPanel
            accounting={accounting}
            onContinue={() => setStep(5)}
          />
        )}

        {step === 5 && (
          <ReportPanel
            sessionToken={sessionToken}
            email={form.contactEmail}
          />
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      {children}
    </label>
  );
}

function StepHeader({ current }: { current: number }) {
  const steps = ["Audit", "Snapshot", "Contract", "Connect", "Report"];
  return (
    <div className="grid grid-cols-5 gap-2 rounded-full bg-white p-2 shadow-sm">
      {steps.map((label, index) => {
        const number = index + 1;
        return (
          <div
            className={`rounded-full px-2 py-3 text-center text-xs font-bold md:text-sm ${
              number <= current ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
            }`}
            key={label}
          >
            {number}. {label}
          </div>
        );
      })}
    </div>
  );
}

function SnapshotPanel({
  companyName,
  snapshot,
  onContinue,
}: {
  companyName: string;
  snapshot: Snapshot;
  onContinue: () => void;
}) {
  return (
    <section className="mt-10 rounded-[32px] bg-white p-6 shadow-soft md:p-8">
      <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
        Snapshot Ready
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold">{companyName} AI health score</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[0.45fr_0.55fr]">
        <div className="rounded-[28px] bg-slate-950 p-6 text-white">
          <p className="text-slate-300">AI Health Score</p>
          <p className="mt-3 text-7xl font-black text-emerald-300">{snapshot.healthScore}</p>
          <p className="mt-4 text-sm leading-6 text-slate-300">{snapshot.executiveSummary}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Top opportunities</h2>
          <div className="mt-4 space-y-3">
            {snapshot.topOpportunities.map((item) => (
              <div className="rounded-2xl border border-slate-200 p-4" key={item.title}>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-slate-600">
                  Impact: {item.impact} · Timeline: {item.timeline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="btn btn-primary mt-8" onClick={onContinue} type="button">
        Continue to Baseline Agreement
      </button>
    </section>
  );
}

function ContractPanel({
  contactName,
  companyName,
  onContinue,
}: {
  contactName: string;
  companyName: string;
  onContinue: () => void;
}) {
  return (
    <section className="mt-10 rounded-[32px] bg-white p-6 shadow-soft md:p-8">
      <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
        Performance Agreement
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold">Confirm the measurement baseline</h1>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 leading-8 text-slate-700">
        <p>
          {contactName || "Client"} acknowledges that Integrate Fast will use a signed operational
          and financial baseline for {companyName || "the company"} before any performance fee is
          charged. Integrate Fast only earns 40% of verified AI-attributed profit gains.
        </p>
        <label className="mt-6 flex items-start gap-3 font-semibold text-slate-900">
          <input className="mt-2" type="checkbox" required />
          I understand this is a preview acknowledgement and the final agreement is completed with
          an Integrate Fast advisor.
        </label>
      </div>
      <button className="btn btn-primary mt-8" onClick={onContinue} type="button">
        Continue to Financial Connections
      </button>
    </section>
  );
}

function ConnectionPanel({
  accounting,
  onContinue,
}: {
  accounting: { plaidEnabled: boolean; quickBooksEnabled: boolean };
  onContinue: () => void;
}) {
  return (
    <section className="mt-10 rounded-[32px] bg-white p-6 shadow-soft md:p-8">
      <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
        Optional Connections
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold">Connect financial systems</h1>
      <p className="mt-4 max-w-2xl leading-8 text-slate-600">
        The first snapshot is complete. Production Plaid and QuickBooks connections are env-gated,
        so this step shows whether credentials are configured without blocking the report.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ConnectionCard name="Bank connection (Plaid)" enabled={accounting.plaidEnabled} />
        <ConnectionCard name="QuickBooks" enabled={accounting.quickBooksEnabled} />
      </div>
      <button className="btn btn-primary mt-8" onClick={onContinue} type="button">
        Finish Report Request
      </button>
    </section>
  );
}

function ConnectionCard({ name, enabled }: { name: string; enabled: boolean }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-5">
      <p className="text-lg font-bold">{name}</p>
      <p className={`mt-2 text-sm font-semibold ${enabled ? "text-emerald-700" : "text-amber-700"}`}>
        {enabled ? "Configured for production" : "Credential not configured yet"}
      </p>
    </div>
  );
}

function ReportPanel({ sessionToken, email }: { sessionToken: string; email: string }) {
  return (
    <section className="mt-10 rounded-[32px] bg-white p-6 text-center shadow-soft md:p-8">
      <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
        Report Pending
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold">Your audit request is in motion.</h1>
      <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
        We saved your session and will send follow-up details to {email}. Your reference token is{" "}
        <span className="font-mono font-bold text-slate-900">{sessionToken}</span>.
      </p>
      <Link className="btn btn-primary mt-8" href="/">
        Back to Home
      </Link>
    </section>
  );
}
