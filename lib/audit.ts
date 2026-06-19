import OpenAI from "openai";
import type { z } from "zod";
import type { auditIntakeSchema } from "@/lib/validation";

export type AuditInput = z.infer<typeof auditIntakeSchema>;

export type AuditSnapshot = {
  healthScore: number;
  executiveSummary: string;
  topOpportunities: Array<{
    title: string;
    impact: string;
    timeline: string;
  }>;
  riskFactors: string[];
  nextSteps: string[];
};

const industryPlaybooks: Record<string, string[]> = {
  Manufacturing: ["predictive maintenance", "quality control", "production scheduling"],
  "Retail & E-Commerce": ["personalization", "inventory forecasting", "customer support automation"],
  "Professional Services": ["research workflows", "proposal drafting", "knowledge management"],
  Healthcare: ["intake routing", "billing review", "patient communication"],
  "Financial Services": ["document analysis", "risk monitoring", "client reporting"],
  "Technology / SaaS": ["support automation", "customer success scoring", "sales ops workflows"],
  "Real Estate": ["tenant communication", "maintenance triage", "portfolio reporting"],
  "Hospitality & Food Service": ["labor forecasting", "review response", "ordering optimization"],
  Construction: ["estimate review", "schedule risk alerts", "project documentation"],
  "Logistics & Distribution": ["route optimization", "warehouse exception handling", "invoice matching"],
  Education: ["student support", "content generation", "administrative workflows"],
  "Media & Marketing": ["campaign analysis", "content operations", "lead scoring"],
  "Legal Services": ["research acceleration", "contract review", "matter intake"],
  "Accounting & Tax": ["document collection", "classification", "client follow-up"],
};

export function deterministicSnapshot(input: AuditInput): AuditSnapshot {
  const opportunities = industryPlaybooks[input.industry] ?? [
    "back-office automation",
    "customer communication",
    "management reporting",
  ];

  return {
    healthScore: 74,
    executiveSummary: `${input.companyName} appears ready for a focused AI implementation sprint. Based on a ${input.annualRevenue} revenue profile and ${input.employees} employees, the highest-confidence path is to start with measurable workflow automation before expanding into broader autonomous agents.`,
    topOpportunities: opportunities.map((opportunity, index) => ({
      title: opportunity.replace(/\b\w/g, (letter) => letter.toUpperCase()),
      impact: index === 0 ? "High" : index === 1 ? "Medium-high" : "Medium",
      timeline: index === 0 ? "30-45 days" : index === 1 ? "45-60 days" : "60-90 days",
    })),
    riskFactors: [
      "Baseline metrics should be signed before any performance-fee engagement begins.",
      "Financial and operational data access will determine report quality.",
      "Team adoption should be managed with workflow-specific training, not generic AI tooling.",
    ],
    nextSteps: [
      "Review the snapshot with an Integrate Fast advisor.",
      "Confirm the quality-of-earnings baseline and owner add-back assumptions.",
      "Choose one high-impact workflow for the first autonomous agent deployment.",
    ],
  };
}

export async function generateAuditSnapshot(input: AuditInput): Promise<AuditSnapshot> {
  if (!process.env.OPENAI_API_KEY) {
    return deterministicSnapshot(input);
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "You create concise business AI implementation snapshots. Return valid JSON only.",
      },
      {
        role: "user",
        content: JSON.stringify({
          request: "Create an AI readiness and opportunity snapshot.",
          schema: {
            healthScore: "integer 0-100",
            executiveSummary: "string",
            topOpportunities: "array of 3 objects with title, impact, timeline",
            riskFactors: "array of 3 strings",
            nextSteps: "array of 3 strings",
          },
          business: input,
        }),
      },
    ],
  });

  const text = response.output_text;
  try {
    return JSON.parse(text) as AuditSnapshot;
  } catch {
    return deterministicSnapshot(input);
  }
}
