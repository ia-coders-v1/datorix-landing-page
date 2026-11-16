"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftRight,
  Database,
  Eye,
  HardDrive,
  ScrollText,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  see: Eye,
  protect: ShieldCheck,
  data: Database,
  audit: ScrollText,
  replicate: ArrowLeftRight,
  backup: HardDrive,
  operate: SlidersHorizontal,
};

type RailItem = { id: string; label: string };

// Sticky chapter nav; highlights the capability section under the viewport's upper third.
export default function FeatureRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  // Keep the active pill visible when the rail scrolls sideways on phones.
  useEffect(() => {
    const list = listRef.current;
    const pill = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !pill) return;
    const target = pill.offsetLeft - (list.clientWidth - pill.offsetWidth) / 2;
    list.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Capabilities"
      className="sticky top-16 z-40 border-b border-border bg-white/90 backdrop-blur-md"
    >
      <ul
        ref={listRef}
        className="max-w-[1280px] mx-auto px-4 sm:px-6 h-12 flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center"
      >
        {items.map((item, i) => {
          const Icon = icons[item.id];
          const current = item.id === active;
          return (
            <li key={item.id} data-id={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2 h-10 px-3.5 rounded-full text-[13px] font-medium no-underline transition-colors duration-200",
                  current ? "bg-primary text-white" : "text-muted-foreground hover:text-primary hover:bg-secondary"
                )}
              >
                {Icon ? (
                  <Icon size={14} aria-hidden="true" />
                ) : (
                  <span aria-hidden="true" className="font-mono text-[11px]">
                    {i + 1}
                  </span>
                )}
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
