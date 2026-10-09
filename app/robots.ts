import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/site-url";

/**
 * Answer engines are allowed in on purpose. A buyer asking an assistant
 * "software to quote aluminium windows in India" is exactly the search this
 * product should be found in, so GPTBot, ClaudeBot and PerplexityBot are not
 * blocked: `llms.txt` is written for them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    // Preview deployments are public URLs. Crawling them would create
    // duplicates of the real site, so only production invites crawlers.
    rules: isProduction
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
