"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ranges } from "@/types/property";
import { Slider } from "../ui/slider";

export function BedroomsSlider({
  bedroomRange,
}: {
  bedroomRange: Ranges["bedrooms"];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousValuesRef = useRef<[number, number] | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const [sliderValues, setSliderValues] = useState<[number, number]>(() => {
    const minBedrooms = searchParams.get("min_bedrooms");
    const maxBedrooms = searchParams.get("max_bedrooms");

    return [
      minBedrooms ? parseInt(minBedrooms) : bedroomRange.min,
      maxBedrooms ? parseInt(maxBedrooms) : bedroomRange.max,
    ];
  });

  const handleChange = (newValues: [number, number]): void => {
    const updateURL = (newValues: [number, number]) => {
      const params = new URLSearchParams(searchParams.toString());

      // Only set params if they're different from defaults
      if (newValues[0] !== bedroomRange.min) {
        params.set("min_bedrooms", newValues[0].toString());
      } else {
        params.delete("min_bedrooms");
      }

      if (newValues[1] !== bedroomRange.max) {
        params.set("max_bedrooms", newValues[1].toString());
      } else {
        params.delete("max_bedrooms");
      }

      // Only reset to first page when bedroom VALUES actually change
      const previousValues = previousValuesRef.current;
      const valuesChanged =
        !previousValues ||
        previousValues[0] !== newValues[0] ||
        previousValues[1] !== newValues[1];

      if (valuesChanged && previousValues) {
        params.delete("page");
      }

      // Update the ref with current values
      previousValuesRef.current = newValues;

      router.push(`?${params.toString()}`, { scroll: false });
    };

    updateURL(newValues);
  };

  useEffect(() => {
    const minBedrooms = searchParams.get("min_bedrooms");
    const maxBedrooms = searchParams.get("max_bedrooms");

    const newValues: [number, number] = [
      minBedrooms ? parseInt(minBedrooms) : bedroomRange.min,
      maxBedrooms ? parseInt(maxBedrooms) : bedroomRange.max,
    ];

    setSliderValues(newValues);
  }, [searchParams, bedroomRange.min, bedroomRange.max]);

  // Check if values are different from defaults
  const isFiltered =
    sliderValues[0] !== bedroomRange.min ||
    sliderValues[1] !== bedroomRange.max;

  const getDisplayText = () => {
    if (!isFiltered) {
      return "Bedrooms";
    }
    if (sliderValues[0] === sliderValues[1]) {
      return `${sliderValues[0]} bedroom${sliderValues[0] === 1 ? "" : "s"}`;
    }
    return `${sliderValues[0]} - ${sliderValues[1]} bedrooms`;
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full min-h-[40px] justify-between text-left font-normal overflow-hidden text-gray-600"
          >
            {getDisplayText()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-6 pb-8" align="start">
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{sliderValues[0]}</span>
                <span>{sliderValues[1]}</span>
              </div>
              <Slider
                defaultValue={[bedroomRange.min, bedroomRange.max]}
                min={bedroomRange.min}
                max={bedroomRange.max}
                step={1}
                onValueChange={(values) => {
                  setSliderValues([values[0], values[1]]);
                }}
                onValueCommit={handleChange}
                value={sliderValues}
                minStepsBetweenThumbs={1}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
