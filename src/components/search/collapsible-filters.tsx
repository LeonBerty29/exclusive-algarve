"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface CollapsibleFiltersProps {
  children: React.ReactNode;
  visibleCount?: number;
}

export const CollapsibleFilters = ({
  children,
  visibleCount = 4,
}: CollapsibleFiltersProps) => {
  const [showAll, setShowAll] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [originalTop, setOriginalTop] = useState<number>(0);

  const childrenArray = React.Children.toArray(children);

  // Determine visible count based on screen size
  const getVisibleCount = () => {
    if (isMobile) return 0; // Mobile uses sheet, so no visible filters in main layout
    if (isTablet) return 2; // md breakpoint shows 2
    return visibleCount; // lg+ breakpoint shows 4 (or custom visibleCount)
  };

  const currentVisibleCount = getVisibleCount();
  const visibleFilters = childrenArray.slice(0, currentVisibleCount);
  const hiddenFilters = childrenArray.slice(currentVisibleCount);

  // Click handler to toggle showing all filters
  const handleToggleFilters = () => {
    if (!isMobile) {
      setShowAll(!showAll);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Below md breakpoint
      setIsTablet(width >= 768 && width < 1024); // md to lg breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || originalTop === 0 || isMobile) return;

      const scrollY = window.scrollY;
      const triggerPoint = originalTop - 64; // Point where it should become fixed

      const shouldBeFixed = scrollY >= triggerPoint;

      if (shouldBeFixed !== isFixed) {
        setIsFixed(shouldBeFixed);
      }
    };

    // Set initial position
    if (containerRef.current && originalTop === 0) {
      const rect = containerRef.current.getBoundingClientRect();
      setOriginalTop(rect.top + window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed, originalTop, isMobile]);

  // Mobile Sheet Component
  const MobileFilterSheet = () => (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] p-5 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {childrenArray.map((child, index) => (
              <div key={index} className="relative">
                {child}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  // Sticky Trigger Component (when hidden)
  const StickyTrigger = () => (
    <div className="fixed top-16 right-6 sm:right-8 md:right-10 lg:right-14 z-[12]">
      <button
        onClick={() => setIsHidden(false)}
        className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-50 rounded-md shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
      </button>
    </div>
  );

  // Desktop/Tablet Filter Layout
  const DesktopFilters = () => (
    <>
      {/* Show sticky trigger when hidden and fixed */}
      {isFixed && isHidden && !isMobile && <StickyTrigger />}

      {/* Placeholder div to maintain layout when fixed */}
      {isFixed && !isMobile && !isHidden && (
        <div
          className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto pt-6 bg-transparent"
          style={{ height: containerRef.current?.offsetHeight || "auto" }}
        />
      )}

      <div
        ref={containerRef}
        className={`
          z-[11] 2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto pt-8 bg-amber-50 hidden md:block
          ${
            isFixed && !isMobile && !isHidden
              ? "fixed top-16 left-0 right-0"
              : ""
          }
          ${isFixed && isHidden ? "hidden" : ""}
        `}
      >
        {isFixed && !isMobile && !isHidden && (
          <div>
            {/* Hide button - only shown when fixed */}
            <div className="flex justify-start mb-4 absolute right-6 top-1.5 lg:top-2.5 ">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsHidden(true)}
                    className="flex items-center gap-2 px-1 py-1.5 text-xs font-bold text-gray-600 bg-transparent border-none hover:text-primary transition-colors"
                  >
                    <X className="w-4 h-4" strokeWidth={3} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-white bg-primary">
                  <p>Minimize filters</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Content wrapper when fixed */}
            <div className="w-full">
              {/* Always visible filters */}
              <div
                className={`grid gap-4 ${
                  isTablet ? "grid-cols-2" : "lg:grid-cols-4"
                }`}
              >
                {visibleFilters}
              </div>

              {/* Conditionally visible filters */}
              {showAll && hiddenFilters.length > 0 && (
                <div
                  className={`grid gap-4 mt-4 ${
                    isTablet ? "grid-cols-2" : "lg:grid-cols-4"
                  }`}
                >
                  {hiddenFilters}
                </div>
              )}

              {/* Toggle button */}
              {hiddenFilters.length > 0 && (
                <div className="flex justify-center mt-2 pb-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleToggleFilters}
                        className="flex items-center gap-2 px-0 py-0 text-sm font-medium text-gray-700 bg-transparent border-none rounded-md transition-colors hover:text-gray-900"
                      >
                        {showAll ? (
                          <>
                            <ChevronUp className="w-6 h-6" />
                            {/* <span>Show Less</span> */}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-6 h-6" />
                            {/* <span>More Filters</span> */}
                          </>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="text-white bg-primary">
                      <p>{showAll ? "Show Less" : "More Filters"}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        )}

        {!isFixed && (
          <>
            {/* Always visible filters */}
            <div
              className={`grid gap-4 ${
                isTablet ? "grid-cols-2" : "lg:grid-cols-4"
              }`}
            >
              {visibleFilters}
            </div>

            {/* Conditionally visible filters */}
            {showAll && hiddenFilters.length > 0 && (
              <div
                className={`grid gap-4 mt-4 ${
                  isTablet ? "grid-cols-2" : "lg:grid-cols-4"
                }`}
              >
                {hiddenFilters}
              </div>
            )}

            {/* Toggle button */}
            {hiddenFilters.length > 0 && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={handleToggleFilters}
                  className="flex items-center gap-2 px-0 py-0 text-sm font-medium text-gray-700 bg-transparent border-none rounded-md transition-colors hover:text-gray-900"
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="w-6 h-6" />
                      {/* <span>Show Less</span> */}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-6 h-6" />
                      {/* <span>More Filters</span> */}
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      <MobileFilterSheet />
      <DesktopFilters />
    </>
  );
};
