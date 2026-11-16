import FeatureList from "./FeatureList";
import FeatureRail from "./FeatureRail";
import FeatureVisual from "./FeatureVisuals";
import { featureSections } from "@/lib/content";
import { cn } from "@/lib/utils";

const railItems = featureSections.map(({ id, label }) => ({ id, label }));

export default function FeatureSections() {
  const total = String(featureSections.length).padStart(2, "0");

  return (
    <div>
      <FeatureRail items={railItems} />
      {featureSections.map((section, i) => {
        const flipped = i % 2 === 1;
        return (
          <section
            key={section.id}
            id={section.id}
            className={cn(
              "scroll-mt-28 py-16 lg:py-20",
              flipped ? "bg-secondary border-t border-b border-border" : "bg-background"
            )}
          >
            <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={cn("min-w-0", flipped && "lg:order-2")}>
                <div className="flex items-center gap-3 mb-4">
                  <span aria-hidden="true" className="font-mono text-xs text-muted-soft">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                  <span className="inline-flex items-center font-semibold uppercase text-[11px] tracking-[1.5px] rounded-full px-3.5 py-1 bg-sky-50 border border-sky-300 text-sky-500">
                    {section.label}
                  </span>
                </div>
                <h2 className="font-bold mb-3 text-[clamp(28px,3.5vw,40px)] leading-[1.1] tracking-[-1.5px] text-primary">
                  {section.title}
                </h2>
                <p className="mb-8 max-w-[520px] text-base leading-relaxed text-muted-foreground">{section.tagline}</p>
                <FeatureList cards={section.cards} />
              </div>

              <div className={cn("min-w-0 reveal", flipped && "lg:order-1")}>
                <FeatureVisual id={section.id} />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
