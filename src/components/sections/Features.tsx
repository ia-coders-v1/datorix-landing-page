"use client";

import { useState } from "react";
import { Cpu, Radio, GitBranch, DatabaseBackup, ClipboardList, Pickaxe, ShieldCheck, FileCode2, Bell, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";

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
    id: "replication",
    label: "Replication",
    icon: GitBranch,
    headline: "Change Data Capture across every database",
    description:
      "Datorix taps native transaction logs — MySQL binlog, PostgreSQL WAL, Oracle redo, SQL Server CDC — to stream every committed change in real time. Log-based capture means no triggers, no schema changes, and zero load on the source database.",
    features: [
      "Log-based CDC — reads MySQL binlog, Postgres WAL, Oracle redo",
      "Real-time streaming of inserts, updates, and deletes",
      "No triggers, no schema changes, no source-DB load",
      "Replicate to warehouses, lakes, or standby databases",
    ],
    code: `-- CDC replication pipeline
SOURCE prod_mysql
  CAPTURE_FROM: binlog
  POSITION:    gtid_auto
  TABLES:      orders, payments, customers

SINK analytics_warehouse
  DELIVERY:    exactly_once
  LATENCY:     < 1s
  ON_SCHEMA_CHANGE: evolve`,
    highlight: false,
  },
  {
    id: "backup",
    label: "Backup",
    icon: DatabaseBackup,
    headline: "Automated backup jobs for every database",
    description:
      "Datorix orchestrates native backup tooling — Oracle RMAN, MySQL/Postgres physical & logical dumps, SQL Server backup — on a schedule you control. Full and incremental jobs run hands-free, with verified, recoverable snapshots and point-in-time recovery.",
    features: [
      "Native engines — Oracle RMAN, pg_basebackup, mysqldump",
      "Full, incremental, and differential backup jobs",
      "Point-in-time recovery from archived logs",
      "Automated verification and retention policies",
    ],
    code: `-- Backup job definition
JOB nightly_prod_oracle
  ENGINE:   rman
  TYPE:     incremental_level_1
  SCHEDULE: cron(0 2 * * *)
  TARGET:   prod-oracle-01

  RETENTION: 30_days
  VERIFY:    restore_test = true
  PITR:      enabled
  ENCRYPT:   aes_256`,
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
    id: "mining",
    label: "Mining",
    icon: Pickaxe,
    headline: "Mine captured traffic for hidden patterns",
    description:
      "Datorix mines the full stream of captured queries and audit history to surface query trends, anomalous access, unused schema objects, and previously undiscovered sensitive data — turning raw traffic into actionable insight.",
    features: [
      "Query-pattern and access-trend analysis",
      "Anomaly detection across users and objects",
      "Sensitive-data discovery (PII / PHI / PCI)",
      "Schema-usage and dead-object insights",
    ],
    code: `-- Data mining job
MINE access_patterns
  OVER:    last_30_days
  GROUP_BY: user, table, operation

DETECT anomalies
  BASELINE: per_user_rolling_avg
  FLAG:     deviation > 3_sigma

CLASSIFY sensitive_columns
  MATCH:   pii, phi, pci
  OUTPUT:  data_map + risk_score`,
    highlight: false,
  },
  {
    id: "regtech",
    label: "RegTech",
    icon: ShieldCheck,
    headline: "Automated regulatory compliance — SOX · HIPAA · GDPR · PCI-DSS",
    description:
      "Datorix's RegTech engine continuously enforces regulatory rules and auto-generates regulator-ready evidence and filings for the major frameworks — no manual evidence collection, no audit-season scramble.",
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
    id: "smartcontract",
    label: "SmartContract",
    icon: FileCode2,
    headline: "Policy-as-smart-contract enforcement",
    description:
      "Define database access and governance policies as smart contracts that auto-execute the instant a rule is breached — blocking, alerting, or quarantining with deterministic, tamper-proof enforcement and a fully versioned policy history.",
    features: [
      "Codify access & governance rules as contracts",
      "Deterministic auto-execution on every violation",
      "Block, alert, or quarantine with no human delay",
      "Tamper-proof, versioned policy history",
    ],
    code: `-- Policy smart contract
CONTRACT no_bulk_export v3
  ON:   SELECT WHERE row_count > 10000
  FROM: customers, payments

  ENFORCE:
    - BLOCK    query
    - ALERT    security-team
    - QUARANTINE session

  IMMUTABLE: true
  HASH:      sha256:7b41...`,
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
];

export default function Features() {
  const [active, setActive] = useState("dpi");
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <section id="features" style={{ backgroundColor: "#f8fafc", paddingTop: 96, paddingBottom: 96 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Features</SectionLabel>
        <h2
          className="font-bold text-center mb-12"
          style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-1.5px", color: "#0f2050" }}
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${isActive ? "bg-white" : "hover:bg-[#f1f5f9]"}`}
                style={{
                  color: isActive ? "#0f2050" : "#64748b",
                  border: isActive ? "1px solid #e2e8f0" : "1px solid transparent",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <Icon size={15} style={{ color: isActive ? "#38bdf8" : "#94a3b8" }} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Info card */}
          <div
            className={`rounded-xl p-8 flex flex-col gap-5${!tab.highlight ? " card-hover" : ""}`}
            style={{
              backgroundColor: tab.highlight ? "#0f2050" : "#ffffff",
              border: tab.highlight ? "none" : "1px solid #e2e8f0",
            }}
          >
            <h3
              className="font-bold"
              style={{ fontSize: 24, letterSpacing: "-0.5px", color: tab.highlight ? "#ffffff" : "#0f2050" }}
            >
              {tab.headline}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: tab.highlight ? "#94a3b8" : "#475569", fontSize: 15 }}
            >
              {tab.description}
            </p>
            <ul className="flex flex-col gap-2 mt-2">
              {tab.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: tab.highlight ? "#cbd5e1" : "#475569" }}>
                  <ArrowRight size={14} style={{ color: tab.highlight ? "#ffffff" : "#38bdf8", flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Code window — stays dark for terminal aesthetic */}
          <div
            className="rounded-xl overflow-hidden border"
            style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}
          >
            <div
              className="px-4 py-3 border-b flex items-center gap-2"
              style={{ backgroundColor: "#334155", borderColor: "#475569" }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ef4444" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
              <span className="ml-2 text-xs" style={{ color: "#64748b", fontFamily: "var(--font-jetbrains-mono)" }}>
                {tab.id}.conf
              </span>
            </div>
            <pre
              className="p-6 text-xs leading-relaxed overflow-x-auto"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#94a3b8", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {tab.code}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
