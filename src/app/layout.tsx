import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Footer} from "@/components/Footer/Footer";
import {Bootstrap} from "@/components/Bootstrap/Bootstrap";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/components/Query/QueryClient.hooks";
import styles from "./layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unifi Apps Starter | Unifi Apps",
  description: "Unifi Apps Starter to help your new Unifi App development",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
  openGraph: {
      images:["/opengraph-image"]
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <QueryClientProvider client={queryClient}>
              <Bootstrap className={styles.root}>
                  {children}
                  <Footer className={styles.footer}/>
              </Bootstrap>
          </QueryClientProvider>
      </body>
    </html>
  );
}
