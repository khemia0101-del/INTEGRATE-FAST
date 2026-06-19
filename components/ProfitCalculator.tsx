"use client";

import { useMemo, useState } from "react";

const revenueValues: Record<string, number> = {
  "$500K - $1M": 750_000,
  "$1M - $2.5M": 1_750_000,
  "$2.5M - $5M": 3_750_000,
  "$5M - $10M": 7_500_000,
  "$10M - $25M": 17_500_000,
  "$25M - $50M": 37_500_000,
  "$50M+": 50_000_000,
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
  "Legal Services",
  "Accounting & Tax",
  "Other",
];

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProfitCalculator({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    firstName: "",
    companyName: "",
    email: "",
    annualRevenue: "$2.5M - $5M",
    profitMargin: "15",
    industry: "Professional Services",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  const result = useMemo(() => {
    const revenue = revenueValues[form.annualRevenue] ?? 0;
    const margin = Math.max(0, Number(form.profitMargin) || 0) / 100;
    const annualProfit = revenue * margin;
    const estimatedGain = Math.round(annualProfit * 0.2);
    const integrateFastFee = Math.round(estimatedGain * 0.4);
    const clientNetGain = estimatedGain - integrateFastFee;

    return { annualProfit, estimatedGain, integrateFastFee, clientNetGain };
  }, [form.annualRevenue, form.profitMargin]);

  if (!open) {
    return null;
  }

  async function submit() {
    setStatus("saving");
    setError("");

    const response = await fetch("/api/calculator-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, ...result }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "We could not save your calculator results.");
      setStatus("error");
      return;
    }

    setStatus("saved");
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-4 py-8">
      <div className="mx-auto grid max-w-5xl gap-6 rounded-[32px] bg-white p-6 shadow-soft md:grid-cols-[1.1fr_0.9fr] md:p-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
                AI Profit Calculator
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold">
                Calculate your AI profit potential
              </h2>
            </div>
            <button className="btn btn-light" onClick={onClose} type="button">
              Close
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              First name
              <input
                className="field"
                placeholder="Michael"
                value={form.firstName}
                onChange={(event) => setForm({ ...form, firstName: event.target.value })}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Company
              <input
                className="field"
                placeholder="Acme Distribution"
                value={form.companyName}
                onChange={(event) => setForm({ ...form, companyName: event.target.value })}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
              Email
              <input
                className="field"
                placeholder="you@company.com"
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Annual revenue
              <select
                className="field"
                value={form.annualRevenue}
                onChange={(event) => setForm({ ...form, annualRevenue: event.target.value })}
              >
                {Object.keys(revenueValues).map((range) => (
                  <option key={range}>{range}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Profit margin %
              <input
                className="field"
                inputMode="decimal"
                value={form.profitMargin}
                onChange={(event) => setForm({ ...form, profitMargin: event.target.value })}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
              Industry
              <select
                className="field"
                value={form.industry}
                onChange={(event) => setForm({ ...form, industry: event.target.value })}
              >
                {industries.map((industry) => (
                  <option key={industry}>{industry}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <aside className="rounded-[28px] bg-slate-950 p-6 text-white">
          <p className="text-sm font-semibold text-violet-200">Estimated upside</p>
          <div className="mt-5 space-y-5">
            <Metric label="Annual profit baseline" value={money(result.annualProfit)} />
            <Metric label="AI-attributed profit increase (+20%)" value={money(result.estimatedGain)} />
            <Metric label="Integrate Fast fee (40%)" value={money(result.integrateFastFee)} />
            <Metric label="Client net gain (60%)" value={money(result.clientNetGain)} highlight />
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-300">
            This is an estimate. A signed baseline and financial review determine the actual
            performance agreement.
          </p>
          <button
            className="btn btn-primary mt-6 w-full"
            disabled={status === "saving"}
            onClick={submit}
            type="button"
          >
            {status === "saving" ? "Saving..." : "Send My Results"}
          </button>
          {status === "saved" && (
            <p className="mt-4 rounded-2xl bg-emerald-400/15 p-3 text-sm text-emerald-100">
              Saved. We will use this to tailor your free AI audit.
            </p>
          )}
          {error && <p className="mt-4 rounded-2xl bg-red-400/15 p-3 text-sm text-red-100">{error}</p>}
        </aside>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-sm text-slate-300">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${highlight ? "text-emerald-300" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
