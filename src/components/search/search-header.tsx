import { Link } from "@/i18n/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "../ui/button";
import FilterTags from "./filter-tags";
import { PropertiesFilter } from "./properties-filters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Search } from "lucide-react";
import { SearchInput } from "./search-input";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  ListBathroomsRangeSelect,
  ListBedroomsRangeSelect,
  ListPrices,
  ListPropertyTypes,
  ListRegionSelect,
} from "./listing-filters";
import { getTranslations } from "next-intl/server";
import { getMetadata } from "@/data/properties-metada";
import { getPropertiesWithAllPaginated } from "@/data/properties";
import { PropertySearchParams } from "@/types/property";
import { PROPERTIES_PER_PAGE } from "@/config/constants";

const SearchHeader = async ({
  apiParams,
}: {
  apiParams?: PropertySearchParams;
}) => {
  const t = await getTranslations("searchHeader");

  // Fetch properties to get aggregates
  const response = await getPropertiesWithAllPaginated(apiParams, PROPERTIES_PER_PAGE)
  const propertyAggregates = response.meta.property_aggregates;

  return (
    <>
      <div className="mb-5 2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">{t("home")}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary" />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("properties")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="bg-black py-5 text-white">
        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <Button className="px-7 text-white text-xs sm:text-sm hidden lg:block">
            {t("allProperties")}
          </Button>

          <div className="flex-col items-center gap-2 sm:flex">
            <div className="text-sm lg:text-base text-center">
              <Suspense fallback={<Skeleton className="w-6 h-4" />}>
                <PropertiesCount />
              </Suspense>{" "}
              {t("propertiesForSaleWith")}{" "}
              <p className="text-primary font-semibold">
                {t("exclusiveAlgarveVillas")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <PropertiesFilter />
        </div>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              {t("search")}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] p-5 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{t("search")}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="relative">
                <SearchInput />
              </div>

              <div className="relative">
                <Suspense fallback={<Skeleton className="h-10 w-full" />}>
                  <ListRegionSelect areas={propertyAggregates.areas} />
                </Suspense>
              </div>

              <div className="relative">
                <Suspense fallback={<Skeleton className="h-10 w-full" />}>
                  <ListPropertyTypes
                    typologies={propertyAggregates.typologies}
                  />
                </Suspense>
              </div>

              <div className="relative">
                <Suspense fallback={<Skeleton className="h-10 w-full" />}>
                  <ListPrices priceRange={propertyAggregates.price} />
                </Suspense>
              </div>

              <div className="relative">
                <Suspense fallback={<Skeleton className="h-10 w-full" />}>
                  <ListBedroomsRangeSelect
                    bedroomsRange={propertyAggregates.bedrooms}
                  />
                </Suspense>
              </div>

              <div className="relative">
                <Suspense fallback={<Skeleton className="h-10 w-full" />}>
                  <ListBathroomsRangeSelect
                    bathroomsRange={propertyAggregates.bathrooms}
                  />
                </Suspense>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6 flex gap-5 2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto py-0">
        <div className="hidden sm:flex items-center gap-5 flex-wrap">
          <FilterTags />
        </div>
      </div>
    </>
  );
};

export default SearchHeader;

async function PropertiesCount() {
  const metadata = await getMetadata();

  return <b>{metadata.active_property_count}</b>;
}