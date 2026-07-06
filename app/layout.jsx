export const metadata = {
  title: "Cola Bola",
  description: "Cola selante para consertar bolas esportivas em casa em menos de 2 minutos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "Roboto, Arial, sans-serif" }}>{children}</body>
    </html>
  );
}
