import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Help Center — Reborn",
    template: "%s — Reborn Help Center",
  },
  description:
    "Documentação, guias e referências técnicas para operar sua infraestrutura de pagamentos Reborn.",
  metadataBase: new URL("https://reborn.com.br"),
  openGraph: {
    siteName: "Reborn Help Center",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#161419] text-[#f0eff2]">
        {children}
      </body>
    </html>
  );
}
