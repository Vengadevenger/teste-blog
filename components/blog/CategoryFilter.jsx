"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

/**
 * Filtro por categoria + busca do blog.
 * Client component: navega via query string para manter o SSR da listagem
 * (a página de listagem é quem realmente filtra os posts no servidor).
 */
export default function CategoryFilter({ categories, activeCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  function goToCategory(categoryName) {
    const params = new URLSearchParams(searchParams.toString());
    if (!categoryName || categoryName === "Todas") {
      params.delete("categoria");
    } else {
      params.set("categoria", categoryName);
    }
    params.delete("page");
    router.push(`/blog${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    router.push(`/blog${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="blog-filter">
      <div className="blog-filter-categories">
        <button
          type="button"
          className={`blog-filter-btn ${!activeCategory ? "is-active" : ""}`}
          onClick={() => goToCategory(null)}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            className={`blog-filter-btn ${activeCategory === category.name ? "is-active" : ""}`}
            onClick={() => goToCategory(category.name)}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      <form className="blog-search" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          name="q"
          placeholder="Buscar no blog..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="blog-search-input"
          aria-label="Buscar posts do blog"
        />
        <button type="submit" className="blog-search-btn">
          Buscar
        </button>
      </form>
    </div>
  );
}
