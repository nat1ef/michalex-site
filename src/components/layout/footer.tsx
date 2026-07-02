import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/content";
import { LogoFull } from "@/components/brand/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30">
      <div className="section-shell py-12 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <LogoFull className="max-w-[220px]" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Πλοήγηση
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Επικοινωνία
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>{siteConfig.address}</li>
              <li>
                <a href={siteConfig.phoneHref} className="hover:text-foreground">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={siteConfig.viberHref} className="text-[#7360F2] hover:underline">
                  Viber
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/30 pt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Μηχανουργείο Αλεξανδράκης</p>
          <p>Καστοριάς 2 · Αθήνα 104 41</p>
        </div>
      </div>
    </footer>
  );
}
