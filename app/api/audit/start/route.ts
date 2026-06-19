import { NextResponse } from "next/server";
import { generateAuditSnapshot } from "@/lib/audit";
import { rows, sendInternalNotification } from "@/lib/email";
import { makeId, memoryStore } from "@/lib/memory-store";
import { hasDatabase, prisma } from "@/lib/prisma";
import { auditIntakeSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = auditIntakeSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete every required audit field with a valid email address." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const snapshot = await generateAuditSnapshot(data);
  const sessionToken = makeId("audit");

  if (hasDatabase()) {
    await prisma.$transaction([
      prisma.lead.create({
        data: {
          source: "AI_AUDIT",
          contactName: data.contactName,
          companyName: data.companyName,
          email: data.contactEmail,
          phone: data.contactPhone || null,
          industry: data.industry,
          annualRevenue: data.annualRevenue,
          metadata: { employees: data.employees },
        },
      }),
      prisma.auditSession.create({
        data: {
          sessionToken,
          companyName: data.companyName,
          industry: data.industry,
          annualRevenue: data.annualRevenue,
          employees: data.employees,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone || null,
          snapshot,
          status: "SNAPSHOT_READY",
        },
      }),
    ]);
  } else {
    memoryStore.audits.push({
      id: makeId("session"),
      sessionToken,
      status: "SNAPSHOT_READY",
      ...data,
      snapshot,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  await sendInternalNotification({
    subject: `New AI audit started: ${data.companyName}`,
    html: `<h2>AI audit intake</h2><table>${rows(data)}</table>`,
  });

  return NextResponse.json({ sessionToken, snapshot, status: "SNAPSHOT_READY" });
}
