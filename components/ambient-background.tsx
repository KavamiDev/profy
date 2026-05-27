export function AmbientBackground({ variant = "default" }: { variant?: "default" | "subtle" }) {
  const opacity = variant === "subtle" ? "opacity-70" : "opacity-100";

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden ${opacity}`} aria-hidden>
      <div
        className="animate-float absolute -left-[15%] top-[-5%] h-[520px] w-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(232,93,76,0.12) 0%, transparent 70%)"
        }}
      />
      <div
        className="animate-float-slow absolute -right-[10%] top-[15%] h-[480px] w-[480px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,127,212,0.1) 0%, transparent 70%)"
        }}
      />
      <div
        className="absolute bottom-0 left-[20%] h-[360px] w-[600px] rounded-full opacity-60"
        style={{
          background: "radial-gradient(ellipse, rgba(212,165,116,0.08) 0%, transparent 70%)"
        }}
      />
    </div>
  );
}
