import { getAllPosts, getPaginatedPosts } from "@/lib/blog-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://colabola.com.br";

/** Sitemap automático (Next.js App Router). Inclui listagem paginada + posts individuais. */
export default function sitemap() {
  const posts = getAllPosts();
  const { totalPages } = getPaginatedPosts({ page: 1 });

  const listingEntries = Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1;
    return {
      url: page === 1 ? `${SITE_URL}/blog` : `${SITE_URL}/blog/page/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === 1 ? 0.8 : 0.5,
    };
  });

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...listingEntries, ...postEntries];
}
