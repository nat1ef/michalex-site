"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";

const line =
  "ΤΟΡΝΟΣ · ΦΡΕΖΑ · ΓΡΑΝΑΖΙΑ · ΑΞΟΝΕΣ · ΜΕΤΑΔΟΣΗ · ΑΚΡΙΒΕΙΑ · CUSTOM · ΑΘΗΝΑ · ";

export function StatementScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="δηλωση"
      data-section="statement-scroll"
      className="relative overflow-hidden border-y-2 border-copper/40 bg-foreground/[0.03] py-20 sm:py-28"
    >
      <p className="section-shell telemetry-label mb-6 text-copper">
        [ ΝΕΟ · STRUCTURAL REDESIGN ]
      </p>
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        <p className="statement-scroll px-4 text-copper">{line.repeat(4)}</p>
        <p className="statement-scroll px-4 text-foreground/25">{line.repeat(4)}</p>
      </div>
    </section>
  );
}
