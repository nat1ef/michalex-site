import { siteConfig } from "@/lib/content";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Καστοριάς 2",
        addressLocality: "Αθήνα",
        postalCode: "104 41",
        addressCountry: "GR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Αλικαρνασσού 102",
        addressLocality: "Αθήνα",
        postalCode: "104 41",
        addressCountry: "GR",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.9892,
      longitude: 23.7208,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "16:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating,
      reviewCount: siteConfig.reviewCount,
    },
    url: siteConfig.siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
