import { SectionLink } from "@/components/ui/section-link";
import { ViberTextLink } from "@/components/contact/viber-text-link";
import { navLinks, siteConfig } from "@/lib/content";
import { LogoFull } from "@/components/brand/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="section-shell py-12 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <LogoFull className="max-w-[220px]" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
              Εργαστήριο κατασκευής και επισκευής μηχανολογικών εξαρτημάτων στην
              Αθήνα. Οι πληροφορίες του ιστότοπου έχουν ενημερωτικό χαρακτήρα και
              δεν αποτελούν δεσμευτική προσφορά.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Πλοήγηση
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <SectionLink
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Επικοινωνία
            </p>
            <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
              {siteConfig.locations.map((location) => (
                <li key={location.id}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-copper/70">
                    {location.label}
                  </p>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block hover:text-foreground"
                  >
                    {location.address}
                  </a>
                </li>
              ))}
              <li>
                <a href={siteConfig.phoneHref} className="hover:text-foreground">
                  Τηλ.: {siteConfig.phone}
                </a>
              </li>
              <li>
                <ViberTextLink>Viber: 690 749 3500</ViberTextLink>
              </li>
              <li className="text-xs">{siteConfig.hours.weekdays}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 space-y-4 border-t border-border/40 pt-8 text-xs leading-relaxed text-muted-foreground">
          <p>
            © {year} Μηχανουργείο Αλεξανδράκης. Με επιφύλαξη παντός δικαιώματος. Όλα
            τα κείμενα, φωτογραφίες, βίντεο και γραφικά στοιχεία προστατεύονται από
            πνευματικά δικαιώματα.
          </p>
          <p>
            Απαγορεύεται η αναπαραγωγή, αντιγραφή ή διανομή του περιεχομένου χωρίς
            προηγούμενη έγγραφη άδεια. Τα εμπορικά σήματα τρίτων ανήκουν στους
            νόμιμους κατόχους τους.
          </p>
          <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.12em] sm:flex-row sm:items-center sm:justify-between">
            <p>
              {siteConfig.locations.map((l) => l.address).join(" · ")}
            </p>
            <p>
              Κριτικές πελατών από{" "}
              <a
                href={siteConfig.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground"
              >
                Google Maps
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="select-none overflow-hidden border-t border-border/30 pb-6 pt-10 sm:pb-10">
        <p className="display-hero text-outline-copper text-center text-[clamp(2.6rem,13vw,11rem)] leading-none">
          ΑΛΕΞΑΝΔΡΑΚΗΣ
        </p>
      </div>
    </footer>
  );
}
