"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "#ffffff",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Datorix" height={28} width={188} style={{ display: "block" }} unoptimized />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-[#0f2050]"
              style={{ color: "#64748b", fontSize: 14, fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#cta"
            className={cn(buttonVariants({ variant: "default" }), "text-sm font-semibold bg-[#0f2050] hover:bg-[#0a1838] text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]")}
            style={{
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
          style={{ color: "#0f2050" }}
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
          style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
              style={{ color: "#475569" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#cta"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center text-sm font-semibold bg-[#0f2050] hover:bg-[#0a1838] text-white transition-all duration-150 active:scale-[0.98]"
            style={{
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
