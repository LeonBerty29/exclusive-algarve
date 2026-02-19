import { PropertyCard } from "@/components/product/property-card";
import { PropertiesPagination } from "@/components/property/properties-pagination";
import { getPropertiesWithAllPaginated } from "@/data/properties";
import { PropertySearchParams } from "@/types/property";
import { Suspense } from "react";
import {
  BASE_URL,
  EAV_TWITTER_CREATOR_HANDLE,
  GEO_POSITION,
  PROPERTIES_PER_PAGE,
  WEBSITE_NAME,
} from "@/config/constants";
import {
  PaginationSkeleton,
  PropertiesGridSkeleton,
} from "@/components/property/loading-states";
import { auth } from "@/auth";
import { getFavorites } from "@/data/favourites";
import { Building2, Search, FilterX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ListFilter } from "lucide-react";
import { SortBy } from "@/components/search/sort-by";
import { generateApiParams, hasActiveFilters } from "@/lib/utils";
import { getNote } from "@/data/notes";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { TokenValidity } from "@/actions/token-validity";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  LocationMetadataLocale,
  locationPropertiesMetadata,
  LocationSlug,
} from "@/seo-metadata/location-properties";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Helper function to check if slug is a location page
function isLocationPage(slug: string): slug is LocationSlug {
  return slug in locationPropertiesMetadata;
}

// ============================================================================
// TYPES
// ============================================================================

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<PropertySearchParams>;
}

// ============================================================================
// METADATA GENERATION
// ============================================================================

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  // ========================================
  // LOCATION PAGE METADATA
  // ========================================
  if (isLocationPage(slug)) {
    const locationConfig = locationPropertiesMetadata[slug];
    const metadata =
      locationConfig[locale as LocationMetadataLocale] ||
      locationConfig.en;

    const canonicalUrl = `${BASE_URL}/${locale}/properties/${slug}`;

    // Build alternate language URLs
    const languages: Record<string, string> = {};
    routing.locales.forEach((loc) => {
      languages[loc] = `${BASE_URL}/${loc}/properties/${slug}`;
    });
    languages["x-default"] =
      `${BASE_URL}/${routing.defaultLocale}/properties/${slug}`;

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
        images: [
          {
            url: `${BASE_URL}/images/eav-dark-logo.png`,
            secureUrl: `${BASE_URL}/images/eav-dark-logo.png`,
            width: 1200,
            height: 630,
            alt: `${WEBSITE_NAME} - ${metadata.displayName}`,
          },
        ],
        locale: locale,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metadata.ogTitle,
        description: metadata.ogDescription,
        creator: EAV_TWITTER_CREATOR_HANDLE,
        images: [`${BASE_URL}/images/eav-dark-logo.png`],
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
        audience: metadata.audience,
        "article:section": metadata.articleSection,
      },
    };
  }

  return {
    title: "Page Not Found",
    description: "The page ",
  };
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function DynamicPage(props: PageProps) {
  const { slug, locale } = await props.params;

  // Enable static rendering
  setRequestLocale(locale);

  // Route to location listing page
  if (isLocationPage(slug)) {
    return <LocationPropertiesPage {...props} />;
  }
}

// ============================================================================
// LOCATION PROPERTIES PAGE COMPONENT
// ============================================================================

async function LocationPropertiesPage(props: PageProps) {
  const { slug, locale } = await props.params;
  const searchParams = await props.searchParams;
  const t = await getTranslations("propertiesPage");

  if (!isLocationPage(slug)) {
    notFound();
  }

  const locationConfig = locationPropertiesMetadata[slug];
  const metadata =
    locationConfig[locale as LocationMetadataLocale] || locationConfig.en;

  // Merge location filter with search params
  const apiParams: PropertySearchParams = {
    ...generateApiParams(searchParams),
    ...locationConfig.searchParameters,
  };

  const suspenseKey = JSON.stringify({
    location: slug,
    ...apiParams,
  });

  return (
    <>
      <div className="pt-24 w-full">
        {/* Location-specific hero section */}
        <div className="py-12 mb-8">
          <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {metadata.title.split("|")[0].trim()}
            </h1>
            <p className="text-xl text-black/80 max-w-3xl">
              {metadata.description}
            </p>
          </div>
        </div>

        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto">
          <div className="flex items-center gap-1 md:gap-4 justify-end">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <ListFilter className="w-4 h-4 hidden sm:block" /> {t("sortBy")}
            </div>
            <SortBy />
          </div>
          <div className="mx-auto sm:max-w-full sm:mx-0 flex items-start flex-wrap pb-8">
            <div className="flex-1 md:min-w-[400px] mt-6">
              <Suspense
                key={`${suspenseKey}--properties`}
                fallback={<PropertiesGridSkeleton />}
              >
                <PropertiesList apiParams={apiParams} />
              </Suspense>
              <Suspense
                key={`${suspenseKey}--pagination`}
                fallback={<PaginationSkeleton />}
              >
                <PropertiesPagination apiParams={apiParams} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



async function PropertiesList({
  apiParams,
}: {
  apiParams: PropertySearchParams;
}) {
  const t = await getTranslations("propertiesPage");
  const session = await auth();
  let token = session?.accessToken;

  // Validate token on the server before fetching
  if (token) {
    const { valid } = await TokenValidity(token);
    if (!valid) {
      token = undefined;
    }
  }

  // Fetch all data concurrently using Promise.all
  const [propertiesResponse, favoritesResponse, notesResponse] =
    await Promise.all([
      getPropertiesWithAllPaginated(apiParams, PROPERTIES_PER_PAGE),
      token
        ? getFavorites(token)
        : Promise.resolve({ favorite_properties: [] }),
      token ? getNote() : Promise.resolve({ data: [] }),
    ]);

  const properties = propertiesResponse.data;
  const favorites = favoritesResponse.favorite_properties;
  const notes = notesResponse.data;
  const hasFilters = hasActiveFilters(apiParams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div key={property.id} className="">
            <PropertyCard
              property={property}
              favorites={favorites}
              notes={notes}
            />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
              {/* Icon with glow effect */}
              <div className="mb-8 relative">
                <div className="w-24 h-24 mx-auto relative">
                  <div className="relative bg-gradient-to-r from-purple-500 to-primary rounded-2xl w-full h-full flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-white animate-pulse" />
                  </div>
                </div>
                <Search
                  className="absolute -top-2 -right-4 w-8 h-8 text-black animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>

              {/* Error Message */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {t("noPropertiesFound")}
                </h1>
                <p className="text-gray-600 text-lg">
                  {t("noPropertiesMatchSearch")}
                </p>
              </div>

              {/* Conditional Action Buttons */}
              {hasFilters ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 mb-4">
                    {t("tryClearingFilters")}
                  </p>
                  <Button
                    asChild
                    className="bg-primary hover:bg-black border-primary hover:border-black text-white font-semibold py-3 px-8 rounded-lg border transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 mx-auto"
                  >
                    <Link href="/properties">
                      <FilterX className="w-5 h-5" />
                      {t("clearAllFilters")}
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 mb-4">
                    {t("noPropertiesAvailable")}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      asChild
                      className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-200 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                    >
                      <Link href="/">
                        <Home className="w-5 h-5" />
                        {t("home")}
                      </Link>
                    </Button>

                    <Button
                      asChild
                      className="bg-primary hover:bg-black border-primary hover:border-black text-white font-semibold py-3 px-6 rounded-lg border transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                    >
                      <Link href="/properties">
                        <Search className="w-5 h-5" />
                        {t("browseProperties")}
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
