import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every canonical tag, the sitemap, and all internal links use trailing
  // slashes (e.g. "/about/") — without this, Next serves the non-slash URL
  // as canonical and 308s the trailing-slash version away, contradicting
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      // The three age-specific schedule pages were merged into one page —
      // see content/puppy-schedule/by-age.mdx.
      {
        source: "/puppy-schedule/8-week-old",
        destination: "/puppy-schedule/by-age/",
        permanent: true,
      },
      {
        source: "/puppy-schedule/10-week-old",
        destination: "/puppy-schedule/by-age/",
        permanent: true,
      },
      {
        source: "/puppy-schedule/12-week-old",
        destination: "/puppy-schedule/by-age/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
