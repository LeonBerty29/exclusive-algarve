import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegionSelect from "@/components/search/region-select";
import { PriceSlider } from "@/components/search/price-slider-2";
import { PropertyTypes } from "@/components/property/property-types";
import StatusTags from "./status-tags";
import { SearchInput } from "./search-input";
import { Skeleton } from "../ui/skeleton";
import { BedroomsRangeSelect } from "./bedrooms-range-select";
import { BathroomsRangeSelect } from "./bathrooms-range-select";
import { getMetadata, getRanges } from "@/data/properties-metada";
// import { AreaSlider } from "./area-slider";
// import { Landmark } from "lucide-react";

const SideFilters = ({ suspenseKey }: { suspenseKey: string }) => {
  return (
    <>
      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">
            Free search / Reference code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <SearchInput />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Suspense
              key={`${suspenseKey} --region-select`}
              // fallback={<RegionSelectLoading />}
              fallback={<>Loading...</>}
            >
              <ListRegionSelect />
            </Suspense>
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Types of properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Suspense
              key={`${suspenseKey} --property-types`}
              fallback={<PropertyTypesLoading />}
            >
              <ListPropertyTypes />
            </Suspense>
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Price</CardTitle>
          <CardDescription className="text-sm">
            In thousand of €
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Suspense
              key={`${suspenseKey} --price-slider`}
              fallback={<LoadingListPriceSlider />}
            >
              <ListPriceSlider />
            </Suspense>
          </div>
        </CardContent>
      </Card>
      
      {/* <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Area</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Suspense
              key={`${suspenseKey} --area-slider`}
              fallback={<LoadingListAreaSlider />}
            >
              <ListAreaSlider />
            </Suspense>
          </div>
        </CardContent>
      </Card> */}

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Bedrooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <ListBedroomsRangeSelect />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Bathrooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <ListBathroomsRangeSelect />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Status & Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <StatusTags />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SideFilters;

async function ListPropertyTypes() {
  // const language = "";
  const metadata = await getMetadata();
  const typologies = metadata.typologies;
  return <PropertyTypes typologies={typologies} />;
}

async function ListPriceSlider() {
  const ranges = await getRanges();
  const priceRange = ranges.price;
  return <PriceSlider priceRange={priceRange} />;
}

// async function ListAreaSlider() {
//   const ranges = await getRanges();
//   const areaRange = ranges.private_area;
//   return <AreaSlider areaRange={areaRange} />;
// }

export async function ListBedroomsRangeSelect() {
  const ranges = await getRanges();
  const bedroomRange = ranges.bedrooms; // Fixed: was using ranges.price
  return <BedroomsRangeSelect bedroomRange={bedroomRange} />;
}

export async function ListRegionSelect() {
  const metadata = await getMetadata();
  return <RegionSelect metadata={metadata} />;
}

export async function ListBathroomsRangeSelect() {
  const ranges = await getRanges();
  const bathroomRange = ranges.bathrooms;
  return <BathroomsRangeSelect bathroomRange={bathroomRange} />;
}

function PropertyTypesLoading() {
  return (
    <div className="space-y-4">
      {/* Generate 5-8 skeleton items to represent property types */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Checkbox skeleton */}
            <Skeleton className="w-4 h-4 rounded-[3px]" />
            {/* Label skeleton with varying widths */}
            <Skeleton
              className="h-4"
              style={{
                width: `${Math.random() * 60 + 80}px`, // Random width between 80-140px
              }}
            />
          </div>
          {/* Count skeleton */}
          <Skeleton className="w-6 h-4" />
        </div>
      ))}
    </div>
  );
}

function LoadingListPriceSlider() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Label skeleton */}
      <Skeleton className="h-4 w-20 mb-2" />

      {/* Slider container */}
      <div className="relative pt-6 pb-6">
        {/* Track background skeleton */}
        <div className="w-full h-1 bg-gray-200 rounded-full">
          {/* Colored rail skeleton */}
          <Skeleton
            className="absolute h-1 rounded-full"
            style={{ left: "25%", width: "50%" }}
          />
        </div>

        {/* Left Thumb skeleton */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4"
          style={{ left: "25%" }}
        >
          <Skeleton className="w-4 h-4 rounded-full" />
          {/* Tooltip skeleton */}
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
            <Skeleton className="h-6 w-16 rounded" />
          </div>
        </div>

        {/* Right Thumb skeleton */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4"
          style={{ left: "75%" }}
        >
          <Skeleton className="w-4 h-4 rounded-full" />
          {/* Tooltip skeleton */}
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
            <Skeleton className="h-6 w-16 rounded" />
          </div>
        </div>
      </div>

      {/* Input Fields skeleton */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex items-center">
          <Skeleton className="w-20 h-10" />
          <Skeleton className="ml-2 w-4 h-4" />
        </div>

        <span className="text-gray-400">—</span>

        <div className="flex items-center">
          <Skeleton className="w-20 h-10" />
          <Skeleton className="ml-2 w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

// function LoadingListAreaSlider() {
//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       {/* Label skeleton */}
//       <Skeleton className="h-4 w-20 mb-2" />

//       {/* Slider container */}
//       <div className="relative pt-6 pb-6">
//         {/* Track background skeleton */}
//         <div className="w-full h-1 bg-gray-200 rounded-full">
//           {/* Colored rail skeleton */}
//           <Skeleton
//             className="absolute h-1 rounded-full"
//             style={{ left: "25%", width: "50%" }}
//           />
//         </div>

//         {/* Left Thumb skeleton */}
//         <div
//           className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4"
//           style={{ left: "25%" }}
//         >
//           <Skeleton className="w-4 h-4 rounded-full" />
//           {/* Tooltip skeleton */}
//           <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
//             <Skeleton className="h-6 w-16 rounded" />
//           </div>
//         </div>

//         {/* Right Thumb skeleton */}
//         <div
//           className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4"
//           style={{ left: "75%" }}
//         >
//           <Skeleton className="w-4 h-4 rounded-full" />
//           {/* Tooltip skeleton */}
//           <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
//             <Skeleton className="h-6 w-16 rounded" />
//           </div>
//         </div>
//       </div>

//       {/* Input Fields skeleton - without currency symbols for area */}
//       <div className="mt-6 flex items-center justify-center gap-4">
//         <div className="flex items-center">
//           <Skeleton className="w-20 h-10" />
//           <Skeleton className="ml-2 w-6 h-4" /> {/* m² unit skeleton */}
//         </div>

//         <span className="text-gray-400">—</span>

//         <div className="flex items-center">
//           <Skeleton className="w-20 h-10" />
//           <Skeleton className="ml-2 w-6 h-4" /> {/* m² unit skeleton */}
//         </div>
//       </div>
//     </div>
//   );
// }
