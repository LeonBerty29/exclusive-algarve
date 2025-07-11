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
import { getFeaturedProperties } from "@/data/properties";
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
        <HouseView />
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
  return <FeaturedProperties properties={properties} />;
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
