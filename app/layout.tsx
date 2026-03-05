import type { Metadata } from "next";
import { Creepster, Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-creepster",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Big Dick Energy",
  description:
    "Think you have it? Stop talking. Prove it. Ten thousand clicks.",
  openGraph: {
    title: "Big Dick Energy",
    description:
      "Think you have it? Stop talking. Prove it. Ten thousand clicks.",
    url: "https://bigdickenergys.vercel.app",
    siteName: "Big Dick Energy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Big Dick Energy",
    description:
      "Think you have it? Stop talking. Prove it. Ten thousand clicks.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${creepster.variable} ${spaceMono.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
