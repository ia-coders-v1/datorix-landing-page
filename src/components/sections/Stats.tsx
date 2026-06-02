"use client";

import { useEffect, useRef, useState } from "react";

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
      <p className="font-bold leading-none" style={{ fontSize: 56, color: "#faff69", letterSpacing: "-1.5px" }}>
        {decimal ? current.toFixed(2) : current}
        {suffix}
      </p>
      <p className="text-sm" style={{ color: "#888888" }}>
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section style={{ backgroundColor: "#121212", paddingTop: 96, paddingBottom: 96, borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a" }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <p
          className="font-semibold uppercase tracking-widest mb-4 text-center"
          style={{ color: "#888888", fontSize: 12, letterSpacing: "1.5px" }}
        >
          By the Numbers
        </p>
        <h2
          className="font-bold text-center mb-16"
          style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-1.5px", color: "#ffffff" }}
        >
          Built for production-grade
          <br />
          <span style={{ color: "#faff69" }}>database environments</span>
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
