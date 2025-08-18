// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   Command,
//   CommandInput,
//   CommandList,
//   CommandEmpty,
//   CommandGroup,
// } from "@/components/ui/command";
// import { CommandItem } from "@/components/ui/command-two";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//   PropertyMetadata,
//   LocationArea,
//   Municipality,
//   Zone,
// } from "@/types/property";

// interface LocationOption {
//   id: number;
//   name: string;
//   type: "area" | "municipality" | "zone";
//   displayName: string;
//   parentId?: number;
// }

// interface RegionSelectProps {
//   metadata: PropertyMetadata;
// }

// export default function RegionSelect({ metadata }: RegionSelectProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [open, setOpen] = useState(false);
//   const [hovering, setHovering] = useState<string>("");

//   // Build flattened location options from metadata
//   const buildLocationOptions = (): LocationOption[] => {
//     const options: LocationOption[] = [];

//     metadata.areas?.forEach((area: LocationArea) => {
//       // Add area
//       options.push({
//         id: area.id,
//         name: area.name,
//         type: "area",
//         displayName: `${area.name} (${area.property_count} properties)`,
//       });

//       // Add municipalities
//       area.municipalities?.forEach((municipality: Municipality) => {
//         options.push({
//           id: municipality.id,
//           name: municipality.name,
//           type: "municipality",
//           displayName: `  ${municipality.name} (${municipality.property_count} properties)`,
//           parentId: area.id,
//         });

//         // Add zones
//         municipality.zones?.forEach((zone: Zone) => {
//           options.push({
//             id: zone.id,
//             name: zone.name,
//             type: "zone",
//             displayName: `    ${zone.name} (${zone.property_count} properties)`,
//             parentId: municipality.id,
//           });
//         });
//       });
//     });

//     return options;
//   };

//   const locationOptions = buildLocationOptions();

//   // Helper functions to get children/parent relationships
//   const getZonesInMunicipality = (municipalityId: number): Zone[] => {
//     const zones: Zone[] = [];
//     metadata.areas?.forEach((area) => {
//       area.municipalities?.forEach((municipality) => {
//         if (municipality.id === municipalityId) {
//           zones.push(...(municipality.zones || []));
//         }
//       });
//     });
//     return zones;
//   };

//   const getZonesInArea = (areaId: number): Zone[] => {
//     const zones: Zone[] = [];
//     metadata.areas?.forEach((area) => {
//       if (area.id === areaId) {
//         area.municipalities?.forEach((municipality) => {
//           zones.push(...(municipality.zones || []));
//         });
//       }
//     });
//     return zones;
//   };

//   const getMunicipalitiesInArea = (areaId: number): Municipality[] => {
//     const municipalities: Municipality[] = [];
//     metadata.areas?.forEach((area) => {
//       if (area.id === areaId) {
//         municipalities.push(...(area.municipalities || []));
//       }
//     });
//     return municipalities;
//   };

//   const getParentMunicipality = (zoneId: number): Municipality | undefined => {
//     for (const area of metadata.areas || []) {
//       for (const municipality of area.municipalities || []) {
//         if (municipality.zones?.some((zone) => zone.id === zoneId)) {
//           return municipality;
//         }
//       }
//     }
//     return undefined;
//   };

//   const getParentArea = (municipalityId: number): LocationArea | undefined => {
//     for (const area of metadata.areas || []) {
//       if (
//         area.municipalities?.some(
//           (municipality) => municipality.id === municipalityId
//         )
//       ) {
//         return area;
//       }
//     }
//     return undefined;
//   };

//   // Get initial selected zones from URL (only zones now)
//   const getInitialSelections = (): number[] => {
//     const zones =
//       searchParams.get("zone")?.split(",").map(Number).filter(Boolean) || [];
//     return zones;
//   };

//   const [selectedZones, setSelectedZones] =
//     useState<number[]>(getInitialSelections);

//   // Check if a location is selected (based on zone selections)
//   const isLocationSelected = (option: LocationOption): boolean => {
//     switch (option.type) {
//       case "zone":
//         return selectedZones.includes(option.id);
//       case "municipality":
//         const municipalityZones = getZonesInMunicipality(option.id);
//         return (
//           municipalityZones.length > 0 &&
//           municipalityZones.every((zone) => selectedZones.includes(zone.id))
//         );
//       case "area":
//         const areaZones = getZonesInArea(option.id);
//         return (
//           areaZones.length > 0 &&
//           areaZones.every((zone) => selectedZones.includes(zone.id))
//         );
//       default:
//         return false;
//     }
//   };

//   // Update URL with selected zones only
//   const updateURL = (zones: number[]) => {
//     const params = new URLSearchParams(searchParams.toString());

//     if (zones.length > 0) {
//       params.set("zone", zones.join(","));
//     } else {
//       params.delete("zone");
//     }

//     // Clean up old parameters
//     params.delete("location_area");
//     params.delete("municipality");
//     params.delete("page");

//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   // Handle location selection/deselection with hierarchical logic
//   const handleLocationSelect = (option: LocationOption): void => {
//     let newSelectedZones = [...selectedZones];

//     switch (option.type) {
//       case "zone":
//         if (newSelectedZones.includes(option.id)) {
//           // Deselect zone
//           newSelectedZones = newSelectedZones.filter((id) => id !== option.id);
//         } else {
//           // Select zone
//           newSelectedZones.push(option.id);
//         }
//         break;

//       case "municipality":
//         const municipalityZones = getZonesInMunicipality(option.id);
//         const allMunicipalityZonesSelected = municipalityZones.every((zone) =>
//           newSelectedZones.includes(zone.id)
//         );

//         if (allMunicipalityZonesSelected) {
//           // Deselect all zones in this municipality
//           const municipalityZoneIds = municipalityZones.map((zone) => zone.id);
//           newSelectedZones = newSelectedZones.filter(
//             (id) => !municipalityZoneIds.includes(id)
//           );
//         } else {
//           // Select all zones in this municipality
//           const municipalityZoneIds = municipalityZones.map((zone) => zone.id);
//           municipalityZoneIds.forEach((zoneId) => {
//             if (!newSelectedZones.includes(zoneId)) {
//               newSelectedZones.push(zoneId);
//             }
//           });
//         }
//         break;

//       case "area":
//         const areaZones = getZonesInArea(option.id);
//         const allAreaZonesSelected = areaZones.every((zone) =>
//           newSelectedZones.includes(zone.id)
//         );

//         if (allAreaZonesSelected) {
//           // Deselect all zones in this area
//           const areaZoneIds = areaZones.map((zone) => zone.id);
//           newSelectedZones = newSelectedZones.filter(
//             (id) => !areaZoneIds.includes(id)
//           );
//         } else {
//           // Select all zones in this area
//           const areaZoneIds = areaZones.map((zone) => zone.id);
//           areaZoneIds.forEach((zoneId) => {
//             if (!newSelectedZones.includes(zoneId)) {
//               newSelectedZones.push(zoneId);
//             }
//           });
//         }
//         break;
//     }

//     setSelectedZones(newSelectedZones);
//     updateURL(newSelectedZones);
//   };

//   // Sync with URL params when they change externally
//   useEffect(() => {
//     setSelectedZones(getInitialSelections());
//   }, [searchParams]);

//   // Create a unique key for each option
//   const getOptionKey = (option: LocationOption): string => {
//     return `${option.type}-${option.id}`;
//   };

//   // Get display text for the combobox button
//   const getDisplayText = (): string => {
//     if (selectedZones.length === 0) {
//       return "Select locations...";
//     }

//     // Check if entire areas are selected
//     const selectedAreas =
//       metadata.areas?.filter((area) => {
//         const areaZones = getZonesInArea(area.id);
//         return (
//           areaZones.length > 0 &&
//           areaZones.every((zone) => selectedZones.includes(zone.id))
//         );
//       }) || [];

//     // Check if entire municipalities are selected (but not their parent areas)
//     const selectedMunicipalities: Municipality[] = [];
//     metadata.areas?.forEach((area) => {
//       area.municipalities?.forEach((municipality) => {
//         const municipalityZones = getZonesInMunicipality(municipality.id);
//         const isEntireMunicipalitySelected =
//           municipalityZones.length > 0 &&
//           municipalityZones.every((zone) => selectedZones.includes(zone.id));
//         const isParentAreaSelected = selectedAreas.some(
//           (selectedArea) => selectedArea.id === area.id
//         );

//         if (isEntireMunicipalitySelected && !isParentAreaSelected) {
//           selectedMunicipalities.push(municipality);
//         }
//       });
//     });

//     // Count individual zones (not part of selected municipalities/areas)
//     let individualZoneCount = 0;
//     selectedZones.forEach((zoneId) => {
//       const parentMunicipality = getParentMunicipality(zoneId);
//       const parentArea = parentMunicipality
//         ? getParentArea(parentMunicipality.id)
//         : undefined;

//       const isPartOfSelectedArea =
//         parentArea && selectedAreas.some((area) => area.id === parentArea.id);
//       const isPartOfSelectedMunicipality =
//         parentMunicipality &&
//         selectedMunicipalities.some(
//           (municipality) => municipality.id === parentMunicipality.id
//         );

//       if (!isPartOfSelectedArea && !isPartOfSelectedMunicipality) {
//         individualZoneCount++;
//       }
//     });

//     const parts: string[] = [];
//     if (selectedAreas.length > 0) {
//       parts.push(
//         `${selectedAreas.length} area${selectedAreas.length > 1 ? "s" : ""}`
//       );
//     }
//     if (selectedMunicipalities.length > 0) {
//       parts.push(
//         `${selectedMunicipalities.length} municipality${
//           selectedMunicipalities.length > 1 ? "ies" : "y"
//         }`
//       );
//     }
//     if (individualZoneCount > 0) {
//       parts.push(
//         `${individualZoneCount} zone${individualZoneCount > 1 ? "s" : ""}`
//       );
//     }

//     return parts.join(", ") + " selected";
//   };

//   return (
//     <div className="w-full">
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-full justify-between bg-gray-100 border-0 rounded-none hover:bg-gray-200"
//           >
//             {getDisplayText()}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-0" align="start">
//           <Command className="border-none">
//             <CommandInput
//               className="border-none"
//               placeholder="Search locations..."
//             />
//             <CommandList>
//               <CommandEmpty>No results found.</CommandEmpty>
//               <CommandGroup
//                 className={cn(
//                   !hovering && "[&_[cmdk-item][data-selected]]:bg-transparent"
//                 )}
//               >
//                 {locationOptions.map((option) => {
//                   const optionKey = getOptionKey(option);
//                   const isSelected = isLocationSelected(option);

//                   return (
//                     <CommandItem
//                       key={optionKey}
//                       onSelect={() => handleLocationSelect(option)}
//                       className={cn(
//                         "flex items-center justify-between hover:bg-slate-50",
//                         optionKey === hovering && "hover:bg-slate-50",
//                         isSelected &&
//                           "font-bold text-primary hover:text-primary [&_[cmdk-item][data-selected]]:text-primary",
//                         optionKey === hovering && isSelected && "text-primary",
//                         // Different styling for different levels
//                         option.type === "area" && "font-semibold",
//                         option.type === "municipality" && "text-sm",
//                         option.type === "zone" && "text-xs text-gray-600"
//                       )}
//                       onMouseEnter={() => {
//                         setHovering(optionKey);
//                       }}
//                       onMouseLeave={() => {
//                         setHovering("");
//                       }}
//                     >
//                       <span className="whitespace-pre">
//                         {option.displayName}
//                       </span>
//                       {isSelected && (
//                         <Check
//                           className="h-4 w-4 text-primary"
//                           strokeWidth={4}
//                         />
//                       )}
//                     </CommandItem>
//                   );
//                 })}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, } from "lucide-react";
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
  municipalityId?: number; // For zones to track their municipality
  areaId?: number; // For municipalities and zones to track their area
}

interface RegionSelectProps {
  metadata: PropertyMetadata;
}

export default function RegionSelect({ metadata }: RegionSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // Build flattened location options from metadata with parent relationships
  const buildLocationOptions = (): LocationOption[] => {
    const options: LocationOption[] = [];

    metadata.areas?.forEach((area: LocationArea) => {
      // Add area
      options.push({
        id: area.id,
        name: area.name,
        type: "area",
        displayName: `${area.name} (${area.property_count})`,
      });

      // Add municipalities
      area.municipalities?.forEach((municipality: Municipality) => {
        options.push({
          id: municipality.id,
          name: municipality.name,
          type: "municipality",
          displayName: `  ${municipality.name} (${municipality.property_count})`,
          parentId: area.id,
          areaId: area.id,
        });

        // Add zones
        municipality.zones?.forEach((zone: Zone) => {
          options.push({
            id: zone.id,
            name: zone.name,
            type: "zone",
            displayName: `    ${zone.name} (${zone.property_count})`,
            parentId: municipality.id,
            municipalityId: municipality.id,
            areaId: area.id,
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

  // Helper functions to get children and check completeness
  const getAreaMunicipalities = (areaId: number): LocationOption[] => {
    return locationOptions.filter(
      (option) => option.type === "municipality" && option.areaId === areaId
    );
  };

  const getMunicipalityZones = (municipalityId: number): LocationOption[] => {
    return locationOptions.filter(
      (option) =>
        option.type === "zone" && option.municipalityId === municipalityId
    );
  };

  const areAllMunicipalitiesSelected = (areaId: number): boolean => {
    const municipalities = getAreaMunicipalities(areaId);
    return municipalities.every((mun) =>
      selectedLocations.municipalities.includes(mun.id)
    );
  };

  const areAllZonesSelected = (municipalityId: number): boolean => {
    const zones = getMunicipalityZones(municipalityId);
    return zones.every((zone) => selectedLocations.zones.includes(zone.id));
  };

  // Check if a location should appear selected (including hierarchical selections)
  const isLocationEffectivelySelected = (option: LocationOption): boolean => {
    switch (option.type) {
      case "area":
        return (
          selectedLocations.areas.includes(option.id) ||
          areAllMunicipalitiesSelected(option.id)
        );
      case "municipality":
        return (
          selectedLocations.municipalities.includes(option.id) ||
          (option.areaId !== undefined &&
            selectedLocations.areas.includes(option.areaId)) ||
          areAllZonesSelected(option.id)
        );
      case "zone":
        return (
          selectedLocations.zones.includes(option.id) ||
          (option.municipalityId !== undefined &&
            selectedLocations.municipalities.includes(option.municipalityId)) ||
          (option.areaId !== undefined &&
            selectedLocations.areas.includes(option.areaId))
        );
      default:
        return false;
    }
  };

  // Optimize selections by consolidating children into parents when all are selected
  const optimizeSelections = (selections: {
    areas: number[];
    municipalities: number[];
    zones: number[];
  }): { areas: number[]; municipalities: number[]; zones: number[] } => {
    const optimized = { ...selections };
    let hasChanges = true;

    // Keep optimizing until no more changes are made (recursive optimization)
    while (hasChanges) {
      hasChanges = false;
      const previousState = JSON.stringify(optimized);

      // First pass: Check each municipality - if all zones are selected, consolidate to municipality
      locationOptions
        .filter((option) => option.type === "municipality")
        .forEach((municipality) => {
          const zones = getMunicipalityZones(municipality.id);
          if (
            zones.length > 0 &&
            zones.every((zone) => optimized.zones.includes(zone.id)) &&
            !optimized.municipalities.includes(municipality.id) &&
            municipality.areaId !== undefined &&
            !optimized.areas.includes(municipality.areaId)
          ) {
            // All zones selected and municipality not already selected and area not selected
            optimized.municipalities = [
              ...optimized.municipalities,
              municipality.id,
            ];
            optimized.zones = optimized.zones.filter(
              (id) => !zones.some((zone) => zone.id === id)
            );
          }
        });

      // Second pass: Check each area - if all municipalities are selected, consolidate to area
      metadata.areas?.forEach((area) => {
        const municipalities = getAreaMunicipalities(area.id);
        if (
          municipalities.length > 0 &&
          municipalities.every((mun) =>
            optimized.municipalities.includes(mun.id)
          ) &&
          !optimized.areas.includes(area.id)
        ) {
          // All municipalities selected and area not already selected, consolidate to area
          optimized.areas = [...optimized.areas, area.id];
          optimized.municipalities = optimized.municipalities.filter(
            (id) => !municipalities.some((mun) => mun.id === id)
          );

          // Also remove any remaining zones from those municipalities
          municipalities.forEach((mun) => {
            const zones = getMunicipalityZones(mun.id);
            optimized.zones = optimized.zones.filter(
              (id) => !zones.some((zone) => zone.id === id)
            );
          });
        }
      });

      // Check if any changes were made in this iteration
      if (JSON.stringify(optimized) !== previousState) {
        hasChanges = true;
      }
    }

    return optimized;
  };

  // Update URL with optimized selections
  const updateURL = (newSelections: {
    areas: number[];
    municipalities: number[];
    zones: number[];
  }) => {
    const optimizedSelections = optimizeSelections(newSelections);
    const params = new URLSearchParams(searchParams.toString());

    // Update location_area parameter
    if (optimizedSelections.areas.length > 0) {
      params.set("location_area", optimizedSelections.areas.join(","));
    } else {
      params.delete("location_area");
    }

    // Update municipality parameter
    if (optimizedSelections.municipalities.length > 0) {
      params.set("municipality", optimizedSelections.municipalities.join(","));
    } else {
      params.delete("municipality");
    }

    // Update zone parameter
    if (optimizedSelections.zones.length > 0) {
      params.set("zone", optimizedSelections.zones.join(","));
    } else {
      params.delete("zone");
    }

    // Reset to first page when location changes
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle location selection/deselection with hierarchical logic
  const handleLocationSelect = (option: LocationOption): void => {
    const newSelections = { ...selectedLocations };
    const isCurrentlySelected = isLocationEffectivelySelected(option);

    if (isCurrentlySelected) {
      // Deselecting - handle hierarchical deselection
      switch (option.type) {
        case "area":
          // Remove area and all its children
          newSelections.areas = newSelections.areas.filter(
            (id) => id !== option.id
          );

          // Add back individual municipalities/zones if they were implicitly selected
          const municipalities = getAreaMunicipalities(option.id);
          municipalities.forEach((mun) => {
            if (!newSelections.municipalities.includes(mun.id)) {
              // Check if this municipality should remain selected via its zones
              const zones = getMunicipalityZones(mun.id);
              if (zones.some((zone) => newSelections.zones.includes(zone.id))) {
                // Some zones are selected, so add the municipality if all zones were selected
                if (
                  zones.every((zone) => newSelections.zones.includes(zone.id))
                ) {
                  newSelections.municipalities.push(mun.id);
                  // Remove the individual zones since we now have the municipality
                  newSelections.zones = newSelections.zones.filter(
                    (id) => !zones.some((zone) => zone.id === id)
                  );
                }
              }
            }
          });
          break;

        case "municipality":
          if (
            option.areaId !== undefined &&
            selectedLocations.areas.includes(option.areaId)
          ) {
            // Parent area is selected, need to deselect area and select remaining municipalities
            newSelections.areas = newSelections.areas.filter(
              (id) => id !== option.areaId
            );

            const siblings = getAreaMunicipalities(option.areaId);
            siblings.forEach((sibling) => {
              if (sibling.id !== option.id) {
                newSelections.municipalities.push(sibling.id);
              }
            });
          } else {
            // Just remove the municipality
            newSelections.municipalities = newSelections.municipalities.filter(
              (id) => id !== option.id
            );
          }

          // Remove all zones of this municipality
          const zones = getMunicipalityZones(option.id);
          newSelections.zones = newSelections.zones.filter(
            (id) => !zones.some((zone) => zone.id === id)
          );
          break;

        case "zone":
          const parentMunicipality = option.municipalityId;
          const parentArea = option.areaId;

          if (
            parentArea !== undefined &&
            selectedLocations.areas.includes(parentArea)
          ) {
            // Parent area is selected, need to break it down
            newSelections.areas = newSelections.areas.filter(
              (id) => id !== parentArea
            );

            const areaMunicipalities = getAreaMunicipalities(parentArea);
            areaMunicipalities.forEach((mun) => {
              if (mun.id === parentMunicipality) {
                // Add all zones except the one being deselected
                const munZones = getMunicipalityZones(mun.id);
                munZones.forEach((zone) => {
                  if (zone.id !== option.id) {
                    newSelections.zones.push(zone.id);
                  }
                });
              } else {
                // Add the municipality
                newSelections.municipalities.push(mun.id);
              }
            });
          } else if (
            parentMunicipality !== undefined &&
            selectedLocations.municipalities.includes(parentMunicipality)
          ) {
            // Parent municipality is selected, need to break it down
            newSelections.municipalities = newSelections.municipalities.filter(
              (id) => id !== parentMunicipality
            );

            const munZones = getMunicipalityZones(parentMunicipality);
            munZones.forEach((zone) => {
              if (zone.id !== option.id) {
                newSelections.zones.push(zone.id);
              }
            });
          } else {
            // Just remove the zone
            newSelections.zones = newSelections.zones.filter(
              (id) => id !== option.id
            );
          }
          break;
      }
    } else {
      // Selecting - add to appropriate array
      switch (option.type) {
        case "area":
          newSelections.areas = [...newSelections.areas, option.id];
          // Remove any individual municipalities and zones from this area
          const municipalities = getAreaMunicipalities(option.id);
          municipalities.forEach((mun) => {
            newSelections.municipalities = newSelections.municipalities.filter(
              (id) => id !== mun.id
            );
            const zones = getMunicipalityZones(mun.id);
            zones.forEach((zone) => {
              newSelections.zones = newSelections.zones.filter(
                (id) => id !== zone.id
              );
            });
          });
          break;
        case "municipality":
          newSelections.municipalities = [
            ...newSelections.municipalities,
            option.id,
          ];
          // Remove any individual zones from this municipality
          const zones = getMunicipalityZones(option.id);
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

  // Get selected items for display
  const getSelectedItems = (): LocationOption[] => {
    const selected: LocationOption[] = [];

    selectedLocations.areas.forEach((areaId) => {
      const area = locationOptions.find(
        (option) => option.type === "area" && option.id === areaId
      );
      if (area) selected.push(area);
    });

    selectedLocations.municipalities.forEach((munId) => {
      const municipality = locationOptions.find(
        (option) => option.type === "municipality" && option.id === munId
      );
      if (municipality) selected.push(municipality);
    });

    selectedLocations.zones.forEach((zoneId) => {
      const zone = locationOptions.find(
        (option) => option.type === "zone" && option.id === zoneId
      );
      if (zone) selected.push(zone);
    });

    return selected;
  };

  // Remove a specific selection
  // const removeSelection = (item: LocationOption) => {
  //   handleLocationSelect(item);
  // };

  // Sync with URL params when they change externally
  useEffect(() => {
    setSelectedLocations(getInitialSelections());
  }, [searchParams]);

  const selectedItems = getSelectedItems();

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-[40px] h-auto"
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {selectedItems.length === 0 ? (
                <span className="text-muted-foreground">
                  Select locations...
                </span>
              ) : (
                <span>
                  Selected locations
                </span>
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search locations..." />
            <CommandList>
              <CommandEmpty>No locations found.</CommandEmpty>
              <CommandGroup>
                {locationOptions.map((option) => {
                  const optionKey = `${option.type}-${option.id}`;
                  const isSelected = isLocationEffectivelySelected(option);

                  return (
                    <CommandItem
                      key={optionKey}
                      onSelect={() => {
                        handleLocationSelect(option);
                        // Don't close the popover to allow multiple selections
                      }}
                      className={cn(
                        "flex items-center justify-between cursor-pointer",
                        isSelected && "font-medium",
                        option.type === "area" && "font-semibold",
                        option.type === "municipality" && "text-sm",
                        option.type === "zone" && "text-xs text-gray-600"
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
