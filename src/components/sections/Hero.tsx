"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, Terminal } from "lucide-react";

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
    <div
      className="w-full rounded-xl overflow-hidden border"
      style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ backgroundColor: "#334155", borderColor: "#475569" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e" }} />
        <div className="ml-3 flex items-center gap-2" style={{ color: "#64748b" }}>
          <Terminal size={12} />
          <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12 }}>
            datorix — dpi capture stream
          </span>
        </div>
      </div>

      <div className="p-4 space-y-1.5 min-h-[260px]" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12 }}>
        {SQL_LINES.slice(0, visible).map((line, i) => (
          <div key={i} className="flex items-start gap-3 leading-relaxed">
            <span style={{ color: "#64748b", minWidth: 90 }}>{line.time}</span>
            <span style={{ color: "#38bdf8", minWidth: 80 }}>{line.user}</span>
            <span
              className="flex-1 truncate"
              style={{ color: line.flag === "BLOCKED" ? "#ef4444" : line.flag === "THREAT" ? "#f59e0b" : "#94a3b8" }}
            >
              {line.query}
            </span>
            {line.flag && (
              <span
                className="shrink-0 font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: line.flag === "BLOCKED" ? "#ef444422" : "#f59e0b22",
                  color: line.flag === "BLOCKED" ? "#ef4444" : "#f59e0b",
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                {line.flag}
              </span>
            )}
          </div>
        ))}
        {visible < SQL_LINES.length && (
          <div style={{ color: "#38bdf8" }}>
            <span className="animate-pulse">█</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section style={{ backgroundColor: "#f8fafc", paddingTop: "calc(64px + 96px)", paddingBottom: 96 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span
                className="inline-flex items-center gap-2 font-semibold uppercase"
                style={{
                  backgroundColor: "#eff8ff",
                  border: "1px solid #7dd3fc",
                  color: "#0ea5e9",
                  fontSize: 11,
                  letterSpacing: "1.5px",
                  borderRadius: 9999,
                  padding: "6px 14px",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse shrink-0" />
                Database Activity Monitoring
              </span>
            </div>

            <h1
              className="font-bold leading-[1.05]"
              style={{ fontSize: "clamp(40px, 5vw, 72px)", letterSpacing: "-2.5px", color: "#0f2050" }}
            >
              See Everything.
              <br />
              Secure Everything.
              <br />
              <span style={{ color: "#38bdf8" }}>Total Control.</span>
            </h1>

            <p className="leading-relaxed" style={{ color: "#475569", maxWidth: 520, fontSize: 18 }}>
              Datorix DAM Platform delivers passive, agentless monitoring of all database activities in real time. Powered by Deep Packet Inspection — zero performance impact, complete visibility.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href="#cta"
                className="flex items-center gap-2 font-semibold bg-[#0f2050] hover:bg-[#0a1838] text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  height: 44,
                  paddingLeft: 24,
                  paddingRight: 24,
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                Request a Demo
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center font-semibold border border-[#e2e8f0] hover:border-[#0f2050] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98]"
                style={{
                  backgroundColor: "transparent",
                  color: "#0f2050",
                  fontWeight: 600,
                  fontSize: 14,
                  height: 44,
                  paddingLeft: 24,
                  paddingRight: 24,
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                See How It Works
              </Link>
              <Link
                href="/docs/datorix_enterprise_datasheet_DAM.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  backgroundColor: "transparent",
                  color: "#0f2050",
                  fontWeight: 600,
                  fontSize: 14,
                  height: 44,
                  paddingLeft: 12,
                  paddingRight: 12,
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                <Download size={16} />
                Download Datasheet
              </Link>
            </div>

            {/* Inline stats */}
            <div className="flex flex-wrap gap-8 mt-4 pt-8" style={{ borderTop: "1px solid #e2e8f0" }}>
              {[
                { value: "5", label: "Databases supported" },
                { value: "99.99%", label: "Uptime SLA" },
                { value: "0ms", label: "Added latency" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-bold" style={{ fontSize: 28, color: "#0f2050", letterSpacing: "-1px" }}>
                    {value}
                  </p>
                  <p className="text-sm" style={{ color: "#64748b" }}>
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
