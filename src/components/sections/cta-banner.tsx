"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Phone } from "lucide-react";
import { gsap } from "@/components/motion/animation-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { ViberButton } from "@/components/contact/viber-button";
import { siteConfig, ctaImage } from "@/lib/content";

export function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const frame = frameRef.current;
      if (!section || !frame) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
          },
        });

        tl.to(
          frame,
          {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0
        )
          .to(chromeRef.current, { opacity: 0, duration: 0.18 }, 0)
          .to(tintRef.current, { opacity: 0.92, duration: 0.6 }, 0)
          .to({}, { duration: 0.18 });

        return () => tl.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden border-t border-border/30 py-24 sm:min-h-[85vh] sm:py-0"
    >
      <div
        ref={frameRef}
        className="relative mx-auto h-[52vh] w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-copper/50 will-change-[width,height,border-radius] sm:h-[58vh] sm:w-[72vw] sm:max-w-none"
      >
        <Image
          src={ctaImage.src}
          alt={ctaImage.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />

        <div
          ref={tintRef}
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/45 to-background/25 opacity-75"
        />

        <div ref={chromeRef} className="pointer-events-none absolute inset-0">
          <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/80">
            ΜΑΚΡΟ · ΚΟΠΗ ΓΡΑΝΑΖΙΟΥ
          </div>
          <div className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-copper/80">
            01 / 01
          </div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center sm:px-12">
          <p className="telemetry-label">
            <span className="text-copper/80">[</span> ΕΠΙΚΟΙΝΩΝΙΑ{" "}
            <span className="text-copper/80">]</span>
          </p>
          <h2 className="display-title mt-6 text-balance">
            Έχετε μηχανουργική ανάγκη;
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground/85 sm:text-lg">
            Καλέστε ή στείλτε Viber — θα βρούμε τη σωστή λύση για το έργο σας.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink
              href={siteConfig.phoneHref}
              size="lg"
              className="gap-2 rounded-none px-7 font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px]"
            >
              <Phone className="h-3.5 w-3.5" />
              {siteConfig.phone}
            </ButtonLink>
            <ViberButton size="lg" label="Viber" className="rounded-none" />
            <ButtonLink
              href="#υπηρεσιες"
              variant="outline"
              size="lg"
              className="gap-2 rounded-none px-7 font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px]"
            >
              Υπηρεσίες
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
