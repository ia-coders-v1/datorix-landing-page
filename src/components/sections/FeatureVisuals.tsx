import type { ReactNode } from "react";
import { ArrowDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Illustrative console panels with sample data. No <h3>/<h4> here: the content gate treats those as card titles.

const tone = {
  rose: "bg-accent-rose/13 text-accent-rose",
  amber: "bg-amber-500/13 text-amber-500",
  sky: "bg-accent-blue/13 text-accent-blue",
  emerald: "bg-accent-emerald/13 text-accent-emerald",
  slate: "bg-slate-600/60 text-slate-300",
} as const;

type Tone = keyof typeof tone;

function Pill({ tone: t, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={cn("shrink-0 font-semibold px-2 py-0.5 rounded-full text-[11px] whitespace-nowrap", tone[t])}>
      {children}
    </span>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="w-full rounded-xl overflow-hidden border bg-slate-800 border-slate-700 shadow-xl shadow-slate-900/15 font-mono text-xs text-slate-300"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-slate-700 border-slate-600">
        <span className="w-3 h-3 rounded-full bg-accent-rose" />
        <span className="w-3 h-3 rounded-full bg-amber-500" />
        <span className="w-3 h-3 rounded-full bg-accent-emerald" />
        <span className="ml-3 text-slate-400 truncate">datorix — {title}</span>
      </div>
      <div className="p-4 sm:p-5 flex flex-col gap-3">{children}</div>
    </div>
  );
}

function Row({ children, highlight }: { children: ReactNode; highlight?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 min-w-0 rounded-md px-3 py-2 border",
        highlight ? "border-accent-rose/40 bg-accent-rose/8" : "border-slate-700 bg-slate-900/40"
      )}
    >
      {children}
    </div>
  );
}

function Footnote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-3 border-t border-slate-700 text-slate-400">
      <Check size={14} className="shrink-0 text-accent-emerald" />
      <span className="min-w-0">{children}</span>
    </div>
  );
}

function SeeVisual() {
  const rows: { path: string; pathTone: Tone; user: string; query: string; flag?: string }[] = [
    { path: "PROXY", pathTone: "sky", user: "app_user", query: "SELECT * FROM orders WHERE id = ?" },
    { path: "PROXY", pathTone: "sky", user: "report_svc", query: "SELECT region, SUM(total) FROM sales" },
    { path: "SENSOR", pathTone: "amber", user: "dba_admin", query: "SELECT * FROM customers", flag: "BYPASS" },
    { path: "AUDIT", pathTone: "emerald", user: "postgres", query: "ALTER ROLE app_user SUPERUSER", flag: "LOCAL" },
    { path: "PROXY", pathTone: "sky", user: "etl_service", query: "INSERT INTO events VALUES (?, ?)" },
  ];
  return (
    <Panel title="live query stream">
      <div className="flex flex-col gap-1.5">
        {rows.map((r) => (
          <div key={r.query} className="flex items-center gap-3 min-w-0 leading-relaxed">
            <span className="w-[58px] shrink-0">
              <Pill tone={r.pathTone}>{r.path}</Pill>
            </span>
            <span className="hidden sm:block w-[84px] shrink-0 truncate text-accent-blue">{r.user}</span>
            <span className={cn("flex-1 min-w-0 truncate", r.flag ? "text-amber-500" : "text-slate-400")}>{r.query}</span>
            {r.flag && <Pill tone="amber">{r.flag}</Pill>}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-700">
        {[
          ["req/s", "1,240"],
          ["P50", "4 ms"],
          ["P90", "12 ms"],
          ["P99", "38 ms"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md bg-slate-900/40 border border-slate-700 px-2 py-2 text-center">
            <div className="text-[11px] text-slate-500">{k}</div>
            <div className="text-slate-200">{v}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ProtectVisual() {
  const rules: { name: string; action: string; t: Tone; hit?: boolean }[] = [
    { name: "Destructive DDL", action: "BLOCK", t: "rose", hit: true },
    { name: "Bulk export from customer tables", action: "ALERT", t: "amber" },
    { name: "Finance logins after hours", action: "ALERT", t: "amber" },
    { name: "Schema reads", action: "LOG", t: "slate" },
  ];
  return (
    <Panel title="firewall">
      <div className="rounded-md border border-slate-700 bg-slate-900/40 px-3 py-2.5">
        <div className="text-[11px] text-slate-500 mb-1">incoming · admin @ 10.0.4.17</div>
        <div className="text-accent-rose truncate">DROP TABLE sessions; --</div>
      </div>
      <ArrowDown size={14} className="mx-auto text-slate-500" />
      <div className="flex flex-col gap-1.5">
        {rules.map((r) => (
          <Row key={r.name} highlight={r.hit}>
            <span className={cn("flex-1 min-w-0 truncate", r.hit ? "text-slate-100" : "text-slate-400")}>{r.name}</span>
            <Pill tone={r.t}>{r.action}</Pill>
          </Row>
        ))}
      </div>
      <Footnote>Blocked before it ran</Footnote>
    </Panel>
  );
}

function DataVisual() {
  const cols: { name: string; tag?: string; t?: Tone; preview: string }[] = [
    { name: "customers.email", tag: "PII", t: "amber", preview: "a••••@••••.com" },
    { name: "customers.card_number", tag: "Card data", t: "rose", preview: "•••• •••• 4821" },
    { name: "patients.diagnosis", tag: "Health", t: "sky", preview: "9f2c…e1 (hashed)" },
    { name: "orders.total", preview: "149.00" },
  ];
  return (
    <Panel title="catalog">
      <div className="flex flex-col gap-1.5">
        {cols.map((c) => (
          <Row key={c.name}>
            <span className="flex-1 min-w-0 truncate text-slate-200">{c.name}</span>
            {c.tag && c.t && <Pill tone={c.t}>{c.tag}</Pill>}
            <span className="hidden sm:block w-[132px] shrink-0 truncate text-right text-slate-400">{c.preview}</span>
          </Row>
        ))}
      </div>
      <div className="pt-3 border-t border-slate-700">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="truncate text-accent-blue">report_svc</span>
          <span className="shrink-0 text-slate-200">risk 82 / 100</span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
          <div className="h-full w-[82%] rounded-full bg-amber-500" />
        </div>
        <div className="mt-2 text-[11px] text-slate-500">after-hours access · bulk reads on tagged columns</div>
      </div>
    </Panel>
  );
}

function AuditVisual() {
  const fields = [
    ["who", "dba_admin"],
    ["what", "UPDATE accounts SET credit_limit = 90000"],
    ["when", "2026-11-16 09:14:32.502 UTC"],
    ["where", "local session, no network traffic"],
    ["object", "public.accounts"],
    ["decision", "recorded"],
  ];
  return (
    <Panel title="audit record">
      <dl className="flex flex-col gap-1.5">
        {fields.map(([k, v]) => (
          <div key={k} className="flex gap-3 min-w-0 rounded-md border border-slate-700 bg-slate-900/40 px-3 py-2">
            <dt className="w-[64px] shrink-0 text-slate-500">{k}</dt>
            <dd className={cn("flex-1 min-w-0 truncate", k === "where" ? "text-amber-500" : "text-slate-200")}>{v}</dd>
          </div>
        ))}
      </dl>
      <Footnote>Append-only · record verified</Footnote>
    </Panel>
  );
}

function ReplicateVisual() {
  const status = [
    ["Snapshot", "complete"],
    ["Live changes", "streaming"],
    ["Checkpoint", "saved"],
    ["Source vs target", "match"],
    ["Dead-letter queue", "empty"],
  ];
  const node = "flex-1 min-w-0 rounded-md border border-slate-600 bg-slate-900/60 px-2 py-3 text-center";
  const pipe = "relative w-6 sm:w-12 shrink-0 h-px bg-slate-600";
  return (
    <Panel title="replication job">
      <div className="flex items-center">
        <div className={node}>
          <div className="text-[11px] text-slate-500">source</div>
          <div className="truncate text-slate-100">PostgreSQL</div>
        </div>
        <div className={pipe}>
          <span className="flow-dot" />
        </div>
        <div className={cn(node, "border-accent-blue/50")}>
          <div className="text-[11px] text-slate-500">change log</div>
          <div className="truncate text-accent-blue">CDC</div>
        </div>
        <div className={pipe}>
          <span className="flow-dot [animation-delay:0.6s]" />
        </div>
        <div className={node}>
          <div className="text-[11px] text-slate-500">target</div>
          <div className="truncate text-slate-100">ClickHouse</div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {status.map(([k, v]) => (
          <Row key={k}>
            <span className="flex-1 min-w-0 truncate text-slate-400">{k}</span>
            <Pill tone={v === "streaming" ? "sky" : "emerald"}>{v}</Pill>
          </Row>
        ))}
      </div>
    </Panel>
  );
}

function BackupVisual() {
  const snapshots = [
    ["a1b9c3e0", "Mon 02:00", "4.2 GB"],
    ["7d04f2aa", "Sun 02:00", "4.1 GB"],
    ["c93e18b5", "Sat 02:00", "4.1 GB"],
  ];
  return (
    <Panel title="backup plan">
      <div className="rounded-md border border-slate-700 bg-slate-900/40 px-3 py-2.5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-slate-100">nightly-files</span>
          <Pill tone="sky">Daily 02:00</Pill>
        </div>
        <div className="truncate text-slate-400">host · fs-win-01 (Volume Shadow Copy)</div>
        <div className="truncate text-slate-400">repo · s3://backups (encrypted)</div>
      </div>
      <div className="flex flex-col gap-1.5">
        {snapshots.map(([id, when, size]) => (
          <Row key={id}>
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-accent-emerald" />
            <span className="flex-1 min-w-0 truncate text-slate-200">{id}</span>
            <span className="shrink-0 text-slate-400">{when}</span>
            <span className="hidden sm:block w-[52px] shrink-0 text-right text-slate-500">{size}</span>
          </Row>
        ))}
      </div>
      <Footnote>Keep last 7 · 4 weekly · 6 monthly</Footnote>
    </Panel>
  );
}

function OperateVisual() {
  const users: [string, string, Tone][] = [
    ["ops.lead", "Super admin", "rose"],
    ["sec.analyst", "Admin", "sky"],
    ["auditor", "Read-only", "slate"],
  ];
  return (
    <Panel title="users">
      <div className="flex flex-col gap-1.5">
        {users.map(([name, role, t]) => (
          <Row key={name}>
            <span className="w-6 h-6 shrink-0 rounded-full bg-slate-600 text-slate-200 flex items-center justify-center text-[11px] uppercase">
              {name[0]}
            </span>
            <span className="flex-1 min-w-0 truncate text-slate-200">{name}</span>
            <Pill tone={t}>{role}</Pill>
          </Row>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-700">
        {[
          ["sign-in", "Keycloak"],
          ["alerts", "Email · SMS"],
          ["hosting", "Self-hosted"],
        ].map(([k, v]) => (
          <div key={k} className="min-w-0 rounded-md bg-slate-900/40 border border-slate-700 px-2 py-2 text-center">
            <div className="text-[11px] text-slate-500">{k}</div>
            <div className="truncate text-slate-200">{v}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

const visuals: Record<string, () => ReactNode> = {
  see: SeeVisual,
  protect: ProtectVisual,
  data: DataVisual,
  audit: AuditVisual,
  replicate: ReplicateVisual,
  backup: BackupVisual,
  operate: OperateVisual,
};

export default function FeatureVisual({ id }: { id: string }) {
  const Visual = visuals[id];
  return Visual ? <Visual /> : null;
}
