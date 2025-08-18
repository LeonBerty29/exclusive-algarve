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

export function BathroomSlider({
  bathroomRange,
}: {
  bathroomRange: Ranges["bathrooms"];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousValuesRef = useRef<[number, number] | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const [sliderValues, setSliderValues] = useState<[number, number]>(() => {
    const minBathrooms = searchParams.get("min_bathrooms");
    const maxBathrooms = searchParams.get("max_bathrooms");

    return [
      minBathrooms ? parseInt(minBathrooms) : bathroomRange.min,
      maxBathrooms ? parseInt(maxBathrooms) : bathroomRange.max,
    ];
  });

  const handleChange = (newValues: [number, number]): void => {
    const updateURL = (newValues: [number, number]) => {
      const params = new URLSearchParams(searchParams.toString());

      // Only set params if they're different from defaults
      if (newValues[0] !== bathroomRange.min) {
        params.set("min_bathrooms", newValues[0].toString());
      } else {
        params.delete("min_bathrooms");
      }

      if (newValues[1] !== bathroomRange.max) {
        params.set("max_bathrooms", newValues[1].toString());
      } else {
        params.delete("max_bathrooms");
      }

      // Only reset to first page when bathroom VALUES actually change
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
    const minBathrooms = searchParams.get("min_bathrooms");
    const maxBathrooms = searchParams.get("max_bathrooms");

    const newValues: [number, number] = [
      minBathrooms ? parseInt(minBathrooms) : bathroomRange.min,
      maxBathrooms ? parseInt(maxBathrooms) : bathroomRange.max,
    ];

    setSliderValues(newValues);
  }, [searchParams, bathroomRange.min, bathroomRange.max]);

  // Check if values are different from defaults
  const isFiltered =
    sliderValues[0] !== bathroomRange.min ||
    sliderValues[1] !== bathroomRange.max;

  const getDisplayText = () => {
    if (!isFiltered) {
      return "Bathrooms";
    }
    if (sliderValues[0] === sliderValues[1]) {
      return `${sliderValues[0]} bathroom${sliderValues[0] === 1 ? "" : "s"}`;
    }
    return `${sliderValues[0]} - ${sliderValues[1]} bathrooms`;
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
                defaultValue={[bathroomRange.min, bathroomRange.max]}
                min={bathroomRange.min}
                max={bathroomRange.max}
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
