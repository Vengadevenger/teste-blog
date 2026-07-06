import Link from "next/link";

/**
 * Home provisória só para este preview.
 * No site real da Cola Bola, esta rota já existe — não substitua o
 * app/page.jsx de produção por este arquivo.
 */
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "#0052CC",
        color: "#fff",
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 32, margin: 0 }}>Cola Bola</h1>
      <p style={{ maxWidth: 480, opacity: 0.85 }}>
        Esta é a home de preview deste projeto de teste. Acesse o blog abaixo.
      </p>
      <Link
        href="/blog"
        style={{
          background: "#FFD700",
          color: "#1a1a1a",
          fontWeight: 700,
          padding: "12px 28px",
          borderRadius: 6,
          textDecoration: "none",
        }}
      >
        Ver Blog →
      </Link>
    </main>
  );
}
