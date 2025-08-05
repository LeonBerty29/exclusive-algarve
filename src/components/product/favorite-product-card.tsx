import { PiCarLight } from "react-icons/pi";
import { MdOutlineShower } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { MdOutlineLocalHotel } from "react-icons/md";
import { Card, CardContent, CardHeader } from "../ui/card";
import ProductImageCarousel from "./product-image-carousel";
import { AddToFavoriteButton } from "../search/submit-buttons";
import { Separator } from "../ui/separator";
import { PriceFormat } from "../shared/price-format";
import { Property } from "@/types/property";
import Link from "next/link";
import { DeleteFromFavoriteButton } from "./remove-favorite-button";
import { auth } from "@/auth";

interface Props {
  property: Property;
  favorites?: number[];
}

export const FavoriteProductCard = async ({
  property,
  favorites = [],
}: Props) => {
  // Extract image URLs from assets.images.gallery
  const session = await auth();
  const token = session?.accessToken;
  const imagePaths =
    property.assets?.images?.gallery?.map((img) => img.url) || [];

  // Compose location string
  const location = `${property.location.district}, ${property.location.municipality}, ${property.location.zone}`;

  // Hardcoded placeholders for missing fields (adjust as needed)
  const favorite = favorites.includes(property.id);
  const reference = property.reference;
  const exclusive = property.agency.name === "EAV";
  const grossArea = property.features.private_area;
  const plotSize = property.features.plot_size;
  const amenities = {
    bedrooms: property.features.bedrooms,
    bathrooms: property.features.bathrooms,
    garage: property.features.garage || 0,
  };
  // Determine if live video button should show (check if videos exist)
  // const liveVideo = property.assets.virtual_tours && property.assets.virtual_tours.length > 0;

  // Use property.currency for price formatting
  const currency = property.currency || "EUR";

  // Show price only if show_price is true, else display "Contact for price"
  const showPrice = property.show_price;

  return (
    <Card className="flex lg:!flex-row gap-0 rounded-none p-0">
      <CardHeader className="w-full lg:w-[50%] xl:w-[44%]  p-0 relative flex flex-col">
        <ProductImageCarousel imagePaths={imagePaths} />
        <div className="z-10 absolute top-2 left-2 right-2 flex items-center justify-between gap-3">
          <>
            <div className="flex items-center gap-[6px]">
              <div className="min-w-fit rounded-none bg-gray-200 text-black text-sm px-2 py-2 h-fit flex gap-2 items-center justify-center">
                <IoMdPricetag fill="none" strokeWidth={20} />
                {reference}
              </div>
              {/* {tag && (
                <div
                  className={cn(
                    "min-w-fit rounded-none text-white text-sm px-2 py-1 h-fit flex items-center justify-center",
                    tag.slug === "rsv" ? "bg-[#17BF62]" : "bg-red-700"
                  )}
                >
                  {tag.name}
                </div>
              )} */}
            </div>

            {favorite ? (
              <DeleteFromFavoriteButton
                propertyId={property.id}
                token={token}
              />
            ) : (
              <form>
                <input type="hidden" name="propertyId" value={property.id} />
                <AddToFavoriteButton />
              </form>
            )}
          </>
        </div>

        {exclusive && (
          <div className="bg-primary h-6 text-center text-xs font-bold text-white absolute bottom-0 w-full flex items-center justify-center z-10">
            EXCLUSIVE LISTING BY EAV
          </div>
        )}
      </CardHeader>
      <CardContent className="p-3 space-y-3 lg:flex-1 lg:p-6 lg:space-y-3 lg:flex lg:flex-col lg:justify-center">
        <Link href={`/properties/${property.id}`} className="block">
          <div className="flex justify-between align-center flex-wrap gap-y-2 gap-x-5">
            {showPrice ? (
              <PriceFormat
                amount={property.price}
                currency={currency}
                amountStyle="text-primary"
                formatAmount={false}
                className="gap-1 text-primary text-xl"
              />
            ) : (
              <span className="text-xl font-semibold flex items-center gap-1 text-primary">
                Contact for price
              </span>
            )}
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: property.description }}
            className="text-neutral prose lg:prose-base line-clamp-2"
          />

          <Separator className="mt-2" />

          <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
            <div className="max-w-[47%]">
              <div>
                <p className="text-sm font-light text-gray-400 mb-3">
                  Location
                </p>
                <p className="text-sm font-semibold text-black line-clamp-1">
                  {location}
                </p>
              </div>
            </div>

            <div className="max-w-[52%] min-w-fit flex gap-2">
              <div className="flex-1 max-w-fit">
                <p className="text-sm font-light text-gray-400 mb-3">
                  Gross Area
                </p>
                <p className="text-sm text-black font-semibold">
                  {grossArea} m<sup>2</sup>
                </p>
              </div>
              <div className="flex-1 max-w-fit">
                <p className="text-sm font-light text-gray-400 mb-3">
                  Plot Size
                </p>
                <p className="text-sm font-semibold text-black">
                  {plotSize} m<sup>2</sup>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap justify-between pt-1 gap-2">
            <div className="w-[47%]">
              <div className="flex items-center gap-4 h-[40px]">
                <div className="flex items-center text-sm gap-2">
                  <MdOutlineLocalHotel className="h-6 w-6 text-gray-500" />
                  <span className="font-semibold">{amenities.bedrooms}</span>
                </div>
                <div className="flex items-center text-sm gap-2">
                  <MdOutlineShower className="h-6 w-6 text-gray-500" />
                  <span className="font-semibold">{amenities.bathrooms}</span>
                </div>
                <div className="flex items-center text-sm gap-2">
                  <PiCarLight
                    className="h-6 w-6 fill-none text-gray-800"
                    strokeWidth={6}
                  />
                  <span className="font-semibold">{amenities.garage}</span>
                </div>
              </div>
            </div>

            {/* <div className='w-[52%] max-w-[140px] min-w[128px]'>
            {
              liveVideo && (
                <Button type='button' className='text-[9px] font-semibold w-full rounded-none bg-black text-white hover:bg-black/90'>
                  <Play className='h-2 w-2 text-white fill-white' />
                  LIVE TOUR VIDEO
                </Button>
              )
            }
          </div> */}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
