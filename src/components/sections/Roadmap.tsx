import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";
import { roadmapBlocks } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-28 bg-background pt-24 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Roadmap</SectionLabel>
        <h2 className="font-bold text-center mb-4 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
          What we are building next
        </h2>
        <p className="text-center mx-auto mb-12 max-w-[640px] text-base text-muted-foreground">
          Planned work, in three blocks. None of this is available yet.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roadmapBlocks.map((block) => {
            const wide = block.cards.length === 1;
            return (
              <div
                key={block.title}
                className={cn(
                  "reveal rounded-xl border border-dashed border-hairline-strong bg-white/60 p-6 sm:p-8",
                  wide && "lg:col-span-2 lg:flex lg:items-center lg:gap-12"
                )}
              >
                <div className={cn(wide ? "lg:w-[40%] lg:shrink-0" : "mb-6")}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-bold text-xl tracking-[-0.5px] text-primary">{block.title}</h3>
                    <Badge variant="soon">Coming soon</Badge>
                  </div>
                  <p className="text-[15px] text-muted-foreground">{block.tagline}</p>
                </div>

                <ul className={cn("flex flex-col", wide ? "mt-6 lg:mt-0" : "divide-y divide-border")}>
                  {block.cards.map((card) => (
                    <li key={card.title} className={cn(!wide && "py-3.5 first:pt-0 last:pb-0")}>
                      <h4 className="font-semibold text-[15px] tracking-[-0.2px] text-primary">{card.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
