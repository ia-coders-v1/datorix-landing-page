"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/section-label";

type Stat = { value: number | null; text?: string; suffix: string; label: string; decimal: boolean };

const stats: Stat[] = [
  { value: 80, suffix: "+", label: "SQL-injection rules built in", decimal: false },
  { value: 3,  suffix: "",  label: "Capture paths: proxy, network sensor, audit collector", decimal: false },
  { value: 4,  suffix: "",  label: "Replication target engines", decimal: false },
  { value: null, text: "Linux + Windows", suffix: "", label: "Backup agents", decimal: false },
];

function Counter({ value, text, suffix, label, decimal }: Stat) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (value === 0) { setCurrent(0); return; }
          const duration = 1600;
          const steps = 60;
          const increment = value / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const next = Math.min(increment * step, value);
            setCurrent(decimal ? parseFloat(next.toFixed(2)) : Math.floor(next));
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimal]);

  return (
    <div ref={ref} className="rounded-xl p-8 flex flex-col gap-2 text-center card-hover bg-surface-tonal">
      <p className={`font-bold leading-none ${value === null ? "text-[32px] pt-[12px] pb-[12px]" : "text-[56px]"} text-primary tracking-[-1.5px]`}>
        {value === null ? text : decimal ? current.toFixed(2) : current}
        {value === null ? "" : suffix}
      </p>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-secondary pt-24 pb-24 border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>By the Numbers</SectionLabel>
        <h2 className="font-bold text-center mb-16 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
          Numbers you can
          <br />
          <span className="text-accent-blue">check against the product</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s) => (
            <Counter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
