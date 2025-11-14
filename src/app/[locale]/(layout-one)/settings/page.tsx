import { auth } from "@/auth";
import { ProtectedRoute } from "@/components/protected/protected-route";
import { UserProfileDisplay } from "@/components/settings/user-profile-display";
import { getUserProfile } from "@/data/user";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import React from "react";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import {
  EAV_TWITTER_CREATOR_HANDLE,
  GEO_POSITION,
  WEBSITE_NAME,
} from "@/config/constants";

interface Props {
  params: Promise<{ locale: string }>;
}

const BASE_URL =
  process.env.BASE_URL || "https://www.exclusivealgarvevillas.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get the localized path for the settings page
  const settingsPath = routing.pathnames["/settings"];
  const localizedSettingsPath =
    typeof settingsPath === "string"
      ? settingsPath
      : settingsPath[locale as keyof typeof settingsPath];

  // Build canonical URL for current locale
  const canonicalUrl = `${BASE_URL}/${locale}${localizedSettingsPath}`;

  // Build alternate language URLs
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path =
      typeof settingsPath === "string"
        ? settingsPath
        : settingsPath[loc as keyof typeof settingsPath];

    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });

  // Add x-default using default locale
  const defaultPath =
    typeof settingsPath === "string"
      ? settingsPath
      : settingsPath[routing.defaultLocale as keyof typeof settingsPath];
  languages["x-default"] = `${BASE_URL}/${routing.defaultLocale}${defaultPath}`;

  // ICBM coordinates
  const ICBM = `${GEO_POSITION.lat}, ${GEO_POSITION.lng}`;

  const description =
    "Manage your Exclusive Algarve Villas account settings, update your profile information, adjust notification preferences, and customize your luxury property search experience.";

  const keywords = [
    "account settings",
    "profile management",
    "user preferences",
    "notification settings",
    "account information",
    "profile update",
    "privacy settings",
    "user account management",
  ];

  return {
    title: `Account Settings - Manage Your Profile | ${WEBSITE_NAME}`,
    description: description,
    keywords: keywords,
    openGraph: {
      title: "Account Settings - Exclusive Algarve Villas",
      description: description,
      url: canonicalUrl,
      siteName: WEBSITE_NAME,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/eav-dark-logo`,
          secureUrl: `${BASE_URL}/images/eav-dark-logo`,
          width: 1200,
          height: 630,
          alt: "Account Settings - Exclusive Algarve Villas",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Account Settings - Exclusive Algarve Villas",
      description: description,
      creator: EAV_TWITTER_CREATOR_HANDLE,
    },
    robots: {
      index: false, // Settings pages are private and should not be indexed
      follow: false, // Don't follow links from settings pages
      noarchive: true, // Don't cache this page
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noarchive: true,
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
        "Account management, User settings, Profile preferences, Privacy settings",
      category:
        "Settings, Profile management, User preferences, Account configuration",
      "DC.title":
        "User account settings, Profile management, Account preferences",
    },
  };
}

const SettingsPage = async () => {
  const session = await auth();
  const locale = await getLocale();

  if (!session || !session?.user) {
    return redirect({
      href: { pathname: "/login", query: { callbackUrl: "/settings" } },
      locale: locale,
    });
  }

  const accessToken = session?.accessToken;
  const userProfileResponse = await getUserProfile(accessToken);
  const userProfile = userProfileResponse.data.client;

  return (
    <ProtectedRoute>
      <div className="pt-24 container mx-auto max-w-5xl px-4 min-h-screen flex justify-center">
        <div className="space-y-6 h-fit w-full my-auto">
          <UserProfileDisplay
            userProfile={{
              firstName: userProfile.first_name,
              lastName: userProfile.last_name,
              phoneNumber: userProfile.phone,
              newsletter: userProfile.newsletter,
            }}
            accessToken={accessToken}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SettingsPage;
