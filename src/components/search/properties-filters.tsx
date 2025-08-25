import React, { Suspense } from "react";
import RegionSelect from "@/components/search/region-select";
// import { PriceSlider } from "@/components/search/price-slider-2";
import { PropertyTypes } from "@/components/property/property-types";
// import StatusTags from "./status-tags";
import { SearchInput } from "./search-input";
import { Skeleton } from "../ui/skeleton";
import { getMetadata, getRanges } from "@/data/properties-metada";
// import { BathroomSlider } from "./bathrooms-slider";
// import { BedroomsSlider } from "./bedrooms-slider";
import { CollapsibleFilters } from "./collapsible-filters";
import { PriceSelect } from "./price-select";
import { BedroomsDropdown } from "./bedroom-select";
import { BathroomsDropdown } from "./bathroom-select";

export const PropertiesFilter = ({ suspenseKey }: { suspenseKey: string }) => {
  return (
    <CollapsibleFilters visibleCount={4}>
      <div className="relative">
        <SearchInput />
      </div>

      <div className="relative">
        <Suspense
          key={`${suspenseKey} --region-select`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListRegionSelect />
        </Suspense>
      </div>

      <div className="relative">
        <Suspense
          key={`${suspenseKey} --property-types`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListPropertyTypes />
        </Suspense>
      </div>

      <div className="relative">
        <Suspense
          key={`${suspenseKey} --price-slider`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListPriceSlider />
        </Suspense>
      </div>

      {/* Additional filters that will be hidden initially */}
      <div className="relative">
        <Suspense
          key={`${suspenseKey} --bedrooms-slider`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListBedroomsRangeSelect />
        </Suspense>
      </div>

      <div className="relative">
        <Suspense
          key={`${suspenseKey} --bathrooms-slider`}
          fallback={<Skeleton className="h-10 w-full" />}
        >
          <ListBathroomsRangeSelect />
        </Suspense>
      </div>

    </CollapsibleFilters>
  );
};

async function ListPropertyTypes() {
  // const language = "";
  const metadata = await getMetadata();
  const typologies = metadata.typologies;
  return <PropertyTypes typologies={typologies} />;
}

async function ListPriceSlider() {
  const ranges = await getRanges();
  const priceRange = ranges.price;
  return <PriceSelect priceRange={priceRange} />;
}

// async function ListAreaSlider() {
//   const ranges = await getRanges();
//   const areaRange = ranges.private_area;
//   return <AreaSlider areaRange={areaRange} />;
// }

export async function ListBedroomsRangeSelect() {
  const ranges = await getRanges();
  const bedroomRange = ranges.bedrooms; // Fixed: was using ranges.price
  // return <BedroomsRangeSelect bedroomRange={bedroomRange} />;
  return <BedroomsDropdown bedroomRange={bedroomRange} />;
}

export async function ListRegionSelect() {
  const metadata = await getMetadata();
  return <RegionSelect metadata={metadata} />;
}

export async function ListBathroomsRangeSelect() {
  const ranges = await getRanges();
  const bathroomRange = ranges.bathrooms;
  // return <BathroomsRangeSelect bathroomRange={bathroomRange} />;
  return <BathroomsDropdown bathroomRange={bathroomRange} />;
}
