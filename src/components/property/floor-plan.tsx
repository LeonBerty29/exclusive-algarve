import Image from "next/image";
import React from "react";
import { ArrowDownToLine } from "lucide-react";
import { Button } from "../ui/button";
import { PropertyImage } from "@/types/property";
import { getProxiedImageUrl } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const FloorPlanTab = ({
  floorPlans,
  pdfBrochure,
}: {
  floorPlans: PropertyImage[];
  pdfBrochure: string;
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfBrochure;
    link.download = "property-floor-plan.pdf";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {floorPlans.length > 1 && (
        <div className="px-3 relative w-full mb-6">
          <Carousel className="w-full">
            <CarouselContent>
              {floorPlans.map((floorPlan, index) => (
                <CarouselItem key={`${index}--floorPlan`}>
                  <div className="relative w-full aspect-video">
                    <Image
                      src={getProxiedImageUrl(floorPlan.url)}
                      alt={floorPlan.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      )}

      {pdfBrochure && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm md:text-lg text-primary font-semibold">
            Property Floor Plan
          </p>

          <Button
            onClick={handleDownload}
            className="text-xs rounded-none bg-black text-white px-6"
          >
            Download Brochure
            <ArrowDownToLine />
          </Button>
        </div>
      )}
    </div>
  );
};
