"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchInput(
  {className}: {className?: string}
) {
  // console.log("Rendering <SearchInput />")
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

    router.replace(`?${params.toString()}`);
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
    <div className="flex items-center gap-0 flex-nowrap w-full relative">
      <Input
        type="text"
        placeholder="Free search/Reference"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={cn("w-full border-transparent border-b-primary bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent rounded-none shadow-none min-h-[40px] text-white placeholder:text-white/70 placeholder:text-sm placeholder:md:text-base", className)}
      />
      <Button
        onClick={handleSearch}
        className="bg-primary hover:bg-primary/90 text-white absolute right-0 top-0 h-full"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
