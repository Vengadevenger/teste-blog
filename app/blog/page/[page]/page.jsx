import { notFound, redirect } from "next/navigation";
import { getAllCategories, getPaginatedPosts } from "@/lib/blog-data";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Pagination from "@/components/blog/Pagination";
import Breadcrumb from "@/components/blog/Breadcrumb";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `Blog — Página ${resolvedParams.page}`,
    description: "Dicas, novidades e conteúdo sobre futebol, vôlei, basquete e manutenção de bolas esportivas.",
  };
}

function buildPageHref(page, params) {
  const query = new URLSearchParams(params);
  query.delete("page");
  const queryString = query.toString();
  const base = page <= 1 ? "/blog" : `/blog/page/${page}`;
  return queryString ? `${base}?${queryString}` : base;
}

export default async function BlogPaginatedPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const pageNumber = Number(resolvedParams.page);
  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    notFound();
  }
  if (pageNumber === 1) {
    redirect("/blog");
  }

  const category = resolvedSearchParams?.categoria || null;
  const query = resolvedSearchParams?.q || null;

  const { posts, currentPage, totalPages, totalPosts } = getPaginatedPosts({
    page: pageNumber,
    category,
    query,
  });

  if (pageNumber > totalPages) {
    notFound();
  }

  const categories = getAllCategories();
  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    ...(category ? [{ label: category }] : []),
    { label: `Página ${currentPage}` },
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
            buildHref={(page) => buildPageHref(page, resolvedSearchParams)}
          />
        </>
      )}
    </div>
  );
}
