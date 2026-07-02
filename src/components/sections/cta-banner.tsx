"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { ViberButton } from "@/components/contact/viber-button";
import { siteConfig } from "@/lib/content";

export function CtaBanner() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-t border-border/30 py-24 sm:py-32">
      <div className="section-shell">
        <motion.div
          className="relative overflow-hidden border border-border/30 px-8 py-14 sm:px-14 sm:py-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grain-overlay absolute inset-0" />
          {!prefersReducedMotion && (
            <motion.div
              className="absolute -right-20 top-0 h-full w-1/2 bg-gradient-to-l from-foreground/[0.03] to-transparent"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                ( Επικοινωνία )
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Έχετε μηχανουργική ανάγκη;
              </h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                Καλέστε ή στείλτε Viber — θα βρούμε τη σωστή λύση για το έργο σας.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href={siteConfig.phoneHref}
                size="lg"
                className="gap-2 rounded-full px-6 font-mono text-[11px] uppercase tracking-[0.12em]"
              >
                <Phone className="h-3.5 w-3.5" />
                {siteConfig.phone}
              </ButtonLink>
              <ViberButton size="lg" label="Viber" className="rounded-full" />
              <ButtonLink
                href="#υπηρεσιες"
                variant="outline"
                size="lg"
                className="gap-2 rounded-full px-6 font-mono text-[11px] uppercase tracking-[0.12em]"
              >
                Υπηρεσίες
                <ArrowUpRight className="h-3.5 w-3.5" />
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
