import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/fonts";
import StoryblokProvider from "@/components/story-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import RecaptchaProvider from "@/components/recaptcha-provider";

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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // if (!hasLocale(routing.locales, locale)) {
  //   return notFound();
  // }

  setRequestLocale(locale);

  return (
    <StoryblokProvider>
      <html lang={locale}>
        <SessionProvider>
          <body className={`${poppins.className} antialiased`}>
            <NextIntlClientProvider messages={messages}>
              <RecaptchaProvider>
                <main className="w-full">{children}</main>
                <Toaster />
              </RecaptchaProvider>
            </NextIntlClientProvider>
          </body>
        </SessionProvider>
      </html>
    </StoryblokProvider>
  );
}
