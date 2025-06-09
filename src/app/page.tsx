import FeaturedProperties from "@/components/home/featured-properties";
import LatestNews from "@/components/home/latest-news";
import HeroSection from "@/components/home/hero-section";
import AwardsSection from "@/components/home/awards-section";
import RecentListing from "@/components/home/recent-listing";
import MeetTheTeam from "@/components/home/meet-the-team";
import HouseView from "@/components/home/house-view";
import LifeStyle from "@/components/home/lifestyle";
import DiscoverSection from "@/components/home/discover-section";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />

      <div className="">
        <FeaturedProperties />
      </div>
      <div className="bg-neutral-200">
        <AwardsSection />
      </div>
      <div>
        <LifeStyle />
      </div>
      <div className="bg-neutral-800">
        <RecentListing />
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
