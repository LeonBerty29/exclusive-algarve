import { LoadingBlogs } from "@/components/blog/loading-blogs";
import { fetchAllBlogs } from "@/data/blogs";
import { formatDateString } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

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
  const blogs = await fetchAllBlogs({});
  // console.log(blogs[0]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

                <p className="text-gray-400 text-xs">
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
