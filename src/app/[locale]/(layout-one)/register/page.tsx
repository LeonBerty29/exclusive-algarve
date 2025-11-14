import { RegisterForm } from "@/components/auth/register-form";
import React from "react";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { EAV_TWITTER_CREATOR_HANDLE, GEO_POSITION, WEBSITE_NAME } from "@/config/constants";

interface SearchParams {
  callbackUrl: string;
}

interface RegisterPageProps {
  searchParams: Promise<SearchParams>;
  params: Promise<{ locale: string }>;
}

const BASE_URL =
  process.env.BASE_URL || "https://www.exclusivealgarvevillas.com";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Get the localized path for the register page
  const registerPath = routing.pathnames["/register"];
  const localizedRegisterPath =
    typeof registerPath === "string"
      ? registerPath
      : registerPath[locale as keyof typeof registerPath];

  // Build canonical URL for current locale
  const canonicalUrl = `${BASE_URL}/${locale}${localizedRegisterPath}`;

  // Build alternate language URLs
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path =
      typeof registerPath === "string"
        ? registerPath
        : registerPath[loc as keyof typeof registerPath];

    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });

  // Add x-default using default locale
  const defaultPath =
    typeof registerPath === "string"
      ? registerPath
      : registerPath[routing.defaultLocale as keyof typeof registerPath];
  languages["x-default"] = `${BASE_URL}/${routing.defaultLocale}${defaultPath}`;

  // ICBM coordinates
  const ICBM = `${GEO_POSITION.lat}, ${GEO_POSITION.lng}`;

  const description =
    "Create your Exclusive Algarve Villas account to save favorite properties, receive personalized property alerts, track inquiries, and get exclusive access to luxury real estate listings in the Algarve.";

  const keywords = [
    "exclusive algarve villas register",
    "create account algarve properties",
    "sign up luxury properties",
    "property alerts registration",
    "algarve real estate account",
    "client registration portal",
    "property buyer registration",
    "luxury villa account creation",
    "real estate client signup",
    "save favorite properties algarve",
  ];

  return {
    title: `Register - Create Your Account | ${WEBSITE_NAME}`,
    description: description,
    keywords: keywords,
    openGraph: {
      title: "Create Your Exclusive Algarve Villas Account",
      description: description,
      url: canonicalUrl,
      siteName: WEBSITE_NAME,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/eav-dark-logo.png`,
          secureUrl: `${BASE_URL}/images/eav-dark-logo.png`,
          width: 1200,
          height: 630,
          alt: "Register - Create Your Exclusive Algarve Villas Account",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Create Your Exclusive Algarve Villas Account",
      description: description,
      creator: EAV_TWITTER_CREATOR_HANDLE,
    },
    robots: {
      index: false, // Registration pages should not be indexed
      follow: true,
      nocache: true,
      googleBot: {
        index: false,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    other: {
      "geo.region": "PT",
      "geo.position": `${GEO_POSITION.lat};${GEO_POSITION.lng}`,
      ICBM: ICBM,
      classification:
        "Account creation, User registration, Client signup, Property portal access",
      category: "Registration, Account signup, Client onboarding, User access",
      "DC.title":
        "Exclusive Algarve Villas registration, Create property account, Luxury real estate signup",
    },
  };
}

const RegisterPage = async ({ searchParams }: RegisterPageProps) => {
  const searchParamsData = await searchParams;
  const callbackUrl = searchParamsData.callbackUrl;

  return (
    <div className="flex items-center justify-center min-h-screen pt-24 pb-8">
      <RegisterForm callbackUrl={callbackUrl} />
    </div>
  );
};

export default RegisterPage;
