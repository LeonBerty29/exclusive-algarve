import { getTranslations } from "next-intl/server";
import // Calendar,
"lucide-react";
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
import { Link } from "@/i18n/navigation";
import ShareButton from "@/components/property/share-property";
import { PropertyImageGrid } from "@/components/property-details/property-image-grid";
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
import { AddToFavoriteButton } from "@/components/search/submit-buttons";
import { setRequestLocale } from "next-intl/server";
import { AddPropertyNote } from "@/components/product/add-property-notes";
import { getNote } from "@/data/notes";

interface Props {
  params: Promise<{ propertyId: string; locale: string }>;
}

export default async function page(props: Props) {
  const params = await props.params;
  const locale = params.locale;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="py-14">
      <Suspense fallback={<PropertyDetailsPageLoading />}>
        <PageContent {...props} />
      </Suspense>
    </div>
  );
}

const PageContent = async (props: Props) => {
  const t = await getTranslations("propertyDetailsPage");
  const { propertyId } = await props.params;
  const session = await auth();
  const token = session?.accessToken;

  // Use Promise.all to fetch all data concurrently
  const [propertyResponse, favoritesResponse, notesResponse] =
    await Promise.all([
      getProperty(propertyId),
      token
        ? getFavorites(token)
        : Promise.resolve({ favorite_properties: [] }),
      token ? getNote() : Promise.resolve({ data: [] }),
    ]);

  const property = propertyResponse.data;
  const favorites = favoritesResponse.favorite_properties;
  const notes = notesResponse.data;
  const isFavourite = favorites.includes(property.id);


  return (
    <>
      <div className="mb-5 2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto w-full mt-20">
        <div className="flex items-center gap-x-8 gap-y-3 justify-between flex-wrap mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/">{t("home")}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary" />
              <BreadcrumbItem>
                <Link href="/properties">{t("properties")}</Link>
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
            <AddToFavoriteButton
              className="size-8 bg-hray-200"
              propertyId={property.id}
              reference={property.reference}
              isFavourite={isFavourite}
            />
            <AddPropertyNote
              propertyId={property.id}
              reference={property.reference}
              notes={notes || []}
              styleClassname="!text-gray-800 size-4"
            />
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

          <BookVisitDialog propertyReference={property.reference} />
        </div>
      </div>

      <div className="mt-10">
        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto min-h-full">
          <PropertyImageGrid
            assets={property.assets}
            salesConsultant={property.sales_consultant}
          />

          <div className="gap-x-6 flex flex-col lg:flex-row mb-8">
            <div className="w-full lg:flex-1 pt-4">
              <PropertyDetailsIcons
                features={property.features}
                propertyType={property.typology.name}
              />
              <ScrollableTabs property={property} />
            </div>

            <div className="w-full lg:flex lg:w-[37%] xl:w-[30%] flex-col pt-4">
              <div className="bg-black text-white w-full p-6">
                <ContactAgentForm salesConsultant={property.sales_consultant} />
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
