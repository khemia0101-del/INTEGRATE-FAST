import { NextResponse } from "next/server";
import OpenAI from "openai";
import { makeId, memoryStore } from "@/lib/memory-store";
import { hasDatabase, prisma } from "@/lib/prisma";
import { chatMessageSchema } from "@/lib/validation";

function fallbackReply(content: string) {
  const lower = content.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("fee")) {
    return "Integrate Fast is performance-based: zero upfront consulting cost, then 40% of verified AI-attributed profit gains. The first step is a free audit that establishes a measurable baseline.";
  }
  if (lower.includes("audit") || lower.includes("qoe")) {
    return "The free AI audit creates a business intelligence snapshot first, then the deeper QoE-style baseline comes after you confirm the engagement and connect financial systems.";
  }
  if (lower.includes("timeline") || lower.includes("long")) {
    return "A focused first workflow usually takes 30-60 days from baseline to deployment. The important part is choosing one measurable process before expanding across the company.";
  }
  return "The best place to start is a free AI audit. It identifies the highest-ROI workflow, estimates the upside, and gives both sides a measurable baseline before any performance fee applies.";
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = chatMessageSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Send a valid chat message." }, { status: 400 });
  }

  const { visitorId, messages } = parsed.data;
  const latest = messages[messages.length - 1]?.content ?? "";
  let response = fallbackReply(latest);

  if (process.env.OPENAI_API_KEY) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are Integrate Fast's concise AI implementation consultant. Explain performance-based AI consulting, free AI audits, QoE baselines, and practical next steps. Do not mention OpenClaw.",
        },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    });
    response = completion.output_text || response;
  }

  const transcript = [...messages, { role: "assistant" as const, content: response }];

  if (transcript.length >= 4) {
    if (hasDatabase()) {
      await prisma.chatTranscript.create({
        data: {
          visitorId,
          messages: transcript,
        },
      });
    } else {
      memoryStore.chats.push({
        id: makeId("chat"),
        visitorId,
        messages: transcript,
        createdAt: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({ response });
}
