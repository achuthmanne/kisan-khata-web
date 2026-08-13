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
  title: "Kisan Khata - Secure Farm Ledger & Operations",
  description: "Modern digital ledger, smart reminders, machine rentals, and live market prices for progressive farmers in Andhra Pradesh and Telangana.",
  keywords: ["Kisan Khata", "Farmer Ledger", "Agriculture App", "Farm Management", "Telugu Farmers", "Crop Sales", "Farm Accounting", "Agriculture India", "KisanKhata App"],
  openGraph: {
    title: "Kisan Khata - The Future of Farming",
    description: "Your comprehensive digital assistant for farm management. Track attendance, manage expenses, and stay updated with live market prices.",
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
    title: "Kisan Khata - Smart Digital Ledger",
    description: "Track labor, machinery, and crop sales digitally with Kisan Khata.",
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
