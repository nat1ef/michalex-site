"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "@/components/motion/animation-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { ViberButton } from "@/components/contact/viber-button";
import { siteConfig } from "@/lib/content";

const TITLE_LINES = ["ΜΗΧΑΝΟΥΡΓΕΙΟ", "ΑΛΕΞΑΝΔΡΑΚΗΣ"];

const TEETH = 24;
const SIZE = 560;
const CENTER = SIZE / 2;
const BLANK_R = 170;
const TOOTH_W = 15;
const TOOTH_H = 66;
const HUB_R = SIZE * 0.09;

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

function HeroGear() {
  const tick = SIZE * 0.16;
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden
    >
      <g data-gear-group>
        {/* blank cylinder the teeth are cut into */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={BLANK_R}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground/75"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={BLANK_R - 24}
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="3 10"
          className="text-foreground/25"
        />

        {/* center hub + crosshair, matching the brand mark's technical-drawing language */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={HUB_R}
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-foreground/75"
        />
        <path
          d={`M${CENTER} ${CENTER - tick} V${CENTER - HUB_R} M${CENTER} ${CENTER + HUB_R} V${CENTER + tick} M${CENTER - tick} ${CENTER} H${CENTER - HUB_R} M${CENTER + HUB_R} ${CENTER} H${CENTER + tick}`}
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/30"
        />

        {/* teeth — each grows outward from the blank as the cutter passes it */}
        {Array.from({ length: TEETH }).map((_, i) => {
          const angle = (360 / TEETH) * i;
          return (
            <g key={i} transform={`rotate(${angle} ${CENTER} ${CENTER})`}>
              <rect
                data-tooth
                x={CENTER - TOOTH_W / 2}
                y={CENTER - BLANK_R - TOOTH_H}
                width={TOOTH_W}
                height={TOOTH_H}
                fill="currentColor"
                className="text-foreground/90"
                style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
              />
            </g>
          );
        })}
      </g>

      {/* cutting tool — sweeps around, copper spark trailing its tip */}
      <g data-cutter style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
        <line
          x1={CENTER}
          y1={CENTER - BLANK_R + 10}
          x2={CENTER}
          y2={CENTER - SIZE * 0.47}
          stroke="var(--copper)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle data-spark cx={CENTER} cy={CENTER - SIZE * 0.47} r="5" fill="var(--copper)" />
        <circle
          data-spark
          cx={CENTER}
          cy={CENTER - SIZE * 0.47}
          r="9"
          stroke="var(--copper)"
          strokeWidth="1"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const gearWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const gearWrap = gearWrapRef.current;
      const title = titleRef.current;
      if (!section || !gearWrap || !title) return;

      const teeth = gearWrap.querySelectorAll("[data-tooth]");
      const gearGroup = gearWrap.querySelector("[data-gear-group]");
      const cutter = gearWrap.querySelector("[data-cutter]");
      const sparks = gearWrap.querySelectorAll("[data-spark]");
      const chars = title.querySelectorAll("[data-char]");

      gsap.set(teeth, { scaleY: 0 });
      gsap.set(chars, { yPercent: 112, opacity: 0 });
      gsap.set([kickerRef.current, contentRef.current], { opacity: 0, y: 26 });

      // Sparks flicker continuously while the tool is engaged
      const sparkPulse = gsap.to(sparks, {
        opacity: 0.25,
        scale: 1.4,
        transformOrigin: "50% 50%",
        duration: 0.35,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.08,
      });

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

        // Phase 1 — the cutter sweeps around, teeth are cut in one by one
        tl.to(cutter, { rotate: 355, ease: "none", duration: 0.56 }, 0).to(
          teeth,
          { scaleY: 1, ease: "none", stagger: 0.021, duration: 0.14 },
          0.02
        );

        // Phase 2 — finished gear lifts off the blank, spins, and clears the stage
        tl.to(cutter, { opacity: 0, duration: 0.06 }, 0.56).to(
          gearGroup,
          {
            y: -46,
            rotate: 220,
            scale: 0.5,
            opacity: 0,
            transformOrigin: "50% 50%",
            ease: "power2.in",
            duration: 0.24,
          },
          0.58
        );

        // Phase 3 — the headline was behind it all along
        tl.to(
          chars,
          { yPercent: 0, opacity: 1, stagger: 0.024, ease: "power4.out", duration: 0.3 },
          0.66
        )
          .to(
            kickerRef.current,
            { opacity: 1, y: 0, ease: "power3.out", duration: 0.16 },
            0.74
          )
          .to(
            contentRef.current,
            { opacity: 1, y: 0, ease: "power3.out", duration: 0.2 },
            0.8
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

      return () => {
        sparkPulse.kill();
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="αρχικη"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_38%,oklch(0.72_0.145_55/0.07),transparent_55%)]" />
      <div className="ambient-grid pointer-events-none absolute inset-0 opacity-[0.045]" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pt-[4.5rem]">
        <div
          ref={gearWrapRef}
          className="relative h-[min(62vw,26rem)] w-[min(62vw,26rem)] text-foreground sm:h-[min(46vw,30rem)] sm:w-[min(46vw,30rem)]"
        >
          <HeroGear />
        </div>

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
