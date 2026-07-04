import { Header } from "@/components/layout/header";
import { FooterReveal } from "@/components/layout/footer-reveal";
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
import { CustomCursor } from "@/components/motion/custom-cursor";
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
          <CustomCursor />
          <Header />
          <FooterReveal>
            <main className="flex-1">
              <Hero />
              <StatementScroll />
              <ProcessChapters />
              <BentoFacility />
              <Services />
              <Metrics />
              <Reviews />
              <CtaBanner />
              <Contact />
            </main>
          </FooterReveal>
          <FloatingViber />
        </div>
      </SiteExperience>
    </AnimationProvider>
  );
}
