import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CSFloat Scraper",
  description:
    "Website to keep track of your cash trades, find trustworthy users to do transactions with and avoid risky trades by easily checking someone's transaction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="https://csgo-rep.com/favicon.svg" />

      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
