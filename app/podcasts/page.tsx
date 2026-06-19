import type { Metadata } from "next";
import Link from "next/link";
import { PodcastList } from "@/components/PodcastList";

export const metadata: Metadata = {
  title: "AI Implementation Stories",
  description:
    "Listen to AI-generated implementation case studies for professional services, retail, and manufacturing businesses.",
};

export default function PodcastsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <nav className="container flex h-20 items-center justify-between">
          <Link className="font-space text-xl font-black" href="/">
            Integrate Fast
          </Link>
          <Link className="btn btn-light" href="/">
            Back to Home
          </Link>
        </nav>
      </header>
      <section className="container py-16">
        <p className="font-space text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">
          AI-Generated Podcast Series
        </p>
        <h1 className="font-display mt-3 max-w-4xl text-5xl font-bold md:text-7xl">
          Real AI implementation stories.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Detailed case studies of mid-size companies achieving transformational results through
          strategic AI implementation.
        </p>
        <PodcastList />
      </section>
    </main>
  );
}
