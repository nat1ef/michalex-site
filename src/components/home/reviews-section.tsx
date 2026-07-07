"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { reviews, siteConfig } from "@/lib/content";

function ArrowButton({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Προηγούμενες κριτικές" : "Επόμενες κριτικές"}
      className={`touch-target grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card/95 text-foreground shadow-[0_10px_24px_-12px_rgb(28_39_51/0.35)] backdrop-blur transition-colors hover:border-primary hover:text-primary ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {direction === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

export function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("blockquote");
    const width = card ? card.getBoundingClientRect().width + 20 : 320;
    track.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  return (
    <section id="κριτικες" className="border-y border-border bg-card">
      <div className="section-shell py-20 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div className="flex items-end gap-6">
              <p className="display-num text-[clamp(4rem,8vw,6rem)] leading-[0.85] text-foreground">
                {siteConfig.rating}
              </p>
              <div className="pb-1.5">
                <p
                  className="text-[19px] tracking-[3px] text-star"
                  aria-label="4.9 στα 5 αστέρια"
                >
                  ★★★★★
                </p>
                <p className="mt-1 text-[14px] text-muted-foreground">
                  {siteConfig.reviewCount}+ κριτικές πελατών στο Google
                </p>
              </div>
            </div>
            <a
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-border bg-background px-5 py-3 text-[13.5px] font-bold transition-colors hover:border-primary hover:text-accent-deep"
            >
              Διαβάστε τις όλες στο Google →
            </a>
          </div>
        </Reveal>

        <div className="relative mt-11">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((review) => (
              <blockquote
                key={review.author}
                className="relative flex h-full w-[280px] shrink-0 snap-start flex-col rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_38px_-22px_rgb(28_39_51/0.35)] sm:w-[320px]"
              >
                <span
                  aria-hidden
                  className="display-num pointer-events-none absolute -top-1 right-4 text-[64px] text-primary/12"
                >
                  &rdquo;
                </span>
                <p
                  className="text-[13px] tracking-[2px] text-star"
                  aria-label={`${review.rating} στα 5 αστέρια`}
                >
                  {"★".repeat(review.rating)}
                </p>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed">
                  «{review.text}»
                </p>
                <footer className="mt-4 text-[12.5px] text-muted-foreground">
                  <b className="text-foreground">{review.author}</b> ·{" "}
                  {review.source}
                </footer>
              </blockquote>
            ))}
          </div>

          <ArrowButton
            direction="prev"
            onClick={() => scrollByCard(-1)}
            className="absolute left-1 top-[calc(50%-10px)] -translate-y-1/2 sm:-left-3"
          />
          <ArrowButton
            direction="next"
            onClick={() => scrollByCard(1)}
            className="absolute right-1 top-[calc(50%-10px)] -translate-y-1/2 sm:-right-3"
          />
        </div>
      </div>
    </section>
  );
}
