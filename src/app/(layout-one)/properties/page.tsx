import { ProductCard } from "@/components/product/product-card";
import { PropertiesPagination } from "@/components/property/properties-pagination";
import SearchHeader from "@/components/search/search-header";
import SideFilters from "@/components/search/side-filters";
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
  const apiParams: PropertySearchParams = {
    search: searchParams.search,
    location: searchParams.location,
    municipality: searchParams.municipality,
    district: searchParams.district,
    min_price: searchParams.min_price,
    max_price: searchParams.max_price,
    currency: searchParams.currency || "EUR",
    typology: searchParams.typology,
    min_bedrooms: searchParams.min_bedrooms,
    max_bedrooms: searchParams.max_bedrooms,
    min_bathrooms: searchParams.min_bathrooms,
    max_bathrooms: searchParams.max_bathrooms,
    min_area: searchParams.min_area,
    max_area: searchParams.max_area,
    min_plot_size: searchParams.min_plot_size,
    max_plot_size: searchParams.max_plot_size,
    construction_year_from: searchParams.construction_year_from,
    construction_year_to: searchParams.construction_year_to,
    energy_class: searchParams.energy_class,
    agency_id: searchParams.agency_id,
    featured: searchParams.featured,
    show_price: searchParams.show_price,
    sort_by: searchParams.sort_by || "created_at",
    sort_direction: searchParams.sort_direction || "desc",
    per_page: searchParams.per_page || 20,
    page: searchParams.page || 1,
    language: searchParams.language || "en",
  };

  // Create a key based on the search parameters that affect the data
  const suspenseKey = JSON.stringify({
    search: apiParams.search,
    location: apiParams.location,
    municipality: apiParams.municipality,
    district: apiParams.district,
    min_price: apiParams.min_price,
    max_price: apiParams.max_price,
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
        <div className="mb-4 w-full">
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
          <div className="max-w-[400px] mx-auto sm:max-w-full sm:mx-0 flex items-start flex-wrap pb-8">
            <div className="w-80 max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-24 hidden xl:block">
              <SideFilters suspenseKey={suspenseKey} />
            </div>

            <div className="xl:pl-6 flex-1 md:min-w-[400px]">
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div key={property.id} className="">
            <ProductCard property={property} favorites={favorites} />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">
            No properties found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
