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
  metadataBase: new URL("https://kisankhata.co.in"),
  title: "Kisan Khata - Smart Digital Ledger for Indian Farmers",
  description: "Kisan Khata is a simple digital platform replacing traditional paper notebooks for farmers to track labor, machinery, and crop sales. Manage your farm expenses and income efficiently.",
  keywords: ["Kisan Khata", "Farmer Ledger", "Agriculture App", "Farm Management", "Telugu Farmers", "Crop Sales", "Farm Accounting", "Agriculture India", "KisanKhata App"],
  openGraph: {
    title: "Kisan Khata - Smart Digital Ledger for Farmers",
    description: "Replace traditional paper notebooks with Kisan Khata. Track labor, machinery, and crop sales digitally.",
    url: "https://kisankhata.co.in",
    siteName: "Kisan Khata",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Kisan Khata Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kisan Khata - Smart Digital Ledger",
    description: "Track labor, machinery, and crop sales digitally with Kisan Khata.",
    images: ["/logo.png"],
  },
  verification: {
    google: "per-evnaX8VqVXKJEWueaIbThnFt_CHuRx1kSPsePIk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${poppins.variable} ${notoSansTelugu.variable} antialiased min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
