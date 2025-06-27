import { fetchBlogPage } from "@/data/blogs";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

type Params = {
  [x: string]: string | string[];
};

export type PageProps = {
  params?: Promise<Params>;
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>;
};

export type AwaitedPageProps = {
  params?: Awaited<PageProps["params"]>;
  searchParams?: Awaited<PageProps["searchParams"]>;
};


const BlogPage = async (props: PageProps) => {
  const params = await props.params;
  
  // Better null/undefined checking
  if (!params?.slug) {
    notFound();
  }
  
  const story = await fetchBlogPage(params.slug as string);

  return <StoryblokStory story={story} />;
};

export default BlogPage;