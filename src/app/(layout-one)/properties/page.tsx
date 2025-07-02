import { ProductCard } from "@/components/product/product-card";
import SearchHeader from "@/components/search/search-header";
import SideFilters from "@/components/search/side-filters";
import { getPropertiesWithAll } from "@/data/properties";
import { PropertySearchParams } from "@/types/property";
import Link from "next/link";
import { Suspense } from "react";

// interface PropertiesPageProps {
//   searchParams: PropertySearchParams;
// }

type Params = {
  [x: string]: string | string[]
};

interface PageProps  {
  params?: Promise<Params>;
  searchParams: Promise<PropertySearchParams>
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
    type: searchParams.type,
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
    is_featured: searchParams.is_featured,
    show_price: searchParams.show_price,
    sort_by: searchParams.sort_by || "created_at",
    sort_direction: searchParams.sort_direction || "desc",
    per_page: searchParams.per_page || 20,
    page: searchParams.page || 1,
    language: searchParams.language || "en",
  };

  // Fetch properties from API
  const propertiesResponse = await getPropertiesWithAll(apiParams);

  return (
    <>
      <div className="pt-24 w-full">
        <div className="mb-4 w-full">
          <SearchHeader
            // totalResults={propertiesResponse.meta.total}
            // currentPage={propertiesResponse.meta.current_page}
            // totalPages={propertiesResponse.meta.last_page}
          />
        </div>

        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto">
          <div className="max-w-[400px] mx-auto sm:max-w-full sm:mx-0 flex items-start flex-wrap pb-8">
            <div className="w-80 max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-24 hidden lg:block">
              <Suspense fallback={<div>Loading filters...</div>}>
                <SideFilters />
              </Suspense>
            </div>

            <div className="lg:pl-6 flex-1 md:min-w-[400px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {propertiesResponse.data.length > 0 ? (
                propertiesResponse.data.map((property) => (
                  <div key={property.id} className="">
                    <Link
                      href={`/properties/${property.id}`}
                      className="block"
                    >
                      <ProductCard property={property} />
                    </Link>
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
          </div>
        </div>
      </div>
    </>
  );
}
