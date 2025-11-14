import React from "react";
import { getTranslations } from "next-intl/server";

import {
  EAV_TWITTER_CREATOR_HANDLE,
  GEO_POSITION,
  WEBSITE_NAME,
} from "@/config/constants";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

const BASE_URL =
  process.env.BASE_URL || "https://www.exclusivealgarvevillas.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get the localized path for the terms and conditions page
  const termsPath = routing.pathnames["/terms-and-conditions"];
  const localizedTermsPath =
    typeof termsPath === "string"
      ? termsPath
      : termsPath[locale as keyof typeof termsPath];

  // Build canonical URL for current locale
  const canonicalUrl = `${BASE_URL}/${locale}${localizedTermsPath}`;

  // Build alternate language URLs
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path =
      typeof termsPath === "string"
        ? termsPath
        : termsPath[loc as keyof typeof termsPath];

    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });

  // Add x-default using default locale
  const defaultPath =
    typeof termsPath === "string"
      ? termsPath
      : termsPath[routing.defaultLocale as keyof typeof termsPath];
  languages["x-default"] = `${BASE_URL}/${routing.defaultLocale}${defaultPath}`;

  // ICBM coordinates
  const ICBM = `${GEO_POSITION.lat}, ${GEO_POSITION.lng}`;

  const description =
    "Terms and Conditions, Privacy Policy, and legal information for Exclusive Algarve Villas. Learn about our data collection, security practices, cookies policy, and your rights regarding personal information when using our luxury property services.";

  const keywords = [
    "terms and conditions algarve villas",
    "privacy policy portugal property",
    "data protection algarve real estate",
    "legal terms luxury properties",
    "privacy notice property website",
    "cookie policy algarve villas",
    "personal data protection portugal",
    "terms of use property services",
    "GDPR compliance portugal",
    "user rights data protection",
  ];

  return {
    title: `Terms and Conditions - Privacy Policy & Legal Information | ${WEBSITE_NAME}`,
    description: description,
    keywords: keywords,
    openGraph: {
      title: `Terms and Conditions - Privacy Policy | ${WEBSITE_NAME}`,
      description: description,
      url: canonicalUrl,
      siteName: WEBSITE_NAME,
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Terms and Conditions - Privacy Policy | ${WEBSITE_NAME}`,
      description: description,
      creator: EAV_TWITTER_CREATOR_HANDLE,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "standard",
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
        "Legal terms, Privacy policy, Terms of service, Data protection policy",
      category:
        "Legal documentation, Privacy notice, Terms and conditions, User agreement, Data protection, Cookie policy",
      "DC.title":
        "Terms and conditions Exclusive Algarve Villas, Privacy policy luxury property Portugal, Legal terms Algarve real estate services",
      "DC.type": "Text.Legal",
      "article:section": "Legal & Privacy",
    },
  };
}

const page = async () => {
  const t = await getTranslations("termsAndConditionsPage");

  return (
    <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-12 md:py-14 xl:py-20 space-y-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary underline">
        {t("termsAndConditions")}
      </h1>

      <h2 className="text-gray-900">
        <strong>{t("privacy")}</strong>
      </h2>

      <p className="text-gray-700">{t("privacyNoticeIntro1")}</p>

      <p className="text-gray-700">{t("privacyNoticeIntro2")}</p>

      <p className="text-gray-700">{t("choicesRegardingYourData")}</p>

      <p className="text-gray-700">{t("securityProcedures")}</p>

      <p className="text-gray-700">{t("correctInaccuracies")}</p>

      <h2 className="text-gray-900">
        <strong>{t("collectionAndUseOfPersonalInformation")}</strong>
      </h2>

      <p className="text-gray-700">{t("soleOwnersOfInformation")}</p>

      <p className="text-gray-700">{t("noSellingOfInformation")}</p>

      <p className="text-gray-700">{t("useInformationToRespond")}</p>

      <p className="text-gray-700">{t("contactByEmail")}</p>

      <p className="text-gray-700">{t("useAndDisclosureConditions")}</p>

      <p className="text-gray-700">{t("promoteServicesAndProducts")}</p>

      <p className="text-gray-700">{t("sendInformationalContent")}</p>

      <p className="text-gray-700">{t("ensureCompliance")}</p>

      <p className="text-gray-700">{t("complyWithLegalRequirements")}</p>

      <p className="text-gray-700">{t("provideInformationToAdvisors")}</p>

      <p className="text-gray-700">{t("processAndDefendLawsuit")}</p>

      <p className="text-gray-700">&nbsp;</p>

      <p className="text-gray-700">{t("transferInformationOnSale")}</p>

      <p className="text-gray-700">{t("checkDataHeld")}</p>

      <h2 className="text-gray-900">
        <strong>{t("security")}</strong>
      </h2>

      <p className="text-gray-700">{t("securityCommitment")}</p>

      <p className="text-gray-700">{t("bestSecurityPractices")}</p>

      <p className="text-gray-700">{t("internetDataRisk")}</p>

      <h2 className="text-gray-900">
        <strong>{t("accessCorrectionOppositionDeletionOfPersonalData")}</strong>
      </h2>

      <p className="text-gray-700">{t("rightsOfDataSubject")}</p>

      <p className="text-gray-700">{t("requestActionsByEmail")}</p>

      <p className="text-gray-700">{t("effectOfDeletionRequests")}</p>

      <h2 className="text-gray-900">
        <strong>{t("cookies")}</strong>
      </h2>

      <p className="text-gray-700">{t("cookiesStored")}</p>

      <p className="text-gray-700">{t("cookiesUsage")}</p>

      <p className="text-gray-700">{t("cookiesTurningOff")}</p>

      <h2 className="text-gray-900">
        <strong>{t("changesToThisPrivacyPolicy")}</strong>
      </h2>

      <p className="text-gray-700">{t("postingChanges")}</p>

      <p className="text-gray-700">{t("effectivenessOfChanges")}</p>

      <p className="text-gray-700">{t("objectToChangesAdvice")}</p>

      <h2 className="text-gray-900">
        <strong>{t("questionsAndContactInformation")}</strong>
      </h2>

      <p className="text-gray-700">{t("questionsContactInstructions")}</p>
    </div>
  );
};

export default page;
