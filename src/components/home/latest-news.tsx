import { Blog } from "@/types";
import { Button } from "../ui/button";
import { BlogNewsGrid } from "../blog/blog-news-grid";

const LatestNews = () => {
  const blogs: Blog[] = [
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
  ]

  return (
    <div className="lg:container mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-10">
        <h2 className="text-2xl sm:text-3xl">Our Latest News</h2>
        <Button className="rounded-none bg-black text-white">
          Read More
        </Button>
      </div>
      <BlogNewsGrid blogs={blogs} />
    </div>
  );
};

export default LatestNews;



