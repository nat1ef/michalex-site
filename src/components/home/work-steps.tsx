import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { workSteps } from "@/lib/content";

export function WorkSteps() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card">
      {/* Τεχνικό σχέδιο γραναζιού — διακριτικό υδατογράφημα */}
      <Image
        src="/images/drawings/gear-blueprint.svg"
        alt=""
        aria-hidden
        width={900}
        height={506}
        className="pointer-events-none absolute -right-24 top-1/2 hidden w-[520px] -translate-y-1/2 opacity-[0.07] lg:block"
      />

      <div className="section-shell relative py-20 lg:py-28">
        <Reveal>
          <h2 className="display-lg">
            Από το σχέδιο στο χέρι σας,{" "}
            <span className="text-primary">σε 3 βήματα</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {workSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="relative h-full">
                <p className="display-num text-[clamp(3.4rem,6vw,4.6rem)] text-primary/16">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="-mt-6 border-t-2 border-foreground pt-4">
                  <h3
                    className="text-[19px] font-extrabold uppercase"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[36ch] text-[14.5px] text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
