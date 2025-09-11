import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/fonts";
import Footer from "@/components/layout/footer";
import StoryblokProvider from "@/components/story-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Exclusive Algarve",
  description: "Trusted luxury real estate brokers in Algarve, Portugal",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return notFound();
  }

  setRequestLocale(locale)

  return (
    <StoryblokProvider>
      <html lang="en">
        <SessionProvider>
          <body className={`${poppins.className} antialiased`}>
            <NextIntlClientProvider>
              <main className="w-full">{children}</main>

              <Footer />
              <Toaster />
            </NextIntlClientProvider>
          </body>
        </SessionProvider>
      </html>
    </StoryblokProvider>
  );
}
