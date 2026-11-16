import { SectionLabel } from "@/components/ui/section-label";
import { techStrip } from "@/lib/content";

export default function TechStrip() {
  return (
    <section className="bg-secondary pt-16 pb-16 border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center gap-6">
        <SectionLabel>Built on proven open technology</SectionLabel>
        <p className="text-center max-w-[560px] text-sm text-muted-foreground">
          Datorix brings well-known building blocks together behind one simple interface.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {techStrip.map((name) => (
            <li key={name} className="px-5 py-3 rounded-xl font-semibold text-sm text-primary bg-surface-tonal">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
