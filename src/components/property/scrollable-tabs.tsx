// CustomTabs.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
// import { PropertyInfo } from "./property-info";
import { FloorPlanTab } from "./floor-plan";
import { LocationTab } from "./location-tab";
import { PropertyFeatures } from "../property-details/PropertyFeatures";
import { Property } from "@/types/property";

interface ScrollableTabsProps {
  property: Property;
}

const ScrollableTabs = ({ property }: ScrollableTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("desc");
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);
  const tabsListRef = useRef<HTMLDivElement>(null);

  // Check if scroll navigation is needed
  const checkScroll = useCallback(() => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      setShowLeftArrow(scrollLeft > 5); // Show left arrow if scrolled more than 5px
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // Hide right arrow when near the end
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkScroll();

    // Add event listener for scroll
    const tabsList = tabsListRef.current;
    if (tabsList) {
      tabsList.addEventListener("scroll", checkScroll);
      // Also check on window resize
      window.addEventListener("resize", checkScroll);

      return () => {
        tabsList.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll]);

  // Scroll navigation functions
  const scrollLeft = useCallback(() => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative w-full flex items-center">
            {/* Left scroll button - positioned outside TabsList */}
            <button
              onClick={scrollLeft}
              className={`flex-shrink-0 p-1 rounded-full shadow-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 z-10 mr-1 ${
                showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
              } transition-opacity duration-200`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* TabsList with full width */}
            <div className="flex-grow overflow-hidden">
              <TabsList
                ref={tabsListRef}
                className="w-full overflow-x-auto scrollbar-hide pl-1 pr-1 flex justify-start"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <TabsTrigger
                  value={"desc"}
                  className="whitespace-nowrap mx-1 first:ml-0 last:mr-0"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value={"features"}
                  className="whitespace-nowrap mx-1 first:ml-0 last:mr-0"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value={"fplan"}
                  className="whitespace-nowrap mx-1 first:ml-0 last:mr-0"
                >
                  Floor Plan
                </TabsTrigger>
                <TabsTrigger
                  value={"location"}
                  className="whitespace-nowrap mx-1 first:ml-0 last:mr-0"
                >
                  Location
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Right scroll button - positioned outside TabsList */}
            <button
              onClick={scrollRight}
              className={`flex-shrink-0 p-1 rounded-full shadow-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 z-10 ml-1 ${
                showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
              } transition-opacity duration-200`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Tab contents */}
          <TabsContent
            value={"desc"}
            className="mt-4 p-4 border rounded-md px-8"
          >
            <div className="min-h-32 p-4 space-y-6">
              {/* <PropertyInfo property={property} /> */}
              <DescriptionContent description={property.description} />
            </div>
          </TabsContent>
          <TabsContent
            value={"features"}
            className="mt-4 p-4 border rounded-md px-8"
          >
            <div className="min-h-32 p-4">
              {/* <PropertyInfo property={property} /> */}
              <PropertyFeatures
                additionalFeatures={property.additional_features}
              />
            </div>
          </TabsContent>

          <TabsContent
            value={"fplan"}
            className="mt-4 p-4 border rounded-md px-8"
          >
            <div className="p-4">
              {/* <PropertyInfo property={property} /> */}
              <FloorPlanTab floorPlans={property.assets.images.floor_plans} pdfBrochure={property.assets.pdf_brochure} />
            </div>
          </TabsContent>

          <TabsContent
            value={"location"}
            className="mt-4 p-4 border rounded-md px-8"
          >
            <div className="min-h-32 p-4">
              {/* <PropertyInfo property={property} /> */}
              <LocationTab
                latitude={property.location.latitude}
                longitude={property.location.longitude}
                drivingDistances={property.driving_distances}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ScrollableTabs;

const DescriptionContent = ({ description }: { description: string }) => {
  return (
    <div className="!text-sm prose prose-sm max-w-none">{description}</div>
  );
};
