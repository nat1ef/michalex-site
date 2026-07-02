"use client";

/** Fixed CRT scanlines + vignette — tactical telemetry layer. */
export function CinematicOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[2]">
      <div className="scanlines absolute inset-0 opacity-[0.04]" />
      <div className="cinematic-vignette absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,oklch(0.72_0.145_55/0.06),transparent_50%)]" />
    </div>
  );
}
