import { LiaEdit } from "react-icons/lia";
import Image from "next/image";
import { Button } from "../ui/button";
import ProperyVideosModal from "./property-videos-modal";
import PropertyImagesModal from "./property-images-modal";

const PropertyImageGrid = () => {
  const propertyImage = [
    "/images/property-main-img.png",
    "/images/property-img-2.png",
    "/images/property-img-3.png",
    "/images/property-main-img.png",
    "/images/property-img-2.png",
    "/images/property-img-3.png",
  ];

  const totalImages = propertyImage.length;

  return (
    <>
      <div className="gap-x-6 flex mb-8">
        <div className="w-full lg:flex-1">
          <div className="w-full h-[450px] xl:h-[550px] relative">
            <Image
              src={propertyImage[0]}
              alt="main image"
              fill
              className="object-cover"
            />
            <div className="absolute z-10 bottom-4 right-4 flex gap-3">
              <Button
                type="button"
                className="text-[11px] font-semibold w-full rounded-none bg-white text-black !px-6 hover:text-white hover:bg-black transition-all"
              >
                <LiaEdit className="h-3 w-3" />
                VIEW FLOOR PLAN
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-[37%] xl:w-[30%] space-y-6 flex-col">
          <div className="relative w-full flex-1">
            {propertyImage[1] && (
              <Image
                src={propertyImage[0]}
                alt="main image"
                fill
                className="object-cover"
              />
            )}
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ProperyVideosModal />
            </div>
          </div>

          <div className="relative w-full flex-1">
            {propertyImage[2] && (
              <Image
                src={propertyImage[2]}
                alt="main image"
                fill
                className="object-cover"
              />
            )}
            {totalImages > 3 && <PropertyImagesModal />}
          </div>
        </div>
      </div>

      <div className="flex gap-6 lg:hidden min-h-[500px] sm:min-h-[unset] flex-wrap">
        <div className="relative w-full flex-1 min-w-full sm:min-w-[300px] sm:h-[400px]">
          {propertyImage[1] && (
            <Image
              src={propertyImage[0]}
              alt="main image"
              fill
              className="object-cover"
            />
          )}
          {/* Play button overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ProperyVideosModal />
          </div>
        </div>

        <div className="relative w-full flex-1 min-w-full sm:min-w-[300px] sm:h-[400px]">
          {propertyImage[2] && (
            <Image
              src={propertyImage[2]}
              alt="main image"
              fill
              className="object-cover"
            />
          )}
          {totalImages > 3 && <PropertyImagesModal />}
        </div>
      </div>
    </>
  );
};

export default PropertyImageGrid;
