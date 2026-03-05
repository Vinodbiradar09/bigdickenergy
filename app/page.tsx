"use client";

import { useEffect, useRef, useState } from "react";

const TARGET = 10_000;

function BDELogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow-logo">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="32" height="32" rx="7" fill="#111111" />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="6.5"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        fill="none"
      />
      <circle
        cx="16"
        cy="16"
        r="10"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />
      <circle
        cx="16"
        cy="16"
        r="6"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="0.5"
      />
      <line
        x1="16"
        y1="4"
        x2="16"
        y2="28"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="0.5"
      />
      <line
        x1="4"
        y1="16"
        x2="28"
        y2="16"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="0.5"
      />
      <polygon
        points="16,5 18.5,13 27,13 20.5,18 23,26 16,21 9,26 11.5,18 5,13 13.5,13"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
        strokeLinejoin="round"
        filter="url(#glow-logo)"
      />
      <polygon
        points="16,9 17.5,14 22.5,14 18.5,17 20,22 16,19 12,22 13.5,17 9.5,14 14.5,14"
        fill="rgba(255,255,255,0.9)"
        filter="url(#glow-logo)"
      />
    </svg>
  );
}

function WatermarkText({ lines }: { lines: string[] }) {
  const lh = 160;
  const totalH = lh * lines.length + 20;

  return (
    <svg
      viewBox={`0 0 1400 ${totalH}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      className="block overflow-visible"
    >
      {lines.map((line, li) => {
        const y = lh * li + lh * 0.8;
        return (
          <text
            key={li}
            x="50%"
            y={y}
            textAnchor="middle"
            dominantBaseline="auto"
            fontFamily="Impact, 'Arial Black', sans-serif"
            fontSize={140}
            letterSpacing={8}
            fill="none"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.2"
            paintOrder="stroke"
          >
            {line}
          </text>
        );
      })}
    </svg>
  );
}

export default function Home() {
  const [clicks, setClicks] = useState<number | null>(null);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const particleId = useRef(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem("bde_clicks") || 0);
    Promise.resolve().then(() => setClicks(saved));
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (clicks === null || clicks >= TARGET) return;
    const next = clicks + 1;
    setClicks(next);
    localStorage.setItem("bde_clicks", String(next));

    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
      const id = particleId.current++;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setParticles((p) => [...p, { id, x, y }]);
      setTimeout(
        () => setParticles((p) => p.filter((pt) => pt.id !== id)),
        600,
      );
    }
  };

  const reset = () => {
    localStorage.removeItem("bde_clicks");
    setClicks(0);
  };

  if (clicks === null) return null;

  const pct = Math.min((clicks / TARGET) * 100, 100);

  if (clicks >= TARGET) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center font-mono text-[#e8e0d0] bde-cursor">
        <div className="text-center w-full max-w-4xl px-10 py-16">
          <div className="inline-block border border-white/20 text-[10px] tracking-[4px] px-4 py-1.5 mb-10 opacity-60">
            CONFIRMED
          </div>
          <WatermarkText lines={["BIG DICK", "ENERGY"]} />
          <p className="mt-8 text-xs leading-loose opacity-35 tracking-wide">
            You clicked ten thousand times.
            <br />
            No one was watching.
            <br />
            That&apos;s the point.
          </p>
          <button
            onClick={reset}
            className="mt-12 bg-transparent border border-white/20 text-white px-8 py-3 text-[11px] tracking-[3px] font-mono cursor-pointer opacity-50 hover:border-white/50 hover:opacity-100 transition-all duration-200"
          >
            START OVER
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e0d0] font-mono overflow-x-hidden bde-cursor">
      <nav className="flex items-center justify-between px-10 py-5 border-b border-white/[0.07] sticky top-0 z-50 bg-[rgba(8,8,8,0.92)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <BDELogo size={32} />
          <span className="text-white text-sm font-bold tracking-wide">
            BigDickEnergy
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-[11px] tracking-[2px] opacity-40">
            {clicks.toLocaleString()} / {TARGET.toLocaleString()}
          </span>
          <button
            onClick={handleClick}
            className="bg-white text-black px-5 py-2 text-[11px] font-bold tracking-[2px] cursor-pointer hover:opacity-85 transition-opacity font-mono"
          >
            CLICK IT ↗
          </button>
        </div>
      </nav>

      <section className="px-10 pt-24 pb-20 max-w-5xl border-b border-white/[0.07]">
        <div className="flex items-center gap-3 text-[11px] tracking-[2px] opacity-50 mb-9">
          <span className="text-[#39ff14] text-[8px]">●</span>
          <span>{clicks.toLocaleString()} clicks completed</span>
          <span className="inline-block w-14 h-px bg-current opacity-40" />
        </div>

        <h1 className="font-serif text-[clamp(40px,6vw,84px)] font-normal leading-[1.1] tracking-tight mb-7">
          <span className="text-white/[0.28]">Prove Your</span>{" "}
          <span className="text-white">Discipline</span>{" "}
          <span className="text-white/[0.28]">Not Your</span>
          <br />
          <span className="text-white/[0.28]">Mouth.</span>{" "}
          <span className="text-white">Ten Thousand</span>{" "}
          <span className="text-white/[0.18]">Clicks.</span>
        </h1>

        <p className="text-[13px] tracking-[3px] opacity-40 mb-11 uppercase">
          Confidence is built. Not announced.
        </p>

        <div className="flex gap-4 items-center mb-12">
          <button
            ref={btnRef}
            onClick={handleClick}
            className="relative overflow-hidden bg-[#6c47ff] hover:bg-[#7a5cff] text-white px-8 py-3.5 text-xs font-bold tracking-[2px] cursor-pointer transition-colors duration-200 active:translate-y-px rounded font-mono"
          >
            CLICK NOW ↗
            {particles.map((p) => (
              <span
                key={p.id}
                className="click-ripple absolute w-1.5 h-1.5 rounded-full bg-white/70 pointer-events-none"
                style={{ left: p.x, top: p.y }}
              />
            ))}
          </button>
          <button
            onClick={reset}
            className="bg-transparent text-white border border-white/20 hover:border-white/50 px-7 py-3.5 text-xs tracking-[2px] cursor-pointer transition-colors duration-200 rounded font-mono"
          >
            Reset Counter
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative h-px bg-white/10 max-w-[400px] flex-1">
            <div
              className="bde-progress-fill h-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[10px] tracking-[2px] opacity-35">
            {pct.toFixed(1)}% complete
          </span>
        </div>
      </section>

      <section className="grid grid-cols-3 border-b border-white/[0.07]">
        {[
          {
            icon: "◈",
            title: "Anyone Can Start",
            desc: "One click is all it takes to begin. The hard part is deciding to finish.",
          },
          {
            icon: "◉",
            title: "Very Few Finish",
            desc: "Ten thousand clicks. No reward. No applause. Just the knowledge that you did it.",
          },
          {
            icon: "◎",
            title: "No Shortcuts",
            desc: "Every click is manual. Every click is intentional. This is what discipline looks like.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className={`px-10 py-12 ${i < 2 ? "border-r border-white/[0.07]" : ""}`}
          >
            <div className="text-xl opacity-50 mb-5">{f.icon}</div>
            <h3 className="text-sm font-bold tracking-wide mb-3 text-white">
              {f.title}
            </h3>
            <p className="text-xs leading-loose opacity-45">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden border-t border-white/[0.05]">
        <WatermarkText lines={["BIG DICK ENERGY"]} />
      </section>
    </div>
  );
}
