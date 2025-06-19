"use client";

import { Blog } from "@/types";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogNewsGrid } from "@/components/blog/blog-news-grid";
import { Button } from "@/components/ui/button";
import { Blog as BlogType } from "@/types";

export default function BlogPage() {
  const blogs: BlogType[] = [
    {
      slug: "ciwkjwncwnkncw909",
      image: "/images/blog-img.png",
      title: "How to get the best luxury property in Algarve",
      author: "Marcela Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1010",
      image: "/images/blog-img.png",
      title: "The best restaurants in Algarve for a perfect dinner",
      author: "Rodrigo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1011",
      image: "/images/blog-img.png",
      title: "The best beaches in Algarve for a relaxing day",
      author: "Leticia Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1012",
      image: "/images/blog-img.png",
      title: "The best golf courses in Algarve for a perfect round",
      author: "Marcelo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw909",
      image: "/images/blog-img.png",
      title: "How to get the best luxury property in Algarve",
      author: "Marcela Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1010",
      image: "/images/blog-img.png",
      title: "The best restaurants in Algarve for a perfect dinner",
      author: "Rodrigo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1011",
      image: "/images/blog-img.png",
      title: "The best beaches in Algarve for a relaxing day",
      author: "Leticia Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1012",
      image: "/images/blog-img.png",
      title: "The best golf courses in Algarve for a perfect round",
      author: "Marcelo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw909",
      image: "/images/blog-img.png",
      title: "How to get the best luxury property in Algarve",
      author: "Marcela Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1010",
      image: "/images/blog-img.png",
      title: "The best restaurants in Algarve for a perfect dinner",
      author: "Rodrigo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1011",
      image: "/images/blog-img.png",
      title: "The best beaches in Algarve for a relaxing day",
      author: "Leticia Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1012",
      image: "/images/blog-img.png",
      title: "The best golf courses in Algarve for a perfect round",
      author: "Marcelo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw909",
      image: "/images/blog-img.png",
      title: "How to get the best luxury property in Algarve",
      author: "Marcela Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1010",
      image: "/images/blog-img.png",
      title: "The best restaurants in Algarve for a perfect dinner",
      author: "Rodrigo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1011",
      image: "/images/blog-img.png",
      title: "The best beaches in Algarve for a relaxing day",
      author: "Leticia Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1012",
      image: "/images/blog-img.png",
      title: "The best golf courses in Algarve for a perfect round",
      author: "Marcelo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw909",
      image: "/images/blog-img.png",
      title: "How to get the best luxury property in Algarve",
      author: "Marcela Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1010",
      image: "/images/blog-img.png",
      title: "The best restaurants in Algarve for a perfect dinner",
      author: "Rodrigo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1011",
      image: "/images/blog-img.png",
      title: "The best beaches in Algarve for a relaxing day",
      author: "Leticia Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1012",
      image: "/images/blog-img.png",
      title: "The best golf courses in Algarve for a perfect round",
      author: "Marcelo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw909",
      image: "/images/blog-img.png",
      title: "How to get the best luxury property in Algarve",
      author: "Marcela Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1010",
      image: "/images/blog-img.png",
      title: "The best restaurants in Algarve for a perfect dinner",
      author: "Rodrigo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1011",
      image: "/images/blog-img.png",
      title: "The best beaches in Algarve for a relaxing day",
      author: "Leticia Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
    {
      slug: "ciwkjwncwnkncw1012",
      image: "/images/blog-img.png",
      title: "The best golf courses in Algarve for a perfect round",
      author: "Marcelo Boturao",
      readTime: 6,
      date: "03.24.2025",
    },
  ];
  return (
    <div>
      <ResponsiveBlogNewsGrid blogs={blogs} />
    </div>
  );
}

export function ResponsiveBlogNewsGrid({ blogs = [] }: { blogs?: Blog[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBlogs, setDisplayedBlogs] = useState<Blog[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const blogsPerPage = 12;
  const blogsPerLoadMobile = 8; // Load fewer blogs at a time on mobile

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Initialize displayed blogs based on device type
  useEffect(() => {
    if (!blogs || blogs.length === 0) return;

    if (isMobile) {
      // Mobile: Start with first batch
      setDisplayedBlogs(blogs.slice(0, blogsPerLoadMobile));
      setHasMore(blogs.length > blogsPerLoadMobile);
    } else {
      // Desktop: Show current page
      const startIndex = (currentPage - 1) * blogsPerPage;
      const endIndex = startIndex + blogsPerPage;
      setDisplayedBlogs(blogs.slice(startIndex, endIndex));
    }
  }, [blogs, currentPage, isMobile, blogsPerPage, blogsPerLoadMobile]);

  // Load more blogs for mobile
  const loadMoreBlogs = useCallback(() => {
    if (isLoading || !hasMore || !isMobile || !blogs || blogs.length === 0)
      return;

    setIsLoading(true);

    // Simulate loading delay (remove this in production if you don't need it)
    setTimeout(() => {
      const currentLength = displayedBlogs.length;
      const nextBatch = blogs.slice(
        currentLength,
        currentLength + blogsPerLoadMobile
      );

      if (nextBatch.length > 0) {
        setDisplayedBlogs((prev) => [...prev, ...nextBatch]);
        setHasMore(currentLength + nextBatch.length < blogs.length);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 500);
  }, [
    blogs,
    displayedBlogs.length,
    isLoading,
    hasMore,
    isMobile,
    blogsPerLoadMobile,
  ]);

  // Early return if no blogs
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No blogs available.</p>
      </div>
    );
  }

  // Desktop pagination handlers
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination controls
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="2xl:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14">
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
            for over a decade. They have built up a multi award winning company
            and continue to grow the business year after year.
          </p>
        </div>
      </div>
      {/* Blog Grid */}
      <BlogNewsGrid blogs={displayedBlogs} />

      {/* Mobile: Load More Button */}
      {isMobile && hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMoreBlogs}
            disabled={isLoading}
            className="bg-black text-white hover:bg-black/90 px-8 py-3 text-sm font-medium min-w-[120px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      {/* Mobile: End of content message */}
      {isMobile && !hasMore && displayedBlogs.length > 0 && <></>}

      {/* Desktop: Pagination Controls */}
      {!isMobile && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="h-10 w-10 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-gray-400">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page as number)}
                  className={`h-10 w-10 p-0 ${
                    currentPage === page
                      ? "bg-black text-white hover:bg-black/90"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="h-10 w-10 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
