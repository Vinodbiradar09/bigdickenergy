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

const faviconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
  <rect width='32' height='32' rx='7' fill='%23111111'/>
  <rect x='0.5' y='0.5' width='31' height='31' rx='6.5' stroke='rgba(255,255,255,0.12)' stroke-width='1' fill='none'/>
  <circle cx='16' cy='16' r='10' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'/>
  <polygon points='16,9 17.5,14 22.5,14 18.5,17 20,22 16,19 12,22 13.5,17 9.5,14 14.5,14' fill='white'/>
</svg>`;

const faviconHref = `data:image/svg+xml,${faviconSvg}`;

export const metadata: Metadata = {
  title: "Big Dick Energy",
  description:
    "Think you have it? Stop talking. Prove it. Ten thousand clicks.",
  icons: {
    icon: faviconHref,
    shortcut: faviconHref,
  },
  openGraph: {
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
      <head>
        <link rel="icon" href={faviconHref} />
      </head>
      <body
        className={`${creepster.variable} ${spaceMono.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
