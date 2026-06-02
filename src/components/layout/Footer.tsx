import Link from "next/link";
import { Shield, Mail, MapPin, X, ExternalLink } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Use Cases", href: "#use-cases" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
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
    <footer style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #2a2a2a", paddingTop: 64, paddingBottom: 64 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          {/* Brand + contact */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} style={{ color: "#faff69" }} />
              <span className="font-bold text-sm" style={{ color: "#ffffff", letterSpacing: "-0.3px" }}>
                Datorix
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#888888", maxWidth: 220 }}>
              Passive, agentless Database Activity Monitoring. Complete visibility. Total control.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:info@datorix.com"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: "#888888" }}
              >
                <Mail size={13} />
                info@datorix.com
              </a>
              <a
                href="https://www.datorix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: "#888888" }}
              >
                <ExternalLink size={13} />
                www.datorix.com
              </a>
              <div className="flex items-start gap-2 text-sm" style={{ color: "#5a5a5a" }}>
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
                style={{ color: "#5a5a5a", letterSpacing: "1.5px" }}
              >
                {group}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "#888888" }}
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
          style={{ borderTop: "1px solid #2a2a2a" }}
        >
          <p className="text-sm" style={{ color: "#5a5a5a" }}>
            © {new Date().getFullYear()} Datorix Sdn Bhd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="X (Twitter)" className="transition-colors hover:text-white" style={{ color: "#5a5a5a" }}>
              <X size={18} />
            </Link>
            <Link href="#" aria-label="Website" className="transition-colors hover:text-white" style={{ color: "#5a5a5a" }}>
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
