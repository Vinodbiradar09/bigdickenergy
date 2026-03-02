"use client";

import { Project } from "@/lib/types";
import { TombstoneCard } from "./tombstone-card";

export function TombstoneGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <TombstoneCard key={project.id} project={project} />
      ))}
    </div>
  );
}
