import { getStoryblokApi } from "@/lib/storyblok";
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

// Type for Storyblok API errors
interface StoryblokError extends Error {
  status?: number;
  response?: {
    status: number;
    data?: unknown;
  };
}

// Type guard to check if error is a Storyblok error
const isStoryblokError = (error: unknown): error is StoryblokError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('status' in error || 
     ('response' in error && 
      typeof (error as Record<string, unknown>).response === 'object' &&
      (error as Record<string, unknown>).response !== null &&
      'status' in ((error as Record<string, unknown>).response as Record<string, unknown>)))
  );
};

// Helper function to get error status
const getErrorStatus = (error: unknown): number | undefined => {
  if (isStoryblokError(error)) {
    return error.status || error.response?.status;
  }
  return undefined;
};

const fetchBlogPage = async (slug: string) => {
  const client = getStoryblokApi();
  try {
    const response = await client.getStory(`blogs/${slug}`, {
      version: "draft",
    });
    return response.data.story;
  } catch (error: unknown) {
    console.log(error);
    
    const errorStatus = getErrorStatus(error);
    
    if (errorStatus === 404) {
      notFound();
    }
    
    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch blog page: ${String(error)}`);
    }
  }
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