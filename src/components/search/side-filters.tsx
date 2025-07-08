import React from "react";
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
            <PropertyTypes />
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
