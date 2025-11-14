import React from "react";
import { ContactForm } from "@/components/shared/contact-form";
import DiscoverSection from "@/components/home/discover-section";
import { getTranslations } from "next-intl/server";
import { DigitalNomadVisaHeroSection } from "./hero-section";

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

  // Get the localized path for the digital nomad visa page
  const digitalNomadPath = routing.pathnames["/digital-nomad-visa"];
  const localizedDigitalNomadPath =
    typeof digitalNomadPath === "string"
      ? digitalNomadPath
      : digitalNomadPath[locale as keyof typeof digitalNomadPath];

  // Build canonical URL for current locale
  const canonicalUrl = `${BASE_URL}/${locale}${localizedDigitalNomadPath}`;

  // Build alternate language URLs
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path =
      typeof digitalNomadPath === "string"
        ? digitalNomadPath
        : digitalNomadPath[loc as keyof typeof digitalNomadPath];

    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });

  // Add x-default using default locale
  const defaultPath =
    typeof digitalNomadPath === "string"
      ? digitalNomadPath
      : digitalNomadPath[
          routing.defaultLocale as keyof typeof digitalNomadPath
        ];
  languages["x-default"] = `${BASE_URL}/${routing.defaultLocale}${defaultPath}`;

  // ICBM coordinates
  const ICBM = `${GEO_POSITION.lat}, ${GEO_POSITION.lng}`;

  const description =
    "Complete guide to Portugal's Digital Nomad Visa. Learn about requirements, application process, residency benefits, and living in the Algarve as a digital nomad. Remote work in Portugal's Golden Triangle - Vale do Lobo, Quinta do Lago, and Carvoeiro.";

  const keywords = [
    "portugal digital nomad visa",
    "algarve digital nomad",
    "portugal remote work visa",
    "digital nomad portugal requirements",
    "portugal visa for remote workers",
    "algarve remote work",
    "portugal nomad visa application",
    "digital nomad carvoeiro",
    "golden triangle digital nomad",
    "portugal temporary stay visa",
    "algarve expat visa",
    "work remotely portugal",
    "portugal visa non-eu",
    "digital nomad residency portugal",
    "algarve remote workers",
    "portugal visa income requirement",
    "live and work portugal",
    "portugal digital nomad property",
  ];

  return {
    title: `Digital Nomad Visa Portugal - Complete Guide to Remote Work in the Algarve | ${WEBSITE_NAME}`,
    description: description,
    keywords: keywords,
    openGraph: {
      title:
        "Digital Nomad Visa Portugal - Live & Work Remotely in the Algarve",
      description: description,
      url: canonicalUrl,
      siteName: WEBSITE_NAME,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/become-a-vendor/marketing.png`,
          secureUrl: `${BASE_URL}/images/become-a-vendor/marketing.png`,
          width: 1200,
          height: 630,
          alt: "Digital Nomad Visa Portugal - Remote Work in the Algarve",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Digital Nomad Visa Portugal - Live & Work Remotely in the Algarve",
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
        "Digital nomad visa guide, Portugal remote work visa, Algarve digital nomad information, Portugal visa requirements",
      category:
        "Visa information, Immigration guide, Remote work, Digital nomad, Portugal residency, Legal requirements",
      "DC.title":
        "Portugal digital nomad visa guide, Algarve remote work visa, Golden triangle digital nomad, Western Algarve visa information",
    },
  };
}

const DigitalNomadVisaPage = async () => {
  const t = await getTranslations("digitalNomadVisaPage");

  return (
    <>
      <div className="min-h-[500px] h-[50vh] relative mt-20">
        <DigitalNomadVisaHeroSection />
      </div>

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <h2 className="text-2xl font-semibold mb-7">{t("digitalNomadVisa")}</h2>

        <p className="mb-7 text-sm sm:text-base">
          {t("visaDescriptionPart1")}
          <br />
          <br />
          {t("visaDescriptionPart2")}
          <br />
          <br />
          {t("visaDescriptionPart3")}
          <br />
          {t("visaDescriptionPart4")}
        </p>

        <h4 className="font-medium mb-2">{t("applicantsMust")}</h4>
        <ul className="text-neutral-500 list-disc ml-4 mb-7 text-sm sm:text-base">
          <li>{t("applicantMustBeNonEu")}</li>
          <li>{t("applicantIncomeRequirement")}</li>
          <li>{t("applicantEmploymentStatus")}</li>
          <li>{t("applicantResidencyPath")}</li>
        </ul>

        <p className="text-sm font-semibold">{t("lawyerRecommendation")}</p>
      </div>

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="max-w-[800px] mx-auto">
          <ContactForm
            theme="light"
            titleStyling="text-center"
            submitBtnStyling="flex mx-auto"
          />
        </div>
      </div>

      <DiscoverSection />
    </>
  );
};

export default DigitalNomadVisaPage;
