import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wayyy Store",
  description: "Premium Digital Store like a pikachu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#E9E2C7] text-black">
        {children}
      </body>
    </html>
  );
}