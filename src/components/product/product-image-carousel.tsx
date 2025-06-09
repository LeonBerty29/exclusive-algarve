'use client'

import { useEffect, useState, useRef } from 'react';
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel";
import Image from "next/image";




export default function ProductImageCarousel({ imagePaths }: { imagePaths: string[] }) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoPlayInterval = 3000;
    const carouselRef = useRef(null);


    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on("select", onSelect);

        // Set initial index
        setCurrent(api.selectedScrollSnap());

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);


    useEffect(() => {
        if (!api || isPaused) return;


        const interval = setInterval(() => {
            api.scrollNext();
        }, autoPlayInterval);


        return () => clearInterval(interval);
    }, [api, isPaused, autoPlayInterval]);


    const goToSlide = (index: number) => {
        if (api) {
            api.scrollTo(index);
        }
    };


    const handleMouseEnter = () => {
        setIsPaused(true);
    };


    const handleMouseLeave = () => {
        setIsPaused(false);
    };


    return (
        <div
            className="relative w-full h-full"
            ref={carouselRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Carousel
                className="w-full"
                opts={{ loop: true }}
                setApi={setApi}
            >
                <CarouselContent className="ml-0">
                    {imagePaths?.map((item: string, index: number) => (
                        <CarouselItem key={`${item}--${index}`} className="p-0 h-[220px]">
                            <div className="relative w-full h-full">
                                {/* Image layer */}
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={item}
                                        alt='Image of our ptoperty'
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                        priority
                                    />
                                    {/* Shadow overlay */}
                                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Control buttons */}
                <CarouselPrevious className="h-[28px] w-[28px] absolute left-0 top-1/2 -translate-y-1/2 hover:bg-gray-300 backdrop-blur-sm z-30 rounded-none bg-gray-300/75 border-gray-300/75 hover:border-gray-300 " />
                <CarouselNext className="h-[28px] w-[28px] absolute right-0 top-1/2 -translate-y-1/2 hover:bg-gray-300 backdrop-blur-sm z-30 rounded-none bg-gray-300/75 border-gray-300/75 hover:border-gray-300 " />
            </Carousel>

            {/* Circular Pagination - Centered */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2 z-30 bg-black px-2 py-1">
                {imagePaths.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`rounded-full transition-all duration-300 ${current === index
                                ? "w-[6px] h-[6px] bg-primary"
                                : "w-[5px] h-[5px] bg-white/50 hover:bg-white/70"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

