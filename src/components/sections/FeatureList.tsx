"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Card } from "@/lib/content";
import { cn } from "@/lib/utils";

// One item open at a time; every body stays in the DOM for the content gate.
export default function FeatureList({ cards }: { cards: Card[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <ul className="flex flex-col gap-1.5">
      {cards.map((card, i) => {
        const open = i === active;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li
            key={card.title}
            className={cn(
              "rounded-lg border transition-colors duration-200",
              open ? "bg-white border-border shadow-sm" : "border-transparent hover:bg-white/60"
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer rounded-lg font-semibold text-[15px] tracking-[-0.2px] text-primary focus-visible:outline-2 focus-visible:outline-ring"
              >
                {/* Number drawn by CSS: the content gate reads the <h3> text as the card title. */}
                <span
                  aria-hidden="true"
                  data-n={String(i + 1).padStart(2, "0")}
                  className={cn(
                    "font-mono text-[11px] font-medium transition-colors duration-200 before:content-[attr(data-n)]",
                    open ? "text-sky-500" : "text-muted-soft"
                  )}
                />
                <span className="flex-1 min-w-0">{card.title}</span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-muted-soft transition-transform duration-300",
                    open && "rotate-180 text-sky-500"
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none",
                open ? "grid-rows-[1fr] visible" : "grid-rows-[0fr] invisible"
              )}
            >
              <div className="overflow-hidden">
                <p className="pl-[46px] pr-4 pb-4 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
