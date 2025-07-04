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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { PropertyImage } from "@/types/property";
import { getProxiedImageUrl } from "@/lib/utils";

const PropertyImagesModal = ({ images }: { images: PropertyImage[] }) => {
  const totalImages = images.length;
  const remainingPhotos = totalImages - 3;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              {remainingPhotos} MORE PHOTOS
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="w-full mx-auto !max-w-full !top-16 !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 overflow-y-auto !bg-white">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Property Images Gallery
            </DialogTitle>
            <DialogDescription className="sr-only">
              Browse through all property images
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center min-h-[60vh] p-4">
            <Carousel className="w-full max-w-4xl">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full h-[500px] md:h-[600px]">
                      <Image
                        src={getProxiedImageUrl(image.url)}
                        alt={`Property image ${index + 1}`}
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
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyImagesModal;
