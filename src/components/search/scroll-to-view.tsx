"use client";

import { useEffect } from "react";

export function ScrollToFilters() {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const searchSection = document.getElementById("search-filters-section");
      if (searchSection) {
        const elementPosition = searchSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 80;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}