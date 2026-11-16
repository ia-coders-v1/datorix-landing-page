import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";
import { roadmapBlocks } from "@/lib/content";

export default function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-20 bg-background pt-24 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Roadmap</SectionLabel>
        <h2 className="font-bold text-center mb-4 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
          What we are building next
        </h2>
        <p className="text-center mx-auto mb-14 max-w-[640px] text-base text-muted-foreground">
          Planned work, in three blocks. None of this is available yet.
        </p>

        <div className="flex flex-col gap-14">
          {roadmapBlocks.map((block) => (
            <div key={block.title}>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-bold text-2xl tracking-[-0.5px] text-primary">{block.title}</h3>
                <Badge variant="soon">Coming soon</Badge>
              </div>
              <p className="mb-6 text-base text-muted-foreground">{block.tagline}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {block.cards.map((card) => (
                  <div key={card.title} className="rounded-xl p-8 flex flex-col gap-3 card-hover bg-surface-tonal">
                    <h4 className="font-bold text-lg tracking-[-0.3px] text-primary">{card.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground text-[15px]">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
