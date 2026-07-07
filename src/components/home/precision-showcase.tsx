import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/content";

export function PrecisionShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-band text-band-foreground">
      {/* 3D CGI απεικόνιση ακρίβειας — γρανάζια που συγκλίνουν.
          Σε μεγάλες οθόνες παίζει το animated render· η στατική εικόνα
          μένει ως fallback (κινητά, reduced motion, αργή σύνδεση). */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/backdrops/gear-3d-showcase.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <video
          src="/videos/precision-showcase.mp4"
          poster="/images/backdrops/gear-3d-showcase.jpg"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 hidden h-full w-full object-cover motion-safe:lg:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-band via-band/60 to-band/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-band/92 via-band/35 to-transparent" />
      </div>

      <div className="section-shell relative py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow text-accent-bright">Ακρίβεια σε κίνηση</p>
          <h2 className="display-xl mt-4 max-w-[15ch] text-band-foreground">
            Στο χιλιοστό.
            <br />
            Σε κάθε κομμάτι.
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className="mt-5 max-w-[44ch] text-[16px] text-band-foreground/70">
            40+ χρόνια μηχανουργικής ακρίβειας — από το γρανάζι που κρατά ένα
            μηχάνημα σε λειτουργία, μέχρι το εξάρτημα που δεν βρίσκεται πουθενά
            αλλού.
          </p>
          <a
            href={siteConfig.phoneHref}
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-primary px-7 py-4 text-[16px] font-bold text-primary-foreground shadow-[0_14px_30px_-12px_rgb(0_0_0/0.5)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
          >
            ☎ ΚΛΗΣΗ: {siteConfig.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
