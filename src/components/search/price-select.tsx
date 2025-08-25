"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Ranges } from "@/types/property";

interface PriceRange {
  min: number;
  max: number;
  label: string;
  value: string;
}

export function PriceSelect({ priceRange }: { priceRange: Ranges["price"] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Generate price ranges based on min and max values
  const priceRanges = useMemo((): PriceRange[] => {
    const ranges: PriceRange[] = [];
    const { min, max } = priceRange;

    // Add "Any Price" option
    ranges.push({
      min: min,
      max: max,
      label: "Any Price",
      value: "any",
    });

    // If min is less than 500k, add 0-500k range
    if (min < 500000) {
      const upperBound = Math.min(500000, max);
      ranges.push({
        min: min,
        max: upperBound,
        label: `0 to €500K`,
        value: `${min}-${upperBound}`,
      });
    }

    // Add 500k-1M if applicable
    if (max > 500000) {
      const lowerBound = Math.max(500000, min);
      const upperBound = Math.min(1000000, max);
      if (upperBound > lowerBound) {
        ranges.push({
          min: lowerBound,
          max: upperBound,
          label: `€500K - €1M`,
          value: `${lowerBound}-${upperBound}`,
        });
      }
    }

    // From 1M to 5M, increment by 1M
    for (let i = 1000000; i < Math.min(5000000, max); i += 1000000) {
      const lowerBound = Math.max(i, min);
      const upperBound = Math.min(i + 1000000, max);
      if (upperBound > lowerBound) {
        const lowerLabel = i / 1000000;
        const upperLabel = (i + 1000000) / 1000000;
        ranges.push({
          min: lowerBound,
          max: upperBound,
          label: `€${lowerLabel}M - €${upperLabel}M`,
          value: `${lowerBound}-${upperBound}`,
        });
      }
    }

    // From 5M to 15M, increment by 5M
    for (let i = 5000000; i < Math.min(15000000, max); i += 5000000) {
      const lowerBound = Math.max(i, min);
      const upperBound = Math.min(i + 5000000, max);
      if (upperBound > lowerBound) {
        const lowerLabel = i / 1000000;
        const upperLabel = (i + 5000000) / 1000000;
        ranges.push({
          min: lowerBound,
          max: upperBound,
          label: `€${lowerLabel}M - €${upperLabel}M`,
          value: `${lowerBound}-${upperBound}`,
        });
      }
    }

    // 15M+ if max is greater than 15M
    if (max > 15000000) {
      const lowerBound = Math.max(15000000, min);
      ranges.push({
        min: lowerBound,
        max: max,
        label: `€15M+`,
        value: `${lowerBound}-${max}`,
      });
    }

    return ranges;
  }, [priceRange.min, priceRange.max]);

  // Determine current selected value based on URL params
  useEffect(() => {
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");

    if (!minPrice && !maxPrice) {
      setSelectedValue("any");
      return;
    }

    const currentMin = minPrice ? parseInt(minPrice) : priceRange.min;
    const currentMax = maxPrice ? parseInt(maxPrice) : priceRange.max;

    // Find matching range
    const matchingRange = priceRanges.find(
      (range) => range.min === currentMin && range.max === currentMax
    );

    setSelectedValue(matchingRange?.value || "");
  }, [searchParams, priceRange.min, priceRange.max, priceRanges]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setOpen(false);

    const params = new URLSearchParams(searchParams.toString());

    if (value === "any") {
      // Remove price filters for "Any Price"
      params.delete("min_price");
      params.delete("max_price");
    } else {
      // Parse the selected range and set URL params
      const selectedRange = priceRanges.find((range) => range.value === value);
      if (selectedRange) {
        // Only set params if they're different from defaults
        if (selectedRange.min !== priceRange.min) {
          params.set("min_price", selectedRange.min.toString());
        } else {
          params.delete("min_price");
        }

        if (selectedRange.max !== priceRange.max) {
          params.set("max_price", selectedRange.max.toString());
        } else {
          params.delete("max_price");
        }
      }
    }

    // Reset to first page when filter changes
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getDisplayText = () => {
    if (!selectedValue || selectedValue === "any") {
      return "Price Range";
    }

    const selectedRange = priceRanges.find(
      (range) => range.value === selectedValue
    );
    return selectedRange?.label || "Price Range";
  };

  return (
    <div className="space-y-4">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full min-h-[40px] justify-between text-left font-normal text-gray-600"
          >
            {getDisplayText()}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-0" align="start">
          <Command>
            <CommandEmpty>No price range found.</CommandEmpty>
            <CommandGroup>
              {priceRanges.map((range) => (
                <CommandItem
                  key={range.value}
                  value={range.value}
                  onSelect={() => handleValueChange(range.value)}
                  className="cursor-pointer"
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedValue === range.value
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {range.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
