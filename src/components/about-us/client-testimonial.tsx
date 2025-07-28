import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTestimonials } from "@/data/testimonials";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const ClientTestimonial = () => {
  return (
    <div className="bg-neutral-800 text-white">
      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14">
        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full lg:w-[50%] md:pr-8 lg:pr-14">
            <h2 className="text-xl lg:text-2xl font-normal sm:max-w-70 mb-6">
              OUR <span className="text-primary">CLIENTS</span> <br />{" "}
              TESTIMONIALS
            </h2>
            <p className="text-white/70 text-sm xl:text-base mb-5">
              Exclusive Algarve Villas has won various awards over the years,
              from &quot;Best Real Estate Agency Website&quot; to{" "}
              <span className="text-white">
                &quot;Best Real Estate Agency Portugal&quot;
              </span>{" "}
              by the International Property Awards in London. Furthermore has
              also won an award in 2019 by Best Luxury Real Estate Agency 2019
              by Build Magazine.
            </p>
          </div>

          <Suspense fallback={<TestimonialLoadingSkeleton />}>
            <ClientTestimonialsCarousel />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonial;

async function ClientTestimonialsCarousel() {
  const response = await getTestimonials({
    per_page: 8,
  });

  const testimonials = response.data;

  return (
    <>
      <div className="lg:pl-3 w-full lg:w-[50%]">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-2">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:basis-1/2">
                <div className="p-1">
                  <Card className="rounded-none p-0">
                    <CardContent className="flex flex-col gap-6 justify-between aspect-square p-4 rounded-none">
                      <div className="flex-1 overflow-y-auto">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="!text-sm prose prose-sm max-w-none !text-neutral-800 line-clamp-[9]"
                              dangerouslySetInnerHTML={{
                                __html: testimonial.content,
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[500px] p-5">
                            <div
                              className="!text-sm prose prose-sm max-w-none !text-white"
                              dangerouslySetInnerHTML={{
                                __html: testimonial.content,
                              }}
                            />
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs text-neutral-800 line-clamp-1">
                          {testimonial.date}
                        </p>
                        <p className="text-xs text-black line-clamp-1 font-semibold uppercase">
                          {testimonial.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-18 flex items-center justify-end gap-3">
            <CarouselPrevious className="static rounded-none text-black" />
            <CarouselNext className="static rounded-none text-black" />
          </div>
        </Carousel>
      </div>
    </>
  );
}

const TestimonialLoadingSkeleton = () => {
  return (
    <div className="lg:pl-3 w-full lg:w-[50%]">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: false,
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="-ml-2">
          {[...Array(4)].map((_, index) => (
            <CarouselItem key={index} className="pl-2 md:basis-1/2">
              <div className="p-1">
                <Card className="rounded-none p-0">
                  <CardContent className="flex flex-col gap-6 justify-between aspect-square p-4 rounded-none">
                    <div className="flex-1 space-y-3">
                      {/* Content skeleton lines */}
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                      <Skeleton className="h-3 w-4/5" />
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-5/6" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* Date skeleton */}
                      <Skeleton className="h-3 w-16" />
                      {/* Name skeleton */}
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-18 flex items-center justify-end gap-3">
          <CarouselPrevious className="static rounded-none text-gray-300 cursor-not-allowed opacity-50" />
          <CarouselNext className="static rounded-none text-gray-300 cursor-not-allowed opacity-50" />
        </div>
      </Carousel>
    </div>
  );
};
