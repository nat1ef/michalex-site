/* eslint-disable @next/next/no-img-element */
import { trustedBy } from "@/lib/content";

/**
 * «Μας εμπιστεύονται» — κυλιόμενα λογότυπα πελατών.
 * Δεν εμφανίζεται όσο η λίστα στο content.ts είναι κενή
 * (περιμένει τις γραπτές εγκρίσεις των πελατών).
 */
export function TrustedBy() {
  if (trustedBy.length === 0) return null;

  const row = [...trustedBy, ...trustedBy];

  return (
    <section aria-label="Πελάτες που μας εμπιστεύονται" className="border-b border-border bg-card">
      <div className="section-shell py-9">
        <p className="eyebrow text-center">Μας εμπιστευονται</p>
        <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee marquee-pausable flex w-max items-center gap-14">
            {row.map((client, i) => (
              <img
                key={`${client.name}-${i}`}
                src={client.logo}
                alt={client.name}
                className="h-9 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
