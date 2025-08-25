"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { hasActiveFilters } from "@/lib/utils";
import { PropertySearchParams } from "@/types/property";

export const ClearHomeFilters = ({
  apiParams,
}: {
  apiParams: PropertySearchParams;
}) => {
  const router = useRouter();
  const clearAllFilters = () => {
    router.push("/");
  };
  const hasFilters = hasActiveFilters(apiParams);
  return (
    <Button
      className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors flex-1"
      onClick={clearAllFilters}
      disabled={!hasFilters}
    >
      Reset
    </Button>
  );
};
