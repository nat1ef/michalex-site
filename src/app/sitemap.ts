import type { MetadataRoute } from "next";
import { serviceCategories, siteConfig } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  return [
    { url: `${base}/`, priority: 1 },
    ...serviceCategories.map((service) => ({
      url: `${base}/ypiresies/${service.slug}`,
      priority: 0.8,
    })),
    { url: `${base}/epikoinonia`, priority: 0.7 },
  ];
}
