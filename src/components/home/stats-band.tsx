import { stats } from "@/lib/content";

export function StatsBand() {
  return (
    <section className="bg-band text-band-foreground">
      <div className="section-shell grid grid-cols-2 gap-x-6 gap-y-7 py-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-l-2 border-primary pl-4">
            <p className="text-[27px] font-bold leading-none tabular-nums">
              {stat.value}
              {"suffix" in stat && stat.suffix ? (
                <small className="ml-0.5 text-sm font-semibold text-band-foreground/50">
                  {stat.suffix}
                </small>
              ) : null}
            </p>
            <p className="mt-1.5 text-[11.5px] uppercase tracking-[0.1em] text-band-foreground/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
