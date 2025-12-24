"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";


const FilterTags = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("filterTags");


  // Function to clear all filters
  const clearAllFilters = () => {
    router.push("/properties");
  };

  // Get active filters from URL search params
  const activeFilters = Array.from(searchParams.entries()).filter(
    ([key, value]) => {
      // Exclude pagination, sorting, and default values
      const excludeKeys = [
        "page",
        "per_page",
        "sort_by",
        "sort_direction",
        "language",
        "currency",
        "show_price",
      ];
      return (
        !excludeKeys.includes(key) &&
        value !== undefined &&
        value !== null &&
        value !== ""
      );
    }
  );

  // Check if we have price range
  const hasPriceRange =
    searchParams.get("min_price") || searchParams.get("max_price");

  return (
    <>
      {/* Clear All Button - Only show if there are active filters */}
      {(activeFilters.length > 0 || hasPriceRange) && (
        <Button
          className="text-red-600 font-semibold"
          variant="ghost"
          onClick={clearAllFilters}
        >
          <X className="h-4 w-4" strokeWidth={3} /> {t("resetFilters")}
        </Button>
      )}
    </>
  );
};

export default FilterTags;
