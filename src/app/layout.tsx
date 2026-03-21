import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import clsx from "clsx";
import Providers from "./providers";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Github Issues",
  description: "Track your Github issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          dmSerifDisplay.variable,
          inter.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
