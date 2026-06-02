"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
      style={{
        height: 64,
        backgroundColor: scrolled ? "rgba(10,10,10,0.95)" : "#0a0a0a",
        borderBottom: scrolled ? "1px solid #2a2a2a" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Shield size={22} style={{ color: "#faff69" }} />
          <span
            className="font-bold text-base"
            style={{ color: "#ffffff", letterSpacing: "-0.3px" }}
          >
            Datorix
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#888888", fontSize: 14, fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#cta"
            className="text-sm font-medium transition-colors hover:text-white"
            style={{ color: "#888888", fontSize: 14, fontWeight: 500 }}
          >
            Sign in
          </Link>
          <Link
            href="#cta"
            className={cn(buttonVariants({ variant: "default" }), "text-sm font-semibold")}
            style={{
              backgroundColor: "#faff69",
              color: "#0a0a0a",
              fontWeight: 600,
              fontSize: 14,
              height: 40,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 8,
              border: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          style={{ color: "#ffffff" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ backgroundColor: "#0a0a0a", borderBottom: "1px solid #2a2a2a" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
              style={{ color: "#cccccc" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#cta"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center text-sm font-semibold"
            style={{
              backgroundColor: "#faff69",
              color: "#0a0a0a",
              fontWeight: 600,
              fontSize: 14,
              height: 40,
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
