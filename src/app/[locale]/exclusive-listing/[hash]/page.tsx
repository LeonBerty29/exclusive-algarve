import { PropertySearchParams } from "@/types/property";
import { Suspense } from "react";
import { PROPERTIES_PER_PAGE } from "@/config/constants";
import {
  PaginationSkeleton,
  PropertiesGridSkeleton,
} from "@/components/property/loading-states";
// import { auth } from "@/auth";
// import { getFavorites } from "@/data/favourites";
import { Building2, Search, FilterX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { generateApiParams, hasActiveFilters } from "@/lib/utils";
// import { getNote } from "@/data/notes";
import {
  // getLocale,
  getTranslations,
} from "next-intl/server";
import Image from "next/image";
import { ExclusiveListingCard } from "./exclusive-listing-card";
import { getExclusivePropertiesWithAllPaginated } from "@/data/exclusive-properties";
import { ExclusivePropertiesPagination } from "./exlcusive-properties-pagination";
import { HashLanguageSwitcherDropdown } from "@/components/shared/hash-language-switcher-dropdown";

type Params = {
  [x: string]: string | string[];
};

interface PageProps {
  params?: Promise<Params>;
  searchParams: Promise<PropertySearchParams>;
}

export default async function ExclusiveListing(props: PageProps) {
  const t = await getTranslations("propertyDetailsPage");

  // Convert searchParams to the format expected by your API
  const awaitedParams = await props.params;
  const hash = awaitedParams!.hash;
  const searchParams = await props.searchParams;

  const apiParams: PropertySearchParams = generateApiParams(searchParams);

  // Create a key based on the search parameters that affect the data
  const suspenseKey = JSON.stringify({
    // search: apiParams.search,
    // location: apiParams.location_area,
    // municipality: apiParams.municipality,
    // zone: apiParams.zone,
    // district: apiParams.district,
    // min_price: apiParams.min_price,
    // max_price: apiParams.max_price,
    // price_ranges: apiParams.price_ranges,
    // currency: apiParams.currency,
    // typology: apiParams.typology,
    // min_bedrooms: apiParams.min_bedrooms,
    // max_bedrooms: apiParams.max_bedrooms,
    // min_bathrooms: apiParams.min_bathrooms,
    // max_bathrooms: apiParams.max_bathrooms,
    // min_area: apiParams.min_area,
    // max_area: apiParams.max_area,
    // min_plot_size: apiParams.min_plot_size,
    // max_plot_size: apiParams.max_plot_size,
    // construction_year_from: apiParams.construction_year_from,
    // construction_year_to: apiParams.construction_year_to,
    // energy_class: apiParams.energy_class,
    // agency_id: apiParams.agency_id,
    // featured: apiParams.featured,
    show_price: apiParams.show_price,
    sort_by: apiParams.sort_by,
    sort_direction: apiParams.sort_direction,
    per_page: apiParams.per_page,
    page: apiParams.page,
  });

  return (
    <>
      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto bg-inherit z-20">
        <div className="flex items-center justify-between gap-6 flex-wrap py-6">
          <Image
            src={"/images/eav-logo-dark.svg"}
            alt="Exclusive Algarve Villas Logo"
            width={70}
            height={50}
            className="object-contain h-20 w-35 hidden lg:block"
          />
          <Image
            src={"/images/eav-logo-dark.svg"}
            alt="Exclusive Algarve Villas Logo"
            width={70}
            height={50}
            className="object-contain h-15 w-20 lg:hidden"
          />

          {/* <div className="">Agent Details Goes Here</div> */}

          <div className="">
            <HashLanguageSwitcherDropdown />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto">
          <div className="mx-auto sm:max-w-full sm:mx-0 flex items-start flex-wrap pb-8">
            <div className="flex-1 md:min-w-[400px] mt-6">
              <Suspense
                key={`${suspenseKey} --properties`}
                fallback={<PropertiesGridSkeleton />}
              >
                <PropertieList hash={hash as string} apiParams={apiParams} />
              </Suspense>
              <Suspense
                key={`${suspenseKey} --pagination`}
                fallback={<PaginationSkeleton />}
              >
                <ExclusivePropertiesPagination
                  apiParams={apiParams}
                  hash={hash as string}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 w-full bg-black">
        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto flex items-center justify-center gap-4">
          <p className="text-white text-sm">{t("poweredBy")}</p>
          <Link href="/">
            <Image
              src={"/images/eav-logo.png"}
              alt="Exclusive Algarve Villas Logo"
              width={70}
              height={50}
              className="object-contain h-10 w-20"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

async function PropertieList({
  apiParams,
  hash,
}: {
  apiParams: PropertySearchParams;
  hash: string;
}) {
  const t = await getTranslations("propertiesPage");
  // const session = await auth();
  // const locale = await getLocale();
  // const token = session?.accessToken;

  // Fetch all data concurrently using Promise.all
  const [
    propertiesResponse,
    // favoritesResponse,
    // notesResponse
  ] = await Promise.all([
    getExclusivePropertiesWithAllPaginated(
      apiParams,
      PROPERTIES_PER_PAGE,
      hash
    ),
    // token
    //   ? getFavorites(token)
    //   : Promise.resolve({ favorite_properties: [] }),
    // token ? getNote() : Promise.resolve({ data: [] }),
  ]);

  const properties = propertiesResponse.data;
  // const favorites = favoritesResponse.favorite_properties;
  // const notes = notesResponse.data;
  const hasFilters = hasActiveFilters(apiParams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div key={property.id} className="">
            <ExclusiveListingCard
              property={property}
              // favorites={favorites}
              // notes={notes}
              hash={hash}
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
