"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="cta" className="bg-background pt-24 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="rounded-xl px-8 py-16 text-center flex flex-col items-center gap-6 bg-primary">
          <p className="font-semibold uppercase tracking-[1.5px] text-xs text-muted-soft">
            Get Started
          </p>

          <h2 className="font-bold text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-white max-w-[560px]">
            Start monitoring your database in minutes.
          </h2>

          <p className="text-base text-muted-soft max-w-[440px]">
            No agents. No schema changes. Deploy Guardian Proxy or Watcher Sniffer and see your first query log in under 5 minutes.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-11 rounded-md text-sm bg-slate-800 border border-slate-800 text-white"
              />
              <Button
                type="submit"
                className="flex items-center gap-2 shrink-0 font-semibold h-11 px-6 rounded-md border-0 text-sm bg-accent-blue hover:bg-sky-500 text-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
              >
                Get Early Access
                <ArrowRight size={15} />
              </Button>
            </form>
          ) : (
            <div className="px-6 py-3 rounded-lg text-sm font-medium bg-slate-800 text-accent-blue">
              You&apos;re on the list. We&apos;ll be in touch soon.
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            No credit card required. Free during beta.
          </p>
        </div>
      </div>
    </section>
  );
}
