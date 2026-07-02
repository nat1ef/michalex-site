"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/components/motion/animation-provider";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitText, RevealBlock } from "@/components/motion/split-text";
import { siteConfig, reviews } from "@/lib/content";
import { sectionMeta } from "@/lib/sections";

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const meta = sectionMeta.reviews;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const stack = stackRef.current;
      const section = sectionRef.current;
      if (!stack || !section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", stack);
      if (cards.length < 2) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const totalScroll = cards.length * window.innerHeight * 0.55;

        ScrollTrigger.create({
          trigger: stack,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        });

        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;

          gsap.to(card, {
            scale: 0.9 - i * 0.02,
            opacity: 0.35,
            y: -40 * (i + 1),
            filter: "brightness(0.5)",
            ease: "none",
            scrollTrigger: {
              trigger: stack,
              start: `top top+=${(i + 1) * (totalScroll / cards.length)}`,
              end: `top top+=${(i + 2) * (totalScroll / cards.length)}`,
              scrub: 1,
            },
          });
        });

        cards.forEach((card, i) => {
          if (i === 0) return;
          gsap.fromTo(
            card,
            { y: window.innerHeight * 0.4, opacity: 0, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: stack,
                start: `top top+=${i * (totalScroll / cards.length)}`,
                end: `top top+=${(i + 0.8) * (totalScroll / cards.length)}`,
                scrub: 1,
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="κριτικες"
      className="section-cinematic border-t border-border/30"
    >
      <div className="section-shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel index={meta.index} title={meta.title} />
            <SplitText
              as="h2"
              className="mt-6 max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
            >
              Εμπιστοσύνη που χτίζεται με δουλειά
            </SplitText>
          </div>
          <RevealBlock>
            <a
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-label transition-colors hover:text-foreground"
            >
              {siteConfig.rating}/5 · {siteConfig.reviewCount} κριτικές Google
            </a>
          </RevealBlock>
        </div>

        <div
          ref={stackRef}
          className="relative mt-16 min-h-[70vh] md:mt-20 md:min-h-[100svh]"
        >
          {reviews.map((review, i) => (
            <blockquote
              key={review.author}
              data-stack-card
              className="absolute inset-x-0 top-8 mx-auto flex max-w-3xl flex-col justify-between border border-border/40 bg-background/90 p-8 backdrop-blur-md sm:p-12 md:top-[12vh]"
              style={{ zIndex: i + 1 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-10 border-t border-border/30 pt-8">
                <p className="text-lg font-medium">{review.author}</p>
                <p className="telemetry-label mt-2">
                  {String(i + 1).padStart(2, "0")} · {review.source} · {review.rating}/5
                </p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:hidden">
          {reviews.map((review, i) => (
            <blockquote
              key={`mobile-${review.author}`}
              className="flex flex-col justify-between border border-border/30 bg-foreground/[0.02] p-8"
            >
              <p className="text-base leading-relaxed text-muted-foreground">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-8 border-t border-border/30 pt-6">
                <p className="font-medium">{review.author}</p>
                <p className="telemetry-label mt-1">
                  {String(i + 1).padStart(2, "0")} · {review.source}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
