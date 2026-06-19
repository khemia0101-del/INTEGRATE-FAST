import type { Metadata } from "next";
import Link from "next/link";
import { AuditFlow } from "@/components/AuditFlow";

export const metadata: Metadata = {
  title: "Free AI Audit",
  description:
    "Get a free Integrate Fast business intelligence snapshot and identify your highest-ROI AI automation opportunities.",
};

export default function AIAuditPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eef2ff,#f8fafc)]">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="container flex h-20 items-center justify-between">
          <Link className="font-space text-xl font-black" href="/">
            Back to Integrate Fast
          </Link>
          <p className="hidden text-sm font-bold text-slate-500 md:block">AI Audit System</p>
        </nav>
      </header>
      <AuditFlow />
    </main>
  );
}
