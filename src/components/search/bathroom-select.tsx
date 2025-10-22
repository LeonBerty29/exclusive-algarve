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

export function BathroomsDropdown({
  bathroomRange,
  modal,
}: {
  bathroomRange: Ranges["bathrooms"];
  modal?: boolean;
}) {
  const t = useTranslations("bathroomSelect");
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousValuesRef = useRef<[number, number] | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const [selectedValues, setSelectedValues] = useState<[number, number]>(() => {
    const minBathrooms = searchParams.get("min_bathrooms");
    const maxBathrooms = searchParams.get("max_bathrooms");

    return [
      minBathrooms ? parseInt(minBathrooms) : bathroomRange.min,
      maxBathrooms ? parseInt(maxBathrooms) : bathroomRange.max,
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

    const previousValues = previousValuesRef.current;
    const valuesChanged =
      !previousValues ||
      previousValues[0] !== newValues[0] ||
      previousValues[1] !== newValues[1];

    if (valuesChanged && previousValues) {
      params.delete("page");
    }

    previousValuesRef.current = newValues;

    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    const minBathrooms = searchParams.get("min_bathrooms");
    const maxBathrooms = searchParams.get("max_bathrooms");

    const newValues: [number, number] = [
      minBathrooms ? parseInt(minBathrooms) : bathroomRange.min,
      maxBathrooms ? parseInt(maxBathrooms) : bathroomRange.max,
    ];

    setSelectedValues(newValues);
  }, [searchParams, bathroomRange.min, bathroomRange.max]);

  const generateOptions = () => {
    const options = [];
    for (let i = bathroomRange.min; i <= bathroomRange.max; i++) {
      options.push(i);
    }
    return options;
  };

  const isFiltered =
    selectedValues[0] !== bathroomRange.min ||
    selectedValues[1] !== bathroomRange.max;

  const getDisplayText = () => {
    if (!isFiltered) {
      return t("bathrooms");
    }
    if (selectedValues[0] === selectedValues[1]) {
      return `${selectedValues[0]} ${
        selectedValues[0] === 1 ? t("bathroom") : t("bathrooms")
      }`;
    }
    return `${selectedValues[0]} - ${selectedValues[1]} ${t("bathrooms")}`;
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