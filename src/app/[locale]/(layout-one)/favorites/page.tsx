import { auth } from "@/auth";
import { FavoriteProductCard } from "@/components/product/favorite-product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getFavorites } from "@/data/favourites";
import { getListOfProperties } from "@/data/property";
import { Link } from "@/i18n/navigation";
import { redirect } from "@/i18n/navigation";
import React, { Suspense } from "react";
import { Heart, Search, ChevronLeft, ChevronRight } from "lucide-react";

type PageProps = {
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>;
};

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const currentPage = parseInt((searchParams?.page as string) || "1", 10);

  return (
    <div className="xl:container mx-auto px-6 md:px-12 lg:px-14 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-6">Your Favourite Properties</h1>
      <Suspense
        fallback={
          <Skeleton className="w-full h-full aspect-video rounded-none" />
        }
      >
        <ListFavourites currentPage={currentPage} />
      </Suspense>
    </div>
  );
};

export default page;

// Pagination component
function PaginationControls({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
}: {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}) {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild={hasPrev}
          disabled={!hasPrev}
          className={!hasPrev ? "opacity-50 cursor-not-allowed" : ""}
        >
          {hasPrev ? (
            <Link
              href={`?page=${currentPage - 1}`}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Link>
          ) : (
            <span className="flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </span>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          asChild={hasNext}
          disabled={!hasNext}
          className={!hasNext ? "opacity-50 cursor-not-allowed" : ""}
        >
          {hasNext ? (
            <Link
              href={`?page=${currentPage + 1}`}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-1">
              Next
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyFavoritesState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-8">
        {/* Heart icon with subtle animation */}
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <Heart className="w-12 h-12 text-gray-400" />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
          <Heart className="w-3 h-3 text-red-400 fill-current" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
        No Favourite Properties Yet
      </h2>

      <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
        Start exploring our amazing properties and save your favorites here.
        Click the heart icon on any property to add it to your favorites list.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-primary hover:bg-black text-white">
          <Link href="/properties" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Browse Properties
          </Link>
        </Button>
      </div>

      {/* Tips section */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg max-w-lg">
        <h3 className="font-medium text-primary mb-2 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Pro Tip
        </h3>
        <p className="text-gray-600 text-sm">
          You can save properties to compare them later, share with friends, or
          keep track of your preferred choices during your property search.
        </p>
      </div>
    </div>
  );
}

// Invalid Page State Component
function InvalidPageState({ totalPages }: { totalPages: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-8">
        {/* Search icon to indicate page not found */}
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <Search className="w-12 h-12 text-gray-400" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
        Page Not Found
      </h2>

      <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist. There{" "}
        {totalPages === 1 ? "is" : "are"} only{" "}
        <span className="font-semibold">
          {totalPages} page{totalPages !== 1 ? "s" : ""}
        </span>{" "}
        of favorite properties available.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-primary hover:bg-black text-white">
          <Link href="?page=1" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Go to First Page
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/properties" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Browse All Properties
          </Link>
        </Button>
      </div>
    </div>
  );
}

async function ListFavourites({ currentPage }: { currentPage: number }) {
  const session = await auth();
  const token = session?.accessToken;
  // console.log({ token });

  if (!token || !session) {
    return redirect({ href: "/login", locale: "" });
  }

  const favoritesResponse = await getFavorites(token);
  const favorites = favoritesResponse.favorite_properties;
  // console.log(favoritesResponse);
  // console.log(favorites);

  if (favorites.length === 0) {
    return <EmptyFavoritesState />;
  }

  // Pagination logic
  const itemsPerPage = 7;
  const totalItems = favorites.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Check if current page is valid
  const isValidPage = currentPage >= 1 && currentPage <= totalPages;

  // If invalid page, show error state but still show pagination
  if (!isValidPage) {
    return (
      <>
        <InvalidPageState totalPages={totalPages} />

        {/* Always show pagination controls so user can navigate to valid pages */}
        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            hasNext={currentPage < totalPages}
            hasPrev={currentPage > 1}
          />
        )}
      </>
    );
  }

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the favorites array for current page
  const paginatedFavorites = favorites.slice(startIndex, endIndex);

  // Get properties for current page only
  const propertiesResponse = await getListOfProperties(paginatedFavorites);
  const properties = propertiesResponse.data;

  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-6">
        {properties.map((property) => (
          <div key={property.id} className="">
            <FavoriteProductCard property={property} favorites={favorites} />
          </div>
        ))}
      </div>

      {/* Only show pagination if there are multiple pages */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      )}
    </>
  );
}
