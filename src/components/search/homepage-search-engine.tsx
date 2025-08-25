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
import { PriceSelect } from "./price-select";
import { PropertySearchParams } from "@/types/property";
import { Button } from "../ui/button";
import { BedroomsDropdown } from "./bedroom-select";
import { BathroomsDropdown } from "./bathroom-select";
import {
  generateApiParams,
  generateSuspenseKey,
  hasActiveFilters,
} from "@/lib/utils";
import { getPropertiesWithAllPaginated } from "@/data/properties";
import { ScrollToResultsButton } from "./show-result-client-btn";
import { Loader2 } from "lucide-react";
import { ClearHomeFilters } from "./clear-home-filters";

export const HomepageSearchEngine = ({
  searchParams,
}: {
  searchParams: PropertySearchParams;
}) => {
  const apiParams = generateApiParams(searchParams);
  const suspenseKey = generateSuspenseKey(apiParams);
  return (
    <>
      <h1 className="text-2xl sm:text-4xl lg:text-6xl leading-snug font-extralight text-white mb-6 text-center">
        FIND YOUR DREAM HOME <br />
        PROPERTY IN ALGARVE
      </h1>
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-black/30 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
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
          </div>

          <div className="flex flex-col gap-4">
            <Suspense
              key={`${suspenseKey} --show-results-button`}
              fallback={<ShowResultsButtonLoading />}
            >
              <ShowResultsButton apiParams={apiParams} />
            </Suspense>

            <ClearHomeFilters apiParams={apiParams} />
          </div>
        </div>
      </div>
    </>
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

export async function ShowResultsButton({
  apiParams,
}: {
  apiParams: PropertySearchParams;
}) {
  const hasFilters = hasActiveFilters(apiParams);
  if (!hasFilters) {
    return (
      <Button
        className="bg-primary border border-primary hover:border-primary/80 text-white flex-1"
        disabled={true}
      >
        Show Result
      </Button>
    );
  }
  const response = await getPropertiesWithAllPaginated(apiParams, 12);
  const total = response.meta.total;
  return (
    <>
      <ScrollToResultsButton total={total} hasFilters={hasFilters} />
    </>
  );
}

function ShowResultsButtonLoading() {
  return (
    <Button
      className="bg-primary border border-primary hover:border-primary/80 text-white flex-1"
      disabled={true}
    >
      Show Result <Loader2 className="w-4 h-4 animate-spin" />
    </Button>
  );
}
