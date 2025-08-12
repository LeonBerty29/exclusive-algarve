"use client";
import { addToFavorite } from "@/actions/favorites";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { DeleteFromFavoriteButton } from "../product/remove-favorite-button";
import Link from "next/link";

export function AddToFavoriteButton({
  className,
  propertyId,
  reference,
  isFavourite,
}: {
  className?: string;
  propertyId: number;
  reference: string;
  isFavourite: boolean;
}) {
  const pathname = usePathname();
  const [state, formAction, isPending] = useActionState(addToFavorite, {});

  // Handle toast notifications based on state changes
  useEffect(() => {
    if (state.success) {
      toast.success(`${state.success}`);
    }
    if (state.error) {
      toast.error(`${state.error}`);
    }
    if (state.authenticated) {
      toast.error(`${state.authenticated}`, {
        duration: 2000,
        action: (
          <>
            {/* <label htmlFor=""></label> */}
            <Button asChild className="bg-primary text-white hover:bg-black">
              <Link href={"/login"}>Login</Link>
            </Button>
          </>
        ),
      });
    }
  }, [state.success, state.error, state.authenticated, reference]);

  return (
    <>
      {isFavourite && (
        <DeleteFromFavoriteButton
          propertyId={propertyId}
          reference={reference}
          className="size-8"
        />
      )}

      {!isFavourite && (
        <form action={formAction}>
          <input type="hidden" name="propertyId" value={propertyId} />
          <input type="hidden" name="pathName" value={pathname} />

          {isPending ? (
            <Button
              variant="outline"
              size="icon"
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
                "bg-white p-2 h-6 w-6 rounded-full hover:bg-gray-200",
                className
              )}
            >
              <Heart className="size-4 text-black" />
            </Button>
          )}
        </form>
      )}
    </>
  );
}
