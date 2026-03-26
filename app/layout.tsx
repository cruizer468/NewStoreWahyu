import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Store",
  description: "Template toko digital dengan Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}