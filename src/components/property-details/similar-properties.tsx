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
      <Carousel className="w-full flex gap-x-20 gap-y-8 flex-col lg:flex-row relative lg:pl-[220px]">
        <div className="flex gap-5 justify-between flex-col max-w-[180px] h-full lg:absolute lg:top-0 lg:left-0 lg:bottom-0">
          <div className="flex gap-3 items-center order-4 lg:order-1">
            <CarouselPrevious className="!static rounded-none !top-0 left-0! translate-x-0 translate-y-0 bg-primary text-white border-primary" />
            <CarouselNext className="!static rounded-none !top-0 left-0! translate-x-0 translate-y-0 bg-primary text-white border-primary" />
          </div>

          <h3 className="text-3xl font-medium order-2">
            SIMILAR <span className="text-primary">PROPERTIES</span> OF{" "}
            <span className="text-primary">INTEREST</span>
          </h3>

          <Button
            asChild
            className="bg-black text-white hover:opacity-85 w-full text-xs order-3"
          >
            <Link href="/properties">VIEW ALL PROPERTIES</Link>
          </Button>
        </div>
        <CarouselContent className="-ml-1 flex-1">
          {properties.map((property, index) => (
            <CarouselItem
              key={index}
              className="pl-1 sm:basis-1/2 xl:basis-1/3"
            >
              <div className="p-1 py-0 max-w-[400px] mx-auto sm:max-w-full block">
                <ProductCard property={property} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default SimilarProperties;
