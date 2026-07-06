import { Reveal } from "@/components/motion/reveal";
import { workSteps } from "@/lib/content";

export function WorkSteps() {
  return (
    <section className="border-y border-border bg-card">
      <div className="section-shell py-16 lg:py-20">
        <Reveal>
          <p className="eyebrow">Πως δουλευουμε</p>
          <h2 className="mt-2 text-[clamp(1.7rem,3.4vw,2.3rem)] font-bold tracking-[-0.02em]">
            Από το σχέδιο στο χέρι σας, σε 3 βήματα
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {workSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <div className="h-full rounded-b-md border border-border border-t-[3px] border-t-primary bg-background p-5 pb-6">
                <p className="font-mono text-[12px] font-semibold tracking-[0.15em] text-primary">
                  {step.n}
                </p>
                <h3 className="mt-2 text-[16.5px] font-bold">{step.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
