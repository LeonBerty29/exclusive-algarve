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
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyImage } from "@/types/property";
import { getTranslations } from "next-intl/server";
import { RequestFloorPlan } from "../property/request-floor-plan";
import PropertyImageCarousel from "./images-carousel";

const PropertyImagesModal = async ({
  images,
  propertyReference,
}: {
  images: PropertyImage[];
  propertyReference: string;
}) => {
  const t = await getTranslations("propertyImagesModal");
  const totalImages = images.length;
  const remainingPhotos = totalImages - 3;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              {remainingPhotos} {t("morePhotos")}
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="w-full mx-auto !max-w-full !top-0 !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 overflow-y-auto !bg-white p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{t("propertyImagesGallery")}</DialogTitle>
            <DialogDescription>
              {t("browseThroughAllPropertyImages")}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="images" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-white sticky top-0 z-10 h-auto p-0">
              <TabsTrigger
                value="images"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black px-6 py-4"
              >
                Images
              </TabsTrigger>
              <TabsTrigger
                value="floorplan"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black px-6 py-4"
              >
                Floor Plan
              </TabsTrigger>
              <TabsTrigger
                value="brochure"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black px-6 py-4"
              >
                Request Brochure
              </TabsTrigger>
            </TabsList>

            <TabsContent value="images" className="mt-0">
              {/* <div className="flex items-center justify-center min-h-[60vh] p-4">
                <Carousel className="w-full max-w-4xl">
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative w-full h-[500px] md:h-[600px]">
                          <Image
                            src={image.url}
                            alt={`${t("propertyImageAltPrefix")} ${index + 1}`}
                            fill
                            className="object-contain w-auto h-auto"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              </div> */}

              <PropertyImageCarousel images={images} />
            </TabsContent>

            <TabsContent value="floorplan" className="mt-0">
              <div className="flex items-center justify-center min-h-[60vh] p-8">
                <RequestFloorPlan propertyReference={propertyReference} />
              </div>
            </TabsContent>

            <TabsContent value="brochure" className="mt-0">
              <div className="flex items-center justify-center min-h-[60vh] p-8">
                <Button className="text-xs rounded-none bg-black text-white px-6">
                  Download Brochure
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="sm:justify-start px-4 pb-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {t("close")}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyImagesModal;
