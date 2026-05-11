import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "TradeDesk - Professional Trading Platform",
  description: "Professional stock trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-text-primary antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
