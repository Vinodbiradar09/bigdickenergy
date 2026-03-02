import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-[#EDEDED] flex flex-col justify-center px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="font-heading text-5xl md:text-7xl tracking-tight">
          bigdickenergy
        </h1>

        <p className="text-lg text-gray-400 max-w-xl">
          A place for startup ideas that didn’t make it.
        </p>

        <p className="text-gray-500 max-w-xl leading-relaxed">
          Not failures. Attempts.
          <br />
          Built by people who had the confidence to try
          <br />
          and the clarity to stop.
        </p>

        <div className="pt-6 flex gap-6">
          <Link
            href="/bury"
            className="text-sm uppercase tracking-wide text-[#C084FC] hover:opacity-80 transition"
          >
            Bury a project
          </Link>

          <Link
            href="/graveyard"
            className="text-sm uppercase tracking-wide text-gray-400 hover:text-white transition"
          >
            Visit the graveyard
          </Link>
        </div>
      </div>
    </main>
  );
}
