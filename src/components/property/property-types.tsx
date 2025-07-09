"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox-two";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PropertyMetadata } from "@/types/property";

export function PropertyTypes({
  typologies,
}: {
  typologies: PropertyMetadata["typologies"];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial selected types from URL (comma-separated values)
  const getInitialTypes = useCallback((): string[] => {
    const typologyParam = searchParams.get("typology");
    if (!typologyParam) return [];
    return typologyParam.split(",").filter(Boolean);
  }, [searchParams]);

  const [selectedItems, setSelectedItems] = useState<string[]>(getInitialTypes);

  // Update URL when selection changes
  const updateURL = (newSelection: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSelection.length > 0) {
      params.set("typology", newSelection.join(","));
    } else {
      params.delete("typology");
    }

    // Reset to first page when type changes
    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleCheckboxChange = (itemId: string, checked: boolean | string) => {
    let newSelection: string[];

    if (checked) {
      // Add to selection if not already present
      newSelection = selectedItems.includes(itemId)
        ? selectedItems
        : [...selectedItems, itemId];
    } else {
      // Remove from selection
      newSelection = selectedItems.filter((id) => id !== itemId);
    }

    setSelectedItems(newSelection);
    updateURL(newSelection);
  };

  // Sync with URL params when they change externally
  useEffect(() => {
    setSelectedItems(getInitialTypes());
  }, [getInitialTypes]);

  return (
    <div className="space-y-4">
      {typologies.map((typology, index) => (
        <div
          key={`${typology.id}-${index}`}
          className="flex justify-between items-center"
        >
          <div className="flex items-center space-x-3">
            <Checkbox
              id={`${typology.id}-${index}`}
              checked={selectedItems.includes(typology.id.toString())}
              onCheckedChange={(checked) =>
                handleCheckboxChange(typology.id.toString(), checked)
              }
              className={cn(
                "rounded-[3px] data-[state=checked]:!bg-primary data-[state=checked]:!border-primary bg-gray-400/70 border-gray-400/70",
                selectedItems.includes(typology.id.toString()) &&
                  "font-bold bg-primary"
              )}
              alwaysShowCheck={true}
              checkIconColor="white"
            />
            <Label
              htmlFor={`${typology.id}-${index}`}
              className={cn(
                "text-sm font-normal text-neutral-500",
                selectedItems.includes(typology.id.toString()) &&
                  "font-bold text-primary"
              )}
            >
              {typology.name}
            </Label>
          </div>
          <span className="text-sm font-bold">
            {/* You'll need to add total count to your typology data */}
          </span>
        </div>
      ))}
    </div>
  );
}