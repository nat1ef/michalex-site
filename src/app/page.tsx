import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { StatementScroll } from "@/components/sections/statement-scroll";
import { ProcessChapters } from "@/components/sections/process-chapters";
import { BentoFacility } from "@/components/sections/bento-facility";
import { Services } from "@/components/sections/services";
import { Metrics } from "@/components/sections/metrics";
import { Reviews } from "@/components/sections/reviews";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Contact } from "@/components/sections/contact";
import { FloatingViber } from "@/components/contact/floating-viber";
import { AnimationProvider } from "@/components/motion/animation-provider";
import { SiteExperience } from "@/components/motion/site-experience";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { MagneticButtons } from "@/components/motion/magnetic-buttons";
import { HorizontalFeatures } from "@/components/motion/horizontal-features";
import { AmbientField } from "@/components/motion/ambient-field";
import { ScrollRestoration } from "@/components/motion/scroll-restoration";
import { CinematicOverlay } from "@/components/motion/cinematic-overlay";

export default function Home() {
  return (
    <AnimationProvider>
      <ScrollRestoration />
      <SiteExperience>
        <AmbientField />
        <CinematicOverlay />
        <div className="relative z-10">
          <ScrollProgress />
          <MagneticButtons />
          <Header />
          <main className="flex-1 overflow-x-hidden">
            <Hero />
            <StatementScroll />
            <ProcessChapters />
            <BentoFacility />
            <Services />
            <HorizontalFeatures />
            <Metrics />
            <Reviews />
            <CtaBanner />
            <Contact />
          </main>
          <Footer />
          <FloatingViber />
        </div>
      </SiteExperience>
    </AnimationProvider>
  );
}
