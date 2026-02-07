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
import { contactMetadata } from "@/seo-metadata/contact";
import { MapPin, Phone, Smartphone, Mail } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

const BASE_URL =
  process.env.BASE_URL || "https://www.exclusivealgarvevillas.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get localized metadata
  const metadata =
    contactMetadata[locale as keyof typeof contactMetadata] ||
    contactMetadata.en;

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

  return {
    title: `${metadata.title} | ${WEBSITE_NAME}`,
    description: metadata.description,
    keywords: [...metadata.keywords],
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
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
          alt: `${metadata.title} - ${WEBSITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.ogTitle,
      description: metadata.ogDescription,
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
      classification: metadata.classification,
      category: metadata.category,
      "DC.title": metadata.dcTitle,
    },
  };
}

const ContactPage = async () => {
  const t = await getTranslations("contactPage");

  const offices = [
    {
      name: t("vilamouraOffice"),
      address: t("vilamouraAddress"),
      mapUrl: "https://maps.google.com/?q=Avenida+Tivoli+Conjunto+VarandaMar+B+Bloco+3+8125-410+Vilamoura",
      findText: t("findVilamouraOffice"),
    },
    {
      name: t("lagoaOffice"),
      address: t("lagoaAddress"),
      mapUrl: "https://maps.google.com/?q=Rua+Ernesto+Cabrita+Edificio+Vales+Loja+A+8400+387+Lagoa+Algarve+Portugal",
      findText: t("findLagoaOffice"),
    },
    {
      name: t("lagosOffice"),
      address: t("lagosAddress"),
      mapUrl: "https://maps.google.com/?q=R.+Dr.+José+Francisco+Tello+Queiroz+Lote+3+Loja+R+8600-707+Lagos",
      findText: t("findLagosOffice"),
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: t("telephone"),
      value: "+351 282 353 019",
      link: "tel:+351282353019",
      description: t("localCallLandline"),
    },
    {
      icon: Smartphone,
      label: t("mobile"),
      value: "+351 918 024 082",
      link: "tel:+351918024082",
      description: t("localCallMobile"),
    },
    {
      icon: Mail,
      label: t("email"),
      value: "info@exclusivealgarvevillas.com",
      link: "mailto:info@exclusivealgarvevillas.com",
      description: "",
    },
  ];

  const galleryImages = [
    {
      src: "/images/office/1.jpg",
    },
    {
      src: "/images/office/2.jpg",
    },
    {
      src: "/images/office/3.jpg",
    },
    {
      src: "/images/office/4.jpg",
    },
    {
      src: "/images/office/5.jpg",
    },
    {
      src: "/images/office/6.jpg",
    },
    {
      src: "/images/office/7.jpg",
    },
    {
      src: "/images/office/8.jpg",
    },
    {
      src: "/images/office/9.jpg",
    },
    {
      src: "/images/office/10.jpg",
    },
    {
      src: "/images/office/11.jpg",
    },
    {
      src: "/images/office/12.jpg",
    },
  ];

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

      {/* Office Locations Grid */}
      <section className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <div key={index} className="flex flex-col gap-4">
              <a
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-primary hover:underline"
              >
                {office.name}
              </a>
              <a
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-primary transition-colors"
              >
                {office.address}
              </a>
              <a
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <MapPin className="w-5 h-5" />
                <span>{office.findText}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <div key={index} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <IconComponent className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">{contact.label}</h3>
                </div>
                <a
                  href={contact.link}
                  className="text-neutral-700 hover:text-primary transition-colors font-medium"
                >
                  {contact.value}
                </a>
                {contact.description && (
                  <p className="text-sm text-neutral-600">
                    {contact.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={`Exclusive algarve villas offices ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      <DiscoverSection />
    </>
  );
};

export default ContactPage;