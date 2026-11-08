import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RIDWANULLAHI CERTIFIED AGENT | Real Estate & Student Hostels in Ilorin",
  description:
    "Balogun Ridwan Babatunde — Certified Real Estate Agent in Eleko, Ilorin, Kwara State. Verified student hostels near Kwara State Polytechnic & UNILORIN, houses for sale, dry lands, and commercial shops. Real Estate. Real People. Real Results.",
  keywords: [
    "RIDWANULLAHI CERTIFIED AGENT",
    "Balogun Ridwan Babatunde",
    "Real Estate Agent Ilorin",
    "Student Hostels in Ilorin",
    "Kwara State Polytechnic Hostels",
    "Poly Gate Hostels",
    "Houses for sale in Ilorin",
    "Lands for sale in Ilorin",
    "Eleko Ilorin Real Estate",
    "Shops for rent Ganmo Ilorin",
    "Oke Ose Accommodation",
  ],
  authors: [{ name: "Balogun Ridwan Babatunde" }],
  openGraph: {
    title: "RIDWANULLAHI CERTIFIED AGENT | Real Estate & Student Hostels in Ilorin",
    description: "Your Dream Home Is Our Priority. Verified properties and live student accommodation in Ilorin, Kwara State.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
