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
  metadataBase: new URL("https://www.kisankhata.co.in"),
  title: "Kisan Khata - Smart Digital Ledger for AP & TS Farmers",
  description: "The #1 digital farm management app for Andhra Pradesh and Telangana farmers. Track labor attendance, manage crop sales, expenses, and get live market prices.",
  keywords: [
    "Kisan Khata", "Kisan Khata App", "KisanKhata", "Agriculture App", "Agriculture App Telugu", 
    "Farm Management App", "Farmer Ledger", "Telugu Farmers", "Andhra Pradesh Agriculture", 
    "Telangana Agriculture", "Crop Sales Tracker", "Farm Accounting", "Farm Expenses", 
    "Agriculture India", "Agri-Tech Startup", "MSME Registered Startup", "Agriculture Internship"
  ],
  openGraph: {
    title: "Kisan Khata - Smart Digital Ledger for AP & TS Farmers",
    description: "The #1 digital farm management app for Andhra Pradesh and Telangana farmers. Track labor attendance, manage crop sales, expenses, and get live market prices.",
    url: "https://www.kisankhata.co.in",
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
    title: "Kisan Khata - Smart Digital Ledger for AP & TS Farmers",
    description: "The #1 digital farm management app for Andhra Pradesh and Telangana farmers. Track labor attendance, manage crop sales, expenses, and get live market prices.",
    images: ["/logo.png"],
  },
  verification: {
    google: "per-evnaX8VqVXKJEWueaIbThnFt_CHuRx1kSPsePIk",
  },
  icons: {
    icon: '/kisan khata fav.png',
    shortcut: '/kisan khata fav.png',
    apple: '/kisan khata fav.png',
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
