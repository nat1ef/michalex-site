import { stats } from "@/lib/content";

export function StatsBand() {
  return (
    <section className="texture-band text-band-foreground">
      <div className="section-shell grid grid-cols-2 gap-x-8 gap-y-9 py-11 lg:grid-cols-4 lg:divide-x lg:divide-band-foreground/10">
        {stats.map((stat) => (
          <div key={stat.label} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
            <p className="display-num text-[clamp(2.4rem,4vw,3.3rem)]">
              {stat.value}
              {"suffix" in stat && stat.suffix ? (
                <span className="ml-0.5 text-[0.45em] font-bold text-band-foreground/45">
                  {stat.suffix}
                </span>
              ) : null}
            </p>
            <p className="mt-2 text-[11.5px] uppercase tracking-[0.12em] text-band-foreground/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
