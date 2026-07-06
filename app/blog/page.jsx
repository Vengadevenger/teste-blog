import { getAllCategories, getPaginatedPosts } from "@/lib/blog-data";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Pagination from "@/components/blog/Pagination";
import Breadcrumb from "@/components/blog/Breadcrumb";

export const metadata = {
  title: "Blog",
  description:
    "Dicas, novidades e conteúdo sobre futebol, vôlei, basquete e manutenção de bolas esportivas. Pelo time da Cola Bola.",
};

/** Monta a URL de uma página de listagem preservando categoria/busca ativas. */
function buildPageHref(page, params) {
  const query = new URLSearchParams(params);
  query.delete("page");
  const queryString = query.toString();
  const base = page <= 1 ? "/blog" : `/blog/page/${page}`;
  return queryString ? `${base}?${queryString}` : base;
}

export default async function BlogListingPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.categoria || null;
  const query = resolvedParams?.q || null;

  const { posts, currentPage, totalPages, totalPosts } = getPaginatedPosts({
    page: 1,
    category,
    query,
  });
  const categories = getAllCategories();

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    ...(category ? [{ label: category }] : []),
  ];

  return (
    <div className="blog-listing">
      <Breadcrumb items={breadcrumbItems} />

      <CategoryFilter categories={categories} activeCategory={category} />

      {totalPosts === 0 ? (
        <p className="blog-empty-state">Nenhum post encontrado. Tente outra categoria ou termo de busca.</p>
      ) : (
        <>
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            buildHref={(page) => buildPageHref(page, resolvedParams)}
          />
        </>
      )}
    </div>
  );
}
