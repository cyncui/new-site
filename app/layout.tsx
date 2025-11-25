import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn, antialiased } from "@/lib/classNames";

const neueHaasUnicaPro = localFont({
  src: "../public/fonts/NeueHaasUnicaPro.woff2",
  variable: "--font-neue-haas-unica-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cynthia Cui",
  description: "Design Director @ Asian-Indigenous Relations Collective",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          antialiased,
          neueHaasUnicaPro.variable,
          neueHaasUnicaPro.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
