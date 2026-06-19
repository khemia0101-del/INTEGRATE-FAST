import { NextResponse } from "next/server";
import { memoryStore } from "@/lib/memory-store";
import { hasDatabase, prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    sessionToken: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { sessionToken } = await params;

  if (hasDatabase()) {
    const session = await prisma.auditSession.findUnique({
      where: { sessionToken },
    });

    if (!session) {
      return NextResponse.json({ error: "Audit session not found." }, { status: 404 });
    }

    return NextResponse.json(session);
  }

  const session = memoryStore.audits.find((audit) => audit.sessionToken === sessionToken);
  if (!session) {
    return NextResponse.json({ error: "Audit session not found." }, { status: 404 });
  }

  return NextResponse.json(session);
}
