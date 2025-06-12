import { ProductCard } from "@/components/product/product-card";
import SearchHeader from "@/components/search/search-header";
import { Home as HomeType } from "@/types";
import SideFilters from "@/components/search/side-filters";
import Link from "next/link";

export default async function Home() {
  const home: HomeType = {
    imagePaths: [
      "/images/lifestyle-img1.png",
      "/images/lifestyle-img2.png",
      "/images/lifestyle-img3.png",
      "/images/lifestyle-img4.png",
      "/images/lifestyle-img5.png",
    ],
    description:
      " your private 1-bedroom villa in Seminyak, featuring a lush garden, refreshing pool, and serene ambiance. This stylish retreat boasts a fully equipped kitchen, an elegant living room, and a spacious ensuite bedroom, perfect for a relaxing getaway. Enjoy total privacy while being just minutes from Seminyak’s vibrant dining, shopping, and beach clubs.",
    location: "Lisbon",
    price: 5000000,
    userId: "1",
    favorite: false,
    favoriteId: "EAV-3956-fav",
    homeId: "EAV-3956",
    exclusive: true,
    tag: {
      name: "Reserved",
      slug: "rsv",
    },
    grossArea: 28520,
    plotSize: 453,
    amenities: {
      bedrooms: 5,
      garage: 1,
      bathrooms: 2,
    },
    liveVideo: true,
  };

  return (
    <>
      <div className="pt-24 w-full">
        <div className="mb-4 w-full">
          <SearchHeader />
        </div>

        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto ">
          <div className="max-w-[400px] mx-auto sm:max-w-full sm:mx-0 flex items-start flex-wrap pb-8">
            <div className="w-80 max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-24 hidden lg:block">
              <SideFilters />
            </div>

            <div className="lg:pl-6 flex-1 md:min-w-[400px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="">
                  <Link href={`/properties/${home.homeId}`} className="block">
                    <ProductCard home={home} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
