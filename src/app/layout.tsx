import type { Metadata } from "next";
import { Poppins, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const notoSansTelugu = Noto_Sans_Telugu({
  variable: "--font-noto-sans-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kisan Khata - Smart Digital Ledger for Farmers",
  description: "Kisan Khata is a simple digital platform replacing traditional paper notebooks for farmers to track labor, machinery, and crop sales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${notoSansTelugu.variable} antialiased min-h-screen bg-white text-gray-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
