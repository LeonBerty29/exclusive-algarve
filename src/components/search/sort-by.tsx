"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const sortOptions = [
  {
    value: "created_at_desc",
    label: "Most Recent",
    sortBy: "created_at",
    sortDirection: "desc",
  },
  {
    value: "created_at_asc",
    label: "Oldest",
    sortBy: "created_at",
    sortDirection: "asc",
  },
  {
    value: "price_desc",
    label: "Price: High to Low",
    sortBy: "price",
    sortDirection: "desc",
  },
  {
    value: "price_asc",
    label: "Price: Low to High",
    sortBy: "price",
    sortDirection: "asc",
  },
];

export const SortBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial sort value from URL (default to "created_at_desc")
  const getInitialSort = (): string => {
    const sortBy = searchParams.get("sort_by") || "created_at";
    const sortDirection = searchParams.get("sort_direction") || "desc";
    return `${sortBy}_${sortDirection}`;
  };

  const [selectedSort, setSelectedSort] = useState<string>(getInitialSort);

  // Update URL when sort selection changes
  const updateURL = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const selectedOption = sortOptions.find(
      (option) => option.value === sortValue
    );

    if (selectedOption) {
      // Only set params if not default values
      if (
        selectedOption.sortBy !== "created_at" ||
        selectedOption.sortDirection !== "desc"
      ) {
        params.set("sort_by", selectedOption.sortBy);
        params.set("sort_direction", selectedOption.sortDirection);
      } else {
        // Remove params if default values
        params.delete("sort_by");
        params.delete("sort_direction");
      }
    }

    // Reset to first page when sort changes
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    updateURL(value);
  };

  // Sync with URL params when they change externally
  useEffect(() => {
    const currentSortBy = searchParams.get("sort_by") || "created_at";
    const currentSortDirection = searchParams.get("sort_direction") || "desc";
    const currentSort = `${currentSortBy}_${currentSortDirection}`;
    setSelectedSort(currentSort);
  }, [searchParams]);

  return (
    <Select value={selectedSort} onValueChange={handleSortChange}>
      <SelectTrigger
        className="w-[180px] data-[placeholder]:text-primary"
        iconColor="text-white"
      >
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
