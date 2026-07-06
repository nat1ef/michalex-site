import Link from "next/link";
import { pageNav, siteConfig } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-band text-band-foreground">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-3">
        <div className="max-w-sm">
          <p className="text-[15px] font-bold tracking-[0.08em]">
            ΑΛΕΞΑΝΔΡΑΚΗΣ
          </p>
          <p className="telemetry-label mt-1 text-band-foreground/50">
            ΜΗΧΑΝΟΥΡΓΕΙΟ · ΑΘΗΝΑ
          </p>
          <p className="mt-4 text-sm text-band-foreground/70">
            {siteConfig.tagline}. 40+ χρόνια εμπειρίας σε τόρνο, φρέζα και κοπή
            οδοντώσεων.
          </p>
        </div>

        <nav aria-label="Πλοήγηση υποσέλιδου">
          <p className="eyebrow text-accent-bright">Πλοηγηση</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {pageNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-band-foreground/75 hover:text-band-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <p className="eyebrow text-accent-bright">Επικοινωνια</p>
          <p className="mt-4 text-lg font-bold">
            <a href={siteConfig.phoneHref} className="hover:underline">
              {siteConfig.phone}
            </a>
          </p>
          <p className="mt-1 text-band-foreground/70">
            {siteConfig.hours.weekdays}
          </p>
          <ul className="mt-4 flex flex-col gap-1.5 text-band-foreground/70">
            {siteConfig.locations.map((loc) => (
              <li key={loc.id}>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-bright">
                  {loc.label}:
                </span>{" "}
                {loc.address}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-band-foreground/10">
        <div className="section-shell flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-band-foreground/50">
          <p>© 2026 {siteConfig.name}. Με επιφύλαξη παντός δικαιώματος.</p>
          <p>Κριτικές πελατών από Google Maps.</p>
        </div>
      </div>
    </footer>
  );
}
