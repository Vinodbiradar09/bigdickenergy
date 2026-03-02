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
  title: "BigDickEnergy — Graveyard of Side Projects",
  description:
    "A sacred burial ground for all the apps and tools that never made it.",
  openGraph: {
    title: "BigDickEnergy — Graveyard of Side Projects",
    description: "Where dreams come to rest in peace.",
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
