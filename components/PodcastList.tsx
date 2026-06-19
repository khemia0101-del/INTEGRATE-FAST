"use client";

import { useState } from "react";

const episodes = [
  {
    category: "Professional Services",
    title: "How a Law Firm Reduced Research Time by 85% with AI",
    duration: "7:00",
    summary:
      "A 75-attorney law firm uses AI-assisted research, document analysis, and contract review to improve depth while reducing repetitive research time.",
  },
  {
    category: "Retail & E-Commerce",
    title: "How a Regional Retailer Used AI to Triple Online Conversion Rates",
    duration: "7:15",
    summary:
      "A 42-store retailer applies AI personalization, dynamic pricing, and inventory optimization to modernize its online sales engine.",
  },
  {
    category: "Manufacturing",
    title: "How a Mid-Size Manufacturer Achieved 47% Productivity Gains with AI",
    duration: "8:00",
    summary:
      "A 250-employee manufacturer combines predictive maintenance, computer vision quality control, and production scheduling agents.",
  },
];

export function PodcastList() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mt-10 grid gap-6">
      {episodes.map((episode, index) => (
        <article className="rounded-[28px] bg-white p-6 shadow-sm" key={episode.title}>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold text-indigo-600">{episode.category}</p>
              <h2 className="mt-2 text-2xl font-bold">{episode.title}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">{episode.summary}</p>
            </div>
            <button
              className="btn btn-primary min-w-28"
              onClick={() => {
                setActive(index);
                setPlaying(active === index ? !playing : true);
              }}
              type="button"
            >
              {active === index && playing ? "Pause" : "Play"}
            </button>
          </div>
          {active === index && playing && (
            <div className="mt-5 rounded-2xl bg-indigo-50 p-4">
              <div className="h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full w-1/3 rounded-full bg-indigo-600" />
              </div>
              <p className="mt-3 text-sm font-semibold text-indigo-900">
                Playing episode brief · {episode.duration}
              </p>
            </div>
          )}
        </article>
      ))}
      <section className="rounded-[32px] bg-slate-950 p-8 text-center text-white">
        <h2 className="font-display text-4xl font-bold">Ready to achieve similar results?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          These stories are blueprints for AI transformation. Start with a free audit to identify
          the right workflow for your business.
        </p>
        <a className="btn btn-primary mt-6" href="/ai-audit">
          Talk to Our AI Consultant
        </a>
      </section>
    </div>
  );
}
