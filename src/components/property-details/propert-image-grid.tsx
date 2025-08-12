import { LiaEdit } from "react-icons/lia";
import Image from "next/image";
import { Button } from "../ui/button";
import ProperyVideosModal from "./property-videos-modal";
import PropertyImagesModal from "./property-images-modal";
import { Property } from "@/types/property";
import { getProxiedImageUrl } from "@/lib/utils";

interface PropertyImageGridProps {
  assets: Property["assets"];
}

const PropertyImageGrid: React.FC<PropertyImageGridProps> = ({ assets }) => {
  const propertyImages = assets.images.gallery;
  const hasVideos = assets.videos && assets.videos.length > 0;
  const hasFloorPlans =
    assets.images.floor_plans && assets.images.floor_plans.length > 0;
  const totalImages = propertyImages.length;

  // Fallback image if no images are available
  // const defaultImage = "/images/property-placeholder.jpg";

  return (
    <>
      <div className="gap-x-6 flex mb-8">
        <div className="w-full lg:flex-1">
          <div className="w-full h-[450px] xl:h-[550px] relative">
            {propertyImages[0] && (
              <Image
                src={getProxiedImageUrl(propertyImages[0]?.url)}
                alt={propertyImages[0]?.title || "Property image"}
                fill
                className="object-cover"
              />
            )}
            {hasFloorPlans && (
              <div className="absolute z-10 bottom-4 right-4 flex gap-3">
                <Button
                  type="button"
                  className="text-sm font-semibold w-full rounded-none bg-white text-black !px-6 hover:text-white hover:bg-black transition-all"
                >
                  <LiaEdit className="h-3 w-3" />
                  REQUEST INFORMATION
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:flex lg:w-[37%] xl:w-[30%] space-y-6 flex-col">
          <div className="relative w-full flex-1">
            {propertyImages[1] && (
              <Image
                src={
                  getProxiedImageUrl(propertyImages[1]?.url)
                }
                alt={propertyImages[1].title || "Property image"}
                fill
                className="object-cover"
              />
            )}
            {/* Show play button only if videos exist */}
            {hasVideos && (
              <div className="absolute inset-0 flex items-center justify-center">
                <ProperyVideosModal videos={assets.videos || []} />
              </div>
            )}
          </div>

          <div className="relative w-full flex-1">
            {propertyImages[2] && (
              <Image
                src={getProxiedImageUrl(propertyImages[2].url)}
                alt={propertyImages[2].title || "Property image"}
                fill
                className="object-cover"
              />
            )}
            {totalImages > 3 && (
              <PropertyImagesModal
                images={propertyImages}
                // floorPlans={assets.images.floor_plans}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex gap-6 lg:hidden min-h-[500px] sm:min-h-[unset] flex-wrap">
        <div className="relative w-full flex-1 min-w-full sm:min-w-[300px] sm:h-[400px]">
          {propertyImages[1] && (
            <Image
              src={getProxiedImageUrl(propertyImages[1]?.url)}
              alt={propertyImages[1].title || "Property image"}
              fill
              className="object-cover"
            />
          )}
          {/* Show play button only if videos exist */}
          {hasVideos && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <ProperyVideosModal videos={assets.videos || []} />
            </div>
          )}
        </div>

        <div className="relative w-full flex-1 min-w-full sm:min-w-[300px] sm:h-[400px]">
          {propertyImages[2] && (
            <Image
              src={getProxiedImageUrl(propertyImages[2]?.url)}
              alt={propertyImages[2].title || "Property image"}
              fill
              className="object-cover"
            />
          )}
          {totalImages > 3 && (
            <PropertyImagesModal
              images={propertyImages}
              // floorPlans={assets.images.floor_plans}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyImageGrid;
