"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("search") || ""
  );

  // Update URL when search is performed
  const updateURL = (newSearchValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSearchValue.trim()) {
      params.set("search", newSearchValue.trim());
    } else {
      params.delete("search");
    }

    // Reset to first page when search changes
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSearch = () => {
    updateURL(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Sync with URL params when they change externally
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    setSearchValue(currentSearch);
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full px-2 border-transparent border-b-primary bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent rounded-none text-neutral-500 font-light text-sm placeholder:text-neutral-400"
        />
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
      </div>
      <Button
        onClick={handleSearch}
        className="bg-primary hover:bg-primary/90 text-white w-full"
      >
        Search
      </Button>
    </div>
  );
}
