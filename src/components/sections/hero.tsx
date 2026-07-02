"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "@/components/motion/animation-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { ViberButton } from "@/components/contact/viber-button";
import { Marquee } from "@/components/motion/marquee";
import { HeroHeadline, LoadReveal } from "@/components/motion/split-text";
import { VideoBackground } from "@/components/motion/video-background";
import { siteConfig } from "@/lib/content";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const content = contentRef.current;
      const overlay = overlayRef.current;
      const marquee = marqueeRef.current;
      const scrollCue = scrollCueRef.current;
      if (!section || !content || !overlay) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(content, {
        y: -180,
        opacity: 0,
        scale: 0.88,
        rotateX: 8,
        transformPerspective: 1200,
        ease: "power2.in",
      })
        .to(overlay, { opacity: 0.92, ease: "power2.in" }, 0)
        .to(marquee, { y: 80, opacity: 0, ease: "power2.in" }, 0.1)
        .to(scrollCue, { opacity: 0, y: 20, ease: "power2.in" }, 0);

      gsap.to(content, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=80%",
          scrub: 2,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="αρχικη"
      className="relative min-h-[100svh] overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      <VideoBackground src={siteConfig.heroVideo} poster={siteConfig.heroPoster} parallax />
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 bg-background/0"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_70%_50%,oklch(0.72_0.145_55/0.08),transparent_55%)]" />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div
          ref={contentRef}
          className="section-shell flex flex-1 flex-col justify-end pb-8 pt-[5.5rem] will-change-transform sm:pb-14"
        >
          <LoadReveal delay={0.1}>
            <p className="telemetry-label mb-8">
              <span className="text-copper/80">[</span>
              ΜΗΧΑΝΟΥΡΓΕΙΟ · ΑΘΗΝΑ 104 41
              <span className="text-copper/80">]</span>
            </p>
          </LoadReveal>

          <HeroHeadline />

          <LoadReveal delay={0.55} className="mt-10 max-w-2xl">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              {siteConfig.tagline}. Εμπειρία δεκαετιών σε τόρνο, φρέζα και
              custom μηχανολογικές κατασκευές — από την Καστοριάς 2.
            </p>
          </LoadReveal>

          <LoadReveal delay={0.7} className="mt-12 flex flex-wrap items-center gap-3">
            <ButtonLink
              href={siteConfig.phoneHref}
              size="lg"
              className="magnetic-btn gap-2 rounded-none px-8 font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              Κλήση
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>
            <ViberButton size="lg" label="Viber" className="magnetic-btn rounded-none" />
            <ButtonLink
              href="#υπηρεσιες"
              variant="outline"
              size="lg"
              className="magnetic-btn gap-2 rounded-none border-border/60 bg-transparent px-8 font-mono text-[11px] uppercase tracking-[0.14em] backdrop-blur-sm"
            >
              Υπηρεσίες
            </ButtonLink>
          </LoadReveal>
        </div>

        <div ref={marqueeRef}>
          <Marquee />
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-40 right-6 flex flex-col items-center gap-2 sm:bottom-44 sm:right-12"
      >
        <span className="telemetry-label animate-pulse">SCROLL</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-copper/70" />
      </div>
    </section>
  );
}
