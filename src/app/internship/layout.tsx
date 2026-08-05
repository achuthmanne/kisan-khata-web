import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kisan Khata Internship",
  description: "Calling all passionate students! Join the Govt-recognized Kisan Khata internship to make a real impact in your village and earn a verified certificate.",
  openGraph: {
    title: "Kisan Khata Internship",
    description: "Make a real impact in your village. Earn a Govt-recognized certificate with Kisan Khata.",
    url: "https://kisankhata.in/internship",
    siteName: "Kisan Khata",
    images: [
      {
        url: "/form image.png",
        width: 1200,
        height: 630,
        alt: "Kisan Khata Internship",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kisan Khata Internship",
    description: "Make a real impact in your village. Earn a Govt-recognized certificate with Kisan Khata.",
    images: ["/form image.png"],
  },
};

export default function InternshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
