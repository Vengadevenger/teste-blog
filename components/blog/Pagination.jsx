import Link from "next/link";

/**
 * Paginação numerada do blog.
 * `buildHref(page)` recebe o número da página e devolve a URL correta
 * (ex: /blog para a página 1, /blog/page/2 para as demais), preservando
 * os query params ativos (categoria, busca).
 */
export default function Pagination({ currentPage, totalPages, buildHref }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="blog-pagination" aria-label="Paginação do blog">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        className={`blog-pagination-arrow ${currentPage === 1 ? "is-disabled" : ""}`}
        aria-disabled={currentPage === 1}
      >
        ← Anterior
      </Link>

      <div className="blog-pagination-numbers">
        {pages.map((page) => (
          <Link
            key={page}
            href={buildHref(page)}
            className={`blog-pagination-number ${page === currentPage ? "is-active" : ""}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        className={`blog-pagination-arrow ${currentPage === totalPages ? "is-disabled" : ""}`}
        aria-disabled={currentPage === totalPages}
      >
        Próximo →
      </Link>
    </nav>
  );
}
