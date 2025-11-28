import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn, antialiased } from "@/lib/classNames";

const neueHaasUnicaPro = localFont({
  src: "../public/fonts/NeueHaasUnicaPro.woff2",
  variable: "--font-neue-haas-unica-pro",
  display: "swap",
});

const artCompany = localFont({
  src: "../public/fonts/ArtCompanyMonoTest-Regular.woff",
  variable: "--font-art-company",
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
    <html lang="en" className="h-full">
      <body
        className={cn(
          antialiased,
          neueHaasUnicaPro.variable,
          neueHaasUnicaPro.className,
          artCompany.variable,
          "h-full"
        )}
      >
        {children}
      </body>
    </html>
  );
}
