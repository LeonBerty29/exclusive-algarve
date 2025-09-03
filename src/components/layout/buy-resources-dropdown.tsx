"use client";

import { useState, useEffect } from "react";
import { StoryblokRichTextNode } from "@storyblok/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  slug: string;
  name: string;
  content: {
    title: string;
    content: StoryblokRichTextNode<string | TrustedHTML>;
  };
  // Add other properties as needed
}

export function BuyResourcesDropdown({
  scrolled,
  colorChange,
}: {
  scrolled: boolean;
  colorChange?: boolean;
}) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch("/api/buy-resources");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResources(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch resources"
        );
        console.error("Error fetching resources:", err);
        throw new Error("Failed to fetch resources");
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  // console.log({ resources });

  const handleResourceClick = (slug: string) => {
    router.push(`/buy/${slug}`);
  };

  if (loading) {
    return <Skeleton className="h-6 w-10" />;
  }

  if (error) {
    return (
      <button
        className="px-4 py-2 border rounded-md bg-red-100 text-red-600"
        disabled
      >
        Error loading resources
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center space-x-1",
            scrolled
              ? "text-gray-600"
              : colorChange
              ? "text-white"
              : "text-gray-600"
          )}
        >
          Buy
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-3">
        {resources.length === 0 ? (
          <DropdownMenuItem disabled>No resources available</DropdownMenuItem>
        ) : (
          resources.map((resource) => (
            <DropdownMenuItem
              key={resource.id}
              onClick={() => handleResourceClick(resource.slug)}
              className="cursor-pointer py-3 hover:bg-gray-100 text-gray-800 border-b border-gray-200"
            >
              {resource.name}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
