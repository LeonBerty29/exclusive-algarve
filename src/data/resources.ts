/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokError } from "@/types";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { cache } from "react";

export const fetchBuyResources = cache(
  async ({
    per_page,
    page,
    tag,
    sort_by,
    language,
  }: {
    per_page?: number;
    page?: number;
    tag?: string;
    sort_by?: string;
    language: string;
  }) => {
    const t = await getTranslations("resourcesData");
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
        starts_with: `buy/${language}`,
      });

      // console.log({ fetchBuyResources: response });

      return response;
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(`${t("failedToFetchBuyResources")} ${String(error)}`);
      }
    }
  },
);

export const fetchBuyResourcePage = cache(async (slug: string) => {
  const t = await getTranslations("resourcesData");

  // Helper function to get error status
  const getErrorStatus = (error: any): number | undefined => {
    if (isStoryblokError(error)) {
      return error.status || error.response?.status;
    }
    return undefined;
  };

  // Type guard to check if error is a Storyblok error
  const isStoryblokError = (error: any): error is StoryblokError => {
    return (
      typeof error === "object" &&
      error !== null &&
      ("status" in error ||
        ("response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "status" in error.response))
    );
  };

  const client = getStoryblokApi();
  try {
    const locale = await getLocale();
    const response = await client.getStory(`buy/${locale}/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      // resolve_links: "url",
      // resolve_relations: "fr",
      // resolve_level: 0,
    });
    return response.data.story;
  } catch (error) {
    const errorStatus = getErrorStatus(error);

    if (errorStatus === 404) {
      notFound();
    }
    console.log(error);

    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`${t("failedToFetchBuyResourcePage")} ${String(error)}`);
    }
  }
});

export const fetchSellResources = cache(
  async ({
    per_page,
    page,
    tag,
    sort_by,
    language,
  }: {
    per_page?: number;
    page?: number;
    tag?: string;
    sort_by?: string;
    language?: string;
  }) => {
    const t = await getTranslations("resourcesData");
    const client = getStoryblokApi();
    const withTag = tag ? { with_tag: tag } : {};
    const sortBy = sort_by ? { sort_by: sort_by } : {};
    try {
      const response = await client.getStories({
        content_type: "sellResources",
        version: process.env.NODE_ENV === "development" ? "draft" : "published",
        per_page: per_page || 10,
        starts_with: `sell/${language}`,
        page: page || 1,
        ...withTag,
        ...sortBy,
      });

      return response;
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(`${t("failedToFetchSellResources")} ${String(error)}`);
      }
    }
  },
);

export const fetchSellResourcePage = cache(async (slug: string) => {
  const t = await getTranslations("resourcesData");

  // Helper function to get error status
  const getErrorStatus = (error: any): number | undefined => {
    if (isStoryblokError(error)) {
      return error.status || error.response?.status;
    }
    return undefined;
  };

  // Type guard to check if error is a Storyblok error
  const isStoryblokError = (error: any): error is StoryblokError => {
    return (
      typeof error === "object" &&
      error !== null &&
      ("status" in error ||
        ("response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "status" in error.response))
    );
  };

  const client = getStoryblokApi();
  try {
    const locale = await getLocale();
    const response = await client.getStory(`sell/${locale}/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      // resolve_links: "url",
      // resolve_relations: "fr",
      // resolve_level: 0,
    });
    return response.data.story;
  } catch (error) {
    const errorStatus = getErrorStatus(error);

    if (errorStatus === 404) {
      notFound();
    }
    console.log(error);

    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`${t("failedToFetchSellResourcePage")} ${String(error)}`);
    }
  }
});

export const fetchOwnResources = async ({
  per_page,
  page,
  tag,
  sort_by,
  language,
}: {
  per_page?: number;
  page?: number;
  tag?: string;
  sort_by?: string;
  language: string;
}) => {
  const t = await getTranslations("resourcesData");
  const client = getStoryblokApi();
  const withTag = tag ? { with_tag: tag } : {};
  const sortBy = sort_by ? { sort_by: sort_by } : {};
  try {
    const response = await client.getStories({
      content_type: "ownResources",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      starts_with: `own/${language}`,
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
      throw new Error(`${t("failedToFetchSellResources")} ${String(error)}`);
    }
  }
};

export const fetchOwnResourcePage = cache(async (slug: string) => {
  const t = await getTranslations("resourcesData");

  // Helper function to get error status
  const getErrorStatus = (error: any): number | undefined => {
    if (isStoryblokError(error)) {
      return error.status || error.response?.status;
    }
    return undefined;
  };

  // Type guard to check if error is a Storyblok error
  const isStoryblokError = (error: any): error is StoryblokError => {
    return (
      typeof error === "object" &&
      error !== null &&
      ("status" in error ||
        ("response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "status" in error.response))
    );
  };

  const client = getStoryblokApi();
  try {
    const locale = await getLocale();
    const response = await client.getStory(`own/${locale}/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      // resolve_links: "url",
      // resolve_relations: "fr",
      // resolve_level: 0,
    });

    return response.data.story;
  } catch (error) {
    const errorStatus = getErrorStatus(error);

    if (errorStatus === 404) {
      notFound();
    }
    console.log(error);

    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`${t("failedToFetchOwnResourcePage")} ${String(error)}`);
    }
  }
});

export const fetchAboutUsResources = cache(
  async ({
    per_page,
    page,
    tag,
    sort_by,
    language,
  }: {
    per_page?: number;
    page?: number;
    tag?: string;
    sort_by?: string;
    language?: string;
  }) => {
    const t = await getTranslations("resourcesData");
    const client = getStoryblokApi();
    const withTag = tag ? { with_tag: tag } : {};
    const sortBy = sort_by ? { sort_by: sort_by } : {};
    try {
      const response = await client.getStories({
        content_type: "aboutResources",
        version: process.env.NODE_ENV === "development" ? "draft" : "published",
        per_page: per_page || 10,
        starts_with: `about-us/${language}`,
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
        throw new Error(`${t("failedToFetchAboutResources")} ${String(error)}`);
      }
    }
  },
);

export const fetchAboutUsResourcePage = cache(async (slug: string) => {
  const t = await getTranslations("resourcesData");

  // Helper function to get error status
  const getErrorStatus = (error: any): number | undefined => {
    if (isStoryblokError(error)) {
      return error.status || error.response?.status;
    }
    return undefined;
  };

  // Type guard to check if error is a Storyblok error
  const isStoryblokError = (error: any): error is StoryblokError => {
    return (
      typeof error === "object" &&
      error !== null &&
      ("status" in error ||
        ("response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "status" in error.response))
    );
  };

  const client = getStoryblokApi();
  try {
    const locale = await getLocale();
    const response = await client.getStory(`about-us/${locale}/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return response.data.story;
  } catch (error) {
    const errorStatus = getErrorStatus(error);

    if (errorStatus === 404) {
      notFound();
    }
    console.log(error);

    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`${t("failedToFetchSellResourcePage")} ${String(error)}`);
    }
  }
});
