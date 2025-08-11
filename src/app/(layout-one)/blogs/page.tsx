import { LoadingBlogs } from "@/components/blog/loading-blogs";
import { fetchAllBlogs } from "@/data/blogs";
import { formatDateString } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const BLOGS_PER_PAGE = 12;

export default async function BlogPage(props: BlogPageProps) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1");

  return (
    <div>
      <div className="2xl:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-10">
        <div className="flex items-center gap-2 justify-between py-5 md:py-8 lg:py-16 flex-wrap">
          <div className="w-full md:w-[47%]">
            <h1 className="text-2xl lg:text-3xl font-normal">
              YOU&apos;LL NEVER MISS AN <br />
              <span className="text-primary">OPPORTUNITY !</span>
            </h1>
          </div>

          <div className="w-full md:w-[47%] lg:min-w-[unset]">
            <p className="text-neutral-700 text-sm ">
              Directors Marcela Boturao & Bart van Linden would like to welcome
              you to meet the team of Exclusive Algarve Villas. Both Marcela and
              Bart have been active in selling luxury real estate in the Algarve
              for over a decade. They have built up a multi award winning
              company and continue to grow the business year after year.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="w-full">
          <Suspense fallback={<LoadingBlogs />}>
            <GetAndDisplayBlogs page={page} perPage={BLOGS_PER_PAGE} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

interface GetAndDisplayBlogsProps {
  page: number;
  perPage: number;
  tag?: string;
  sortBy?: string;
}

// Page Not Found Component
function PageNotFound({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-red-600 mb-4">
          Page {currentPage} doesn&apos;t exist. We only have {totalPages} page
          {totalPages !== 1 ? "s" : ""} of blogs.
        </p>
        <Link
          href="/blogs"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Go to First Page
        </Link>
      </div>
    </div>
  );
}

async function GetAndDisplayBlogs({
  page,
  perPage,
  tag,
  sortBy,
}: GetAndDisplayBlogsProps) {
  const response = await fetchAllBlogs({
    page,
    per_page: perPage,
    tag,
    sort_by: sortBy,
  });

  const totalPages = Math.ceil(response.total / perPage);
  const blogs = response.data.stories;

  // Check if the requested page is greater than total pages
  const isPageOutOfRange = page > totalPages && totalPages > 0;

  return (
    <>
      {isPageOutOfRange ? (
        // Show page not found message
        <PageNotFound currentPage={page} totalPages={totalPages} />
      ) : (
        // Show blogs normally
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {blogs?.map((blog) => (
            <div key={blog.content._uid}>
              <Link href={`/blogs/${blog.slug}`} className="w-full">
                <div className="relative w-full aspect-video">
                  <Image
                    src={blog.content.banner_image.filename}
                    alt={blog.content.banner_image.alt || blog.content.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="py-2">
                  <p className="text-neutral-900 flex items-center justify-between text-[11px]">
                    <span>
                      <span>{blog.content.read_time_in_minutes}</span> min read
                    </span>

                    <span className="text-muted-foreground/85">
                      {formatDateString(blog.created_at)}
                    </span>
                  </p>
                </div>

                <div>
                  <h3 className="line-clamp-2 text-neutral-900 font-medium text-sm md:text-base mb-2 leading-tight">
                    {blog.content.title}
                  </h3>

                  <p className="text-gray-400 text-xs">{blog.content.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Always show pagination controls if there are multiple pages */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={isPageOutOfRange ? 1 : page} // Reset to page 1 for pagination display if out of range
          totalPages={totalPages}
          tag={tag}
          sortBy={sortBy}
          isPageOutOfRange={isPageOutOfRange}
        />
      )}
    </>
  );
}

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  tag?: string;
  sortBy?: string;
  isPageOutOfRange?: boolean;
}

function PaginationControls({
  currentPage,
  totalPages,
  tag,
  sortBy,
  isPageOutOfRange = false,
}: PaginationControlsProps) {
  // Helper function to build URL with search params
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (tag) params.set("tag", tag);
    if (sortBy) params.set("sort_by", sortBy);

    return `/blogs?${params.toString()}`;
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const rangeWithDots = [];

    // Calculate start and end of range
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    // Add first page and dots if needed
    if (start > 1) {
      rangeWithDots.push(1);
      if (start > 2) rangeWithDots.push("...");
    }

    // Add main range
    for (let i = start; i <= end; i++) {
      rangeWithDots.push(i);
    }

    // Add dots and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) rangeWithDots.push("...");
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div
      className={`flex items-center justify-center space-x-2 mt-8 ${
        isPageOutOfRange ? "opacity-75" : ""
      }`}
    >
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="px-3 py-2 text-sm font-medium text-gray-500"
              >
                ...
              </span>
            );
          }

          const isActive = pageNum === currentPage && !isPageOutOfRange;
          return (
            <Link
              key={pageNum}
              href={buildUrl(pageNum as number)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      )}
    </div>
  );
}
