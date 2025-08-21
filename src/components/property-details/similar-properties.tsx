import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { getListOfProperties } from "@/data/property";
import { ProductCard } from "../product/product-card";
import Link from "next/link";

const SimilarProperties = async ({
  similarPropertiesId,
}: {
  similarPropertiesId: number[];
}) => {
  const propertiesResponse = await getListOfProperties(similarPropertiesId);
  const properties = propertiesResponse.data;

  return (
    <>
      <Carousel className="w-full flex gap-x-20 gap-y-8 flex-col relative">
        <div className="flex gap-5 justify-between items-end w-full px-4 md:px-10">
          <h3 className="text-3xl font-medium">
            SIMILAR <span className="text-primary">PROPERTIES</span> OF{" "}
            <span className="text-primary">INTEREST</span>
          </h3>

          <Button
            asChild
            className="bg-black text-white hover:opacity-85 text-xs order-3"
          >
            <Link href="/properties">VIEW ALL PROPERTIES</Link>
          </Button>
        </div>

        <div className="relative px-10">
          <div className="flex justify-between gap-3 items-center z-10 absolute top-4 left-0 right-0">
            <CarouselPrevious hideOnDisable={true} className="!static rounded-none !top-0 left-0! translate-x-0 translate-y-0 bg-primary text-white border-primary" />
            <CarouselNext hideOnDisable={true} className="ml-auto !static rounded-none !top-0 left-0! translate-x-0 translate-y-0 bg-primary text-white border-primary" />
          </div>
          <CarouselContent className="-ml-1 flex-1 w-full">
            {properties.map((property, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 ">
                <div className="p-1 py-0 max-w-[400px] mx-auto sm:max-w-full block">
                  <ProductCard property={property} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </>
  );
};

export default SimilarProperties;
