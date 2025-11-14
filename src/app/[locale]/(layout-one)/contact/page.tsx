import DiscoverSection from "@/components/home/discover-section";
import BookMeeting from "@/components/shared/book-meeting";
import { ContactSection } from "@/components/shared/contact-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";
import { getTranslations } from "next-intl/server";
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

  // Get the localized path for the contact page
  const contactPath = routing.pathnames["/contact"];
  const localizedContactPath =
    typeof contactPath === "string"
      ? contactPath
      : contactPath[locale as keyof typeof contactPath];

  // Build canonical URL for current locale
  const canonicalUrl = `${BASE_URL}/${locale}${localizedContactPath}`;

  // Build alternate language URLs
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path =
      typeof contactPath === "string"
        ? contactPath
        : contactPath[loc as keyof typeof contactPath];

    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });

  // Add x-default using default locale
  const defaultPath =
    typeof contactPath === "string"
      ? contactPath
      : contactPath[routing.defaultLocale as keyof typeof contactPath];
  languages["x-default"] = `${BASE_URL}/${routing.defaultLocale}${defaultPath}`;

  // ICBM coordinates
  const ICBM = `${GEO_POSITION.lat}, ${GEO_POSITION.lng}`;

  const description =
    "Contact Exclusive Algarve Villas - Get in touch with our luxury property experts in the Algarve, Portugal. Book a meeting, request agent partnership, or inquire about luxury villas in Carvoeiro, Vale do Lobo, and Quinta do Lago.";

  const keywords = [
    "real estate agency",
    "marcela boturao",
    "bart van linden",
    "real estate agents algarve",
    "real estate carvoeiro",
    "algarve real estate agency",
    "vilamoura real estate agents",
    "experienced real estate agency to sell luxury house",
    "contact algarve villas",
    "luxury property contact portugal",
    "algarve real estate inquiry",
    "book meeting property algarve",
    "contact property agent algarve",
    "luxury villa inquiry portugal",
    "carvoeiro property contact",
    "golden triangle real estate contact",
    "vale do lobo property inquiry",
    "quinta do lago villa contact",
    "algarve property consultation",
    "portugal luxury real estate contact",
    "agent partnership algarve",
    "property expert contact portugal",
  ];

  return {
    title: `Contact - Exclusive Algarve Villas Luxury real estate agency | ${WEBSITE_NAME}`,
    description: description,
    keywords: keywords,
    openGraph: {
      title:
        "Contact - Exclusive Algarve Villas Luxury real estate agency",
      description: description,
      url: canonicalUrl,
      siteName: WEBSITE_NAME,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/about/about-img-2.png`,
          secureUrl: `${BASE_URL}/images/about/about-img-2.png`,
          width: 1200,
          height: 630,
          alt: "Contact Exclusive Algarve Villas - Property Consultation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Contact Exclusive Algarve Villas - Luxury Property Experts in Portugal",
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
        "Contact information, Luxury property inquiry, Algarve real estate consultation, Property expert contact",
      category:
        "Contact page, Property consultation, Real estate inquiry, Agent partnership, Customer service",
      "DC.title":
        "Contact Algarve property experts, Luxury villa inquiry Portugal, Golden triangle real estate consultation, Western Algarve property contact",
    },
  };
}

const ContactPage = async () => {
  const t = await getTranslations("contactPage");

  return (
    <>
      <div className="pt-24">
        <ContactSection
          title={t("contactUs")}
          imageSrc=""
          theme="light"
          formTitle={false}
        />
      </div>

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full md:w-[47%] 2xl:w-[44%]">
            <h1 className="text-2xl font-semibold mb-6">
              {t("bookAMeetingWithUs")}
            </h1>
            <p className="text-neutral-700 text-sm xl:text-base mb-7">
              {t("exclusiveAlgarveVillasDescription")}
            </p>

            <BookMeeting
              buttonStyle={
                "bg-primary border-primary text-white hover:bg-black hover:text-white transition-colors"
              }
            />
          </div>

          <Image
            priority
            src="/images/book-a-meeting.png"
            width={450}
            height={450}
            alt="about-us"
            className="object-cover w-full h-72 md:w-[50%] lg:w-[47%] 2xl:w-[44%] xl:h-[390px] md:h-auto"
          />
        </div>
      </div>

      <section className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="flex flex-col items-center gap-3">
          <h4 className="uppercase font-bold text-2xl text-center text-primary">
            {t("requestAnAgentPartnership")}
          </h4>
          <Button
            asChild
            className="bg-black hover:bg-black/90 px-8 text-white transition-colors"
          >
            <Link href="/agent">{t("request")}</Link>
          </Button>
        </div>
      </section>

      <DiscoverSection />
    </>
  );
};

export default ContactPage;
