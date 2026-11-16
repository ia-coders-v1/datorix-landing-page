// Content gate for the built landing page (spec.md "Testing Decisions").
// Run after `npm run build`: it reads out/index.html and fails on removed claims,
// missing anchors, misplaced "Coming soon" badges and md/page drift.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pagePath = join(root, "out", "index.html");
const mdPath = join(root, "Datorix-Website-Features.md");

if (!existsSync(pagePath)) {
  console.error("out/index.html not found. Run `npm run build` first.");
  process.exit(2);
}

const html = readFileSync(pagePath, "utf8");
// Drop scripts (Next flight payload duplicates the text) but keep JSON-LD.
const page = html.replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/gi, "");

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const textOf = (fragment) =>
  decode(fragment.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");

const failures = [];
const fail = (msg) => failures.push(msg);

// 1. Removed claims must not appear anywhere (body, meta, JSON-LD).
const forbidden = [
  ["99.99", /99\.99/],
  ["0 ms latency", /(^|[^\d.])0\s?ms\b/i],
  ["SIEM", /\bSIEM\b/i],
  ["RegTech", /regtech/i],
  ["smart contract", /smart[- ]contract/i],
  ["RMAN", /\bRMAN\b/i],
  ["EDB", /\bEDB\b/i],
  ["quarantine", /quarantin/i],
  ["deep packet", /deep packet/i],
  ["version range 11g", /\b11g\b/i],
  ["version range 21c", /\b21c\b/i],
  ["version range 2016", /\b2016\b/],
  ["version range 5.7", /\b5\.7\b/],
  ["version range 12 – 16", /12\s*[–-]\s*16/],
];
for (const [name, re] of forbidden) {
  if (re.test(page)) fail(`forbidden claim present: ${name}`);
}

// 2. Section anchors.
const ids = ["see", "protect", "data", "audit", "replicate", "backup", "operate", "roadmap", "how-it-works", "use-cases", "cta"];
for (const id of ids) {
  if (!new RegExp(`id="${id}"`).test(page)) fail(`missing anchor id: ${id}`);
}

// 3. "Coming soon" only inside #roadmap, at least three times.
const roadStart = page.search(/<section[^>]*id="roadmap"/);
let inside = "";
let outside = page;
if (roadStart >= 0) {
  const rest = page.slice(roadStart);
  const next = rest.slice(1).search(/<section\b/);
  const roadEnd = next >= 0 ? roadStart + 1 + next : page.length;
  inside = page.slice(roadStart, roadEnd);
  outside = page.slice(0, roadStart) + page.slice(roadEnd);
}
const count = (s) => (textOf(s).match(/coming soon/gi) ?? []).length;
if (count(outside) > 0) fail(`"Coming soon" appears outside #roadmap (${count(outside)}x)`);
if (count(inside) < 3) fail(`#roadmap has ${count(inside)} "Coming soon" badges, expected at least 3`);

// 4. Heading structure.
const h1 = (page.match(/<h1[\s>]/g) ?? []).length;
if (h1 !== 1) fail(`expected exactly one <h1>, found ${h1}`);

// 5. Datasheet links survive.
for (const href of ["/docs/datorix_enterprise_datasheet_DAM.pdf", "/docs/datorix-backup-replication-datasheet.pdf"]) {
  if (!page.includes(href)) fail(`datasheet link missing: ${href}`);
}

// 6. Every card title in the features md appears on the page.
const md = readFileSync(mdPath, "utf8").split("\n");
const start = md.findIndex((l) => l.startsWith("## Hero"));
const end = md.findIndex((l) => l.startsWith("## Built on proven open technology"));
const titles = new Set();
for (const line of md.slice(start, end)) {
  const card = line.match(/^\*\*([^*\[\]]+)\*\*\s*$/);
  if (card) titles.add(card[1].trim());
  const benefit = line.match(/^\|\s*\*\*([^*]+)\*\*\s*\|/);
  if (benefit) titles.add(benefit[1].trim());
}
const pageText = textOf(page).toLowerCase();
for (const t of titles) {
  if (!pageText.includes(t.toLowerCase())) fail(`md card title missing from page: "${t}"`);
}
if (titles.size < 40) fail(`parsed only ${titles.size} titles from the md; parser or md is broken`);

if (failures.length) {
  console.error(`content gate: ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`content gate: ok (${titles.size} md titles checked)`);
