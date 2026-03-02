"use client";

import { useEffect, useRef, useState } from "react";
import { Project } from "@/lib/types";
import { TombstoneGrid } from "@/components/tombstone-grid";

const LIMIT = 20;

export function GraveyardInfinite({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [offset, setOffset] = useState(initialProjects.length);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  async function fetchMore() {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await fetch(`/api/projects?limit=${LIMIT}&offset=${offset}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();

    setProjects((prev) => [...prev, ...data.projects]);
    setOffset((prev) => prev + data.projects.length);

    if (data.projects.length < LIMIT) {
      setHasMore(false);
    }

    setLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { rootMargin: "200px" },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [offset, hasMore, loading]);

  return (
    <>
      <TombstoneGrid projects={projects} />

      {hasMore && (
        <div ref={loaderRef} className="h-10 flex items-center justify-center">
          {loading && <p className="text-gray-400">Loading more...</p>}
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500 mt-10">
          No more projects to load
        </p>
      )}
    </>
  );
}
