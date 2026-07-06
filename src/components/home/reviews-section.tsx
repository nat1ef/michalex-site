import { Reveal } from "@/components/motion/reveal";
import { reviews, siteConfig } from "@/lib/content";

export function ReviewsSection() {
  return (
    <section id="κριτικες" className="border-y border-border bg-card">
      <div className="section-shell py-16 lg:py-20">
        <Reveal>
          <p className="eyebrow">Κριτικες</p>
          <h2 className="mt-2 text-[clamp(1.7rem,3.4vw,2.3rem)] font-bold tracking-[-0.02em]">
            <span className="text-star">★</span> {siteConfig.rating} στο Google
          </h2>
          <p className="mt-2 text-muted-foreground">
            {siteConfig.reviewCount}+ κριτικές πελατών —{" "}
            <a
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-deep underline underline-offset-2"
            >
              διαβάστε τις όλες στο Google
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.author} delay={(i % 3) * 70}>
              <blockquote className="flex h-full flex-col rounded-md border border-border bg-background p-5">
                <p
                  className="text-[14px] tracking-[2px] text-star"
                  aria-label={`${review.rating} στα 5 αστέρια`}
                >
                  {"★".repeat(review.rating)}
                </p>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed">
                  «{review.text}»
                </p>
                <footer className="mt-3 text-[12.5px] text-muted-foreground">
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
