import Link from "next/link";
import "@/styles/blog.css";
import { getAllCategories } from "@/lib/blog-data";
import BlogSidebar from "@/components/blog/BlogSidebar";

export const metadata = {
  title: {
    default: "Blog Cola Bola — Dicas para Cuidar do Seu Equipamento Esportivo",
    template: "%s | Blog Cola Bola",
  },
  description:
    "Dicas, novidades e conteúdo sobre futebol, vôlei, basquete e manutenção de bolas esportivas. Pelo time da Cola Bola.",
};

/**
 * Layout compartilhado de toda a seção /blog.
 * Traz o cabeçalho da marca e a sidebar de categorias (filtro), presentes
 * tanto na listagem quanto nos posts individuais. O breadcrumb específico
 * de cada página é renderizado dentro da própria página (varia por rota).
 */
export default function BlogLayout({ children }) {
  const categories = getAllCategories();

  return (
    <div className="blog-section">
      <header className="blog-top-header">
        <div className="blog-top-header-inner">
          <Link href="/" className="blog-brand">
            Cola Bola
          </Link>
          <div>
            <h1 className="blog-top-header-title">Blog Cola Bola</h1>
            <p className="blog-top-header-subtitle">
              Conserto, manutenção e conteúdo para quem não quer parar de jogar
            </p>
          </div>
        </div>
      </header>

      <div className="blog-layout-body">
        <BlogSidebar categories={categories} />
        <main className="blog-layout-main">{children}</main>
      </div>
    </div>
  );
}
