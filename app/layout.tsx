import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./Frontend/components/Myui/Themeprovider";
import { Toaster } from "sonner";

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
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
