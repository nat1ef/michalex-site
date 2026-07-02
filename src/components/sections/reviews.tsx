"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitText, RevealBlock } from "@/components/motion/split-text";
import { siteConfig, reviews } from "@/lib/content";
import { sectionMeta } from "@/lib/sections";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} από 5 αστέρια`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-copper text-copper" : "text-border"}`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const meta = sectionMeta.reviews;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gridRef.current?.querySelectorAll("[data-review-card]");
      if (!cards?.length) return;

      gsap.from(cards, {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
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
              className="inline-flex items-center gap-2 rounded-sm border border-copper/30 bg-copper/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-copper/15"
            >
              <Star className="h-3.5 w-3.5 fill-copper text-copper" />
              {siteConfig.rating}/5 · {siteConfig.reviewCount} κριτικές Google
            </a>
          </RevealBlock>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {reviews.map((review, i) => (
            <blockquote
              key={review.author}
              data-review-card
              className="flex min-h-[220px] flex-col justify-between border border-border/50 bg-card/80 p-6 backdrop-blur-sm sm:p-7"
            >
              <div>
                <StarRow rating={review.rating} />
                <p className="mt-4 text-base leading-relaxed text-foreground/85">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
              <footer className="mt-6 border-t border-border/40 pt-4">
                <p className="font-medium text-foreground">{review.author}</p>
                <p className="telemetry-label mt-1 text-muted-foreground">
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
