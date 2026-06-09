import type { Metadata } from "next";
import Script from "next/script";
import { Cinzel, Red_Hat_Display } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

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
        <Script id="scroll-top-before-navigation" strategy="beforeInteractive">
          {`
            if ("scrollRestoration" in history) {
              history.scrollRestoration = "manual";
            }

            function scrollTopInstant() {
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }

            window.addEventListener(
              "click",
              function (event) {
                var target = event.target;
                var link = target && target.closest ? target.closest("a[href]") : null;

                if (!link) return;

                var href = link.getAttribute("href");
                if (!href) return;

                if (
                  href.startsWith("#") ||
                  href.startsWith("mailto:") ||
                  href.startsWith("tel:") ||
                  link.target === "_blank" ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                ) {
                  return;
                }

                var url;

                try {
                  url = new URL(href, window.location.origin);
                } catch (error) {
                  return;
                }

                if (url.origin !== window.location.origin) return;

                var currentPath = window.location.pathname + window.location.search;
                var nextPath = url.pathname + url.search;

                if (currentPath !== nextPath) {
                  scrollTopInstant();
                }
              },
              true
            );

            window.addEventListener("popstate", function () {
              scrollTopInstant();
            });
          `}
        </Script>

        <Header />
        {children}
        <FloatingButtons />
        <Footer />
      </body>
    </html>
  );
}