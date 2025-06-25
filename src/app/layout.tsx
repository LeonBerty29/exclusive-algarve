import type { Metadata } from "next";
// import {
//   Geist,
//   Geist_Mono,
// } from "next/font/google";
import "./globals.css";
import { poppins } from "@/fonts";
import Footer from "@/components/layout/footer";
import StoryblokProvider from "@/components/story-provider";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Exclusive Algarve",
  description: "Trusted luxury real estate brokers in Algarve, Portugal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <main className="w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
    </StoryblokProvider>
  );
}
