import { Button } from "@/components/ui/button";
import { Calendar, HeartIcon, } from "lucide-react";
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

interface Props {
  params: Promise<{ propertyId: string }>;
}

const page = async (props: Props) => {
  const { propertyId } = await props.params;

  const details = {
    refCode: "EAV-000",
    location: "Ferragudo (Lagoa)",
    privateArea: 98,
    grossArea: 172,
    plotSize: 203,
  };


  return (
    <>
      <div className="py-14">
        <div className="mb-5 2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto w-full mt-9">
          <div className="flex items-center gap-x-8 gap-y-3 justify-between flex-wrap mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  {/* <BreadcrumbLink href="/"> */}
                  <Link href="/">Home</Link>
                  {/* </BreadcrumbLink> */}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary" />
                <BreadcrumbItem>
                  {/* <BreadcrumbLink href="/"> */}
                  <Link href="/properties">Properties</Link>
                  {/* </BreadcrumbLink> */}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary" />

                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold">
                    {propertyId}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex gap-2 items-center">
              <Button
                variant="default"
                className="size-8 rounded-full bg-gray-200 hover:bg-red-100 transition-all text-black"
              >
                <HeartIcon className="size-4" />
              </Button>
              <ShareButton />
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-x-14 gap-y-4">
            <div className="flex items-center gap-x-16 gap-y-4 flex-wrap">
              <h1 className="font-medium max-w-lg lg:text-lg">Luxury Condominium, 2 bedroom apartment with pool, 
              close to the beach, for sale Ferragudo, Algarve</h1>

              <p className="font-medium text-primary">
                {getCurrencySymbol("EUR")} 1520000
              </p>
            </div>

            <Button className="bg-black text-white hover:bg-black/85 transition-all">
              Book a visit
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto min-h-full">
            <PropertyImageGrid />

            <div className="gap-x-6 flex flex-col lg:flex-row mb-8">
              <div className="w-full lg:flex-1 pt-4">
                <PropertyDetailsIcons />
                <ScrollableTabs />
              </div>

              <div className="w-full lg:flex lg:w-[37%] xl:w-[30%] flex-col pt-4">
                <div className="w-full border p-5 mb-6">
                  <p className="text-xs text-gray-500 mb-5">
                    Ref Code:{" "}
                    <span className="text-sm font-bold text-mainYellowColor">
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
                      <span className="text-xs text-gray-500">Gross Area</span>
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
                </div>

                <div className="bg-black text-white w-full p-6">
                 <ContactAgentForm />
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <ContactSection />

        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto min-h-full py-14">
          <SimilarProperties />
        </div>
        <DiscoverSection />
      </div>
    </>
  );
};

export default page;
