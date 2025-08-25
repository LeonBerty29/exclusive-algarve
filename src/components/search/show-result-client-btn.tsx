"use client";

import { Button } from "../ui/button";
import { HOME_SEARCH_RESULT_ID } from "@/config/constants";

interface ScrollToResultsButtonProps {
  total: number;
  hasFilters: boolean;
}

export function ScrollToResultsButton({
  total,
  hasFilters,
}: ScrollToResultsButtonProps) {
  const handleScrollToResults = () => {
    const resultsElement = document.getElementById(HOME_SEARCH_RESULT_ID);
    if (resultsElement) {
      resultsElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {hasFilters ? (
        <Button
          className="bg-primary border border-primary hover:border-primary/80 text-white hover:bg-primary/80 flex-1"
          disabled={total === 0 || !total}
          onClick={handleScrollToResults}
        >
          Show Result ({total})
        </Button>
      ) : (
        <Button
          className="bg-primary border border-primary hover:border-primary/80 text-white hover:bg-primary/80 flex-1"
          disabled={true}
        >
          Show Result
        </Button>
      )}
    </>
  );
}
