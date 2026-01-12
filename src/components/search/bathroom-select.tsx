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

interface BathroomOption {
  value: string;
  label: string;
  min: number;
}

interface BathroomsRange {
  min: number;
  max: number;
}

export function BathroomsDropdown({
  modal = true,
  bathroomsRange,
}: {
  modal?: boolean;
  bathroomsRange: BathroomsRange;
}) {
  const t = useTranslations("bathroomSelect");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Generate bathroom options based on the range
  const bathroomOptions: BathroomOption[] = useMemo(() => {
    const options: BathroomOption[] = [];
    for (let i = bathroomsRange.min; i <= bathroomsRange.max; i++) {
      options.push({
        value: i.toString(),
        label: `${i}+`,
        min: i,
      });
    }
    return options;
  }, [bathroomsRange]);

  // Determine current selected value based on URL params
  useEffect(() => {
    const minBathroom = searchParams.get("min_bathrooms");

    if (minBathroom) {
      const matchingOption = bathroomOptions.find(
        (option) => option.min === parseInt(minBathroom)
      );
      setSelectedValue(matchingOption ? matchingOption.value : "");
    } else {
      setSelectedValue("");
    }
  }, [searchParams, bathroomOptions]);

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

    // Remove min_bathrooms parameter
    params.delete("min_bathrooms");

    if (value) {
      // Add new min_bathrooms parameter
      const selectedOption = bathroomOptions.find(
        (option) => option.value === value
      );
      if (selectedOption) {
        params.set("min_bathrooms", selectedOption.min.toString());
      }
    }

    // Reset to first page when filter changes
    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const getDisplayText = () => {
    if (!selectedValue) {
      return t("bathrooms");
    }

    const selectedOption = bathroomOptions.find(
      (option) => option.value === selectedValue
    );
    return selectedOption
      ? `${selectedOption.label} ${t("bathrooms").toLowerCase()}`
      : t("bathrooms");
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
              {bathroomOptions.map((option) => (
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
