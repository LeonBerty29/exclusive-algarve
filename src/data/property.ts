import { cache } from "react";
import { PropertyListResponse, PropertyResponse } from "@/types/property";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

function createBasicAuthHeader(): string {
  const credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`,
  );
  return `Basic ${credentials}`;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const t = await getTranslations("propertyData");
  const url = `${process.env.API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    Authorization: createBasicAuthHeader(),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response: Response = await fetch(url, config);

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `${t("apiError")} ${response.status} ${response.statusText} - ${errorText}`,
        { cause: response },
      );
    }

    return response.json();
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`${t("failedToFetchFromApi")} ${String(error)}`);
    }
  }
}

export const getProperty = cache(
  async (
    propertySlug: string,
    propertyReference: string,
  ): Promise<PropertyResponse> => {
    console.log({ propertyReference });
    const locale = await getLocale();
    const endpoint = `/v1/properties/${propertySlug}/?language=${locale}`;

    return apiRequest<PropertyResponse>(endpoint);
  },
);

export const getListOfProperties = cache(
  async (propertyIds: number[]): Promise<PropertyListResponse> => {
    const locale = await getLocale();
    const ids = propertyIds.join(",");
    const endpoint = `/v1/properties?ids=${ids}&language=${locale}`;

    return apiRequest<PropertyListResponse>(endpoint);
  },
);
