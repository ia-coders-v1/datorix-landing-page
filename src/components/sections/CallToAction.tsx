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
    <section id="cta" style={{ backgroundColor: "#0a0a0a", paddingTop: 96, paddingBottom: 96 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div
          className="rounded-xl px-8 py-16 text-center flex flex-col items-center gap-6"
          style={{ backgroundColor: "#faff69" }}
        >
          <p
            className="font-semibold uppercase tracking-widest"
            style={{ color: "#1a1a1a", fontSize: 12, letterSpacing: "1.5px" }}
          >
            Get Started
          </p>

          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              letterSpacing: "-1.5px",
              color: "#0a0a0a",
              maxWidth: 560,
            }}
          >
            Start monitoring your database in minutes.
          </h2>

          <p className="text-base" style={{ color: "#1a1a1a", maxWidth: 440 }}>
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
                className="flex-1"
                style={{
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #0a0a0a",
                  color: "#ffffff",
                  height: 44,
                  borderRadius: 8,
                  fontSize: 14,
                }}
              />
              <Button
                type="submit"
                className="flex items-center gap-2 shrink-0 font-semibold"
                style={{
                  backgroundColor: "#0a0a0a",
                  color: "#faff69",
                  fontWeight: 600,
                  fontSize: 14,
                  height: 44,
                  paddingLeft: 24,
                  paddingRight: 24,
                  borderRadius: 8,
                  border: "none",
                }}
              >
                Get Early Access
                <ArrowRight size={15} />
              </Button>
            </form>
          ) : (
            <div
              className="px-6 py-3 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#0a0a0a", color: "#faff69" }}
            >
              You&apos;re on the list. We&apos;ll be in touch soon.
            </div>
          )}

          <p className="text-xs" style={{ color: "#5a5a5a" }}>
            No credit card required. Free during beta.
          </p>
        </div>
      </div>
    </section>
  );
}
