"use client";

import { Star } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig, reviews } from "@/lib/content";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} από 5 αστέρια`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "fill-copper text-copper" : "text-border"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <blockquote className="mx-2.5 flex w-[min(80vw,360px)] shrink-0 flex-col justify-between border border-border/50 bg-card/80 p-6 backdrop-blur-sm">
      <div>
        <StarRow rating={review.rating} />
        <p className="mt-4 text-sm leading-relaxed text-foreground/85">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>
      <footer className="mt-6 border-t border-border/40 pt-4">
        <p className="font-medium text-foreground">{review.author}</p>
        <p className="telemetry-label mt-1 text-muted-foreground">
          {review.source}
        </p>
      </footer>
    </blockquote>
  );
}

function ReviewMarqueeRow({ reverse = false, speed }: { reverse?: boolean; speed: number }) {
  const items = [...reviews, ...reviews];
  return (
    <div className="marquee-pausable overflow-hidden py-2.5">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((review, i) => (
          <ReviewCard key={`${review.author}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section id="κριτικες" className="relative overflow-hidden border-t border-border/30 py-24 sm:py-32">
      <div className="section-shell">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <FadeIn>
            <p className="telemetry-label">
              <span className="text-copper/80">[</span> ΚΡΙΤΙΚΕΣ{" "}
              <span className="text-copper/80">]</span>
            </p>
            <h2 className="display-title mt-6">Το λένε οι πελάτες</h2>
          </FadeIn>

          <FadeIn delay={0.1} className="flex items-end gap-5">
            <p className="display-number text-[clamp(4.5rem,10vw,8rem)] text-foreground">
              <CountUp value={String(siteConfig.rating)} />
            </p>
            <div className="mb-2 flex flex-col gap-2">
              <StarRow rating={5} />
              <a
                href={siteConfig.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {siteConfig.reviewCount}+ κριτικές · Google Maps
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="mt-14 space-y-1 sm:mt-20">
        <ReviewMarqueeRow speed={52} />
        <ReviewMarqueeRow reverse speed={64} />
      </div>
    </section>
  );
}
