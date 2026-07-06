import Image from "next/image";
import Link from "next/link";
import { formatPostDate } from "@/lib/blog-data";

/** Card de post usado na grid de listagem do blog. */
export default function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card-image-link">
        <div className="blog-card-image-wrapper">
          <Image
            src={post.image}
            alt={post.title}
            width={300}
            height={200}
            className="blog-card-image"
            loading="lazy"
            unoptimized={post.image.endsWith(".svg")}
          />
          <span className="blog-card-category">{post.category}</span>
        </div>
      </Link>

      <div className="blog-card-body">
        <p className="blog-card-meta">
          {formatPostDate(post.date)} · {post.readTime} de leitura
        </p>
        <h3 className="blog-card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="blog-card-cta">
          Leia Mais →
        </Link>
      </div>
    </article>
  );
}
