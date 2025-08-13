"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { CommandItem } from "@/components/ui/command-two";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PropertyMetadata,
  LocationArea,
  Municipality,
  Zone,
} from "@/types/property";

interface LocationOption {
  id: number;
  name: string;
  type: "area" | "municipality" | "zone";
  displayName: string;
  parentId?: number;
}

interface RegionSelectProps {
  metadata: PropertyMetadata;
}

export default function RegionSelect({ metadata }: RegionSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hovering, setHovering] = useState<string>("");

  // Build flattened location options from metadata
  const buildLocationOptions = (): LocationOption[] => {
    const options: LocationOption[] = [];

    metadata.areas?.forEach((area: LocationArea) => {
      // Add area
      options.push({
        id: area.id,
        name: area.name,
        type: "area",
        displayName: `${area.name} (${area.property_count} properties)`,
      });

      // Add municipalities
      area.municipalities?.forEach((municipality: Municipality) => {
        options.push({
          id: municipality.id,
          name: municipality.name,
          type: "municipality",
          displayName: `  ${municipality.name} (${municipality.property_count} properties)`,
          parentId: area.id,
        });

        // Add zones
        municipality.zones?.forEach((zone: Zone) => {
          options.push({
            id: zone.id,
            name: zone.name,
            type: "zone",
            displayName: `    ${zone.name} (${zone.property_count} properties)`,
            parentId: municipality.id,
          });
        });
      });
    });

    return options;
  };

  const locationOptions = buildLocationOptions();

  // Get initial selected locations from URL
  const getInitialSelections = (): {
    areas: number[];
    municipalities: number[];
    zones: number[];
  } => {
    const areas =
      searchParams
        .get("location_area")
        ?.split(",")
        .map(Number)
        .filter(Boolean) || [];
    const municipalities =
      searchParams
        .get("municipality")
        ?.split(",")
        .map(Number)
        .filter(Boolean) || [];
    const zones =
      searchParams.get("zone")?.split(",").map(Number).filter(Boolean) || [];

    return { areas, municipalities, zones };
  };

  const [selectedLocations, setSelectedLocations] =
    useState(getInitialSelections);

  // Check if a location is selected
  const isLocationSelected = (option: LocationOption): boolean => {
    switch (option.type) {
      case "area":
        return selectedLocations.areas.includes(option.id);
      case "municipality":
        return selectedLocations.municipalities.includes(option.id);
      case "zone":
        return selectedLocations.zones.includes(option.id);
      default:
        return false;
    }
  };

  // Update URL with new selections
  const updateURL = (newSelections: {
    areas: number[];
    municipalities: number[];
    zones: number[];
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update location_area parameter
    if (newSelections.areas.length > 0) {
      params.set("location_area", newSelections.areas.join(","));
    } else {
      params.delete("location_area");
    }

    // Update municipality parameter
    if (newSelections.municipalities.length > 0) {
      params.set("municipality", newSelections.municipalities.join(","));
    } else {
      params.delete("municipality");
    }

    // Update zone parameter
    if (newSelections.zones.length > 0) {
      params.set("zone", newSelections.zones.join(","));
    } else {
      params.delete("zone");
    }

    // Reset to first page when location changes
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle location selection/deselection
  const handleLocationSelect = (option: LocationOption): void => {
    const newSelections = { ...selectedLocations };

    switch (option.type) {
      case "area":
        if (newSelections.areas.includes(option.id)) {
          newSelections.areas = newSelections.areas.filter(
            (id) => id !== option.id
          );
        } else {
          newSelections.areas = [...newSelections.areas, option.id];
        }
        break;
      case "municipality":
        if (newSelections.municipalities.includes(option.id)) {
          newSelections.municipalities = newSelections.municipalities.filter(
            (id) => id !== option.id
          );
        } else {
          newSelections.municipalities = [
            ...newSelections.municipalities,
            option.id,
          ];
        }
        break;
      case "zone":
        if (newSelections.zones.includes(option.id)) {
          newSelections.zones = newSelections.zones.filter(
            (id) => id !== option.id
          );
        } else {
          newSelections.zones = [...newSelections.zones, option.id];
        }
        break;
    }

    setSelectedLocations(newSelections);
    updateURL(newSelections);
  };

  // Sync with URL params when they change externally
  useEffect(() => {
    setSelectedLocations(getInitialSelections());
  }, [searchParams]);

  // Create a unique key for each option
  const getOptionKey = (option: LocationOption): string => {
    return `${option.type}-${option.id}`;
  };

  return (
    <div className="w-full bg-white">
      <Command className="border-none [&_[cmdk-input-wrapper]]:bg-gray-100 [&_[cmdk-input-wrapper]]:border-0 [&_[cmdk-input-wrapper]]:rounded-none rounded-none">
        <CommandInput
          className="border-none bg-gray-100 rounded-none"
          inputContainerColor="bg-gray-100"
          placeholder="Search locations..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup
            className={cn(
              !hovering && "[&_[cmdk-item][data-selected]]:bg-transparent"
            )}
          >
            {locationOptions.map((option) => {
              const optionKey = getOptionKey(option);
              const isSelected = isLocationSelected(option);

              return (
                <CommandItem
                  key={optionKey}
                  onSelect={() => handleLocationSelect(option)}
                  className={cn(
                    "flex items-center justify-between hover:bg-red-200",
                    optionKey === hovering && "hover:bg-slate-50",
                    isSelected &&
                      "font-bold text-primary hover:text-primary [&_[cmdk-item][data-selected]]:text-primary",
                    optionKey === hovering && isSelected && "text-primary",
                    // Different styling for different levels
                    option.type === "area" && "font-semibold",
                    option.type === "municipality" && "text-sm",
                    option.type === "zone" && "text-xs text-gray-600"
                  )}
                  onMouseEnter={() => {
                    setHovering(optionKey);
                  }}
                  onMouseLeave={() => {
                    setHovering("");
                  }}
                >
                  <span className="whitespace-pre">{option.displayName}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary" strokeWidth={4} />
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
