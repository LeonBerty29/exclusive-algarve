import { ProductCard } from "@/components/product/product-card";
import { PropertiesPagination } from "@/components/property/properties-pagination";
import SearchHeader from "@/components/search/search-header";
// import SideFilters from "@/components/search/side-filters";
import {
  // getPropertiesWithAll,
  getPropertiesWithAllPaginated,
} from "@/data/properties";
import { PropertySearchParams } from "@/types/property";
import { Suspense } from "react";
import { PROPERTIES_PER_PAGE } from "@/config/constants";
import {
  PaginationSkeleton,
  PropertiesGridSkeleton,
  SearchHeaderSkeleton,
} from "@/components/property/loading-states";
import { auth } from "@/auth";
import { getFavorites } from "@/data/favourites";
import { Building2, Search, FilterX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListFilter } from "lucide-react";
import { SortBy } from "@/components/search/sort-by";
import { generateApiParams, hasActiveFilters } from "@/lib/utils";
// import HeroSearch from "@/components/home/search-component";

// interface PropertiesPageProps {
//   searchParams: PropertySearchParams;
// }

type Params = {
  [x: string]: string | string[];
};

interface PageProps {
  params?: Promise<Params>;
  searchParams: Promise<PropertySearchParams>;
}

export default async function PropertiesPage(props: PageProps) {
  // Convert searchParams to the format expected by your API
  const searchParams = await props.searchParams;

  console.log("why is search params not showing");

  console.log({ searchParamsInPage: searchParams });

  // Handle price_ranges parameter - it comes from URL as price_ranges[]
  let priceRanges: string[] | undefined;
  if (searchParams["price_ranges[]"]) {
    // Handle both single value and array of values
    console.log("There are price ranges");
    if (Array.isArray(searchParams["price_ranges[]"])) {
      priceRanges = searchParams["price_ranges[]"] as string[];
    } else {
      priceRanges = [searchParams["price_ranges[]"] as string];
    }

    console.log({ priceRanges });
  }

  const apiParams: PropertySearchParams = generateApiParams(searchParams);

  // Create a key based on the search parameters that affect the data
  const suspenseKey = JSON.stringify({
    search: apiParams.search,
    location: apiParams.location_area,
    municipality: apiParams.municipality,
    zone: apiParams.zone,
    district: apiParams.district,
    min_price: apiParams.min_price,
    max_price: apiParams.max_price,
    price_ranges: apiParams.price_ranges,
    currency: apiParams.currency,
    typology: apiParams.typology,
    min_bedrooms: apiParams.min_bedrooms,
    max_bedrooms: apiParams.max_bedrooms,
    min_bathrooms: apiParams.min_bathrooms,
    max_bathrooms: apiParams.max_bathrooms,
    min_area: apiParams.min_area,
    max_area: apiParams.max_area,
    min_plot_size: apiParams.min_plot_size,
    max_plot_size: apiParams.max_plot_size,
    construction_year_from: apiParams.construction_year_from,
    construction_year_to: apiParams.construction_year_to,
    energy_class: apiParams.energy_class,
    agency_id: apiParams.agency_id,
    featured: apiParams.featured,
    show_price: apiParams.show_price,
    sort_by: apiParams.sort_by,
    sort_direction: apiParams.sort_direction,
    per_page: apiParams.per_page,
    page: apiParams.page,
  });

  // Fetch properties from API
  // const propertiesResponse = await getPropertiesWithAll(apiParams);

  // console.log(propertiesResponse.meta);

  return (
    <>
      <div className="pt-24 w-full">
        <div className="w-full">
          <Suspense fallback={<SearchHeaderSkeleton />}>
            <SearchHeader
              suspenseKey={suspenseKey}
              // totalResults={propertiesResponse.meta.total}
              // currentPage={propertiesResponse.meta.current_page}
              // totalPages={propertiesResponse.meta.last_page}
            />
          </Suspense>
        </div>

        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto">
          <div className="flex items-center gap-1 md:gap-4 justify-end">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <ListFilter className="w-4 h-4 hidden sm:block" /> Sort by:
            </div>
            <SortBy />
          </div>
          <div className="mx-auto sm:max-w-full sm:mx-0 flex items-start flex-wrap pb-8">
            <div className="flex-1 md:min-w-[400px] mt-6">
              <Suspense
                key={`${suspenseKey} --properties`}
                fallback={<PropertiesGridSkeleton />}
              >
                <PropertieList apiParams={apiParams} />
              </Suspense>
              <Suspense
                key={`${suspenseKey} --pagination`}
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

async function PropertieList({
  apiParams,
}: {
  apiParams: PropertySearchParams;
}) {
  const session = await auth();
  const token = session?.accessToken;

  const favoritesResponse = token
    ? await getFavorites(token)
    : {
        favorite_properties: [],
      };
  const favorites = favoritesResponse.favorite_properties;
  const propertiesResponse = await getPropertiesWithAllPaginated(
    apiParams,
    PROPERTIES_PER_PAGE
  );

  const properties = propertiesResponse.data;
  const hasFilters = hasActiveFilters(apiParams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div key={property.id} className="">
            <ProductCard property={property} favorites={favorites} />
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
                  No Properties Found
                </h1>
                <p className="text-gray-600 text-lg">
                  We couldn&apos;t find any properties matching your current
                  search criteria.
                </p>
              </div>

              {/* Conditional Action Buttons */}
              {hasFilters ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Try clearing your filters to see more results
                  </p>
                  <Button
                    asChild
                    className="bg-primary hover:bg-black border-primary hover:border-black text-white font-semibold py-3 px-8 rounded-lg border transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 mx-auto"
                  >
                    <Link href="/properties">
                      <FilterX className="w-5 h-5" />
                      Clear All Filters
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 mb-4">
                    No properties are currently available. Try browsing our full
                    catalog or return home.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      asChild
                      className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-200 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                    >
                      <Link href="/">
                        <Home className="w-5 h-5" />
                        Home
                      </Link>
                    </Button>

                    <Button
                      asChild
                      className="bg-primary hover:bg-black border-primary hover:border-black text-white font-semibold py-3 px-6 rounded-lg border transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                    >
                      <Link href="/properties">
                        <Search className="w-5 h-5" />
                        Browse Properties
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
