import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "../product/product-card";
import { Button } from "../ui/button";
import { Home as HomeType } from "@/types";

const SimilarProperties = () => {
  const home: HomeType = {
    imagePaths: [
      "/images/lifestyle-img1.png",
      "/images/lifestyle-img2.png",
      "/images/lifestyle-img3.png",
      "/images/lifestyle-img4.png",
      "/images/lifestyle-img5.png",
    ],
    description:
      " your private 1-bedroom villa in Seminyak, featuring a lush garden, refreshing pool, and serene ambiance. This stylish retreat boasts a fully equipped kitchen, an elegant living room, and a spacious ensuite bedroom, perfect for a relaxing getaway. Enjoy total privacy while being just minutes from Seminyak’s vibrant dining, shopping, and beach clubs.",
    location: "Lisbon",
    price: 5000000,
    userId: "1",
    favorite: false,
    favoriteId: "EAV-3956-fav",
    homeId: "EAV-3956",
    exclusive: true,
    tag: {
      name: "Reserved",
      slug: "rsv",
    },
    grossArea: 28520,
    plotSize: 453,
    amenities: {
      bedrooms: 5,
      garage: 1,
      bathrooms: 2,
    },
    liveVideo: true,
  };
  return (
    <>
      <Carousel className="w-full flex gap-x-20 gap-y-8 flex-col lg:flex-row">
        <div className="space-y-5 max-w-[150px]">
          <div className="flex gap-3 items-center">
            <CarouselPrevious className="!static rounded-none !top-0 left-0! translate-x-0 translate-y-0 bg-primary text-white border-primary" />
            <CarouselNext className="!static rounded-none !top-0 left-0! translate-x-0 translate-y-0 bg-primary text-white border-primary" />
          </div>

          <h3 className="text-2xl font-medium">
            SIMILAR <span className="text-primary">PROPERTIES</span> OF{" "}
            <span className="text-primary">INTEREST</span>
          </h3>

          <Button className="bg-black text-white hover:opacity-85 w-full text-xs">
            VIEW ALL PROPERTIES
          </Button>
        </div>
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 sm:basis-1/2 xl:basis-1/3"
            >
              <div className="p-1 max-w-[400px] mx-auto sm:max-w-full">
                <ProductCard home={home} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default SimilarProperties;
