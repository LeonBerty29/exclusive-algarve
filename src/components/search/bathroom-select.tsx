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

interface BathroomOption {
  value: string;
  label: string;
  min: number;
}

export function BathroomsDropdown() {
  const t = useTranslations("bathroomSelect");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Static bathroom options
  const bathroomOptions: BathroomOption[] = [
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
    const minBathrooms = searchParams.get("min_bathrooms");

    if (minBathrooms) {
      const matchingOption = bathroomOptions.find(
        (option) => option.min === parseInt(minBathrooms)
      );
      return matchingOption?.value || "";
    }

    return "";
  };

  // Format display text for selected value
  const getDisplayText = () => {
    const currentValue = getCurrentValue();
    if (!currentValue) return t("bathrooms");

    const selectedOption = bathroomOptions.find(
      (option) => option.value === currentValue
    );

    return selectedOption
      ? `${selectedOption.label} ${t("bathrooms").toLowerCase()}`
      : t("bathrooms");
  };

  const handleSelection = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValue = getCurrentValue();

    // If clicking the same value, unselect it
    if (value === currentValue) {
      params.delete("min_bathrooms");
      params.delete("max_bathrooms");
    } else {
      const selectedOption = bathroomOptions.find(
        (option) => option.value === value
      );

      if (selectedOption) {
        params.set("min_bathrooms", selectedOption.min.toString());
        params.delete("max_bathrooms");
      }
    }

    // Reset to first page when filter changes
    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={getCurrentValue()}>
      <SelectTrigger className="w-full min-h-[40px] text-left text-muted-foreground text-sm md:text-base font-normal bg-white">
        <SelectValue placeholder={t("bathrooms")}>
          {getDisplayText()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {bathroomOptions.map((option) => (
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
