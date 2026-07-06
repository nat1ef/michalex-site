import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViberIcon } from "@/components/icons/viber-icon";
import { serviceCategories, siteConfig } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return serviceCategories.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceCategories.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = serviceCategories.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <article>
      <div className="section-shell pt-8">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground">
            Αρχικη
          </Link>{" "}
          /{" "}
          <Link href="/#υπηρεσιες" className="hover:text-foreground">
            Υπηρεσιες
          </Link>{" "}
          / <b className="text-accent-deep">{service.shortTitle}</b>
        </nav>
      </div>

      <div className="section-shell grid items-start gap-10 pb-14 pt-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <p className="eyebrow">{service.eyebrow}</p>
          <h1 className="mt-2 text-balance text-[clamp(1.9rem,4.2vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.02em]">
            {service.title}
          </h1>
          <p className="mt-4 max-w-[52ch] text-[16px] text-muted-foreground">
            {service.lead}
          </p>

          <ul className="mt-7 grid gap-x-5 gap-y-2.5 text-[14.5px] font-semibold sm:grid-cols-2">
            {service.checklist.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span aria-hidden className="font-bold text-primary">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href={siteConfig.phoneHref}
            className="mt-8 inline-flex items-center gap-2.5 rounded-md bg-primary px-6 py-3.5 text-[15px] font-bold text-primary-foreground shadow-[0_10px_22px_-10px_var(--accent-deep)] transition-colors hover:bg-accent-deep"
          >
            ☎ Ρωτήστε μας: {siteConfig.phone}
          </a>
        </div>

        <div className="grid gap-4">
          {service.images.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={900}
              height={510}
              className="aspect-[16/9] w-full rounded-md border border-border object-cover"
            />
          ))}
        </div>
      </div>

      <div className="section-shell pb-16">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg bg-band px-7 py-6 text-band-foreground">
          <div>
            <p className="text-[18px] font-bold tracking-[-0.01em]">
              Έχετε το κομμάτι μπροστά σας;
            </p>
            <p className="mt-1 text-[13.5px] text-band-foreground/65">
              Στείλτε μια φωτογραφία στο Viber — απαντάμε με τιμή και χρόνο
              παράδοσης.
            </p>
          </div>
          <a
            href={siteConfig.viberHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-md bg-viber px-5 py-3 text-[15px] font-bold text-white"
          >
            <ViberIcon className="h-4 w-4" />
            690 749 3500
          </a>
        </div>
      </div>
    </article>
  );
}
