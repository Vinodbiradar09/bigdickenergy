import { Project } from "@/lib/types";
import { GraveyardInfinite } from "@/components/graveyard-infinite";

async function getInitialProjects(): Promise<Project[]> {
  const res = await fetch(
    "http://localhost:3000/api/projects?limit=20&offset=0",
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to load graveyard");

  const data = await res.json();
  return data.projects;
}

export default async function GraveyardPage() {
  const projects = await getInitialProjects();

  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-extrabold">The Graveyard</h1>
          <p className="mt-6 text-gray-400 max-w-xl">
            Every startup here had courage.
            <br />
            Not all of them survived.
          </p>
        </header>

        <GraveyardInfinite initialProjects={projects} />
      </section>
    </main>
  );
}
