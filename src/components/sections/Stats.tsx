import { SectionLabel } from "@/components/ui/section-label";

const stats = [
  { value: "80+", label: "SQL-injection rules built in" },
  { value: "3", label: "Capture paths: proxy, network sensor, audit collector" },
  { value: "4", label: "Replication target engines" },
  { value: "Linux + Windows", label: "Backup agents", text: true },
];

export default function Stats() {
  return (
    <section id="stats" className="scroll-mt-20 bg-secondary py-16 sm:py-24 border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>By the Numbers</SectionLabel>
        <h2 className="font-bold text-center mb-10 sm:mb-16 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
          Numbers you can
          <br />
          <span className="text-accent-blue">check against the product</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl p-4 sm:p-8 min-w-0 flex flex-col gap-2 text-center card-hover bg-surface-tonal">
              <p
                className={`font-bold leading-none break-words text-primary tracking-[-1.5px] ${
                  s.text ? "text-[18px] sm:text-[32px] py-[14px]" : "text-[40px] sm:text-[56px]"
                }`}
              >
                {s.value}
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
