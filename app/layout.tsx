import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wayyy Store",
  description: "Premium Digital Store like a pikachu",
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