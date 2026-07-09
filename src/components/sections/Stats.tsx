"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/section-label";

const stats = [
  { value: 5,     suffix: "",    label: "Databases supported",           decimal: false },
  { value: 99.99, suffix: "%",   label: "Uptime SLA",                    decimal: true  },
  { value: 0,     suffix: "ms",  label: "Added query latency",           decimal: false },
  { value: 100,   suffix: "%",   label: "Agentless — no server install", decimal: false },
];

function Counter({ value, suffix, label, decimal }: typeof stats[0]) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
    <div ref={ref} className="flex flex-col gap-2 text-center">
      <p className="font-bold leading-none text-[56px] text-primary tracking-[-1.5px]">
        {decimal ? current.toFixed(2) : current}
        {suffix}
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
          Built for production-grade
          <br />
          <span className="text-accent-blue">database environments</span>
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
