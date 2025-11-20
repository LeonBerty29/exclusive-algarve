"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BedroomOption {
  value: string;
  label: string;
  min: number;
}

export function BedroomsDropdown() {
  const t = useTranslations("bedroomSelect");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Static bedroom options
  const bedroomOptions: BedroomOption[] = [
    { value: "1", label: "1+", min: 1 },
    { value: "2", label: "2+", min: 2 },
    { value: "3", label: "3+", min: 3 },
    { value: "4", label: "4+", min: 4 },
    { value: "5", label: "5+", min: 5 },
    { value: "6", label: "6+", min: 6 },
    { value: "7", label: "7+", min: 7 },
    { value: "8", label: "8+", min: 8 },
    { value: "9", label: "9+", min: 9 },
    { value: "10", label: "10+", min: 10 },
  ];

  // Get current selected value from URL
  const getCurrentValue = () => {
    const minBedrooms = searchParams.get("min_bedrooms");

    if (minBedrooms) {
      const matchingOption = bedroomOptions.find(
        (option) => option.min === parseInt(minBedrooms)
      );
      return matchingOption?.value || "";
    }

    return "";
  };

  // Format display text for selected value
  const getDisplayText = () => {
    const currentValue = getCurrentValue();
    if (!currentValue) return t("bedrooms");

    const selectedOption = bedroomOptions.find(
      (option) => option.value === currentValue
    );

    return selectedOption
      ? `${selectedOption.label} ${t("bedrooms").toLowerCase()}`
      : t("bedrooms");
  };

  const handleSelection = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValue = getCurrentValue();

    // If clicking the same value, unselect it
    if (value === currentValue) {
      params.delete("min_bedrooms");
      params.delete("max_bedrooms");
    } else {
      const selectedOption = bedroomOptions.find(
        (option) => option.value === value
      );

      if (selectedOption) {
        params.set("min_bedrooms", selectedOption.min.toString());
        params.delete("max_bedrooms");
      }
    }

    // Reset to first page when filter changes
    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={getCurrentValue()}>
      <SelectTrigger className="w-full min-h-[40px] text-left text-muted-foreground text-sm md:text-base font-normal bg-white">
        <SelectValue placeholder={t("bedrooms")}>
          {getDisplayText()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {bedroomOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            onPointerDown={(e) => {
              e.preventDefault();
              handleSelection(option.value);
            }}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
