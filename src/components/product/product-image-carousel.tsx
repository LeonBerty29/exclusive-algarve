"use client";

import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { getProxiedImageUrl } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

export default function ProductImageCarousel({
  imagePaths,
}: {
  imagePaths: string[];
}) {
  // ref for the carousel container
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnMouseEnter: true,
    })
  );

  const handleMouseLeave = () => {
    plugin.current.play();
  };

  return (
    <div ref={carouselContainerRef} className="relative w-full h-full">
      <Carousel
        className="w-full"
        opts={{ loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent
          className="ml-0"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={handleMouseLeave}
        >
          {imagePaths?.slice(0, 4).map((item: string, index: number) => (
            <CarouselItem key={`${item}--${index}`} className="p-0">
              <div className="relative w-full h-full">
                {/* Image layer */}
                <div className="relative w-full aspect-4/3 md:aspect-video overflow-hidden">
                  <Image
                    src={getProxiedImageUrl(item)}
                    alt="Image of our property"
                    fill
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Control buttons */}
        <CarouselPrevious className="h-[28px] w-[28px] absolute left-0 top-1/2 -translate-y-1/2 hover:bg-gray-300 backdrop-blur-sm z-30 rounded-none bg-gray-300/75 border-gray-300/75 hover:border-gray-300 " />
        <CarouselNext className="h-[28px] w-[28px] absolute right-0 top-1/2 -translate-y-1/2 hover:bg-gray-300 backdrop-blur-sm z-30 rounded-none bg-gray-300/75 border-gray-300/75 hover:border-gray-300 " />
      </Carousel>
    </div>
  );
}
