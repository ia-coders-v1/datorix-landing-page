import { SectionLabel } from "@/components/ui/section-label";
import { featureSections } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function FeatureSections() {
  return (
    <>
      {featureSections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={cn(
            "scroll-mt-20 pt-24 pb-24",
            i % 2 === 0 ? "bg-background" : "bg-secondary border-t border-b border-border"
          )}
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <SectionLabel>{section.label}</SectionLabel>
            <h2 className="font-bold text-center mb-4 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
              {section.title}
            </h2>
            <p className="text-center mx-auto mb-14 max-w-[640px] text-base text-muted-foreground">
              {section.tagline}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.cards.map((card) => (
                <div key={card.title} className="rounded-xl p-8 flex flex-col gap-3 card-hover bg-surface-tonal">
                  <h3 className="font-bold text-lg tracking-[-0.3px] text-primary">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground text-[15px]">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
