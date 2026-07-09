"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLinkItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
];

const datasheets = [
  {
    label: "DAM Datasheet",
    description: "Database Activity Monitoring",
    href: "/docs/datorix_enterprise_datasheet_DAM.pdf",
  },
  {
    label: "Backup & Replication Datasheet",
    description: "Backup and replication capabilities",
    href: "/docs/datorix-backup-replication-datasheet.pdf",
  },
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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 border-b border-border transition-colors duration-200"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-6 h-full flex items-center justify-between",
          scrolled ? "bg-white backdrop-blur-2xl" : ""
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Datorix" height={28} width={188} className="block" unoptimized />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer data-popup-open:text-primary">
              Resources
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {datasheets.map((sheet) => (
                <DropdownMenuLinkItem
                  key={sheet.href}
                  href={sheet.href}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-medium text-primary">{sheet.label}</span>
                  <span className="text-xs text-muted-soft">{sheet.description}</span>
                </DropdownMenuLinkItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#cta"
            className={cn(
              buttonVariants({ variant: "default" }),
              "inline-flex items-center h-10 px-5 rounded-md border-0 text-sm font-semibold bg-primary hover:bg-primary-active text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
            )}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-white border-b border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-body"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-3 border-t border-border">
            <span className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-soft">
              Resources
            </span>
            {datasheets.map((sheet) => (
              <a
                key={sheet.href}
                href={sheet.href}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-body"
              >
                {sheet.label}
              </a>
            ))}
          </div>

          <Link
            href="#cta"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center h-10 rounded-md text-sm font-semibold bg-primary hover:bg-primary-active text-white no-underline transition-all duration-150 active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
