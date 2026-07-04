"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";
import { processChapters } from "@/lib/content";

function ChapterPanel({
  chapter,
  index,
}: {
  chapter: (typeof processChapters)[number];
  index: number;
}) {
  return (
    <article
      data-panel
      className="relative flex w-full shrink-0 items-center overflow-hidden max-lg:min-h-[100svh] max-lg:py-20 lg:h-full lg:w-screen"
    >
      {/* Giant chapter number behind content */}
      <span
        aria-hidden
        className="display-number text-outline pointer-events-none absolute -top-4 right-4 select-none text-[clamp(9rem,28vw,24rem)] opacity-70 sm:right-10 lg:-top-6"
      >
        0{index + 1}
      </span>

      <div className="section-shell grid w-full items-center gap-10 py-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-24">
        <div className="relative z-10 max-w-xl">
          <p className="telemetry-label">
            <span className="text-copper">{chapter.code}</span> / {chapter.label}
          </p>
          <h3 className="display-chapter mt-6">{chapter.label}</h3>
          <p className="mt-4 text-xl font-medium text-foreground/90 sm:text-2xl">
            {chapter.title}
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {chapter.description}
          </p>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden border border-border/40">
            <div data-parallax-img className="will-change-transform">
              <Image
                src={chapter.image}
                alt={chapter.imageAlt}
                width={1600}
                height={1200}
                className="aspect-[4/3] w-full scale-[1.18] object-cover"
              />
            </div>
            <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/90">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-copper" />
              {chapter.code} / {chapter.label}
            </div>
          </div>

          {/* Floating detail shot */}
          <div
            data-detail-img
            className="absolute -bottom-10 -left-6 hidden w-44 overflow-hidden border border-copper/40 bg-background shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] will-change-transform sm:block lg:w-56"
          >
            <Image
              src={chapter.detailImage}
              alt={chapter.detailAlt}
              width={800}
              height={800}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProcessChapters() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", track);
        const total = panels.length;
        const scrollLength = () => `+=${(total - 1) * 100}%`;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: scrollLength,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (counterRef.current) {
                const active = Math.min(
                  total,
                  Math.round(self.progress * (total - 1)) + 1
                );
                counterRef.current.textContent = `0${active}`;
              }
            },
          },
        });

        tl.to(track, {
          xPercent: -100 * ((total - 1) / total),
          ease: "none",
        });

        // Inner image parallax against the horizontal motion
        panels.forEach((panel) => {
          const img = panel.querySelector("[data-parallax-img]");
          const detail = panel.querySelector("[data-detail-img]");
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: -7 },
              {
                xPercent: 7,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: scrollLength,
                  scrub: 1,
                },
              }
            );
          }
          if (detail) {
            gsap.fromTo(
              detail,
              { yPercent: 14 },
              {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: scrollLength,
                  scrub: 1.4,
                },
              }
            );
          }
        });

        if (railRef.current) {
          gsap.fromTo(
            railRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: scrollLength,
                scrub: 0.5,
              },
            }
          );
        }

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // Mobile / tablet: vertical flow with simple reveals
      mm.add("(max-width: 1023px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", track);
        const tweens = panels.map((panel) =>
          gsap.from(panel.querySelectorAll("h3, p, [data-parallax-img]"), {
            y: 46,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          })
        );
        return () =>
          tweens.forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="εργαστηριο"
      className="relative overflow-hidden border-t border-border/30 bg-card/20"
    >
      <div className="pointer-events-none absolute left-0 top-10 z-20 w-full">
        <div className="section-shell flex items-center justify-between">
          <p className="telemetry-label">
            <span className="text-copper/80">[</span> Η ΔΙΑΔΙΚΑΣΙΑ{" "}
            <span className="text-copper/80">]</span>
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground lg:block">
            <span ref={counterRef} className="text-copper">
              01
            </span>{" "}
            / 0{processChapters.length}
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex max-lg:flex-col lg:h-screen lg:w-max lg:flex-nowrap"
      >
        {processChapters.map((chapter, i) => (
          <ChapterPanel key={chapter.id} chapter={chapter} index={i} />
        ))}
      </div>

      {/* Progress rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 hidden lg:block">
        <div className="section-shell">
          <div className="h-px w-full bg-border/40">
            <div ref={railRef} className="h-full origin-left bg-copper" />
          </div>
        </div>
      </div>
    </section>
  );
}
