"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";
import { statement } from "@/lib/content";
import { cn } from "@/lib/utils";

export function StatementScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const words = section.querySelectorAll<HTMLElement>("[data-sword]");
      gsap.set(words, { opacity: 0.13 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08 },
        0
      ).to(
        words,
        {
          opacity: 1,
          duration: 0.12,
          stagger: 0.055,
          ease: "none",
        },
        0.05
      );
      // Hold a beat at the end so the full statement lingers before unpinning
      tl.to({}, { duration: 0.18 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="ambient-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="section-shell relative py-12 sm:py-16">
        <p ref={kickerRef} className="telemetry-label mb-6 sm:mb-8">
          <span className="text-copper/80">[</span> {statement.kicker}{" "}
          <span className="text-copper/80">]</span>
        </p>
        <p className="statement-scroll max-w-[78rem]">
          {statement.words.map((w, i) => (
            <span
              key={i}
              data-sword
              className={cn(
                "inline-block",
                "accent" in w && w.accent ? "text-copper" : "text-foreground",
                i > 0 && "ml-[0.28em]"
              )}
            >
              {w.text}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
