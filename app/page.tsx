"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = 10_000;

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = Number(localStorage.getItem("bde_clicks") || 0);
    setClicks(saved);
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (clicks >= TARGET) return;

    const next = clicks + 1;
    setClicks(next);
    localStorage.setItem("bde_clicks", String(next));
  };

  const reset = () => {
    localStorage.removeItem("bde_clicks");
    setClicks(0);
  };

  if (!mounted) return null;

  if (clicks >= TARGET) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <motion.h1
            className="bde-brand"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(56px, 14vw, 160px)",
              letterSpacing: "4px",
              lineHeight: 0.9,
              textAlign: "center",
              willChange: "background-position, filter",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              filter: ["brightness(1)", "brightness(1.25)", "brightness(1)"],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            BIG DICK
            <br />
            ENERGY
          </motion.h1>

          <p className="mt-4 tracking-widest text-sm opacity-70">CONFIRMED</p>

          <p className="mt-8 text-xs leading-relaxed opacity-40">
            You clicked ten thousand times.
            <br />
            No one was watching.
            <br />
            That’s the point.
          </p>

          <button
            onClick={reset}
            className="mt-10 px-6 py-2 border border-white/20 text-xs tracking-widest opacity-50 hover:opacity-100 transition"
          >
            RESET
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest opacity-40 mb-3">
          A TEST OF DISCIPLINE
        </p>

        <motion.h1
          className="bde-brand"
          style={{
            fontFamily: "Impact, sans-serif",
            fontSize: "clamp(48px, 12vw, 120px)",
            letterSpacing: "3px",
            lineHeight: 1,
            textAlign: "center",
            willChange: "background-position",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          BIG DICK ENERGY
        </motion.h1>

        <p className="mt-4 text-xs tracking-wide opacity-50">
          Confidence is built. Not announced.
        </p>
      </div>

      <div className="text-center mb-10">
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "clamp(48px, 10vw, 96px)",
          }}
          className="text-white"
        >
          {clicks.toLocaleString()}
        </div>
        <p className="text-xs tracking-widest opacity-30 mt-1">CLICKS</p>
      </div>
      <button
        onClick={handleClick}
        className="w-64 h-16 border border-white/30 text-sm tracking-widest hover:border-white transition active:translate-y-[2px]"
      >
        CLICK
      </button>
      <div className="mt-14 max-w-sm text-center text-xs leading-relaxed opacity-35">
        Anyone can start.
        <br />
        Very few finish.
        <br />
        <br />
        Ten thousand clicks.
        <br />
        No reward.
        <br />
        No applause.
        <br />
        <br />
        If you reach the end,
        <br />
        you already know why it mattered.
      </div>
    </div>
  );
}
