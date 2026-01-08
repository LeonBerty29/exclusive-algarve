import PropertyListingForm from "@/components/shared/property-listing-form";
import { BASE_URL, EAV_TWITTER_CREATOR_HANDLE, WEBSITE_NAME } from "@/config/constants";
import { routing } from "@/i18n/routing";
import { sellPropertyMetadata } from "@/seo-metadata/sell-property";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = {
  locale: string;
};

interface PageProps {
  params: Promise<Params>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  // Get the localized path for sell property page
  const sellPropertyPath = routing.pathnames["/porsche"];
  const localizedSellPropertyPath =
    typeof sellPropertyPath === "string"
      ? sellPropertyPath
      : sellPropertyPath[locale as keyof typeof sellPropertyPath];

  // Build canonical URL
  const canonicalUrl = `${BASE_URL}/${locale}${localizedSellPropertyPath}`;

  // Build alternate language URLs
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path =
      typeof sellPropertyPath === "string"
        ? sellPropertyPath
        : sellPropertyPath[loc as keyof typeof sellPropertyPath];
    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });

  // Add x-default
  const defaultPath =
    typeof sellPropertyPath === "string"
      ? sellPropertyPath
      : sellPropertyPath[
          routing.defaultLocale as keyof typeof sellPropertyPath
        ];
  languages["x-default"] = `${BASE_URL}/${routing.defaultLocale}${defaultPath}`;

  // Get metadata for current locale
  const metadata =
    sellPropertyMetadata[locale as keyof typeof sellPropertyMetadata] ||
    sellPropertyMetadata.en;

  return {
    title: `${metadata.title} | ${WEBSITE_NAME}`,
    description: metadata.description,
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.description,
      url: canonicalUrl,
      siteName: WEBSITE_NAME,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/eav-logo-dark.svg`,
          width: 1200,
          height: 630,
          alt: metadata.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.ogTitle,
      description: metadata.description,
      creator: EAV_TWITTER_CREATOR_HANDLE,
      images: [`${BASE_URL}/images/eav-logo-dark.svg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
  };
}

export default async function SellPropertyPage() {
  const t = await getTranslations("sellPropertyPage");

  return (
    <div className="lg:container mx-auto px-4 pt-24">
      {/* Hero Section */}
      <section className="">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl text-primary font-bold mb-6">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="lg:container mx-auto px-4">
          <div className="lg:max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Local Expertise */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("localExpertiseTitle")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("localExpertiseDescription")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutique Agency */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("boutiqueAgencyTitle")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("boutiqueAgencyDescription")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Multilingual */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("multilingualTitle")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("multilingualDescription")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Proven Track Record */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("provenTrackRecordTitle")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("provenTrackRecordDescription")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trusted */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("trustedTitle")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("trustedDescription")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Local Presence */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("localPresenceTitle")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("localPresenceDescription")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                {t("formSectionTitle")}
              </h2>
              <p className="text-gray-600 text-lg">
                {t("formSectionDescription")}
              </p>
            </div>
            <PropertyListingForm />
          </div>
        </div>
      </section>
    </div>
  );
}
