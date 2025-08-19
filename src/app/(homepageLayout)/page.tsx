import FeaturedProperties from "@/components/home/featured-properties";
import LatestNews from "@/components/home/latest-news";
import HeroSection from "@/components/home/hero-section";
import AwardsSection from "@/components/home/awards-section";
import RecentListing from "@/components/home/recent-listing";
import MeetTheTeam from "@/components/home/meet-the-team";
import HouseView from "@/components/home/house-view";
import LifeStyle from "@/components/home/lifestyle";
import DiscoverSection from "@/components/home/discover-section";
import { Suspense } from "react";
import { RecentListingLoading } from "@/components/home/recent-listing-loading";
import { getFeaturedProperties, getPremiumProperties } from "@/data/properties";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />

      <div className="">
        <Suspense fallback={<FeaturedPropertiesLoading />}>
          <ListFeaturesProperties />
        </Suspense>
      </div>
      <div className="bg-neutral-200">
        <AwardsSection />
      </div>
      <div>
        <LifeStyle />
      </div>
      <div className="bg-neutral-800">
        <Suspense fallback={<RecentListingLoading />}>
          <RecentListing />
        </Suspense>
      </div>
      <div className="mt-8">
        <MeetTheTeam />
      </div>

      <div>
        <Suspense fallback={<HouseViewLoading />}>
          <ListHouseView />
        </Suspense>
      </div>

      <div className="py-14">
        <LatestNews />
      </div>

      <div className="pt-10">
        <DiscoverSection />
      </div>
    </div>
  );
}

async function ListFeaturesProperties() {
  const response = await getFeaturedProperties({ featured: true, per_page: 3 });
  const properties = response.data;
  // console.log({properties})
  return <FeaturedProperties properties={properties} />;
}

async function ListHouseView() {
  const response = await getPremiumProperties({ premium: true });
  const properties = response.data;

  if (!properties.length) {
    return <></>
  }
  const propertyIndex = Math.floor(Math.random() * properties.length);
  const property = properties[propertyIndex];
  return <HouseView property={property} />;
}

function FeaturedPropertiesLoading() {
  return (
    <div className="relative h-[300vh]">
      {/* Create 3 skeleton items to match typical featured properties count */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="sticky top-0 h-screen w-full">
          <div className="relative h-full w-full">
            {/* Background image skeleton */}
            <Skeleton className="h-full w-full bg-black/80" />

            {/* Content overlay skeleton */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white z-20 flex flex-col items-center w-full gap-9 px-5">
              {/* Title skeleton */}
              <Skeleton className="h-10 w-[850px] bg-white" />

              {/* Location text skeleton */}
              <Skeleton className="h-8 w-[550px] bg-white" />

              {/* Button skeleton */}
              <Skeleton className="h-10 w-32 bg-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const HouseViewLoading = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-0 left-0 h-full w-full before:absolute before:inset-0 before:bg-black/60 before:bg-opacity-50 before:content-[''] before:z-10">
        {/* Background image skeleton */}
        <Skeleton className="h-full w-full bg-gray-800" />

        <div className="absolute left-0 right-0 bottom-0 z-20 flex justify-center">
          <div className="container px-6 sm:px-8 md:px-10 lg:px-12 py-12 md:py-14 xl:py-20 text-white z-22 flex flex-col sm:flex-row items-end w-full gap-9">
            <div className="flex-1">
              <div>
                {/* Title skeleton */}
                <Skeleton className="h-6 w-80 max-w-sm mb-8 bg-white/20" />

                {/* Description skeleton - multiple lines */}
                <div className="max-w-xl space-y-3 mb-6">
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-3/4 bg-white/20" />
                </div>

                {/* Additional description skeleton */}
                <div className="max-w-xl space-y-2">
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-5/6 bg-white/20" />
                  <Skeleton className="h-4 w-2/3 bg-white/20" />
                </div>
              </div>
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-10 w-28 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};
