"use client";
export default function AmbientBackground() {
  return (
    <>
      <div
        className="moon fixed top-10 right-20 w-24 h-24 rounded-full z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #fffde7, #c8b88a, #8a7a5a)",
          boxShadow:
            "0 0 60px 20px rgba(200,184,138,0.15), 0 0 120px 40px rgba(200,184,138,0.05)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
        {[
          { top: "15%", duration: "12s", delay: "0s", size: "20px" },
          { top: "35%", duration: "18s", delay: "-5s", size: "14px" },
          { top: "8%", duration: "15s", delay: "-8s", size: "16px" },
          { top: "55%", duration: "20s", delay: "-12s", size: "12px" },
        ].map((bat, i) => (
          <div
            key={i}
            className="bat"
            style={{
              top: bat.top,
              fontSize: bat.size,
              animationDuration: bat.duration,
              animationDelay: bat.delay,
            }}
          >
            🦇
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 pointer-events-none z-[3] overflow-hidden w-full h-48">
        <div
          className="fog-layer absolute bottom-0 w-[200%] h-full"
          style={{
            background:
              "linear-gradient(to top, rgba(57,255,20,0.04), transparent)",
          }}
        />
        <div
          className="fog-layer-2 absolute bottom-0 w-[200%] h-full"
          style={{
            background:
              "linear-gradient(to top, rgba(57,255,20,0.02), transparent)",
          }}
        />
      </div>
      <div
        className="fixed bottom-0 w-full h-28 pointer-events-none z-[3]"
        style={{
          background: "linear-gradient(to top, #0d1a0d, #0a120a, transparent)",
        }}
      />
    </>
  );
}
