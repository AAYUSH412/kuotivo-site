/**
 * The origin this build should call itself.
 *
 * Nothing in the source hardcodes `localhost`, and every internal link is
 * relative, so navigation works on any host without help. The one thing that
 * cannot be relative is the absolute origin baked into `metadataBase`,
 * `canonical`, the OG image URL, `sitemap.xml` and `robots.txt`.
 *
 * Why this is not simply the constant `https://kuotivo.in`:
 *
 *   Vercel gives every branch and every pull request a public preview URL.
 *   With a hardcoded production origin, those previews would advertise
 *   production canonicals, and with `allow: /` in robots they could be crawled
 *   and indexed as duplicates of the real site. Previews therefore describe
 *   themselves and are marked noindex (see app/robots.ts).
 *
 * `VERCEL_ENV` is "production" | "preview" | "development".
 * `VERCEL_PROJECT_PRODUCTION_URL` is the production domain without a scheme.
 * Both are injected by Vercel; neither exists locally, which is the fallback.
 */
const PRODUCTION = "https://kuotivo.in";

export const isProduction = process.env.VERCEL_ENV === "production";

export const siteUrl = (() => {
  if (process.env.VERCEL_ENV === "production") {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : PRODUCTION;
  }
  // Preview builds describe themselves so their OG cards and canonicals are
  // honest about which deployment they came from.
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return PRODUCTION;
})();
