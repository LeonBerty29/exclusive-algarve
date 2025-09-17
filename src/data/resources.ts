import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokError } from "@/types";
import { notFound } from "next/navigation";

export const fetchBuyResources = async ({
  per_page,
  page,
  tag,
  sort_by,
}: {
  per_page?: number;
  page?: number;
  tag?: string;
  sort_by?: string;
}) => {
  const client = getStoryblokApi();
  const withTag = tag ? { with_tag: tag } : {};
  const sortBy = sort_by ? { sort_by: sort_by } : {};
  try {
    const response = await client.getStories({
      content_type: "buyResources",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      per_page: per_page || 10,
      page: page || 1,
      ...withTag,
      ...sortBy,
    });

    // console.log({ fetchBuyResources: response });

    return response;
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch buy resources: ${String(error)}`);
    }
  }
};

export const fetchBuyResourcePage = async (slug: string) => {
  // Helper function to get error status
  const getErrorStatus = (error: unknown): number | undefined => {
    if (isStoryblokError(error)) {
      return error.status || error.response?.status;
    }
    return undefined;
  };

  // Type guard to check if error is a Storyblok error
  const isStoryblokError = (error: unknown): error is StoryblokError => {
    return (
      typeof error === "object" &&
      error !== null &&
      ("status" in error ||
        ("response" in error &&
          typeof (error as Record<string, unknown>).response === "object" &&
          (error as Record<string, unknown>).response !== null &&
          "status" in
            ((error as Record<string, unknown>).response as Record<
              string,
              unknown
            >)))
    );
  };

  const client = getStoryblokApi();
  try {
    const response = await client.getStory(`buy/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return response.data.story;
  } catch (error: unknown) {
    const errorStatus = getErrorStatus(error);

    if (errorStatus === 404) {
      notFound();
    }
    console.log(error);

    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch buy resource page: ${String(error)}`);
    }
  }
};

export const fetchSellResources = async ({
  per_page,
  page,
  tag,
  sort_by,
}: {
  per_page?: number;
  page?: number;
  tag?: string;
  sort_by?: string;
}) => {
  const client = getStoryblokApi();
  const withTag = tag ? { with_tag: tag } : {};
  const sortBy = sort_by ? { sort_by: sort_by } : {};
  try {
    const response = await client.getStories({
      content_type: "sellResources",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      per_page: per_page || 10,
      page: page || 1,
      ...withTag,
      ...sortBy,
    });

    return response;
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch sell resources: ${String(error)}`);
    }
  }
};

export const fetchSellResourcePage = async (slug: string) => {
  // Helper function to get error status
  const getErrorStatus = (error: unknown): number | undefined => {
    if (isStoryblokError(error)) {
      return error.status || error.response?.status;
    }
    return undefined;
  };

  // Type guard to check if error is a Storyblok error
  const isStoryblokError = (error: unknown): error is StoryblokError => {
    return (
      typeof error === "object" &&
      error !== null &&
      ("status" in error ||
        ("response" in error &&
          typeof (error as Record<string, unknown>).response === "object" &&
          (error as Record<string, unknown>).response !== null &&
          "status" in
            ((error as Record<string, unknown>).response as Record<
              string,
              unknown
            >)))
    );
  };

  const client = getStoryblokApi();
  try {
    const response = await client.getStory(`sell/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return response.data.story;
  } catch (error: unknown) {
    const errorStatus = getErrorStatus(error);

    if (errorStatus === 404) {
      notFound();
    }
    console.log(error);

    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch sell resource page: ${String(error)}`);
    }
  }
};

export const fetchOwnResources = async ({
  per_page,
  page,
  tag,
  sort_by,
}: {
  per_page?: number;
  page?: number;
  tag?: string;
  sort_by?: string;
}) => {
  const client = getStoryblokApi();
  const withTag = tag ? { with_tag: tag } : {};
  const sortBy = sort_by ? { sort_by: sort_by } : {};
  try {
    const response = await client.getStories({
      content_type: "ownResources",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      per_page: per_page || 10,
      page: page || 1,
      ...withTag,
      ...sortBy,
    });

    return response;
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch sell resources: ${String(error)}`);
    }
  }
};

export const fetchOwnResourcePage = async (slug: string) => {
  // Helper function to get error status
  const getErrorStatus = (error: unknown): number | undefined => {
    if (isStoryblokError(error)) {
      return error.status || error.response?.status;
    }
    return undefined;
  };

  // Type guard to check if error is a Storyblok error
  const isStoryblokError = (error: unknown): error is StoryblokError => {
    return (
      typeof error === "object" &&
      error !== null &&
      ("status" in error ||
        ("response" in error &&
          typeof (error as Record<string, unknown>).response === "object" &&
          (error as Record<string, unknown>).response !== null &&
          "status" in
            ((error as Record<string, unknown>).response as Record<
              string,
              unknown
            >)))
    );
  };

  const client = getStoryblokApi();
  try {
    const response = await client.getStory(`own/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return response.data.story;
  } catch (error: unknown) {
    const errorStatus = getErrorStatus(error);

    if (errorStatus === 404) {
      notFound();
    }
    console.log(error);

    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch Own resource page: ${String(error)}`);
    }
  }
};

export const fetchAboutUsResources = async ({
  per_page,
  page,
  tag,
  sort_by,
}: {
  per_page?: number;
  page?: number;
  tag?: string;
  sort_by?: string;
}) => {
  const client = getStoryblokApi();
  const withTag = tag ? { with_tag: tag } : {};
  const sortBy = sort_by ? { sort_by: sort_by } : {};
  try {
    const response = await client.getStories({
      content_type: "aboutResources",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      per_page: per_page || 10,
      page: page || 1,
      ...withTag,
      ...sortBy,
    });

    return response;
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch About resources: ${String(error)}`);
    }
  }
};

export const fetchAboutUsResourcePage = async (slug: string) => {
  // Helper function to get error status
  const getErrorStatus = (error: unknown): number | undefined => {
    if (isStoryblokError(error)) {
      return error.status || error.response?.status;
    }
    return undefined;
  };

  // Type guard to check if error is a Storyblok error
  const isStoryblokError = (error: unknown): error is StoryblokError => {
    return (
      typeof error === "object" &&
      error !== null &&
      ("status" in error ||
        ("response" in error &&
          typeof (error as Record<string, unknown>).response === "object" &&
          (error as Record<string, unknown>).response !== null &&
          "status" in
            ((error as Record<string, unknown>).response as Record<
              string,
              unknown
            >)))
    );
  };

  const client = getStoryblokApi();
  try {
    const response = await client.getStory(`about-us/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return response.data.story;
  } catch (error: unknown) {
    const errorStatus = getErrorStatus(error);

    if (errorStatus === 404) {
      notFound();
    }
    console.log(error);

    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch sell resource page: ${String(error)}`);
    }
  }
};
