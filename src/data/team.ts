import { getStoryblokApi } from "@/lib/storyblok";

export const fetchTeam = async ({
  per_page,
  page,
  tag,
  sort_by
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
      content_type: "teamMembers",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      per_page: per_page || 10,
      page: page || 1,
      ...withTag,
      ...sortBy
    });

    return response;
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch team: ${String(error)}`);
    }
  }
};