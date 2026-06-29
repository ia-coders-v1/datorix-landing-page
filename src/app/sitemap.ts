import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // Trailing slash matches next.config `trailingSlash: true`.
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-06-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
