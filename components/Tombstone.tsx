"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Globe, Flame } from "lucide-react";
import { toast } from "sonner";

type Project = {
  id: string;
  name: string;
  desc: string;
  cause: string;
  age: string;
  eulogy: string;
  commit: string;
  github: string;
  url: string;
  felt: number;
  createdAt: string;
};

export default function Tombstone({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [felt, setFelt] = useState(project.felt);
  const [hasFelt, setHasFelt] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFelt() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${project.id}/felt`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setFelt((f) => f + 1);
        setHasFelt(true);
        toast("🕯️ You felt this. Rest in peace.");
      } else {
        toast("Already felt this one.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative border border-[rgba(57,255,20,0.08)] bg-gradient-to-b from-[#111] to-[#0d0d0d] p-8 overflow-hidden transition-all duration-300 hover:border-[rgba(255,32,32,0.2)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(255,32,32,0.05)]"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8b0000] to-[#ff2020] scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] origin-left" />

      <div className="text-2xl mb-3">✝️</div>

      <div
        className="text-[10px] tracking-[4px] uppercase mb-1"
        style={{ color: "#ff2020", fontFamily: "var(--font-bebas)" }}
      >
        R . I . P
      </div>

      <h3
        className="text-2xl mb-1 leading-tight"
        style={{ fontFamily: "var(--font-creepster)", color: "#e8dcc8" }}
      >
        {project.name}
      </h3>

      <div
        className="text-[11px] italic mb-4"
        style={{ color: "rgba(232,220,200,0.35)" }}
      >
        Born with hope · Died of {project.cause} · Survived {project.age}
      </div>

      <span
        className="inline-block text-[9px] tracking-[2px] uppercase px-2 py-1 mb-4 border"
        style={{
          background: "rgba(139,0,0,0.3)",
          borderColor: "rgba(255,32,32,0.2)",
          color: "#ff2020",
        }}
      >
        💀 {project.cause}
      </span>

      {project.eulogy && (
        <p
          className="text-[12px] leading-relaxed mb-4 pl-3 border-l-2 italic"
          style={{ borderColor: "#8b0000", color: "rgba(232,220,200,0.6)" }}
        >
          {project.eulogy}
        </p>
      )}

      {project.commit && (
        <div
          className="text-[11px] px-3 py-2 mb-4 border"
          style={{
            background: "rgba(57,255,20,0.04)",
            borderColor: "rgba(57,255,20,0.08)",
            color: "rgba(57,255,20,0.7)",
            fontFamily: "var(--font-space-mono)",
          }}
        >
          <span style={{ color: "rgba(57,255,20,0.3)" }}>$ git commit -m</span>
          {project.commit}
          <span style={{ color: "rgba(57,255,20,0.3)" }}> </span>
        </div>
      )}

      {(project.github || project.url) && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] tracking-wide px-3 py-1 border transition-all duration-200 hover:border-[rgba(57,255,20,0.4)] hover:text-[#39ff14]"
              style={{
                borderColor: "rgba(232,220,200,0.1)",
                color: "rgba(232,220,200,0.35)",
              }}
            >
              <Github size={10} /> Source Code
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] tracking-wide px-3 py-1 border transition-all duration-200 hover:border-[rgba(57,255,20,0.4)] hover:text-[#39ff14]"
              style={{
                borderColor: "rgba(232,220,200,0.1)",
                color: "rgba(232,220,200,0.35)",
              }}
            >
              <Globe size={10} /> Ghost Site
            </a>
          )}
        </div>
      )}

      <hr className="border-[rgba(57,255,20,0.08)] my-4" />

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleFelt}
        disabled={loading || hasFelt}
        className="w-full flex items-center justify-center gap-2 text-[11px] py-2 px-4 border transition-all duration-200 disabled:opacity-60"
        style={{
          borderColor: hasFelt
            ? "rgba(57,255,20,0.3)"
            : "rgba(232,220,200,0.1)",
          color: hasFelt ? "#39ff14" : "rgba(232,220,200,0.4)",
          background: hasFelt ? "rgba(57,255,20,0.04)" : "transparent",
          fontFamily: "var(--font-space-mono)",
        }}
      >
        <Flame size={12} />
        {felt.toLocaleString()} people felt this
      </motion.button>
    </motion.div>
  );
}
