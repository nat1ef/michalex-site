/* eslint-disable @next/next/no-img-element */
import { trustedBy } from "@/lib/content";

/**
 * «Μας εμπιστεύονται» — κυλιόμενα λογότυπα πελατών.
 * Δεν εμφανίζεται όσο η λίστα στο content.ts είναι κενή.
 */
export function TrustedBy() {
  if (trustedBy.length === 0) return null;

  // Το marquee μετακινείται κατά -50%, οπότε το περιεχόμενο είναι δύο
  // πανομοιότυπα μισά. Με λίγα λογότυπα επαναλαμβάνουμε τη λίστα ώστε
  // κάθε μισό να είναι σίγουρα πλατύτερο από την οθόνη.
  const repeats = Math.max(1, Math.ceil(6 / trustedBy.length));
  const half = Array.from({ length: repeats }, () => trustedBy).flat();
  const row = [...half, ...half];

  return (
    <section
      aria-label="Πελάτες που μας εμπιστεύονται"
      className="border-b border-border bg-card"
    >
      <div className="py-9">
        <p className="eyebrow text-center">Μας εμπιστευονται</p>
        <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee marquee-pausable flex w-max items-center gap-16 pr-16">
            {row.map((client, i) => {
              const logo = (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-10 w-auto opacity-65 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  loading="lazy"
                />
              );
              return client.href ? (
                <a
                  key={`${client.name}-${i}`}
                  href={client.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={client.name}
                  className="shrink-0"
                >
                  {logo}
                </a>
              ) : (
                <span key={`${client.name}-${i}`} className="shrink-0">
                  {logo}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
