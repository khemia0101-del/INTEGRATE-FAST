import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="container flex min-h-screen flex-col items-center justify-center text-center">
        <p className="mb-4 rounded-full border border-white/20 px-4 py-2 text-sm text-slate-300">
          404
        </p>
        <h1 className="font-display text-5xl font-bold">That page is not part of Integrate Fast.</h1>
        <p className="mt-5 max-w-xl text-slate-300">
          The rebuilt site removes legacy product surfaces. Head back to the consulting experience.
        </p>
        <Link className="btn btn-primary mt-8" href="/">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
