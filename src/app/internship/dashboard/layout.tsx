import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internship Dashboard | Kisan Khata",
  description: "Track your Agri-Tech Field Operations Internship progress. Check your onboarded farmers, AgriConnect usage, and data entry logs in real-time.",
  openGraph: {
    title: "Internship Dashboard | Kisan Khata",
    description: "Track your Agri-Tech Field Operations Internship progress. Check your onboarded farmers, AgriConnect usage, and data entry logs in real-time.",
    url: "https://www.kisankhata.co.in/internship/dashboard",
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
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
