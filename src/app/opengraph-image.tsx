import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from "@/lib/site";

// Static at build time (no request-time data) — compatible with output: "export".
export const dynamic = "force-static";
export const alt = "Datorix — Database Activity Monitoring";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori supports flexbox only (no grid). Keep layout simple.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "#faff69",
            }}
          />
          <span style={{ color: "#ffffff", fontSize: "34px", fontWeight: 700 }}>
            {SITE_NAME}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "68px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div style={{ color: "#888888", fontSize: "28px", lineHeight: 1.3 }}>
            {`${SITE_DESCRIPTION.split(".")[0]}.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            color: "#0a0a0a",
            background: "#faff69",
            fontSize: "24px",
            fontWeight: 600,
            padding: "12px 24px",
            borderRadius: "9999px",
          }}
        >
          Database Activity Monitoring
        </div>
      </div>
    ),
    { ...size }
  );
}
