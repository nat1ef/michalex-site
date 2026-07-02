"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/fade-in";
import { SectionLabel } from "@/components/ui/section-label";
import { siteConfig } from "@/lib/content";
import { openViberChat } from "@/lib/viber";
import { sectionMeta } from "@/lib/sections";

export function Contact() {
  const meta = sectionMeta.contact;

  return (
    <section id="επικοινωνια" className="border-t border-border/30 py-24 sm:py-32 lg:py-40">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <SectionLabel index={meta.index} title={meta.title} />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Ελάτε στο εργαστήριο ή επικοινωνήστε άμεσα
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
            Καστοριάς 2, κέντρο Αθήνας. Καλέστε για ραντεβού ή στείλτε Viber
            για γρήγορη απάντηση.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-3 lg:grid-cols-3">
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
              title: "Οδηγίες",
              desc: siteConfig.address,
              action: (
                <ButtonLink
                  href={siteConfig.mapsUrl}
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

        <FadeIn delay={0.15} className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden border border-border/30">
            <iframe
              title="Χάρτης — Μηχανουργείο Αλεξανδράκης"
              src="https://maps.google.com/maps?q=Καστοριάς+2,+Αθήνα+104+41&output=embed&z=16"
              className="aspect-[16/10] w-full border-0 grayscale contrast-[1.05] lg:aspect-[21/9]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-between border border-border/30 p-8">
            <div className="space-y-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Διεύθυνση
                </p>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-sm hover:text-foreground/80"
                >
                  {siteConfig.address}
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Viber
                </p>
                <a
                  href={siteConfig.viberHref}
                  onClick={(e) => {
                    e.preventDefault();
                    openViberChat();
                  }}
                  className="mt-2 block text-sm text-[#7360F2] hover:underline"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Ώρες
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {siteConfig.hours.weekdays}
                </p>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.hours.saturday}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
