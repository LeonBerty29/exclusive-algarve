"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

interface BedroomOption {
  value: string;
  label: string;
  min: number;
}

interface BedroomsRange {
  min: number;
  max: number;
}

export function BedroomsDropdown({
  modal = true,
  bedroomsRange,
}: {
  modal?: boolean;
  bedroomsRange: BedroomsRange;
}) {

  console.log({bedroomsRange})
  const t = useTranslations("bedroomSelect");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Generate bedroom options based on the range
  const bedroomOptions: BedroomOption[] = useMemo(() => {
    const options: BedroomOption[] = [];
    for (let i = bedroomsRange.min; i <= bedroomsRange.max; i++) {
      options.push({
        value: i.toString(),
        label: `${i}+`,
        min: i,
      });
    }
    return options;
  }, [bedroomsRange]);

  // Determine current selected value based on URL params
  useEffect(() => {
    const minBedroom = searchParams.get("min_bedrooms");

    if (minBedroom) {
      const matchingOption = bedroomOptions.find(
        (option) => option.min === parseInt(minBedroom)
      );
      setSelectedValue(matchingOption ? matchingOption.value : "");
    } else {
      setSelectedValue("");
    }
  }, [searchParams, bedroomOptions]);

  const handleValueSelect = (value: string) => {
    // If clicking the same value, deselect it
    if (selectedValue === value) {
      setSelectedValue("");
      updateURL("");
    } else {
      setSelectedValue(value);
      updateURL(value);
    }
  };

  const updateURL = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove min_bedrooms parameter
    params.delete("min_bedrooms");

    if (value) {
      // Add new min_bedrooms parameter
      const selectedOption = bedroomOptions.find(
        (option) => option.value === value
      );
      if (selectedOption) {
        params.set("min_bedrooms", selectedOption.min.toString());
      }
    }

    // Reset to first page when filter changes
    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const getDisplayText = () => {
    if (!selectedValue) {
      return t("bedrooms");
    }

    const selectedOption = bedroomOptions.find(
      (option) => option.value === selectedValue
    );
    return selectedOption
      ? `${selectedOption.label} ${t("bedrooms").toLowerCase()}`
      : t("bedrooms");
  };

  return (
    <div className="space-y-4">
      <DropdownMenu modal={modal} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full min-h-[40px] justify-between text-left text-muted-foreground text-sm md:text-base font-normal"
          >
            {getDisplayText()}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-0" align="start">
          <Command>
            <CommandGroup>
              {bedroomOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleValueSelect(option.value)}
                  className="cursor-pointer text-base"
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedValue === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
