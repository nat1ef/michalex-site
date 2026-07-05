"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/components/motion/animation-provider";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onComplete();
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const progress = { value: 0 };
    const forceDone = setTimeout(() => {
      document.body.style.overflow = "";
      setVisible(false);
      onComplete();
    }, 4500);

    const minDelay = new Promise<void>((r) => setTimeout(r, 1300));
    const assetsReady = new Promise<void>((resolve) => {
      const done = () => resolve();
      const video = document.querySelector<HTMLVideoElement>("video");
      if (!video) {
        if (document.readyState === "complete") done();
        else window.addEventListener("load", done, { once: true });
        return;
      }
      if (video.readyState >= 3) done();
      else {
        video.addEventListener("canplaythrough", done, { once: true });
        video.addEventListener("error", done, { once: true });
        setTimeout(done, 3000);
      }
    });

    const counterTween = gsap.to(progress, {
      value: 1,
      duration: 1.7,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = progress.value.toFixed(3);
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress.value})`;
        }
      },
    });

    Promise.all([minDelay, assetsReady]).then(() => {
      clearTimeout(forceDone);
      counterTween.kill();
      if (counterRef.current) counterRef.current.textContent = "1.000";
      if (barRef.current) barRef.current.style.transform = "scaleX(1)";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setVisible(false);
          onComplete();
        },
      });

      tl.to(rootRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
        delay: 0.15,
      });
    });

    return () => {
      clearTimeout(forceDone);
      document.body.style.overflow = "";
      counterTween.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background will-change-transform"
      aria-hidden
    >
      <div className="grain-overlay absolute inset-0 opacity-50" />

      {/* Meridian-style prologue: the name alone, thin and widely tracked,
          on a black stage. */}
      <div className="relative flex flex-col items-center px-6 text-center">
        <p className="font-mono text-[clamp(0.8rem,2.6vw,1.35rem)] font-light uppercase tracking-[0.42em] text-foreground/90">
          ΜΗΧΑΝΟΥΡΓΕΙΟ <span className="mx-2 text-copper/80 sm:mx-3">|</span>{" "}
          ΑΛΕΞΑΝΔΡΑΚΗΣ
        </p>

        <p className="telemetry-label mt-6">
          ΜΕΤΑΔΟΣΗ ΚΙΝΗΣΗΣ · ΑΘΗΝΑ
        </p>

        <div className="mt-12 h-px w-56 overflow-hidden bg-border/40 sm:w-80">
          <div
            ref={barRef}
            className="h-full origin-left bg-copper"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.32em] text-muted-foreground">
          <span ref={counterRef}>0.000</span> <span className="text-copper">mm</span>
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-copper/30" />
    </div>
  );
}
