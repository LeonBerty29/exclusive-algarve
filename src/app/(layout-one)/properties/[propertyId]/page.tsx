import {
  // Calendar,
} from "lucide-react";
import ScrollableTabs from "@/components/property/scrollable-tabs";
import PropertyDetailsIcons from "@/components/property/property-details-icons";

import { ContactSection } from "@/components/shared/contact-section";
import DiscoverSection from "@/components/home/discover-section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ShareButton from "@/components/property/share-property";
import PropertyImageGrid from "@/components/property-details/propert-image-grid";
import SimilarProperties from "@/components/property-details/similar-properties";
import ContactAgentForm from "@/components/property-details/contact-agent-form";
import { getCurrencySymbol } from "@/components/shared/price-format";
// import { Metadata } from "next";
import BookVisitDialog from "@/components/shared/booking-dialog";
import { getProperty } from "@/data/property";
import { Suspense } from "react";
import SimilarPropertiesSkeleton from "@/components/property/similar-properties-skeleton";
import PropertyDetailsPageLoading from "@/components/property/property-details-page-loading";
import { getFavorites } from "@/data/favourites";
import { auth } from "@/auth";
import { DeleteFromFavoriteButton } from "@/components/product/remove-favorite-button";
import { AddToFavoriteButton } from "@/components/search/submit-buttons";
import { addToFavorite } from "@/actions/favorites";

interface Props {
  params: Promise<{ propertyId: string }>;
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { propertyId } = await params;

//   try {
//     const response = await getProperty(propertyId);
//     const property = response.data;

//     if (!property) {
//       return {
//         title: "Property Not Found",
//         description: "The requested property could not be found.",
//       };
//     }

//     const baseUrl =
//       process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";
//     const propertyUrl = `${baseUrl}${property.seo.slugs.en}`;
//     const price = `${getCurrencySymbol(
//       property.currency
//     )}${property.price.toLocaleString()}`;
//     const location = `${property.location.zone}, ${property.location.municipality}, ${property.location.country}`;

//     // Create a more detailed description
//     const description =
//       property.seo.description ||
//       `${property.typology.name} for sale in ${location}. ${price}. ${property.features.private_area}m² private area, ${property.features.plot_size}m² plot size. Reference: ${property.reference}`;

//     return {
//       title: property.seo.title,
//       description: description,
//       keywords: property.seo.keywords?.join(", "),

//       // Open Graph tags
//       openGraph: {
//         title: property.seo.title,
//         description: description,
//         url: propertyUrl,
//         siteName: "Your Property Site",
//         images: [
//           {
//             url:
//               property.assets.images.gallery[0]?.url ||
//               "/default-property-image.jpg",
//             width: 1200,
//             height: 630,
//             alt: property.title,
//           },
//         ],
//         locale: "en_US",
//         type: "website",
//       },

//       // Twitter Card tags
//       twitter: {
//         card: "summary_large_image",
//         title: property.seo.title,
//         description: description,
//         images: [
//           property.assets.images.gallery[0]?.url ||
//             "/default-property-image.jpg",
//         ],
//       },

//       // Additional meta tags
//       robots: {
//         index: true,
//         follow: true,
//         googleBot: {
//           index: true,
//           follow: true,
//           "max-video-preview": -1,
//           "max-image-preview": "large",
//           "max-snippet": -1,
//         },
//       },

//       // Canonical URL
//       alternates: {
//         canonical: propertyUrl,
//       },

//       // Other meta tags
//       other: {
//         "property:price:amount": property.price.toString(),
//         "property:price:currency": property.currency,
//         "property:location": location,
//         "property:type": property.typology.name,
//         "property:reference": property.reference,
//       },
//     };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return {
//       title: "Property Details",
//       description: "View property details and information.",
//     };
//   }
// }

export default function page(props: Props) {
  return (
    <div className="py-14">
      <Suspense fallback={<PropertyDetailsPageLoading />}>
        <PageContent {...props} />
      </Suspense>
    </div>
  );
}

const PageContent = async (props: Props) => {
  const { propertyId } = await props.params;
  const session = await auth();
  const token = session?.accessToken;
  const favoritesResponse = token
    ? await getFavorites(token)
    : {
        favorite_properties: [],
      };
  const favorites = favoritesResponse.favorite_properties;
  const response = await getProperty(propertyId);
  const property = response.data;
  const isFavourite = favorites.includes(property.id);

  return (
    <>
      <div className="mb-5 2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto w-full mt-9">
        <div className="flex items-center gap-x-8 gap-y-3 justify-between flex-wrap mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary" />
              <BreadcrumbItem>
                <Link href="/properties">Properties</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">
                  {property.reference}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-2 items-center">
            {token &&
              (isFavourite ? (
                <DeleteFromFavoriteButton
                  propertyId={property.id}
                  token={token}
                  className="size-8"
                />
              ) : (
                <form action={addToFavorite}>
                  <input type="hidden" name="propertyId" value={property.id} />
                  <AddToFavoriteButton className="size-8" />
                </form>
              ))}
            <ShareButton />
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-x-9 gap-y-4">
          <div className="flex items-center gap-x-16 gap-y-4 flex-wrap">
            <h1 className="font-medium max-w-2xl lg:text-2xl">
              {property.title}
            </h1>

            <p className="font-medium text-primary text-2xl">
              {getCurrencySymbol(property.currency)}{" "}
              {property.price.toLocaleString()}
            </p>
          </div>

          {/* <Button className="bg-black text-white hover:bg-black/85 transition-all">
              Book a visit
            </Button> */}

          <BookVisitDialog />
        </div>
      </div>

      <div className="mt-10">
        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto min-h-full">
          <PropertyImageGrid assets={property.assets} />

          <div className="gap-x-6 flex flex-col lg:flex-row mb-8">
            <div className="w-full lg:flex-1 pt-4">
              <PropertyDetailsIcons
                features={property.features}
                propertyType={property.typology.name}
              />
              <ScrollableTabs property={property} />
            </div>

            <div className="w-full lg:flex lg:w-[37%] xl:w-[30%] flex-col pt-4">
              {/* <div className="w-full border p-5 mb-6">
                  <p className="text-xs text-gray-500 mb-5">
                    Ref Code:{" "}
                    <span className="text-sm font-bold text-primary">
                      {details.refCode}
                    </span>
                  </p>
                  <div className="mb-5">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-base font-bold text-black">
                      {details.location}
                    </p>
                  </div>

                  <div className="flex justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs text-gray-500">
                        Private Area
                      </span>
                      <p className="font-bold text-base">
                        {details.privateArea} m<sup>2</sup>
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">
                        Construction Area
                      </span>
                      <p className="font-bold text-base">
                        {details.grossArea} m<sup>2</sup>
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Plot Size</span>
                      <p className="font-bold text-base">
                        {details.plotSize} m<sup>2</sup>
                      </p>
                    </div>
                  </div>

                  <Button className="rounded-none w-full gap-5 bg-black text-white">
                    <Calendar />
                    BOOK A VISIT
                  </Button>
                </div> */}

              <div className="bg-black text-white w-full p-6">
                <ContactAgentForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />

      {property.similar_properties.length > 0 && (
        <Suspense fallback={<SimilarPropertiesSkeleton />}>
          <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto min-h-full py-14 lg:py-24">
            <SimilarProperties
              similarPropertiesId={property.similar_properties}
            />
          </div>
        </Suspense>
      )}
      <DiscoverSection />
    </>
  );
};
