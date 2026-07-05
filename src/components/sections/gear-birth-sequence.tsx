"use client";

import { useRef, useSyncExternalStore } from "react";
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
import { gearStages, services, stats, siteConfig } from "@/lib/content";

const TITLE_LINES = ["ΜΗΧΑΝΟΥΡΓΕΙΟ", "ΑΛΕΞΑΝΔΡΑΚΗΣ"];

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

const parsedStats = stats.map((s) => {
  if ("suffix" in s && s.suffix === "/5")
    return { num: s.value, suffix: "/5", label: s.label };
  if (s.value.includes("+"))
    return { num: s.value.replace("+", ""), suffix: "+", label: s.label };
  if (s.value.includes("%"))
    return { num: s.value.replace("%", ""), suffix: "%", label: s.label };
  return { num: s.value, suffix: "", label: s.label };
});

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

function StageKicker({ code, kicker }: { code: string; kicker: string }) {
  return (
    <p className="telemetry-label">
      <span className="text-copper">{code}</span> / {kicker}
    </p>
  );
}

function StageTitle({ lines }: { lines: readonly string[] }) {
  return (
    <h2 className="display-chapter mt-5 text-foreground">
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h2>
  );
}

function StageBody({ text }: { text: string }) {
  return (
    <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/80 sm:text-lg">
      {text}
    </p>
  );
}

/** Overlay content per stage — hero, services list, stats, plain text, CTA. */
function StageOverlay({ stage }: { stage: (typeof gearStages)[number] }) {
  if (stage.overlay === "hero") {
    return (
      <div className="section-shell flex h-full flex-col items-center justify-center pt-[4.5rem] text-center">
        <h1
          aria-label="Μηχανουργείο Αλεξανδράκης"
          className="display-hero-compact"
        >
          {TITLE_LINES.map((line, i) => (
            <CharLine key={line} text={line} accentLast={i === 1} />
          ))}
        </h1>
        <p className="telemetry-label mt-7">
          <span className="text-copper/80">[</span> ΜΕΤΑΔΟΣΗ ΚΙΝΗΣΗΣ · ΑΘΗΝΑ 104
          41 <span className="text-copper/80">]</span>
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
          Γρανάζια, άξονες και μηχανολογικά εξαρτήματα κατά σχέδιο ή δείγμα.
          Δεκαετίες εμπειρίας σε τόρνο και φρέζα — από την Καστοριάς 2.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <ButtonLink
            href={siteConfig.phoneHref}
            size="lg"
            className="magnetic-btn gap-2 rounded-none px-7 font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px]"
          >
            Κλήση
            <ArrowUpRight className="h-3.5 w-3.5" />
          </ButtonLink>
          <ViberButton size="lg" label="Viber" className="magnetic-btn rounded-none" />
        </div>
      </div>
    );
  }

  if (stage.overlay === "services") {
    return (
      <div className="section-shell flex h-full flex-col justify-center pt-[4.5rem]">
        <div className="max-w-2xl">
          <StageKicker code={stage.code} kicker={stage.kicker} />
          <StageTitle lines={stage.title} />
          <StageBody text={stage.body} />
          <ul className="mt-8 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {services.map((s) => (
              <li
                key={s.code}
                className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/85 sm:text-xs"
              >
                <span className="text-copper/80">{s.code}</span>
                {s.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (stage.overlay === "stats") {
    return (
      <div className="section-shell flex h-full flex-col justify-center pt-[4.5rem]">
        <StageKicker code={stage.code} kicker={stage.kicker} />
        <StageTitle lines={stage.title} />
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {parsedStats.map((stat) => (
            <div key={stat.label}>
              <p className="display-number text-[clamp(2.8rem,6.5vw,5.5rem)] text-foreground">
                <span data-stat-num data-value={stat.num}>
                  0
                </span>
                {stat.suffix ? (
                  <span className="ml-1 text-[0.35em] text-copper">
                    {stat.suffix}
                  </span>
                ) : null}
              </p>
              <div className="mt-3 h-px w-10 bg-copper/60" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stage.overlay === "cta") {
    return (
      <div className="section-shell flex h-full flex-col items-center justify-center pt-[4.5rem] text-center">
        <StageKicker code={stage.code} kicker={stage.kicker} />
        <StageTitle lines={stage.title} />
        <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/80 sm:text-lg">
          {stage.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <ButtonLink
            href="#επικοινωνια"
            size="lg"
            className="magnetic-btn gap-2 rounded-none px-8 font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px]"
          >
            Ζητήστε προσφορά
            <ArrowUpRight className="h-3.5 w-3.5" />
          </ButtonLink>
          <ButtonLink
            href={siteConfig.phoneHref}
            size="lg"
            variant="outline"
            className="magnetic-btn gap-2 rounded-none px-7 font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px]"
          >
            {siteConfig.phone}
          </ButtonLink>
          <ViberButton size="lg" label="Viber" className="magnetic-btn rounded-none" />
        </div>
      </div>
    );
  }

  // "text"
  return (
    <div className="section-shell flex h-full flex-col justify-center pt-[4.5rem]">
      <div className="max-w-xl sm:ml-auto sm:text-right">
        <StageKicker code={stage.code} kicker={stage.kicker} />
        <StageTitle lines={stage.title} />
        <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/80 sm:ml-auto sm:text-lg">
          {stage.body}
        </p>
      </div>
    </div>
  );
}

function StageImage({
  stage,
  index,
}: {
  stage: (typeof gearStages)[number];
  index: number;
}) {
  return (
    <div
      data-stage-img
      className="absolute inset-0"
      style={{ opacity: index === 0 ? 1 : 0 }}
      aria-hidden={index !== 0}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stage.image}
        alt={stage.imageAlt}
        className="h-full w-full object-cover will-change-transform"
        loading={index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"}
        draggable={false}
      />
    </div>
  );
}

/** Static fallback for prefers-reduced-motion: plain stacked fullscreen stages. */
function StaticSequence() {
  return (
    <section id="αρχικη" className="relative">
      {gearStages.map((stage, i) => (
        <div key={stage.id} className="relative min-h-[100svh] overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stage.image}
              alt={stage.imageAlt}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
          <div className="absolute inset-0 bg-background/55" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
          <div className="relative z-10 h-[100svh]">
            <StageOverlay stage={stage} />
          </div>
        </div>
      ))}
    </section>
  );
}

export function GearBirthSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const gearRef = useRef<HeroGear3DHandle | null>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      if (!section) return;

      const imgWraps = gsap.utils.toArray<HTMLElement>("[data-stage-img]", section);
      const imgs = imgWraps.map((w) => w.querySelector("img"));
      const overlays = gsap.utils.toArray<HTMLElement>(
        "[data-stage-overlay]",
        section
      );
      const total = gearStages.length;

      // Initial state — stage 1 visible, its hero overlay animates in on load.
      imgWraps.forEach((w, i) => gsap.set(w, { opacity: i === 0 ? 1 : 0 }));
      overlays.forEach((o, i) =>
        gsap.set(o, i === 0 ? { autoAlpha: 1, y: 0 } : { autoAlpha: 0, y: 48 })
      );

      const heroChars = overlays[0].querySelectorAll("[data-char]");
      gsap.fromTo(
        heroChars,
        { yPercent: 112, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.028,
          ease: "power4.out",
          duration: 1.1,
          delay: 0.25,
        }
      );

      const mm = gsap.matchMedia();

      const build = (end: string) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (counterRef.current) {
                const active = Math.min(
                  total,
                  Math.floor(self.progress * total) + 1
                );
                counterRef.current.textContent = `0${active}`;
              }
              if (railRef.current) {
                railRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        // Each stage owns 1 unit of the timeline; total duration = `total`.
        // Slow Ken Burns on every image across its visible window.
        imgs.forEach((img, i) => {
          if (!img) return;
          const from = Math.max(0, i - 0.35);
          tl.fromTo(
            img,
            { scale: 1 },
            { scale: 1.09, duration: Math.min(1.35, total - from) },
            from
          );
        });

        // Crossfades between stages.
        for (let i = 1; i < total; i++) {
          tl.to(imgWraps[i], { opacity: 1, duration: 0.35 }, i - 0.175);
        }

        // Overlays in/out. Stage 1 overlay starts visible and exits early;
        // the last overlay stays on screen at the end of the pin.
        tl.to(overlays[0], { autoAlpha: 0, y: -44, duration: 0.28 }, 0.5);
        for (let i = 1; i < total; i++) {
          tl.to(overlays[i], { autoAlpha: 1, y: 0, duration: 0.26 }, i + 0.02);
          if (i < total - 1) {
            tl.to(overlays[i], { autoAlpha: 0, y: -44, duration: 0.26 }, i + 0.6);
          }
        }

        // Stats count up inside stage 3, driven by the same scrubbed timeline.
        const statEls = overlays
          .flatMap((o) => Array.from(o.querySelectorAll<HTMLElement>("[data-stat-num]")));
        statEls.forEach((el) => {
          const target = parseFloat(el.dataset.value ?? "0");
          const decimals = (el.dataset.value ?? "").includes(".") ? 1 : 0;
          const obj = { val: 0 };
          tl.to(
            obj,
            {
              val: target,
              duration: 0.42,
              onUpdate: () => {
                el.textContent = obj.val.toFixed(decimals);
              },
            },
            2.08
          );
        });

        // ——— 3D gear: machined into existence across the whole journey ———
        const gear = gearRef.current;
        if (gear) {
          const { gearGroup, teeth, cutter, tiltGroup } = gear;

          gsap.set(cutter.scale, { x: 0, y: 0, z: 0 });
          gsap.set(tiltGroup.scale, { x: 0.5, y: 0.5, z: 0.5 });
          gsap.set(tiltGroup.position, { x: 2.2, y: -1.25 });

          // Framing per stage — the "camera" pushes in as the part takes shape.
          tl.to(tiltGroup.scale, { x: 0.56, y: 0.56, z: 0.56, duration: 1 }, 0)
            .to(tiltGroup.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 1 }, 1)
            .to(tiltGroup.scale, { x: 0.78, y: 0.78, z: 0.78, duration: 1 }, 2)
            .to(tiltGroup.scale, { x: 0.86, y: 0.86, z: 0.86, duration: 1 }, 3)
            .to(tiltGroup.scale, { x: 1.02, y: 1.02, z: 1.02, duration: 1 }, 4);

          // Blocking — the part travels opposite the copy of each stage:
          // low under the hero headline, right of the services list, centre
          // for the cut, left of the right-aligned inspection copy, centre
          // stage for the finale.
          tl.to(tiltGroup.position, { x: 1.7, y: 0.1, duration: 1 }, 1)
            .to(tiltGroup.position, { x: 0, y: 0.25, duration: 1 }, 2)
            .to(tiltGroup.position, { x: -1.7, y: 0.1, duration: 1 }, 3)
            .to(tiltGroup.position, { x: -2.6, y: -0.5, duration: 1 }, 4);

          // Spin: slow while raw, fast on the lathe, frozen while the cutter
          // works (so teeth land where the cutter points), then back to a
          // stately roll for inspection and the finale.
          tl.to(gearGroup.rotation, { z: 0.5, duration: 1 }, 0)
            .to(gearGroup.rotation, { z: 3.4, duration: 0.95 }, 1)
            .to(gearGroup.rotation, { z: 5.6, duration: 2 }, 3);

          // Stage 3 — the cutter sweeps around, teeth are cut in one by one.
          const cutStart = 2.05;
          const toothStagger = 0.031;
          const toothDuration = 0.21;
          const sweepSpan = (TEETH_COUNT - 1) * toothStagger;
          const sweepAngle = (TEETH_COUNT - 1) * ((Math.PI * 2) / TEETH_COUNT);

          tl.to(
            cutter.scale,
            { x: 1, y: 1, z: 1, duration: 0.08 },
            cutStart - 0.08
          )
            .fromTo(
              cutter.rotation,
              // The gear arrives at the cutting stage already rotated 3.4rad
              // by the lathe spin; the cutter starts from that same offset so
              // it points at tooth[i] the moment tooth[i] scales in.
              { z: 3.4 },
              { z: 3.4 + sweepAngle, duration: sweepSpan },
              cutStart
            )
            .to(
              teeth.map((t) => t.scale),
              { y: 1, stagger: toothStagger, duration: toothDuration },
              cutStart
            )
            .to(
              cutter.scale,
              { x: 0, y: 0, z: 0, duration: 0.08 },
              cutStart + sweepSpan + toothDuration
            );
        }

        // Scroll cue fades once the journey starts.
        tl.to(scrollCueRef.current, { opacity: 0, y: 16, duration: 0.12 }, 0.08);

        tl.duration(total);
        return tl;
      };

      mm.add("(min-width: 768px)", () => {
        const tl = build("+=420%");
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        const tl = build("+=360%");
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  if (reduced) return <StaticSequence />;

  return (
    <section
      ref={sectionRef}
      id="αρχικη"
      className="relative h-[100svh] overflow-hidden"
    >
      {/* Stage frames */}
      <div className="absolute inset-0 z-0">
        {gearStages.map((stage, i) => (
          <StageImage key={stage.id} stage={stage} index={i} />
        ))}
      </div>

      {/* Legibility scrims — photos sit back so the 3D part reads as the subject */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-background/60" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/65" />
      <div className="cinematic-vignette pointer-events-none absolute inset-0 z-[1]" />

      {/* The protagonist — a real 3D gear machined into existence on scroll */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <HeroGear3D ref={gearRef} />
      </div>

      {/* Stage overlays */}
      <div className="absolute inset-0 z-10">
        {gearStages.map((stage, i) => (
          <div
            key={stage.id}
            data-stage-overlay
            className="absolute inset-0"
            style={
              i === 0 ? undefined : { opacity: 0, visibility: "hidden" }
            }
          >
            <StageOverlay stage={stage} />
          </div>
        ))}
      </div>

      {/* Stage counter — Meridian-style telemetry, top right under header */}
      <div className="pointer-events-none absolute right-6 top-20 z-20 hidden sm:right-12 sm:block">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span ref={counterRef} className="text-copper">
            01
          </span>{" "}
          / 0{gearStages.length}
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 right-6 z-20 flex flex-col items-center gap-2 sm:right-12"
        aria-hidden
      >
        <span className="telemetry-label">SCROLL</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-copper/70" />
      </div>

      {/* Progress rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="h-px w-full bg-border/40">
          <div ref={railRef} className="h-full origin-left bg-copper" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
