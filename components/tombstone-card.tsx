"use client";

import { Project } from "@/lib/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { hasFelt, markFelt } from "@/lib/felt";

export function TombstoneCard({ project }: { project: Project }) {
  const [felt, setFelt] = useState(project.felt);
  const [disabled, setDisabled] = useState(hasFelt(project.id));

  async function handleFelt() {
    if (disabled) return;

    setFelt((f) => f + 1);
    setDisabled(true);
    markFelt(project.id);

    await fetch(`/api/projects/${project.id}/felt`, {
      method: "POST",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      whileHover={{
        y: -10,
        boxShadow: "0 0 60px rgba(236,72,153,0.35)",
      }}
      transition={{ duration: 0.4 }}
      className="bg-[#111115] border border-white/10 rounded-[30px] p-8 min-h-[440px] flex flex-col justify-between"
    >
      <div>
        <span className="text-xs text-gray-500 uppercase">R.I.P</span>
        <h3 className="mt-2 text-2xl font-bold leading-tight">
          {project.name}
        </h3>

        <div className="mt-6 space-y-3 text-sm text-gray-400">
          <p>
            <span className="text-gray-500">Cause:</span>{" "}
            <span className="text-white">{project.cause}</span>
          </p>

          {project.age && (
            <p>
              <span className="text-gray-500">Age:</span> {project.age}
            </p>
          )}

          {project.commit && (
            <p className="font-mono text-xs">Last commit: {project.commit}</p>
          )}
        </div>
      </div>
      <div className="mt-10 flex items-center justify-between">
        <Button
          onClick={handleFelt}
          disabled={disabled}
          variant="ghost"
          className="flex gap-2 text-pink-400 hover:text-pink-300 disabled:opacity-40"
        >
          🖤 Felt {felt}
        </Button>

        <span className="text-xs italic text-gray-600">
          “At least we tried.”
        </span>
      </div>
    </motion.div>
  );
}
