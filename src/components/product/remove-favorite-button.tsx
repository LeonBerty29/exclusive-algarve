"use client";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";


interface FavoritesResponse {
  favorite_properties: number[];
}

export function DeleteFromFavoriteButton({
  propertyId,
  token,
  className
}: {
  propertyId: number;
  token: string | undefined;
  className?: string
}) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleDeleteFavorite = async () => {
    if (!token) {
      console.error("No token provided");
      return;
    }

    setPending(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${propertyId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove favorite");
      }

      const result: FavoritesResponse = await response.json();
      console.log("Removed from favourites", result);

      // Optionally refresh the page or update state
      router.refresh();
    } catch (error) {
      console.error("Error deleting favorite:", error);
      // You might want to show a toast notification here
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          disabled
          className={cn("bg-primary-foreground p-2 h-6 w-6 rounded-full", className)}
        >
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="default"
          className={cn("bg-gray-200 p-2 h-6 w-6 rounded-full hover:bg-black", className)}
          onClick={handleDeleteFavorite}
        >
          <Heart
            className="size-4 text-[#E21C49]"
            fill="#E21C49"
            strokeWidth={1}
          />
        </Button>
      )}
    </>
  );
}
