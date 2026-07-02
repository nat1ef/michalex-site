"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/components/motion/animation-provider";
import { LogoFull, LogoMark } from "@/components/brand/logo";

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

    const minDelay = new Promise<void>((r) => setTimeout(r, 1200));
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
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress.value / 100})`;
        }
      },
    });

    Promise.all([minDelay, assetsReady]).then(() => {
      clearTimeout(forceDone);
      counterTween.kill();
      if (counterRef.current) counterRef.current.textContent = "100";
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
        duration: 0.9,
        ease: "power4.inOut",
      }).to(
        rootRef.current,
        { opacity: 0, duration: 0.2 },
        "-=0.15"
      );
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
      <div className="relative flex flex-col items-center gap-6">
        <LogoMark className="h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24 [&_span]:text-2xl sm:[&_span]:text-3xl" />
        <LogoFull className="hidden sm:flex" />
        <div className="flex items-baseline gap-2 font-mono text-xs text-muted-foreground">
          <span ref={counterRef}>000</span>
          <span className="text-foreground/30">%</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-border/40">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-copper/60 via-foreground to-copper/60"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
