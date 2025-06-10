import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SearchSelectBox } from "@/components/search/search-select-box";
import RegionSelect from "@/components/search/region-select";
import { SliderExample } from "@/components/search/slider-example";
import { PropertyTypes } from "@/components/property/property-types";
import StatusTags from "./status-tags";

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
          <form>
            <Label htmlFor="search" className="sr-only text-xs">
              Search
            </Label>
            <div className="relative mb-4">
              <SearchSelectBox />
            </div>

            <Button className="w-full bg-primary text-white rounded-none hover:opacity-80">
              Search
            </Button>
          </form>
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
          <form>
            <div className="relative mb-4">
              <SliderExample />
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Region</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="relative mb-4">
              <RegionSelect />
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Types of properties</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="relative mb-4">
              <PropertyTypes />
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="flex flex-col mb-6 rounded-none">
        <CardHeader>
          <CardTitle className="text-sm">Status & Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="relative mb-4">
              <StatusTags />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default SideFilters;
