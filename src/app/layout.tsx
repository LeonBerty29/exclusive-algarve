import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/fonts";
import Footer from "@/components/layout/footer";
import StoryblokProvider from "@/components/story-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

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
        <SessionProvider>
          <body className={`${poppins.className} antialiased`}>
            <main className="w-full">{children}</main>

            <Footer />
            <Toaster />
          </body>
        </SessionProvider>
      </html>
    </StoryblokProvider>
  );
}
