"use client";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// interface FavoritesResponse {
//   favorite_properties: number[];
// }

export function DeleteFromFavoriteButton({
  propertyId,
  reference,
  className,
}: {
  propertyId: number;
  className?: string;
  reference: string;
}) {
  const [pending, setPending] = useState(false);
  const pathname = usePathname();

  const handleDeleteFavorite = async () => {
    setPending(true);

    try {
      const response = await fetch(
        `/api/favorites/${propertyId}?currentPath=${encodeURIComponent(
          pathname
        )}`, // This calls your Next.js API route
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = "Failed to remove favorite";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = `${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Handle 204 No Content (successful deletion)
      if (response.status === 204) {
        toast.success(`Successfully removed ${reference} from favorites`);
        return;
      }

      // For other successful responses with content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        // const result: FavoritesResponse = await response.json();
        // console.log("Removed from favourites", result);
        toast.success(`Successfully removed ${reference} from favorites`);
      } else {
        toast.success(`Successfully removed ${reference} from favorites`);
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
      // You might want to show a toast notification here
      toast.error(`Error deleting ${reference} from favorites`);
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
          className={cn(
            "bg-primary-foreground p-2 h-6 w-6 rounded-full",
            className
          )}
        >
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="default"
          className={cn(
            "bg-gray-200 p-2 h-6 w-6 rounded-full hover:bg-black",
            className
          )}
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
