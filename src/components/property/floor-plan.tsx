import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowDownToLine } from "lucide-react";
import { Button } from "../ui/button";

export const FloorPlanTab = () => {
  const imgSrc = "/images/property-floor-plan-image.png";
  return (
    <div>
      <div className="px-3">
        <Image
          src={imgSrc}
          alt="floor plan"
          height={300}
          width={300}
          className="object-contain !h-auto !w-full"
        />
      </div>

      <Separator className="bg-gray-300 mb-5" />

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm md:text-lg text-primary font-semibold">
          Property Floor Plan
        </p>

        <Button className="text-xs rounded-none bg-black text-white px-6">
          DOWNLOAD
          <ArrowDownToLine />
        </Button>
      </div>
    </div>
  );
};
