export function AmbientBackground({ variant = "default" }: { variant?: "default" | "subtle" }) {
  const opacity = variant === "subtle" ? "opacity-60" : "opacity-100";

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden ${opacity}`} aria-hidden>
      {/* Un seul halo, ultra doux, centré en haut à droite. */}
      <div
        className="animate-float absolute -right-[20%] -top-[15%] h-[720px] w-[720px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,93,76,0.10) 0%, rgba(232,93,76,0.04) 35%, transparent 70%)"
        }}
      />
      {/* Voile lavande très diffus en bas, pour de la profondeur. */}
      <div
        className="absolute -bottom-[30%] left-[10%] h-[480px] w-[680px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,127,212,0.07) 0%, transparent 65%)"
        }}
      />
    </div>
  );
}
