"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  //   DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ranges } from "@/types/property";

export function BedroomsDropdown({
  bedroomRange,
}: {
  bedroomRange: Ranges["bedrooms"];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousValuesRef = useRef<[number, number] | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const [selectedValues, setSelectedValues] = useState<[number, number]>(() => {
    const minBedrooms = searchParams.get("min_bedrooms");
    const maxBedrooms = searchParams.get("max_bedrooms");

    return [
      minBedrooms ? parseInt(minBedrooms) : bedroomRange.min,
      maxBedrooms ? parseInt(maxBedrooms) : bedroomRange.max,
    ];
  });

  const handleMinChange = (value: number) => {
    const newMax = Math.max(value, selectedValues[1]); // Ensure max is at least equal to min
    const newValues: [number, number] = [value, newMax];
    setSelectedValues(newValues);
    updateURL(newValues);
    setOpen(false); // Close dropdown after selection
  };

  const handleMaxChange = (value: number) => {
    const newMin = Math.min(selectedValues[0], value); // Ensure min is at most equal to max
    const newValues: [number, number] = [newMin, value];
    setSelectedValues(newValues);
    updateURL(newValues);
    setOpen(false); // Close dropdown after selection
  };

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

  useEffect(() => {
    const minBedrooms = searchParams.get("min_bedrooms");
    const maxBedrooms = searchParams.get("max_bedrooms");

    const newValues: [number, number] = [
      minBedrooms ? parseInt(minBedrooms) : bedroomRange.min,
      maxBedrooms ? parseInt(maxBedrooms) : bedroomRange.max,
    ];

    setSelectedValues(newValues);
  }, [searchParams, bedroomRange.min, bedroomRange.max]);

  // Generate options for min and max selects

  const generateOptions = () => {
    const options = [];
    for (let i = bedroomRange.min; i <= bedroomRange.max; i++) {
      options.push(i);
    }
    return options;
  };

  // Check if values are different from defaults
  const isFiltered =
    selectedValues[0] !== bedroomRange.min ||
    selectedValues[1] !== bedroomRange.max;

  const getDisplayText = () => {
    if (!isFiltered) {
      return "Bedrooms";
    }
    if (selectedValues[0] === selectedValues[1]) {
      return `${selectedValues[0]} bedroom${
        selectedValues[0] === 1 ? "" : "s"
      }`;
    }
    return `${selectedValues[0]} - ${selectedValues[1]} bedrooms`;
  };

  return (
    <div className="space-y-4">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full min-h-[40px] justify-between text-left font-normal overflow-hidden text-gray-600"
          >
            {getDisplayText()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-4" align="start">
          <Tabs defaultValue="min" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="min">Min</TabsTrigger>
              <TabsTrigger value="max">Max</TabsTrigger>
            </TabsList>

            <TabsContent value="min" className="space-y-2 mt-4">
              <div className="grid grid-cols-3 gap-2">
                {generateOptions().map((value) => (
                  <Button
                    key={value}
                    variant={
                      selectedValues[0] === value ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleMinChange(value)}
                    className="w-full"
                    disabled={value > selectedValues[1]}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="max" className="space-y-2 mt-4">
              <div className="grid grid-cols-3 gap-2">
                {generateOptions()
                  .toReversed()
                  .map((value) => (
                    <Button
                      key={value}
                      variant={
                        selectedValues[1] === value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleMaxChange(value)}
                      className="w-full"
                      disabled={value < selectedValues[0]}
                    >
                      {value}
                    </Button>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}