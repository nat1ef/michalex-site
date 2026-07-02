"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/components/motion/animation-provider";
import { processChapters } from "@/lib/content";
import { ScrubText } from "@/components/motion/scrub-text";

function setupChapterScroll(
  chapters: HTMLElement[],
  config: { pinEnd: string; innerEnd: string; mediaEnd: string }
) {
  chapters.forEach((chapter, i) => {
    const inner = chapter.querySelector("[data-chapter-inner]");
    const media = chapter.querySelector("[data-chapter-media]");
    if (!inner || !media) return;

    ScrollTrigger.create({
      trigger: chapter,
      start: "top top",
      end: config.pinEnd,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
    });

    gsap.fromTo(
      inner,
      { y: 80, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: chapter,
          start: "top top",
          end: config.innerEnd,
          scrub: 1.1,
        },
      }
    );

    gsap.fromTo(
      media,
      { scale: 1.15, filter: "brightness(0.45)" },
      {
        scale: 1,
        filter: "brightness(0.8)",
        ease: "none",
        scrollTrigger: {
          trigger: chapter,
          start: "top top",
          end: config.mediaEnd,
          scrub: 1.2,
        },
      }
    );

    if (i < chapters.length - 1) {
      gsap.to(chapter, {
        opacity: 0.2,
        scale: 0.97,
        ease: "none",
        scrollTrigger: {
          trigger: chapter,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  });
}

export function ProcessChapters() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      if (!section) return;

      const chapters = gsap.utils.toArray<HTMLElement>("[data-chapter]", section);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        setupChapterScroll(chapters, {
          pinEnd: "+=100%",
          innerEnd: "+=60%",
          mediaEnd: "+=80%",
        });
      });

      mm.add("(max-width: 767px)", () => {
        setupChapterScroll(chapters, {
          pinEnd: "+=85%",
          innerEnd: "+=55%",
          mediaEnd: "+=70%",
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="διαδικασια" className="relative">
      {processChapters.map((chapter, i) => (
        <article
          key={chapter.id}
          data-chapter
          className="relative flex min-h-[100svh] items-end overflow-hidden"
        >
          <div data-chapter-media className="absolute inset-0">
            <Image
              src={chapter.image}
              alt={chapter.imageAlt}
              fill
              className="object-cover object-center brightness-105 saturate-[0.85] contrast-110"
              sizes="100vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_20%,oklch(0.72_0.145_55/0.12),transparent)]" />
          </div>

          <div
            data-chapter-inner
            className="section-shell relative z-10 w-full pb-20 pt-32 sm:pb-28"
          >
            <p className="telemetry-label text-copper">{chapter.code}</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:mt-6 sm:text-6xl lg:text-7xl">
              {chapter.title}
            </h2>
            <ScrubText className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {chapter.description}
            </ScrubText>
          </div>
        </article>
      ))}
    </section>
  );
}
