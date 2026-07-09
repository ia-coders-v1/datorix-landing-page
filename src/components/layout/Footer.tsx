import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, X, ExternalLink } from "lucide-react";

type FooterLink = { label: string; href: string; download?: boolean };

const footerLinks: Record<string, FooterLink[]> = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Use Cases", href: "#use-cases" },
  ],
  Resources: [
    { label: "DAM Datasheet", href: "/docs/datorix_enterprise_datasheet_DAM.pdf", download: true },
    { label: "Backup & Replication Datasheet", href: "/docs/datorix-backup-replication-datasheet.pdf", download: true },
    { label: "API Reference", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border pt-16 pb-16">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          {/* Brand + contact */}
          <div className="col-span-2">
            <div className="mb-4">
              <Image src="/logo.png" alt="Datorix" height={28} width={188} className="block" unoptimized />
            </div>
            <p className="text-sm leading-relaxed mb-4 text-muted-foreground max-w-[220px]">
              Passive, agentless Database Activity Monitoring. Complete visibility. Total control.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:info@datorix.ai"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail size={13} />
                info@datorix.ai
              </a>
              <a
                href="https://www.datorix.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ExternalLink size={13} />
                www.datorix.ai
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-soft">
                <MapPin size={13} className="mt-0.5 shrink-0" />
                <span className="text-xs">
                  25 Lingkaran Syed Putra,<br />
                  Mid Valley City, 59200<br />
                  Kuala Lumpur, Malaysia
                </span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-[1.5px] mb-4 text-muted-soft">
                {group}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      {...(link.download
                        ? { download: true, target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-soft">
            © {new Date().getFullYear()} Datorix Sdn Bhd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="X (Twitter)" className="text-muted-soft transition-colors hover:text-primary">
              <X size={18} />
            </Link>
            <Link href="#" aria-label="Website" className="text-muted-soft transition-colors hover:text-primary">
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
