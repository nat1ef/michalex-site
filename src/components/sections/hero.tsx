"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "@/components/motion/animation-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { ViberButton } from "@/components/contact/viber-button";
import { VideoBackground } from "@/components/motion/video-background";
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
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backWordRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const videoWrap = videoWrapRef.current;
      const title = titleRef.current;
      if (!section || !videoWrap || !title) return;

      const chars = title.querySelectorAll("[data-char]");

      // Entrance: chars rise like machined parts locking into place
      gsap.from(chars, {
        yPercent: 118,
        duration: 1.1,
        stagger: 0.028,
        delay: 0.15,
        ease: "power4.out",
      });
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.1,
        delay: 0.75,
        ease: "power3.out",
      });

      const mm = gsap.matchMedia();

      const buildScrub = (opts: {
        end: string;
        scale: number;
        showBackWord: boolean;
      }) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: opts.end,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        tl.to(
          contentRef.current,
          { y: -70, opacity: 0, ease: "power2.in", duration: 0.28 },
          0
        )
          .to(
            scrollCueRef.current,
            { opacity: 0, y: 18, ease: "power2.in", duration: 0.15 },
            0
          )
          .to(
            chars,
            {
              yPercent: -118,
              ease: "power2.in",
              duration: 0.34,
              stagger: 0.012,
            },
            0.04
          )
          .to(
            videoWrap,
            {
              scale: opts.scale,
              y: "-3vh",
              borderRadius: 28,
              ease: "power2.inOut",
              duration: 0.55,
            },
            0.2
          )
          .to(overlayRef.current, { opacity: 0, duration: 0.4 }, 0.2);

        if (opts.showBackWord && backWordRef.current) {
          tl.fromTo(
            backWordRef.current,
            { opacity: 0, scale: 1.12 },
            { opacity: 1, scale: 1, ease: "power2.out", duration: 0.4 },
            0.38
          );
        }

        tl.fromTo(
          chromeRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.22 },
          0.66
        ).fromTo(
          hintRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.15 },
          0.84
        );

        return tl;
      };

      mm.add("(min-width: 768px)", () => {
        const tl = buildScrub({ end: "+=190%", scale: 0.6, showBackWord: true });
        return () => tl.scrollTrigger?.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const tl = buildScrub({ end: "+=140%", scale: 0.82, showBackWord: false });
        return () => tl.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="αρχικη"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Giant word revealed behind the shrinking video */}
      <div
        ref={backWordRef}
        className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center opacity-0 md:flex"
        aria-hidden
      >
        <span className="display-hero text-outline whitespace-nowrap text-[clamp(6rem,17vw,16rem)]">
          ΑΚΡΙΒΕΙΑ
        </span>
      </div>

      {/* Video — full-bleed, shrinks into a framed card on scroll */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 z-10 overflow-hidden will-change-transform"
      >
        <VideoBackground
          src={siteConfig.heroVideo}
          poster={siteConfig.heroPoster}
          loopStart={siteConfig.heroLoopStart}
          priority
          parallax={false}
          overlay="none"
        />
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/40"
        />

        {/* Frame chrome — visible once the video becomes a card */}
        <div
          ref={chromeRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          aria-hidden
        >
          <div className="absolute inset-0 border-[3px] border-copper/60" />
          <div className="absolute left-6 top-5 flex items-center gap-3 font-mono text-lg uppercase tracking-[0.2em] text-foreground/90">
            <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-copper" />
            REC · ΕΡΓΑΣΤΗΡΙΟ
          </div>
          <div className="absolute bottom-5 left-6 font-mono text-lg uppercase tracking-[0.2em] text-foreground/80">
            ΚΟΠΗ ΓΡΑΝΑΖΙΟΥ — ΚΑΣΤΟΡΙΑΣ 2
          </div>
          <div className="absolute bottom-5 right-6 font-mono text-lg tracking-[0.2em] text-copper/90">
            30 FPS / 1080P
          </div>
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-20 flex min-h-[100svh] flex-col justify-end">
        <div className="section-shell pb-16 pt-[5.5rem] sm:pb-20">
          <h1
            ref={titleRef}
            aria-label="Μηχανουργείο Αλεξανδράκης"
            className="display-hero max-w-full"
          >
            {TITLE_LINES.map((line, i) => (
              <CharLine key={line} text={line} accentLast={i === 1} />
            ))}
          </h1>

          <div ref={contentRef} className="mt-8 will-change-transform sm:mt-10">
            <p className="telemetry-label">
              <span className="text-copper/80">[</span> ΜΕΤΑΔΟΣΗ ΚΙΝΗΣΗΣ · ΑΘΗΝΑ
              104 41 <span className="text-copper/80">]</span>
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
              Γρανάζια, άξονες και μηχανολογικά εξαρτήματα κατά σχέδιο ή δείγμα.
              Δεκαετίες εμπειρίας σε τόρνο και φρέζα — από την Καστοριάς 2.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
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
      </div>

      {/* Post-shrink hint */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center opacity-0"
        aria-hidden
      >
        <p className="telemetry-label">Η ΔΟΥΛΕΙΑ ΜΙΛΑΕΙ — ΣΥΝΕΧΙΣΕ ΚΑΤΩ</p>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-8 right-6 z-20 flex flex-col items-center gap-2 sm:right-12"
        aria-hidden
      >
        <span className="telemetry-label">SCROLL</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-copper/70" />
      </div>
    </section>
  );
}
