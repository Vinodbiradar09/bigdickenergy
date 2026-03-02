"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import AmbientBackground from "@/components/AmbientBackground";
import Tombstone from "@/components/Tombstone";
import SubmitModal from "@/components/SubmitModal";

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

const CAUSE_STATS = [
  { name: "Scope Creep", pct: 36 },
  { name: "Lost Motivation", pct: 25 },
  { name: "Too Many Features", pct: 17 },
  { name: "Tutorial Hell", pct: 11 },
  { name: "Life Happened", pct: 11 },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 12;

  const fetchProjects = useCallback(
    async (reset = false) => {
      setLoading(true);
      const currentOffset = reset ? 0 : offset;
      try {
        const res = await fetch(
          `/api/projects?limit=${LIMIT}&offset=${currentOffset}`,
        );
        const data = await res.json();
        if (data.success) {
          setProjects((p) =>
            reset ? data.projects : [...p, ...data.projects],
          );
          setOffset(currentOffset + data.count);
          setHasMore(data.count === LIMIT);
        }
      } finally {
        setLoading(false);
      }
    },
    [offset],
  );

  useEffect(() => {
    fetchProjects(true);
  }, [fetchProjects]);

  function handleSuccess() {
    fetchProjects(true);
  }

  return (
    <>
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "#0a0a0a",
            border: "1px solid rgba(57,255,20,0.2)",
            color: "#39ff14",
            fontFamily: "var(--font-space-mono)",
            fontSize: "12px",
          },
        }}
      />

      <AmbientBackground />
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pb-48 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="flicker text-[11px] tracking-[6px] uppercase mb-6"
            style={{
              color: "#39ff14",
              fontFamily: "var(--font-bebas)",
              textShadow: "0 0 20px #39ff14",
              fontSize: "14px",
              letterSpacing: "8px",
            }}
          >
            BigDickEnergy
          </motion.p>

          <h1
            className="glitch-title leading-[0.85] mb-4"
            style={{
              fontFamily: "var(--font-creepster)",
              fontSize: "clamp(56px, 12vw, 140px)",
              textShadow:
                "0 0 40px rgba(255,32,32,0.5), 0 0 80px rgba(255,32,32,0.2), 4px 4px 0 #8b0000",
              color: "#e8dcc8",
            }}
          >
            Graveyard of
            <br />
            Side Projects
          </h1>

          <p
            className="flicker mb-8"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(14px, 2.5vw, 22px)",
              letterSpacing: "6px",
              color: "#39ff14",
              textShadow: "0 0 20px #39ff14",
            }}
          >
            Where dreams come to rest in peace
          </p>

          <p
            className="text-[13px] italic max-w-lg mx-auto mb-12 leading-relaxed"
            style={{ color: "rgba(232,220,200,0.45)" }}
          >
            A sacred burial ground for all the apps, tools, startups, and this
            will only take a weekend projects that never made it. Submit yours.
            Mourn together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-8 mb-12 flex-wrap justify-center"
        >
          {[
            { num: projects.length || "...", label: "Projects Buried" },
            { num: "94%", label: "Died of Scope Creep" },
            { num: "∞", label: "Regrets" },
          ].map((s) => (
            <div
              key={s.label}
              className="scanline relative text-center border px-6 py-4"
              style={{
                borderColor: "rgba(57,255,20,0.2)",
                background: "rgba(57,255,20,0.03)",
              }}
            >
              <span
                className="block text-5xl"
                style={{
                  fontFamily: "var(--font-bebas)",
                  color: "#39ff14",
                  textShadow: "0 0 20px #39ff14",
                }}
              >
                {s.num}
              </span>
              <span
                className="text-[10px] tracking-[3px] uppercase"
                style={{ color: "rgba(232,220,200,0.4)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{
            y: -3,
            boxShadow:
              "0 0 0 1px #ff2020, 6px 6px 0 #8b0000, 0 0 40px rgba(255,32,32,0.3)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setModalOpen(true)}
          className="text-white px-12 py-5 text-[20px] tracking-[4px] transition-all duration-200"
          style={{
            fontFamily: "var(--font-bebas)",
            background: "#ff2020",
            boxShadow: "0 0 0 1px #8b0000, 4px 4px 0 #8b0000",
          }}
        >
          ⚰️ Bury Your Project
        </motion.button>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-5 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="text-[11px] tracking-[5px] uppercase mb-4"
            style={{ color: "#39ff14" }}
          >
            ☠️ the fallen ☠️
          </p>
          <h2
            className="text-[clamp(40px,6vw,80px)]"
            style={{
              fontFamily: "var(--font-creepster)",
              textShadow: "3px 3px 0 #8b0000",
            }}
          >
            Recent Burials
          </h2>
        </motion.div>

        {loading && projects.length === 0 ? (
          <div
            className="text-center py-20"
            style={{
              color: "rgba(232,220,200,0.3)",
              fontFamily: "var(--font-space-mono)",
              fontSize: "12px",
            }}
          >
            <div className="text-4xl mb-4 animate-pulse">⚰️</div>
            Digging graves...
          </div>
        ) : projects.length === 0 ? (
          <div
            className="text-center py-20"
            style={{ color: "rgba(232,220,200,0.3)" }}
          >
            <div className="text-5xl mb-4">🪦</div>
            <p
              style={{ fontFamily: "var(--font-creepster)", fontSize: "24px" }}
            >
              The graveyard is empty.
            </p>
            <p className="text-[12px] mt-2 italic">
              Be the first to bury your project.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <Tombstone key={p.id} project={p} index={i} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => fetchProjects()}
                  disabled={loading}
                  className="text-[14px] tracking-[3px] px-8 py-3 border transition-all hover:border-[#ff2020] hover:text-[#ff2020] disabled:opacity-40"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    borderColor: "rgba(232,220,200,0.2)",
                    color: "rgba(232,220,200,0.5)",
                  }}
                >
                  {loading ? "Loading..." : "Load More Graves"}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto px-5 pb-32"
      >
        <div className="text-center mb-12">
          <p
            className="text-[11px] tracking-[5px] uppercase mb-4"
            style={{ color: "#39ff14" }}
          >
            autopsy report
          </p>
          <h2
            className="text-[clamp(32px,5vw,64px)]"
            style={{
              fontFamily: "var(--font-creepster)",
              textShadow: "3px 3px 0 #8b0000",
            }}
          >
            Cause of Death
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAUSE_STATS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative border p-5 overflow-hidden"
              style={{
                borderColor: "rgba(57,255,20,0.08)",
                background: "rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="text-[11px] tracking-[2px] uppercase mb-2"
                style={{ color: "rgba(232,220,200,0.5)" }}
              >
                {c.name}
              </div>
              <div
                className="text-4xl mb-1"
                style={{ fontFamily: "var(--font-bebas)", color: "#e8dcc8" }}
              >
                {c.pct}%
              </div>
              <div className="text-[10px]" style={{ color: "#ff2020" }}>
                of all deaths
              </div>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, #8b0000, #ff2020)",
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${c.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
      <footer
        className="relative z-10 text-center py-16 border-t"
        style={{
          borderColor: "rgba(57,255,20,0.06)",
          color: "rgba(232,220,200,0.2)",
          fontSize: "11px",
          letterSpacing: "2px",
        }}
      >
        <div
          className="mb-4"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "16px" }}
        >
          BIGDICKENERGY
        </div>
        <div>Every project dies. Some just die here.</div>
        <div className="mt-4 text-[10px] opacity-50">
          bigdickenergy.vercel.app — no projects were harmed (they were already
          dead)
        </div>
      </footer>

      <SubmitModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
