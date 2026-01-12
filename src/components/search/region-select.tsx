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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LocationArea, Municipality, Zone } from "@/types/property";
import { useTranslations } from "next-intl";

interface LocationOption {
  id: number;
  name: string;
  type: "area" | "zone";
  displayName: string;
  areaId?: number;
}

interface RegionSelectProps {
  areas: LocationArea[];
  modal?: boolean;
}

export default function RegionSelect({
  areas,
  modal = true,
}: RegionSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const t = useTranslations("regionSelect");

  const buildLocationOptions = (): LocationOption[] => {
    const options: LocationOption[] = [];

    areas?.forEach((area: LocationArea) => {
      options.push({
        id: area.id,
        name: area.name,
        type: "area",
        displayName: `${area.name} (${area.property_count})`,
      });

      area.municipalities?.forEach((municipality: Municipality) => {
        municipality.zones?.forEach((zone: Zone) => {
          options.push({
            id: zone.id,
            name: zone.name,
            type: "zone",
            displayName: `  ${zone.name} (${zone.property_count})`,
            areaId: area.id,
          });
        });
      });
    });

    return options;
  };

  const locationOptions = buildLocationOptions();

  const getInitialSelections = (): {
    areas: number[];
    zones: number[];
  } => {
    const areaIds =
      searchParams
        .get("location_area")
        ?.split(",")
        .map(Number)
        .filter(Boolean) || [];
    const zoneIds =
      searchParams.get("zone")?.split(",").map(Number).filter(Boolean) || [];

    return { areas: areaIds, zones: zoneIds };
  };

  const [selectedLocations, setSelectedLocations] =
    useState(getInitialSelections);

  const getAreaZones = (areaId: number): LocationOption[] => {
    return locationOptions.filter(
      (option) => option.type === "zone" && option.areaId === areaId
    );
  };

  const areAllZonesSelected = (areaId: number): boolean => {
    const zones = getAreaZones(areaId);
    return (
      zones.length > 0 &&
      zones.every((zone) => selectedLocations.zones.includes(zone.id))
    );
  };

  const isLocationEffectivelySelected = (option: LocationOption): boolean => {
    switch (option.type) {
      case "area":
        return (
          selectedLocations.areas.includes(option.id) ||
          areAllZonesSelected(option.id)
        );
      case "zone":
        return (
          selectedLocations.zones.includes(option.id) ||
          (option.areaId !== undefined &&
            selectedLocations.areas.includes(option.areaId))
        );
      default:
        return false;
    }
  };

  const optimizeSelections = (selections: {
    areas: number[];
    zones: number[];
  }): { areas: number[]; zones: number[] } => {
    const optimized = { ...selections };

    areas?.forEach((area) => {
      const zones = getAreaZones(area.id);
      if (
        zones.length > 0 &&
        zones.every((zone) => optimized.zones.includes(zone.id)) &&
        !optimized.areas.includes(area.id)
      ) {
        optimized.areas = [...optimized.areas, area.id];
        optimized.zones = optimized.zones.filter(
          (id) => !zones.some((zone) => zone.id === id)
        );
      }
    });

    return optimized;
  };

  const updateURL = (newSelections: { areas: number[]; zones: number[] }) => {
    const optimizedSelections = optimizeSelections(newSelections);
    const params = new URLSearchParams(searchParams.toString());

    if (optimizedSelections.areas.length > 0) {
      params.set("location_area", optimizedSelections.areas.join(","));
    } else {
      params.delete("location_area");
    }

    if (optimizedSelections.zones.length > 0) {
      params.set("zone", optimizedSelections.zones.join(","));
    } else {
      params.delete("zone");
    }

    params.delete("municipality");
    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleLocationSelect = (option: LocationOption): void => {
    const newSelections = { ...selectedLocations };
    const isCurrentlySelected = isLocationEffectivelySelected(option);

    if (isCurrentlySelected) {
      switch (option.type) {
        case "area":
          newSelections.areas = newSelections.areas.filter(
            (id) => id !== option.id
          );
          const zones = getAreaZones(option.id);
          newSelections.zones = newSelections.zones.filter(
            (id) => !zones.some((zone) => zone.id === id)
          );
          break;

        case "zone":
          const parentArea = option.areaId;

          if (
            parentArea !== undefined &&
            selectedLocations.areas.includes(parentArea)
          ) {
            newSelections.areas = newSelections.areas.filter(
              (id) => id !== parentArea
            );

            const areaZones = getAreaZones(parentArea);
            areaZones.forEach((zone) => {
              if (zone.id !== option.id) {
                newSelections.zones.push(zone.id);
              }
            });
          } else {
            newSelections.zones = newSelections.zones.filter(
              (id) => id !== option.id
            );
          }
          break;
      }
    } else {
      switch (option.type) {
        case "area":
          newSelections.areas = [...newSelections.areas, option.id];
          const zones = getAreaZones(option.id);
          zones.forEach((zone) => {
            newSelections.zones = newSelections.zones.filter(
              (id) => id !== zone.id
            );
          });
          break;
        case "zone":
          newSelections.zones = [...newSelections.zones, option.id];
          break;
      }
    }

    setSelectedLocations(newSelections);
    updateURL(newSelections);
  };

  const getSelectedItems = (): LocationOption[] => {
    const selected: LocationOption[] = [];

    selectedLocations.areas.forEach((areaId) => {
      const area = locationOptions.find(
        (option) => option.type === "area" && option.id === areaId
      );
      if (area) selected.push(area);
    });

    selectedLocations.zones.forEach((zoneId) => {
      const zone = locationOptions.find(
        (option) => option.type === "zone" && option.id === zoneId
      );
      if (zone) selected.push(zone);
    });

    return selected;
  };

  useEffect(() => {
    setSelectedLocations(getInitialSelections());
  }, [searchParams]);

  const selectedItems = getSelectedItems();

  return (
    <div className="w-full">
      <DropdownMenu modal={modal} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-[40px] h-auto"
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {selectedItems.length === 0 ? (
                <span className="text-muted-foreground text-sm md:text-base font-normal">
                  {t("selectLocations")}
                </span>
              ) : (
                <span className="text-sm md:text-base font-normal">
                  {t("selectedLocations")}
                </span>
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-80 p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search locations..." />
            <CommandList>
              <CommandEmpty>{t("noLocations")}</CommandEmpty>
              <CommandGroup>
                {locationOptions.map((option) => {
                  const optionKey = `${option.type}-${option.id}`;
                  const isSelected = isLocationEffectivelySelected(option);

                  return (
                    <CommandItem
                      key={optionKey}
                      value={option.name}
                      onSelect={() => {
                        handleLocationSelect(option);
                      }}
                      className={cn(
                        "flex items-center justify-between cursor-pointer",
                        isSelected && "font-medium"
                      )}
                    >
                      <span className="whitespace-pre">
                        {option.displayName}
                      </span>
                      {isSelected && (
                        <Check className="ml-2 h-4 w-4 text-primary" />
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
