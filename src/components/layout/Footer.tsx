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
    { label: "Datasheet (PDF)", href: "/docs/datorix_enterprise_datasheet_DAM.pdf", download: true },
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
    <footer style={{ backgroundColor: "#f1f5f9", borderTop: "1px solid #e2e8f0", paddingTop: 64, paddingBottom: 64 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          {/* Brand + contact */}
          <div className="col-span-2">
            <div className="mb-4">
              <Image src="/logo.png" alt="Datorix" height={28} width={188} style={{ display: "block" }} unoptimized />
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748b", maxWidth: 220 }}>
              Passive, agentless Database Activity Monitoring. Complete visibility. Total control.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:info@datorix.ai"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[#0f2050]"
                style={{ color: "#64748b" }}
              >
                <Mail size={13} />
                info@datorix.ai
              </a>
              <a
                href="https://www.datorix.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[#0f2050]"
                style={{ color: "#64748b" }}
              >
                <ExternalLink size={13} />
                www.datorix.ai
              </a>
              <div className="flex items-start gap-2 text-sm" style={{ color: "#94a3b8" }}>
                <MapPin size={13} className="mt-0.5 shrink-0" />
                <span style={{ fontSize: 12 }}>
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
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#94a3b8", letterSpacing: "1.5px" }}
              >
                {group}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-[#0f2050]"
                      style={{ color: "#64748b" }}
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
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #e2e8f0" }}
        >
          <p className="text-sm" style={{ color: "#94a3b8" }}>
            © {new Date().getFullYear()} Datorix Sdn Bhd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="X (Twitter)" className="transition-colors hover:text-[#0f2050]" style={{ color: "#94a3b8" }}>
              <X size={18} />
            </Link>
            <Link href="#" aria-label="Website" className="transition-colors hover:text-[#0f2050]" style={{ color: "#94a3b8" }}>
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
