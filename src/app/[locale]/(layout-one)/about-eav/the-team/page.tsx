import { LoadingBlogs } from "@/components/blog/loading-blogs";
import Image from "next/image";
import { Suspense } from "react";
import { fetchTeam } from "@/data/team";
import TeamMembers from "@/components/the-team/team-members";
import DiscoverSection from "@/components/home/discover-section";
import { ContactForm } from "@/components/shared/contact-form";
import { Team } from "@/types/team";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const BLOGS_PER_PAGE = 12;

export default async function TeamPage(props: BlogPageProps) {
  const t = await getTranslations("theTeamPage");
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1");

  return (
    <div>
      <div className="2xl:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-10">
        <div className="flex items-center gap-2 justify-between py-5 md:py-8 lg:py-16 flex-wrap">
          <div className="w-full md:w-[47%]">
            <h1 className="text-2xl font-normal mb-5">{t("assistHeading")}</h1>

            <div className="w-full aspect-video relative">
              <Image
                priority
                src="/images/about/about-img-2.png"
                fill
                alt={t("aboutUsAlt")}
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-[47%] lg:min-w-[unset]">
            <p className="text-neutral-700 text-base ">
              {t("directorsParagraph")}
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="w-full">
          <Suspense fallback={<LoadingBlogs />}>
            <GetAndDisplayTeam page={page} perPage={BLOGS_PER_PAGE} />
          </Suspense>
        </div>

        <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
          <div className="max-w-[800px] mx-auto">
            <ContactForm
              theme="light"
              titleStyling="text-center"
              submitBtnStyling="flex mx-auto"
            />
          </div>
        </div>

        <div className="pt-10">
          <DiscoverSection />
        </div>
      </div>
    </div>
  );
}

interface GetAndDisplayTeamProps {
  page: number;
  perPage: number;
  tag?: string;
  sortBy?: string;
}

async function GetAndDisplayTeam({
  page,
  perPage,
  tag,
  sortBy,
}: GetAndDisplayTeamProps) {
  const locale = await getLocale();
  const response = await fetchTeam({
    page,
    per_page: perPage,
    tag,
    sort_by: sortBy,
    language: locale,
  });

  const teams = response;

  // const totalPages = Math.ceil(response.total / perPage);
  // const isPageOutOfRange = page > totalPages && totalPages > 0;

  return (
    <>
      {teams.length > 0 && <TeamMembers teams={teams as unknown as Team[]} />}
    </>
  );
}

// interface PaginationControlsProps {
//   currentPage: number;
//   totalPages: number;
//   tag?: string;
//   sortBy?: string;
//   isPageOutOfRange?: boolean;
// }

// function PaginationControls({
//   currentPage,
//   totalPages,
//   tag,
//   sortBy,
//   isPageOutOfRange = false,
// }: PaginationControlsProps) {
//   // Helper function to build URL with search params
//   const buildUrl = (page: number) => {
//     const params = new URLSearchParams();
//     params.set("page", page.toString());
//     if (tag) params.set("tag", tag);
//     if (sortBy) params.set("sort_by", sortBy);

//     return `/blogs?${params.toString()}`;
//   };

//   // Generate page numbers to show
//   const getPageNumbers = () => {
//     const delta = 2; // Number of pages to show on each side of current page
//     const rangeWithDots = [];

//     // Calculate start and end of range
//     const start = Math.max(1, currentPage - delta);
//     const end = Math.min(totalPages, currentPage + delta);

//     // Add first page and dots if needed
//     if (start > 1) {
//       rangeWithDots.push(1);
//       if (start > 2) rangeWithDots.push("...");
//     }

//     // Add main range
//     for (let i = start; i <= end; i++) {
//       rangeWithDots.push(i);
//     }

//     // Add dots and last page if needed
//     if (end < totalPages) {
//       if (end < totalPages - 1) rangeWithDots.push("...");
//       rangeWithDots.push(totalPages);
//     }

//     return rangeWithDots;
//   };

//   return (
//     <div
//       className={`flex items-center justify-center space-x-2 mt-8 ${
//         isPageOutOfRange ? "opacity-75" : ""
//       }`}
//     >
//       {/* Previous Button */}
//       {currentPage > 1 && (
//         <Link
//           href={buildUrl(currentPage - 1)}
//           className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
//         >
//           <ChevronLeft className="w-4 h-4 mr-1" />
//           Previous
//         </Link>
//       )}

//       {/* Page Numbers */}
//       <div className="flex space-x-1">
//         {getPageNumbers().map((pageNum, index) => {
//           if (pageNum === "...") {
//             return (
//               <span
//                 key={`dots-${index}`}
//                 className="px-3 py-2 text-sm font-medium text-gray-500"
//               >
//                 ...
//               </span>
//             );
//           }

//           const isActive = pageNum === currentPage && !isPageOutOfRange;
//           return (
//             <Link
//               key={pageNum}
//               href={buildUrl(pageNum as number)}
//               className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
//                 isActive
//                   ? "bg-primary text-white"
//                   : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
//               }`}
//             >
//               {pageNum}
//             </Link>
//           );
//         })}
//       </div>

//       {/* Next Button */}
//       {currentPage < totalPages && (
//         <Link
//           href={buildUrl(currentPage + 1)}
//           className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
//         >
//           Next
//           <ChevronRight className="w-4 h-4 ml-1" />
//         </Link>
//       )}
//     </div>
//   );
// }