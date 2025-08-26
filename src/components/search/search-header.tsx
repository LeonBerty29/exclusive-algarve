import Link from "next/link";
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

const SearchHeader = ({ suspenseKey }: { suspenseKey: string }) => {
  return (
    <>
      <div className="mb-5 2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {/* <BreadcrumbLink href="/"> */}
              <Link href="/">Home</Link>
              {/* </BreadcrumbLink> */}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary" />

            <BreadcrumbItem>
              <BreadcrumbPage>Properties</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="bg-black py-5 text-white">
        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <Button className="px-7 text-white text-xs sm:text-sm hidden lg:block">
            ALL PROPERTIES
          </Button>

          <div className="flex-col items-center gap-2 sm:flex">
            {/* <Image src="/images/search-header-icon.png" alt="" width={25} height={25} /> */}
            <p className="text-sm lg:text-base text-center">
              <b>3,550</b> Properties for sale with{" "}
              <span className="text-primary font-semibold">
                Exclusive Algarve Villas
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div>
          <PropertiesFilter suspenseKey={suspenseKey} />
        </div>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] p-5 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Search</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="relative">
                <SearchInput />
              </div>

              <div className="relative">
                <Suspense
                  key={`${suspenseKey} --region-select`}
                  fallback={<Skeleton className="h-10 w-full" />}
                >
                  <ListRegionSelect />
                </Suspense>
              </div>

              <div className="relative">
                <Suspense
                  key={`${suspenseKey} --property-types`}
                  fallback={<Skeleton className="h-10 w-full" />}
                >
                  <ListPropertyTypes />
                </Suspense>
              </div>

              <div className="relative">
                <Suspense
                  key={`${suspenseKey} --price-slider`}
                  fallback={<Skeleton className="h-10 w-full" />}
                >
                  <ListPrices />
                </Suspense>
              </div>

              {/* Additional filters that will be hidden initially */}
              <div className="relative">
                <Suspense
                  key={`${suspenseKey} --bedrooms-slider`}
                  fallback={<Skeleton className="h-10 w-full" />}
                >
                  <ListBedroomsRangeSelect />
                </Suspense>
              </div>

              <div className="relative">
                <Suspense
                  key={`${suspenseKey} --bathrooms-slider`}
                  fallback={<Skeleton className="h-10 w-full" />}
                >
                  <ListBathroomsRangeSelect />
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

        {/* <div className="xl:hidden ml-auto">
          <Sheet>
            <SheetTrigger className="bg-black text-white px-4 py-2 flex items-center gap-2">
              Filters <ListFilterPlus className="w-4 h-4" />
            </SheetTrigger>
            <SheetContent className="!w-[85vw] max-w-[550px] sm:max-w-[550px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Property filters</SheetTitle>
                <SheetDescription className="sr-only">
                  Use this filter to narrow down your search for houses
                </SheetDescription>

                <div className="mt-6">
                  <div className="max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
                    <div className="flex lg:hidden items-center gap-5 flex-wrap mb-6">
                      <FilterTags />
                    </div>
                    <SideFilters suspenseKey={suspenseKey} />
                  </div>

                  <p>khkh</p>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div> */}
      </div>
    </>
  );
};

export default SearchHeader;
