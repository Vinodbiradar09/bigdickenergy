"use client";

import { useEffect, useRef } from "react";

interface Props {
  text: string;
  fontSize?: number;
  className?: string;
}

export default function ExtrudedText({
  text,
  fontSize = 120,
  className = "",
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientRef = useRef<SVGRadialGradientElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const gradient = gradientRef.current;
    if (!svg || !gradient) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * 100;
      const cy = ((e.clientY - rect.top) / rect.height) * 100;
      gradient.setAttribute("cx", `${cx}%`);
      gradient.setAttribute("cy", `${cy}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const depth = 10;
  const id = text.replace(/\s+/g, "-").toLowerCase();

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 1200 ${fontSize * 1.5}`}
      width="100%"
      className={className}
      style={{ overflow: "visible", display: "block" }}
    >
      <defs>
        <radialGradient
          id={`shine-${id}`}
          ref={gradientRef}
          cx="50%"
          cy="50%"
          r="55%"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`scale(1200, ${fontSize * 1.5})`}
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
        </radialGradient>

        <linearGradient id={`depth-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff2fd6" stopOpacity="0.5" />
          <stop offset="35%" stopColor="#7a2cff" stopOpacity="0.5" />
          <stop offset="65%" stopColor="#2dfcff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#39ff14" stopOpacity="0.4" />
        </linearGradient>

        <text
          id={`txt-${id}`}
          x="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          y="55%"
          fontFamily="Impact, 'Arial Black', sans-serif"
          fontSize={fontSize}
          letterSpacing="6"
          fontWeight="900"
        >
          {text}
        </text>
      </defs>

      {Array.from({ length: depth }).map((_, i) => (
        <use
          key={i}
          href={`#txt-${id}`}
          fill="none"
          stroke={`url(#depth-${id})`}
          strokeWidth="0.5"
          transform={`translate(${(depth - i) * 0.6}, ${(depth - i) * 0.6})`}
          opacity={0.3 - i * 0.02}
        />
      ))}

      <use
        href={`#txt-${id}`}
        fill="none"
        stroke={`url(#shine-${id})`}
        strokeWidth="1.2"
      />
    </svg>
  );
}
