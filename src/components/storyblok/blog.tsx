import { BlogNewsCard } from "@/components/blog/blog-news-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Timer } from "lucide-react";
import { Blog as BlogType } from "@/types";
import Image from "next/image";
import React from "react";
import { renderRichText, StoryblokRichTextNode } from "@storyblok/react";
import { fetchAllBlogs } from "@/data/blogs";
import { RecentPosts } from "../blog/recent-posts";

function RelatedArticles() {
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
  ];
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog, index) => (
          <div key={`${blog.slug}-${index}`}>
            <BlogNewsCard blog={blog} />
          </div>
        ))}
      </div>
    </>
  );
}

export const Blog = async (props: {
  blok: {
    title: string;
    banner_image: {
      filename: string;
      alt: string;
    };
    read_time_in_minutes: number;
    body: StoryblokRichTextNode<string | TrustedHTML>;
  };
}) => {
  // console.log(props)
  const blogs = await fetchAllBlogs();
  return (
    <main className="2xl:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-10">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <div className="relative w-full h-96">
            <Image
              src={props.blok.banner_image.filename}
              alt={props.blok.banner_image.alt || props.blok.title || "banner"}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex items-start justify-between gap-4 mt-5 mb-12 lg:gap-x-14 xl:gap-x-32">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl">{props.blok.title}</h1>
            </div>
            <div className="flex items-center gap-1 flex-nowrap w-fit">
              <Timer className="h-4 w-4 text-primary" />
              <p className="text-xs text-primary">
                {props.blok.read_time_in_minutes} min read
              </p>
            </div>
          </div>

          <div
            className="prose md:prose-sm mt-16 max-w-none"
            dangerouslySetInnerHTML={{
              __html: renderRichText(props?.blok?.body)!,
            }}
          ></div>

          <Separator className="my-6" />

          <div className="space-y-5 mb-18">
            <div className="flex gap-3 items-center">
              <Image
                src={"/images/team-member-1.png"}
                alt="team member"
                height={40}
                width={40}
                className="rounded-full object-cover h-10 w-10"
              />

              <p className="text-sm font-semibold">Marcos Verrati</p>
            </div>

            <form className="space-y-3">
              <Textarea
                placeholder="Leave your comment here"
                className="bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                rows={4}
              />
              <Button
                type="submit"
                className="bg-black hover:bg-primary text-white flex ml-auto"
              >
                SUBMIT
              </Button>
            </form>
          </div>

          <h3 className="text-2xl xl:text-3xl font-normal mb-5">
            Related Articles
          </h3>
          <RelatedArticles />
        </div>

        <RecentPosts blogs={blogs} />
      </div>
    </main>
  );
};
