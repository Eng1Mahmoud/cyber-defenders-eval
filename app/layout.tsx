import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CyberDefenders Certification Roadmap",
  description:
    "Interactive chart visualizing cybersecurity certifications based on community ratings, market presence, and satisfaction scores.",
  keywords: [
    "cybersecurity",
    "certifications",
    "OSCP",
    "CISSP",
    "CEH",
    "blue team",
    "red team",
    "infosec",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
