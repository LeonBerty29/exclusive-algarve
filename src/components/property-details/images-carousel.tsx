"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PropertyImage } from "@/types/property";
import Image from "next/image";
import { Button } from "../ui/button";

interface PropertyImageCarouselProps {
  images: PropertyImage[];
}

const PropertyImageCarousel: React.FC<PropertyImageCarouselProps> = ({
  images,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollToImage = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="flex gap-4 w-full h-fit">
      {/* Sidebar Thumbnails */}
      <div className="w-64 flex-shrink-0 overflow-y-auto hidden lg:block max-h-screen">
        <div className="flex flex-col gap-2 h-full">
          {images.map((image, index) => (
            <Button
              type="button"
              key={index}
              onClick={() => scrollToImage(index)}
              className={`relative w-full h-32 flex-shrink-0 cursor-pointer transition-all ${
                current === index
                  ? "ring-1 !ring-primary opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="w-full h-full object-cover"
              />
              {current === index && (
                <div className="absolute inset-0 border-1 border-primary pointer-events-none" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Carousel */}
      <div className="flex-1 relative">
        <Carousel setApi={setApi} className="w-full h-full">
          <CarouselContent className="h-[300px] md:h-[600px]">
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={image.url}
                    alt={`Property image ${index + 1}`}
                    fill
                    className="max-w-full max-h-full object-contain object-top"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-10">
          {current + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default PropertyImageCarousel;
