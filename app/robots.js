const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://colabola.com.br";

/** robots.txt automático (Next.js App Router). */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
