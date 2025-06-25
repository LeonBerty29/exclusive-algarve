import { Skeleton } from "@/components/ui/skeleton";
import { getStoryblokApi } from "@/lib/storyblok";
import Image from "next/image";
import Link from "next/link";
// import { Blog as BlogType } from "@/types";
import { Suspense } from "react";

const fetchAllBlogs = async () => {
  const client = getStoryblokApi();
  const response = await client.getStories({
    content_type: "blog",
    version: "draft",
  });
  return response.data.stories;
};

// Date formatting function
function formatDateString(dateString: string) {
  // Parse the ISO 8601 date string (e.g., "2025-06-25T06:25:36.344Z")
  const inputDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // Convert to local date for comparison (ignoring time)
  const inputDateOnly = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const yesterdayOnly = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );

  if (inputDateOnly.getTime() === todayOnly.getTime()) {
    return "today";
  } else if (inputDateOnly.getTime() === yesterdayOnly.getTime()) {
    return "yesterday";
  } else {
    // Format as YYYY/MM/DD using local date
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
}

export default function BlogPage() {
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
            <GetAndDisplayBlogs />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function GetAndDisplayBlogs() {
  const blogs = await fetchAllBlogs();
  console.log(blogs[0]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {blogs?.map((blog) => (
          <div key={blog.content._uid}>
            <Link href={`/blogs/${blog.slug}`} className="w-full">
              <div className="relative w-full h-48">
                <Image
                  src={blog.content.banner_image.filename}
                  alt={blog.content.banner_image.alt || blog.content.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="py-2">
                <p className="text-neutral-900 flex items-center justify-between text-xs md:text-sm">
                  <span>
                    <span>{blog.content.read_time_in_minutes}</span> min read
                  </span>

                  <span className="text-muted-foreground/85">
                    {formatDateString(blog.content.date)}
                  </span>
                </p>
              </div>

              <div>
                <h3 className="text-neutral-900 font-medium text-sm md:text-base lg:text-lg mb-2 leading-tight">
                  {blog.content.title}
                </h3>

                <p className="text-gray-400 text-xs md:text-sm">
                  {blog.content.author}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

function LoadingBlogs() {
  const arr = [1, 2, 3, 4];
  return (
    <>
      {
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {arr.map((_, index) => (
            <Skeleton className="w-full h-60" key={`loadingBlogs--${index}`} />
          ))}
        </div>
      }
    </>
  );
}
