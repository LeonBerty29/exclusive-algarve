"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox-two";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ItemsType {
  id: string;
  label: string;
  total: number;
}

const items: ItemsType[] = [
  {
    id: "Villa",
    label: "Modern Villas",
    total: 30,
  },
  {
    id: "Villa",
    label: "Villa",
    total: 4,
  },
  {
    id: "Townhouse",
    label: "Townhouse",
    total: 100,
  },
  {
    id: "Apartment",
    label: "Apartment",
    total: 10,
  },
  {
    id: "Plot",
    label: "Plot",
    total: 26,
  },
];

export function PropertyTypes() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial selected type from URL (single value)
  const getInitialType = (): string => {
    return searchParams.get("type") || "";
  };

  const [selectedItem, setSelectedItem] = useState<string>(getInitialType);

  // Update URL when selection changes
  const updateURL = (newSelection: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSelection) {
      params.set("type", newSelection);
    } else {
      params.delete("type");
    }

    // Reset to first page when type changes
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCheckboxChange = (itemId: string, checked: boolean | string) => {
    const newSelection = checked ? itemId : "";
    setSelectedItem(newSelection);
    updateURL(newSelection);
  };

  // Sync with URL params when they change externally
  useEffect(() => {
    setSelectedItem(getInitialType());
  }, [searchParams]);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="flex justify-between items-center"
        >
          <div className="flex items-center space-x-3">
            <Checkbox
              id={`${item.id}-${index}`}
              checked={selectedItem === item.id}
              onCheckedChange={(checked) =>
                handleCheckboxChange(item.id, checked)
              }
              className={cn(
                "rounded-[3px] data-[state=checked]:!bg-primary data-[state=checked]:!border-primary bg-gray-400/70 border-gray-400/70",
                selectedItem === item.id && "font-bold bg-primary"
              )}
              alwaysShowCheck={true}
              checkIconColor="white"
            />
            <Label
              htmlFor={`${item.id}-${index}`}
              className={cn(
                "text-sm font-normal text-neutral-500",
                selectedItem === item.id && "font-bold text-primary"
              )}
            >
              {item.label}
            </Label>
          </div>
          <span className="text-sm font-bold">{item.total}</span>
        </div>
      ))}
    </div>
  );
}
