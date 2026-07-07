import { Reveal } from "@/components/motion/reveal";
import { reviews, siteConfig } from "@/lib/content";

export function ReviewsSection() {
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

        <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.author} delay={(i % 3) * 70}>
              <blockquote className="relative flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_38px_-22px_rgb(28_39_51/0.35)]">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
