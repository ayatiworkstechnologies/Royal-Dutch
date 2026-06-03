import type { Metadata } from "next";
import { Cinzel, Red_Hat_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal Dutch Medical Centre",
  description: "Royal Dutch Medical Centre Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${redHatDisplay.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full w-full flex-col overflow-x-hidden bg-white font-secondary text-[#171717]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}