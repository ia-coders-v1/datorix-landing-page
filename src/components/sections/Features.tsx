"use client";

import { useState } from "react";
import { Cpu, Radio, ClipboardList, ShieldCheck, Bell, Search, ArrowRight } from "lucide-react";

const tabs = [
  {
    id: "dpi",
    label: "DPI Technology",
    icon: Cpu,
    headline: "Deep Packet Inspection at wire speed",
    description:
      "Datorix uses Deep Packet Inspection to capture every byte of database traffic directly from the network layer. No agents, no schema changes, no application modifications — just complete, accurate capture.",
    features: [
      "Network-level packet capture — nothing is missed",
      "Supports encrypted and plain-text traffic",
      "Works with any database driver or client",
      "Minimal CPU overhead — designed for production",
    ],
    code: `-- DPI capture output (real-time)
[CAPTURE] src=app-01:52344 → prod-db:5432
[PROTO]   PostgreSQL v3 — Query message
[USER]    app_user  DB: production
[STMT]    SELECT * FROM transactions
          WHERE amount > 50000
[RISK]    score=0.78  flags=full_table_candidate
[ACTION]  ALERT → security-team`,
    highlight: true,
  },
  {
    id: "agentless",
    label: "Passive & Agentless",
    icon: Radio,
    headline: "Zero performance overhead",
    description:
      "No software to install on your database servers. Datorix operates completely passively — monitoring traffic without interfering with queries, connections, or database performance.",
    features: [
      "Nothing installed on the database server",
      "Transparent to applications and users",
      "No connection pool changes required",
      "Deploy in minutes, not days",
    ],
    code: `-- No changes needed on your DB server
-- Datorix deploys alongside, not inside

DEPLOYMENT passive_mode
  CAPTURE_FROM: network_tap | span_port
  TARGET: prod-db-01.internal:5432
  MODE: read_only
  AGENT_REQUIRED: false
  SCHEMA_CHANGES: none
  DOWNTIME: none`,
    highlight: false,
  },
  {
    id: "audit",
    label: "Audit Trails",
    icon: ClipboardList,
    headline: "Immutable record of every transaction",
    description:
      "Datorix captures the complete story of every database activity — Who, What, When, Where, and How. Audit logs are written to tamper-proof, immutable storage the moment they are captured.",
    features: [
      "Who: authenticated user and source IP",
      "What: full SQL statement, object name, operation type",
      "When: microsecond-precision timestamp",
      "Where: database, schema, table",
    ],
    code: `-- Audit log entry (immutable)
{
  "ts":        "2025-06-02T09:14:32.502Z",
  "user":      "admin",
  "src_ip":    "10.0.1.44",
  "db":        "production",
  "operation": "DDL",
  "stmt":      "DROP TABLE sessions",
  "risk":      0.99,
  "action":    "BLOCKED",
  "hash":      "sha256:a3f9..."
}`,
    highlight: false,
  },
  {
    id: "compliance",
    label: "Security & Compliance",
    icon: ShieldCheck,
    headline: "SOX · HIPAA · GDPR · PCI-DSS built in",
    description:
      "Pre-built compliance dashboards and one-click report generation for the four major regulatory frameworks. Align with audit requirements without manual evidence collection.",
    features: [
      "PCI-DSS Section 10 access logging",
      "HIPAA minimum-necessary access tracking",
      "GDPR data-subject access reports",
      "SOX privileged-user change monitoring",
    ],
    code: `-- Generate compliance evidence
REPORT hipaa_minimum_necessary
  PERIOD:  last_90_days
  FILTER:  phi_tables = true
  INCLUDE: all_access_events
           privilege_escalations
           failed_authentications
  FORMAT:  pdf, json, csv
  SIGN:    sha256_tamper_proof`,
    highlight: false,
  },
  {
    id: "alerts",
    label: "Alerts & Notifications",
    icon: Bell,
    headline: "Real-time Email & SMS on every violation",
    description:
      "Define policy rules and Datorix fires instant alerts the moment a violation occurs — via Email, SMS, or webhook to your existing SIEM or incident management platform.",
    features: [
      "Real-time Email and SMS notifications",
      "Webhook integration to any SIEM",
      "Configurable alert severity levels",
      "Alert suppression and deduplication",
    ],
    code: `-- Alert rule definition
RULE block_off_hours_admin
  MATCH:   user IN ('admin', 'dba')
  WHEN:    hour NOT BETWEEN 8 AND 18
  ACTION:  BLOCK + ALERT
  NOTIFY:
    - email: security@company.com
    - sms:   +60123456789
    - slack: #db-security
  SEVERITY: CRITICAL`,
    highlight: false,
  },
  {
    id: "forensics",
    label: "Forensics",
    icon: Search,
    headline: "Investigate incidents faster",
    description:
      "Powerful full-text search across the complete audit history lets security teams reconstruct exactly what happened, when, and by whom — in seconds, not hours.",
    features: [
      "Full-text search across entire audit history",
      "Timeline reconstruction for any user or object",
      "Cross-database incident correlation",
      "Export evidence for legal or regulatory proceedings",
    ],
    code: `-- Forensic query example
INVESTIGATE
  USER:    admin
  PERIOD:  2025-06-01 09:00 TO 09:30
  FOCUS:   DDL, privilege_changes
  INCLUDE: failed_attempts = true

-- Returns chronological event timeline
-- with full statement text, source IP,
-- and risk scores for each event`,
    highlight: false,
  },
];

export default function Features() {
  const [active, setActive] = useState("dpi");
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <section id="features" style={{ backgroundColor: "#0a0a0a", paddingTop: 96, paddingBottom: 96 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <p
          className="font-semibold uppercase tracking-widest mb-4 text-center"
          style={{ color: "#888888", fontSize: 12, letterSpacing: "1.5px" }}
        >
          Features
        </p>
        <h2
          className="font-bold text-center mb-12"
          style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-1.5px", color: "#ffffff" }}
        >
          Complete visibility across all
          <br />
          database activities
        </h2>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? "#1a1a1a" : "transparent",
                  color: isActive ? "#ffffff" : "#888888",
                  border: isActive ? "1px solid #2a2a2a" : "1px solid transparent",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <Icon size={15} style={{ color: isActive ? "#faff69" : "#5a5a5a" }} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Info card */}
          <div
            className="rounded-xl p-8 flex flex-col gap-5"
            style={{
              backgroundColor: tab.highlight ? "#faff69" : "#1a1a1a",
              border: tab.highlight ? "none" : "1px solid #2a2a2a",
            }}
          >
            <h3
              className="font-bold"
              style={{ fontSize: 24, letterSpacing: "-0.5px", color: tab.highlight ? "#0a0a0a" : "#ffffff" }}
            >
              {tab.headline}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: tab.highlight ? "#1a1a1a" : "#cccccc", fontSize: 15 }}
            >
              {tab.description}
            </p>
            <ul className="flex flex-col gap-2 mt-2">
              {tab.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: tab.highlight ? "#0a0a0a" : "#cccccc" }}>
                  <ArrowRight size={14} style={{ color: tab.highlight ? "#0a0a0a" : "#faff69", flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Code window */}
          <div
            className="rounded-xl overflow-hidden border"
            style={{ backgroundColor: "#1a1a1a", borderColor: "#2a2a2a" }}
          >
            <div
              className="px-4 py-3 border-b flex items-center gap-2"
              style={{ backgroundColor: "#242424", borderColor: "#2a2a2a" }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ef4444" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
              <span className="ml-2 text-xs" style={{ color: "#5a5a5a", fontFamily: "var(--font-jetbrains-mono)" }}>
                {tab.id}.conf
              </span>
            </div>
            <pre
              className="p-6 text-xs leading-relaxed overflow-x-auto"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#cccccc", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {tab.code}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
