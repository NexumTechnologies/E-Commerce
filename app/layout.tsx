import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TradeHub - Multi-Vendor B2B Marketplace | Connect with Global Suppliers",
  description: "Source products from verified vendors worldwide. Build your business with our trusted multi-vendor B2B marketplace platform connecting buyers and sellers globally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ConditionalHeader />
        {children}
      </body>
    </html>
  );
}
