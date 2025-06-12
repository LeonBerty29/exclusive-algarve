// CustomTabs.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PropertyInfo } from "./property-info";
import { FloorPlanTab } from "./floor-plan";
import { LocationTab } from "./location-tab";

const ScrollableTabs = () => {
  const description = `<p>This gated condominium is ideally located 3 minutes by car from the center of the village, the beaches and the shops.<br> In the village of Ferragudo, in a residential area composed exclusively of villas, it benefits from an unobstructed view and incom- parable luminosity, a privileged, calm and soothing environment, close to the communication axes.<p><br>
      <p>This secure complexe consists of 38 apartments with one to three bedrooms spread over two buildings, and offering high-end services, making quality of life and comfort its priorities.</p><br>
      <p>The entire design of the residence is based on one essential objective, the quality of life of its inhabitants.</p><br>
      <p>It benefits from an ideal exposure, its hallways serve 2 to 3 apartments maximum which are generally apartments with double expositions, the intimate secluded terraces benefit from an unobstructed view. Designed to ensure comfort and well-being, the apartments all have generous interior and exterior surfaces, an optimized interior layout and quality equipment.</p>
      `;
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
            <div className="min-h-32  p-4 space-y-6">
              <PropertyInfo />
              <DescriptionContent description={description} />
            </div>
          </TabsContent>
          <TabsContent
            value={"features"}
            className="mt-4 p-4 border rounded-md px-8"
          >
            <div className="min-h-32  p-4">
              <PropertyInfo />
              {/* <PropertyFeatures /> */}
            </div>
          </TabsContent>

          <TabsContent
            value={"fplan"}
            className="mt-4 p-4 border rounded-md px-8"
          >
            <div className="min-h-32  p-4">
              <PropertyInfo />
              <FloorPlanTab />
            </div>
          </TabsContent>

          <TabsContent
            value={"location"}
            className="mt-4 p-4 border rounded-md px-8"
          >
            <div className="min-h-32  p-4">
              <PropertyInfo />
              <LocationTab />
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
    <div
      dangerouslySetInnerHTML={{ __html: description }}
      className="!text-sm"
    />
  );
};