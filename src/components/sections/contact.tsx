"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/fade-in";
import { ViberTextLink } from "@/components/contact/viber-text-link";
import { siteConfig } from "@/lib/content";

export function Contact() {
  return (
    <section id="επικοινωνια" className="border-t border-border/30 py-24 sm:py-32 lg:py-40">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="telemetry-label">
            <span className="text-copper/80">[</span> ΕΠΙΚΟΙΝΩΝΙΑ{" "}
            <span className="text-copper/80">]</span>
          </p>
          <h2 className="display-title mt-6">
            Ελάτε στο εργαστήριο ή επικοινωνήστε άμεσα
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
            Δύο σημεία στην Αθήνα — Καστοριάς 2 (έδρα) και Αλικαρνασσού 102
            (υποκατάστημα). Καλέστε ή στείλτε Viber για γρήγορη απάντηση.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-3 sm:grid-cols-2">
          {siteConfig.locations.map((location) => (
            <StaggerItem key={location.id}>
              <div className="flex h-full flex-col border border-border/30 p-8">
                <MapPin className="h-5 w-5 text-copper/80" />
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-copper/80">
                  {location.label}
                </p>
                <h3 className="mt-2 text-lg font-medium">{location.address}</h3>
                <ButtonLink
                  href={location.mapsUrl}
                  variant="outline"
                  external
                  className="mt-6 w-full rounded-full font-mono text-[10px] uppercase tracking-[0.12em]"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Οδηγίες
                </ButtonLink>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="mt-3 grid gap-3 lg:grid-cols-3">
          {[
            {
              icon: Phone,
              title: "Τηλεφώνησε",
              desc: siteConfig.phone,
              action: (
                <ButtonLink
                  href={siteConfig.phoneHref}
                  className="mt-6 w-full rounded-full font-mono text-[10px] uppercase tracking-[0.12em]"
                >
                  Κλήση
                </ButtonLink>
              ),
            },
            {
              icon: MapPin,
              title: "Έδρα",
              desc: siteConfig.locations[0].address,
              action: (
                <ButtonLink
                  href={siteConfig.locations[0].mapsUrl}
                  variant="outline"
                  external
                  className="mt-6 w-full rounded-full font-mono text-[10px] uppercase tracking-[0.12em]"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Χάρτης
                </ButtonLink>
              ),
            },
            {
              icon: Clock,
              title: "Ώρες λειτουργίας",
              desc: `${siteConfig.hours.weekdays} · ${siteConfig.hours.saturday}`,
              action: (
                <ButtonLink
                  href={siteConfig.phoneHref}
                  variant="outline"
                  className="mt-6 w-full rounded-full font-mono text-[10px] uppercase tracking-[0.12em]"
                >
                  Ραντεβού
                </ButtonLink>
              ),
            },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex h-full flex-col border border-border/30 p-8">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-6 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                {item.action}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.15} className="mt-3 grid gap-3 lg:grid-cols-2">
          {siteConfig.locations.map((location) => (
            <div key={location.id} className="overflow-hidden border border-border/30">
              <p className="border-b border-border/30 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {location.label} — {location.address}
              </p>
              <iframe
                title={`Χάρτης — ${location.label}`}
                src={`https://maps.google.com/maps?q=${location.embedQuery}&output=embed&z=16`}
                className="aspect-[16/10] w-full border-0 grayscale contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={0.2} className="mt-3 border border-border/30 p-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Viber
              </p>
              <ViberTextLink className="mt-2 block text-sm">690 749 3500</ViberTextLink>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Τηλέφωνο
              </p>
              <a href={siteConfig.phoneHref} className="mt-2 block text-sm hover:text-foreground/80">
                {siteConfig.phone}
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Ώρες
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{siteConfig.hours.weekdays}</p>
              <p className="text-sm text-muted-foreground">{siteConfig.hours.saturday}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
