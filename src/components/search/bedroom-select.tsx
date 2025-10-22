"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ranges } from "@/types/property";
import { useTranslations } from "next-intl";

export function BedroomsDropdown({
  bedroomRange,
  modal = true,
}: {
  bedroomRange: Ranges["bedrooms"];
  modal?: boolean;
}) {
  const t = useTranslations("bedroomSelect");
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
    const newMax = Math.max(value, selectedValues[1]);
    const newValues: [number, number] = [value, newMax];
    setSelectedValues(newValues);
    updateURL(newValues);
    setOpen(false);
  };

  const handleMaxChange = (value: number) => {
    const newMin = Math.min(selectedValues[0], value);
    const newValues: [number, number] = [newMin, value];
    setSelectedValues(newValues);
    updateURL(newValues);
    setOpen(false);
  };

  const updateURL = (newValues: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());

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

    const previousValues = previousValuesRef.current;
    const valuesChanged =
      !previousValues ||
      previousValues[0] !== newValues[0] ||
      previousValues[1] !== newValues[1];

    if (valuesChanged && previousValues) {
      params.delete("page");
    }

    previousValuesRef.current = newValues;

    router.replace(`?${params.toString()}`, { scroll: false });
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

  const generateOptions = () => {
    const options = [];
    for (let i = bedroomRange.min; i <= bedroomRange.max; i++) {
      options.push(i);
    }
    return options;
  };

  const isFiltered =
    selectedValues[0] !== bedroomRange.min ||
    selectedValues[1] !== bedroomRange.max;

  const getDisplayText = () => {
    if (!isFiltered) {
      return t("bedrooms");
    }
    if (selectedValues[0] === selectedValues[1]) {
      return `${selectedValues[0]} ${t("bedroom", {
        count: selectedValues[0],
      })}`; // count used only in UI, not in translations string
    }
    return `${selectedValues[0]} - ${selectedValues[1]} ${t("bedrooms")}`;
  };

  return (
    <div className="space-y-4">
      <DropdownMenu modal={modal} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full min-h-[40px] justify-between text-left font-normal overflow-hidden text-muted-foreground text-sm md:text-base"
          >
            {getDisplayText()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-4" align="start">
          <Tabs defaultValue="min" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="min">{t("min")}</TabsTrigger>
              <TabsTrigger value="max">{t("max")}</TabsTrigger>
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