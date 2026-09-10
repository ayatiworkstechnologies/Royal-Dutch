import type { Metadata } from "next";
import NavigationScrollReset from "@/components/NavigationScrollReset";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AlertProvider } from "@/context/AlertContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${outfit.variable} ${inter.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full w-full flex-col overflow-x-hidden bg-white font-secondary text-[#171717]">
        <NavigationScrollReset />
        <AuthProvider>
          <AlertProvider>
            {children}
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
