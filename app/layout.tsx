import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const displayFont = Bebas_Neue({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Inter({
  variable: "--font-body-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Watch Waitlist",
  description:
    "Join the waitlist for Weather Watch and get launch updates before the app goes live.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
