import { hasLocale } from "next-intl";
import type { Metadata } from "next";
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
  locales: React.ReactNode;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return notFound();
    
  }

  setRequestLocale(locale);

  return <>{children}</>;
}
