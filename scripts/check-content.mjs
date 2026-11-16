// Content gate: run after `npm run build`; reads out/index.html (see spec.md Testing Decisions).
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
// Drop scripts (the Next flight payload duplicates text) but keep JSON-LD.
const page = html.replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/gi, "");

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
const textOf = (fragment) =>
  decode(fragment.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");

const failures = [];
const fail = (msg) => failures.push(msg);

const sectionHtml = (id) => {
  const start = page.search(new RegExp(`<section[^>]*id="${id}"`));
  if (start < 0) return null;
  const next = page.slice(start + 1).search(/<section\b/);
  return page.slice(start, next >= 0 ? start + 1 + next : page.length);
};

// Visible text plus meta/title/JSON-LD, so attributes and CSS cannot trip or hide a match.
const metaText = [
  ...[...page.matchAll(/<meta[^>]+content="([^"]*)"/gi)].map((m) => decode(m[1])),
  ...[...page.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]),
].join(" ");
const scanText = `${textOf(page)} ${metaText}`;

// 1. Removed claims must not appear anywhere.
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
  ["DPI", /\bDPI\b/],
  ["agentless", /\bagentless\b/i],
  ["total control", /total control/i],
  ["version range 11g", /\b11g\b/i],
  ["version range 21c", /\b21c\b/i],
  ["version range 2016", /\b2016\b/],
  ["version range 5.7", /\b5\.7\b/],
  ["version range 12 – 16", /12\s*[–-]\s*16/],
];
for (const [name, re] of forbidden) {
  if (re.test(scanText)) fail(`forbidden claim present: ${name}`);
}
if (/databricks|spark/i.test(metaText)) fail("metadata mentions Databricks or Spark");

// 2. Anchors: required ids exist, every in-page href resolves, every section has an h2.
const ids = ["see", "protect", "data", "audit", "replicate", "backup", "operate", "roadmap", "how-it-works", "use-cases", "cta"];
for (const id of ids) {
  const sec = sectionHtml(id);
  if (sec === null) fail(`missing section id: ${id}`);
  else if (!/<h2[\s>]/.test(sec)) fail(`section #${id} has no <h2>`);
}
for (const m of page.matchAll(/href="#([^"]+)"/g)) {
  if (!new RegExp(`id="${m[1]}"`).test(page)) fail(`href="#${m[1]}" points at no id`);
}

// 3. "Coming soon" only inside #roadmap, at least three times.
const road = sectionHtml("roadmap") ?? "";
const outside = road ? page.replace(road, "") : page;
const count = (s) => (textOf(s).match(/coming soon/gi) ?? []).length;
if (count(outside) > 0) fail(`"Coming soon" appears outside #roadmap (${count(outside)}x)`);
if (count(road) < 3) fail(`#roadmap has ${count(road)} "Coming soon" badges, expected at least 3`);

// 4. Exactly one h1.
const h1 = (page.match(/<h1[\s>]/g) ?? []).length;
if (h1 !== 1) fail(`expected exactly one <h1>, found ${h1}`);

// 5. Datasheet links survive.
for (const href of ["/docs/datorix_enterprise_datasheet_DAM.pdf", "/docs/datorix-backup-replication-datasheet.pdf"]) {
  if (!page.includes(href)) fail(`datasheet link missing: ${href}`);
}

// 6. The md and the page agree on every card (title and body), in both directions.
const md = readFileSync(mdPath, "utf8").split("\n");
const start = md.findIndex((l) => l.startsWith("## Hero"));
const end = md.findIndex((l) => l.startsWith("## Built on proven open technology"));
const cards = new Map(); // title -> body
const blockTitles = new Set();
const body = md.slice(start, end);
for (let i = 0; i < body.length; i++) {
  const line = body[i];
  const block = line.match(/^### (.+?)(\s+\*\*\[Coming soon\]\*\*)?\s*$/);
  if (block) blockTitles.add(block[1].trim());
  const benefit = line.match(/^\|\s*\*\*([^*]+)\*\*\s*\|\s*(.+?)\s*\|\s*$/);
  if (benefit) cards.set(benefit[1].trim(), benefit[2]);
  const card = line.match(/^\*\*([^*\[\]]+)\*\*\s*$/);
  if (card) {
    const next = body.slice(i + 1).find((l) => l.trim() !== "");
    cards.set(card[1].trim(), (next ?? "").replace(/`/g, ""));
  }
}
const headings = new Set(
  [...page.matchAll(/<(h[2-4]|strong)[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => norm(textOf(m[2])))
);
const pageText = norm(textOf(page));
for (const [title, text] of cards) {
  if (!headings.has(norm(title))) fail(`md card title is not a heading on the page: "${title}"`);
  if (!pageText.includes(norm(text))) fail(`md card body missing from page: "${title}"`);
}
if (cards.size < 40) fail(`parsed only ${cards.size} cards from the md; parser or md is broken`);

const featureHtml = ids.slice(0, 8).map((id) => sectionHtml(id) ?? "").join("");
const mdTitles = new Set([...cards.keys(), ...blockTitles].map(norm));
for (const m of featureHtml.matchAll(/<(h3|h4)[^>]*>([\s\S]*?)<\/\1>/g)) {
  const t = norm(textOf(m[2]));
  if (!mdTitles.has(t)) fail(`page card not in the md: "${t}"`);
}

// 7. Stats show their real values in the exported HTML.
const stats = sectionHtml("stats") ?? "";
const statsText = textOf(stats);
for (const v of ["80+", "Linux + Windows"]) {
  if (!statsText.includes(v)) fail(`stats section is missing "${v}"`);
}

if (failures.length) {
  console.error(`content gate: ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`content gate: ok (${cards.size} md cards checked)`);
