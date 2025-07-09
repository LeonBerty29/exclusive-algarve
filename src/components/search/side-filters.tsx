import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegionSelect from "@/components/search/region-select";
import { SliderExample } from "@/components/search/slider-example";
import { PropertyTypes } from "@/components/property/property-types";
import StatusTags from "./status-tags";
import { SearchInput } from "./search-input";
import { getMetadata } from "@/data/properties";
import { Skeleton } from "../ui/skeleton";
// import { Landmark } from "lucide-react";

const SideFilters = () => {
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Price</CardTitle>
          <CardDescription className="text-sm">
            In thousand of €
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <SliderExample />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <RegionSelect />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Types of properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Suspense fallback={<PropertyTypesLoading />}>
              <ListPropertyTypes />
            </Suspense>
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
