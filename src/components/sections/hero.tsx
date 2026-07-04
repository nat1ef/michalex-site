"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "@/components/motion/animation-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { ViberButton } from "@/components/contact/viber-button";
import {
  HeroGear3D,
  TEETH_COUNT,
  type HeroGear3DHandle,
} from "@/components/motion/hero-gear-3d";
import { siteConfig } from "@/lib/content";

const TITLE_LINES = ["ΜΗΧΑΝΟΥΡΓΕΙΟ", "ΑΛΕΞΑΝΔΡΑΚΗΣ"];

function CharLine({ text, accentLast }: { text: string; accentLast?: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          data-char
          className={
            "inline-block will-change-transform" +
            (accentLast && i >= text.length - 1 ? " text-copper" : "")
          }
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const gearRef = useRef<HeroGear3DHandle | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const title = titleRef.current;
      const gear = gearRef.current;
      if (!section || !title || !gear) return;

      const chars = title.querySelectorAll("[data-char]");

      gsap.set(chars, { yPercent: 112, opacity: 0 });
      gsap.set([kickerRef.current, contentRef.current], { opacity: 0, y: 26 });

      const mm = gsap.matchMedia();

      const build = (end: string) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Phase 1 — the cutter sweeps around, teeth are cut in one by one.
        // The cutter's angular speed is derived from the teeth stagger so
        // it's pointing at tooth[i] at the exact moment tooth[i] appears —
        // positive z matches the counter-clockwise order teeth were placed in.
        const teethStart = 0.02;
        const teethStagger = 0.021;
        const teethDuration = 0.14;
        const sweepSpan = (TEETH_COUNT - 1) * teethStagger;
        const sweepAngle = (TEETH_COUNT - 1) * ((Math.PI * 2) / TEETH_COUNT);

        tl.to(
          gear.cutter.rotation,
          { z: sweepAngle, ease: "none", duration: sweepSpan },
          teethStart
        ).to(
          gear.teeth.map((t) => t.scale),
          { y: 1, ease: "none", stagger: teethStagger, duration: teethDuration },
          teethStart
        );

        // Phase 2 — finished gear lifts off the blank, spins, and clears the stage
        const teethEnd = teethStart + sweepSpan + teethDuration;
        const exitStart = teethEnd + 0.02;

        tl.to(gear.cutter.scale, { x: 0, y: 0, z: 0, duration: 0.06 }, teethEnd).to(
          gear.gearGroup.position,
          { y: 0.8, ease: "power2.in", duration: 0.24 },
          exitStart
        )
          .to(
            gear.gearGroup.rotation,
            { z: Math.PI * 1.4, ease: "power2.in", duration: 0.24 },
            exitStart
          )
          .to(
            gear.gearGroup.scale,
            { x: 0.15, y: 0.15, z: 0.15, ease: "power2.in", duration: 0.24 },
            exitStart
          );

        // Phase 3 — the headline was behind it all along
        const headlineStart = exitStart + 0.08;
        tl.to(
          chars,
          { yPercent: 0, opacity: 1, stagger: 0.024, ease: "power4.out", duration: 0.3 },
          headlineStart
        )
          .to(
            kickerRef.current,
            { opacity: 1, y: 0, ease: "power3.out", duration: 0.16 },
            headlineStart + 0.08
          )
          .to(
            contentRef.current,
            { opacity: 1, y: 0, ease: "power3.out", duration: 0.2 },
            headlineStart + 0.14
          )
          .to(scrollCueRef.current, { opacity: 0, y: 16, duration: 0.1 }, 0.3);

        return tl;
      };

      mm.add("(min-width: 768px)", () => {
        const tl = build("+=220%");
        return () => tl.scrollTrigger?.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const tl = build("+=170%");
        return () => tl.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      id="αρχικη"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Fullscreen 3D scene — the hero's main subject, not a small icon */}
      <div className="absolute inset-0 z-0">
        <HeroGear3D ref={gearRef} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_38%,oklch(0.72_0.145_55/0.06),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/25 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pt-[4.5rem]">
        <h1
          ref={titleRef}
          aria-label="Μηχανουργείο Αλεξανδράκης"
          className="display-hero-compact pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
        >
          {TITLE_LINES.map((line, i) => (
            <CharLine key={line} text={line} accentLast={i === 1} />
          ))}
        </h1>
      </div>

      <div className="section-shell relative z-10 pb-14 sm:pb-20">
        <p ref={kickerRef} className="telemetry-label text-center sm:text-left">
          <span className="text-copper/80">[</span> ΜΕΤΑΔΟΣΗ ΚΙΝΗΣΗΣ · ΑΘΗΝΑ 104 41{" "}
          <span className="text-copper/80">]</span>
        </p>

        <div
          ref={contentRef}
          className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-xl text-center text-base leading-relaxed text-foreground/85 sm:text-left sm:text-lg">
            Γρανάζια, άξονες και μηχανολογικά εξαρτήματα κατά σχέδιο ή δείγμα.
            Δεκαετίες εμπειρίας σε τόρνο και φρέζα — από την Καστοριάς 2.
          </p>
          <div className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:w-auto sm:justify-end sm:gap-3">
            <ButtonLink
              href={siteConfig.phoneHref}
              size="lg"
              className="magnetic-btn w-full gap-2 rounded-none px-7 font-mono text-[10px] uppercase tracking-[0.14em] sm:w-auto sm:text-[11px]"
            >
              Κλήση
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>
            <ViberButton
              size="lg"
              label="Viber"
              className="magnetic-btn w-full rounded-none sm:w-auto"
            />
          </div>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-8 right-6 z-10 flex flex-col items-center gap-2 sm:right-12"
        aria-hidden
      >
        <span className="telemetry-label">SCROLL</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-copper/70" />
      </div>
    </section>
  );
}
