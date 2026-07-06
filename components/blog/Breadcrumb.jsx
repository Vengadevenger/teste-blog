import Link from "next/link";

/**
 * Breadcrumb genérico do blog.
 * items: [{ label: "Blog", href: "/blog" }, { label: "Futebol", href: "/blog?categoria=Futebol" }, { label: "Título do post" }]
 * O último item (sem href) é renderizado como texto simples (página atual).
 */
export default function Breadcrumb({ items }) {
  return (
    <nav className="blog-breadcrumb" aria-label="breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index}>
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
              {!isLast && <span className="blog-breadcrumb-separator">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
