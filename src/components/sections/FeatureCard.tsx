import type { Card } from "@/lib/content";

export default function FeatureCard({ card, as: Heading = "h3" }: { card: Card; as?: "h3" | "h4" }) {
  return (
    <div className="rounded-xl p-8 flex flex-col gap-3 card-hover bg-surface-tonal">
      <Heading className="font-bold text-lg tracking-[-0.3px] text-primary">{card.title}</Heading>
      <p className="text-[15px] leading-relaxed text-muted-foreground">{card.body}</p>
    </div>
  );
}
