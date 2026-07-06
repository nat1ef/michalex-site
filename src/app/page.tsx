import { ContactBand } from "@/components/home/contact-band";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { ReviewsSection } from "@/components/home/reviews-section";
import { ServicesGrid } from "@/components/home/services-grid";
import { StatsBand } from "@/components/home/stats-band";
import { TrustedBy } from "@/components/home/trusted-by";
import { WorkSteps } from "@/components/home/work-steps";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <TrustedBy />
      <ServicesGrid />
      <WorkSteps />
      <Gallery />
      <ReviewsSection />
      <ContactBand />
    </>
  );
}
