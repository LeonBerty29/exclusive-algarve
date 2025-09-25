"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "@/components/ui/button";

import { useSearchParams } from "next/navigation";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export const PropertyNotesWrapperDialog = ({
  children,
  propertyId,
  reference,
  styleClassname,
  customTrigger,
}: {
  children: React.ReactNode;
  propertyId: number;
  reference: string;
  styleClassname?: string;
  customTrigger?: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const addNote = searchParams.get("addNote");
  const isDefaultOpen = addNote === propertyId.toString();

  return (
    <>
      <Dialog defaultOpen={isDefaultOpen}>
        <DialogTrigger asChild>
          {customTrigger || (
            <Button
              className={cn(
                "bg-transparent hover:bg-transparent !p-0 h-6 w-6  shadow-2xl cursor-pointer",
                styleClassname
              )}
              type="button"
              asChild
            >
              <Pencil className="h-5 w-5 text-white shadow-2xl" />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a note for property {reference}</DialogTitle>
            <DialogDescription>
              You can keep a note for this property.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Suspense fallback={<Skeleton className="w-full h-32" />}>
              {children}
            </Suspense>
          </div>
          <div className="flex justify-center pt-3">
            <Link
              href="/annotations"
              className="text-gray-600 font-semibold hover:underline hover:text-black"
            >
              View all of your Notes
            </Link>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="px-0 underline hover:text-primary bg-transparent hover:bg-transparent"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
