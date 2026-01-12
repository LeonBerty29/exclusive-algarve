import React, { Suspense } from "react";
// import { PriceSlider } from "@/components/search/price-slider-2";
import { SearchInput } from "./search-input";
import { Skeleton } from "../ui/skeleton";
import { CollapsibleFilters } from "./collapsible-filters";
import {
  ListBathroomsRangeSelectDesktop,
  ListBedroomsRangeSelectDesktop,
  ListPricesDesktop,
  ListPropertyTypesDesktop,
  ListRegionSelectDesktop,
} from "./listing-filters-desktop";
import { PropertySearchParams } from "@/types/property";
import { getPropertiesWithAllPaginated } from "@/data/properties";
import { PROPERTIES_PER_PAGE } from "@/config/constants";

export const PropertiesFilter = async ({
  apiParams,
}: {
  apiParams: PropertySearchParams;
}) => {
  // Fetch properties to get aggregates
  // Fetch properties to get aggregates
  const response = await getPropertiesWithAllPaginated(
    apiParams,
    PROPERTIES_PER_PAGE
  );

  console.log({apiParams})
  // console.log({ response });
  const propertyAggregates = response.meta.property_aggregates;
  console.log({propertyAggregates})

  return (
    <CollapsibleFilters visibleCount={4}>
      <div className="relative">
        <SearchInput className="text-gray-700 placeholder:text-gray-700" />
      </div>

      <div className="relative">
        <Suspense
          // key={`${suspenseKey} --region-select`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListRegionSelectDesktop areas={propertyAggregates.areas} />
        </Suspense>
      </div>

      <div className="relative">
        <Suspense
          // key={`${suspenseKey} --property-types`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListPropertyTypesDesktop
            typologies={propertyAggregates.typologies}
          />
        </Suspense>
      </div>

      <div className="relative">
        <Suspense
          // key={`${suspenseKey} --price-slider`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListPricesDesktop priceRange={propertyAggregates.price} />
        </Suspense>
      </div>

      {/* Additional filters that will be hidden initially */}
      <div className="relative">
        <Suspense
          // key={`${suspenseKey} --bedrooms-slider`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListBedroomsRangeSelectDesktop
            bedroomsRange={propertyAggregates.bedrooms}
          />
        </Suspense>
      </div>

      <div className="relative">
        <Suspense
          // key={`${suspenseKey} --bathrooms-slider`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListBathroomsRangeSelectDesktop
            bathroomsRange={propertyAggregates.bathrooms}
          />
        </Suspense>
      </div>
    </CollapsibleFilters>
  );
};
