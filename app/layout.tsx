import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ledgerly",
  description:
    "Ledgerly is a modern expense tracking web application built with Next.js, TypeScript, Prisma, and PostgreSQL. Manage your income, expenses, categories, and financial insights with a secure and scalable full-stack architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
