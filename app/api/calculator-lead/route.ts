import { NextResponse } from "next/server";
import { hasDatabase, prisma } from "@/lib/prisma";
import { calculatorLeadSchema } from "@/lib/validation";
import { makeId, memoryStore } from "@/lib/memory-store";
import { rows, sendInternalNotification } from "@/lib/email";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = calculatorLeadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete every calculator field with a valid email address." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (hasDatabase()) {
    await prisma.lead.create({
      data: {
        source: "PROFIT_CALCULATOR",
        firstName: data.firstName,
        companyName: data.companyName,
        email: data.email,
        industry: data.industry,
        annualRevenue: data.annualRevenue,
        profitMargin: data.profitMargin,
        estimatedGain: data.estimatedGain,
        integrateFastFee: data.integrateFastFee,
        clientNetGain: data.clientNetGain,
      },
    });
  } else {
    memoryStore.leads.push({
      id: makeId("lead"),
      source: "PROFIT_CALCULATOR",
      ...data,
      createdAt: new Date().toISOString(),
    });
  }

  await sendInternalNotification({
    subject: `New profit calculator lead: ${data.companyName}`,
    html: `<h2>Profit calculator lead</h2><table>${rows(data)}</table>`,
  });

  return NextResponse.json({ ok: true });
}
