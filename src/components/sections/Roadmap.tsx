import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { roadmapBlocks } from "@/lib/content";

// Order is positional only: no dates and no stage labels (ADR 0001).
// Item titles are the <h4> chips; the bodies sit in a native <details> so they stay in the DOM.
export default function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-28 bg-primary text-white py-28">
      <div className="max-w-[880px] mx-auto px-6">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center font-semibold uppercase text-[11px] tracking-[1.5px] rounded-full px-3.5 py-1 border border-white/20 text-sky-300">
            Roadmap
          </span>
        </div>
        <h2 className="font-bold text-center mb-4 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-white">
          What we are building next
        </h2>
        <p className="text-center mx-auto mb-20 max-w-[560px] text-base text-slate-300">
          Planned work, in two blocks. None of this is available yet.
        </p>

        <ol className="relative">
          {roadmapBlocks.map((block, i) => {
            const last = i === roadmapBlocks.length - 1;
            return (
              <li key={block.title} className="relative pl-12 sm:pl-16 pb-20 last:pb-0">
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[13px] sm:left-[17px] top-9 bottom-0 border-l-2 border-dashed border-white/20"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute left-0 sm:left-1 top-1 w-7 h-7 rounded-full bg-primary border-2 border-accent-blue flex items-center justify-center"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                </span>

                <div className="reveal">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-bold text-2xl tracking-[-0.5px] text-white">{block.title}</h3>
                    <Badge
                      variant="soon"
                      className="border-amber-400/50 bg-amber-400/10 text-amber-300"
                    >
                      Coming soon
                    </Badge>
                  </div>
                  <p className="mb-6 text-base text-slate-300">{block.tagline}</p>

                  <ul className="flex flex-wrap gap-2">
                    {block.cards.map((card) => (
                      <li key={card.title}>
                        <h4 className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-slate-100">
                          {card.title}
                        </h4>
                      </li>
                    ))}
                  </ul>

                  <details className="group mt-6">
                    <summary className="inline-flex items-center gap-1.5 cursor-pointer list-none text-sm font-medium text-sky-300 hover:text-white transition-colors [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-ring rounded">
                      Read the details
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <dl className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                      {block.cards.map((card) => (
                        <div key={card.title} className="min-w-0 border-l border-white/15 pl-4">
                          <dt className="text-sm font-semibold text-white">{card.title}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-slate-300">{card.body}</dd>
                        </div>
                      ))}
                    </dl>
                  </details>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
