"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const SQL_LINES = [
  { time: "09:14:32.001", user: "app_user",   query: "SELECT * FROM customers WHERE region = 'MY'" },
  { time: "09:14:32.118", user: "admin",       query: "UPDATE accounts SET balance = 0 WHERE 1=1", flag: "THREAT" },
  { time: "09:14:32.204", user: "readonly",    query: "SELECT name, email FROM users LIMIT 200" },
  { time: "09:14:32.391", user: "etl_service", query: "INSERT INTO audit_log (event, ts) VALUES (?,?)" },
  { time: "09:14:32.502", user: "admin",       query: "DROP TABLE sessions; --", flag: "BLOCKED" },
  { time: "09:14:32.617", user: "app_user",    query: "SELECT COUNT(*) FROM orders WHERE status='pending'" },
  { time: "09:14:32.780", user: "report_svc",  query: "SELECT * FROM transactions WHERE amount > 50000", flag: "ALERT" },
];

function CodeWindow() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= SQL_LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 420);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="w-full rounded-xl overflow-hidden border bg-slate-800 border-slate-700">
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-slate-700 border-slate-600">
        <span className="w-3 h-3 rounded-full bg-accent-rose" />
        <span className="w-3 h-3 rounded-full bg-amber-500" />
        <span className="w-3 h-3 rounded-full bg-accent-emerald" />
        <div className="ml-3 flex items-center gap-2 text-slate-500">
          <Terminal size={12} />
          <span className="font-mono text-xs">datorix — dpi capture stream</span>
        </div>
      </div>

      <div className="p-4 space-y-1.5 min-h-[260px] font-mono text-xs">
        {SQL_LINES.slice(0, visible).map((line, i) => (
          <div key={i} className="flex items-start gap-3 leading-relaxed">
            <span className="min-w-[90px] text-slate-500">{line.time}</span>
            <span className="min-w-[80px] text-accent-blue">{line.user}</span>
            <span
              className={cn(
                "flex-1 truncate",
                line.flag === "BLOCKED" ? "text-accent-rose" : line.flag === "THREAT" ? "text-amber-500" : "text-slate-400"
              )}
            >
              {line.query}
            </span>
            {line.flag && (
              <span
                className={cn(
                  "shrink-0 font-semibold px-2 py-0.5 rounded-full text-[10px]",
                  line.flag === "BLOCKED" ? "bg-accent-rose/13 text-accent-rose" : "bg-amber-500/13 text-amber-500"
                )}
              >
                {line.flag}
              </span>
            )}
          </div>
        ))}
        {visible < SQL_LINES.length && (
          <div className="text-accent-blue">
            <span className="animate-pulse">█</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-background pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center gap-2 font-semibold uppercase text-[11px] tracking-[1.5px] rounded-full px-3.5 py-1.5 bg-sky-50 border border-sky-300 text-sky-500">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse shrink-0" />
                Database Activity Monitoring
              </span>
            </div>

            <h1 className="font-bold leading-[1.05] text-[clamp(40px,5vw,72px)] tracking-[-2.5px] text-primary">
              See Everything.
              <br />
              Secure Everything.
              <br />
              <span className="text-accent-blue">Total Control.</span>
            </h1>

            <p className="leading-relaxed text-body max-w-130 text-lg">
              Datorix DAM Platform delivers passive, agentless monitoring of all database activities in real time. Powered by Deep Packet Inspection — zero performance impact, complete visibility.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href="#cta"
                className="flex items-center gap-2 font-semibold text-sm h-11 px-6 rounded-md no-underline bg-primary hover:bg-primary-active text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
              >
                Request a Demo
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center font-semibold text-sm h-11 px-6 rounded-md no-underline bg-transparent text-primary border border-primary hover: transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98]"
              >
                See How It Works
              </Link>
            </div>

            {/* Inline stats */}
            <div className="flex flex-wrap gap-8 mt-4 pt-8 border-t border-muted-soft">
              {[
                { value: "5", label: "Databases supported" },
                { value: "99.99%", label: "Uptime SLA" },
                { value: "0ms", label: "Added latency" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-bold text-[28px] text-primary tracking-[-1px]">
                    {value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 5 cols */}
          <div className="lg:col-span-5">
            <CodeWindow />
          </div>
        </div>
      </div>
    </section>
  );
}
