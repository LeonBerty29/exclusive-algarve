import {
  Property,
  PropertyListResponse,
  PropertyMetadata,
  PropertyResponse,
  PropertySearchParams,
} from "@/types/property";
import { cache } from "react";

function createBasicAuthHeader(): string {
  const credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  return `Basic ${credentials}`;
}

/**
 * Generic fetch wrapper with Basic Auth
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
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

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return response.json();
}

/**
 * Builds query string from search parameters
 */
function buildQueryString(params: PropertySearchParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value.toString());
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Fetches a paginated list of properties with optional filtering and sorting
 */

export const getProperties = cache(
  async (params: PropertySearchParams = {}): Promise<PropertyListResponse> => {
    const queryString = buildQueryString(params);
    const endpoint = `/properties${queryString}`;

    return apiRequest<PropertyListResponse>(endpoint);
  }
);

export const getProperty = async (
  propertyId: string
): Promise<PropertyResponse> => {
  const endpoint = `/properties/${propertyId}`;

  return apiRequest<PropertyResponse>(endpoint);
};

export const getMetadata = cache(
  async (params?: PropertySearchParams): Promise<PropertyMetadata> => {
    const queryString = params ? buildQueryString(params) : "";
    const endpoint = `/metadata${queryString}`;

    return apiRequest<PropertyMetadata>(endpoint);
  }
);

/**
 * Fetches a single property by ID
 */
export async function getPropertyById(
  id: number,
  language: "en" | "pt" = "en",
  include?: string
): Promise<Property> {
  const params: PropertySearchParams = { language };
  if (include) params.include = include;

  const queryString = buildQueryString(params);
  const endpoint = `/properties/${id}${queryString}`;

  return apiRequest<Property>(endpoint);
}

/**
 * Fetches a single property by slug
 */
export async function getPropertyBySlug(
  slug: string,
  language: "en" | "pt" = "en",
  include?: string
): Promise<Property> {
  const params: PropertySearchParams = { language };
  if (include) params.include = include;

  const queryString = buildQueryString(params);
  const endpoint = `/properties/${slug}${queryString}`;

  return apiRequest<Property>(endpoint);
}

/**
 * Fetches properties with media included
 */
export async function getPropertiesWithMedia(
  params: PropertySearchParams = {}
): Promise<PropertyListResponse> {
  return getProperties({
    ...params,
    include: params.include ? `${params.include},media` : "media",
  });
}

/**
 * Fetches properties with features included
 */
export async function getPropertiesWithFeatures(
  params: PropertySearchParams = {}
): Promise<PropertyListResponse> {
  return getProperties({
    ...params,
    include: params.include ? `${params.include},features` : "features",
  });
}

/**
 * Fetches properties with both media and features included
 */
export async function getPropertiesWithAll(
  params: PropertySearchParams = {}
): Promise<PropertyListResponse> {
  return getProperties({
    ...params,
    include: "media,features",
  });
}

/**
 * Search properties by location
 */
export async function searchPropertiesByLocation(
  location: string,
  additionalParams: PropertySearchParams = {}
): Promise<PropertyListResponse> {
  return getProperties({
    ...additionalParams,
    location,
  });
}

/**
 * Search properties by price range
 */
export async function searchPropertiesByPriceRange(
  minPrice: number,
  maxPrice: number,
  additionalParams: PropertySearchParams = {}
): Promise<PropertyListResponse> {
  return getProperties({
    ...additionalParams,
    min_price: minPrice,
    max_price: maxPrice,
  });
}

/**
 * Search properties by type
 */
export async function searchPropertiesByType(
  type: string,
  additionalParams: PropertySearchParams = {}
): Promise<PropertyListResponse> {
  return getProperties({
    ...additionalParams,
    // type
  });
}

export async function getPropertiesWithPagination(
  params: PropertySearchParams = {},
  perPage: number = 15
): Promise<PropertyListResponse> {
  return getProperties({
    ...params,
    per_page: perPage,
  });
}

/**
 * Fetches properties with media included and specific pagination
 */
export async function getPropertiesWithMediaPaginated(
  params: PropertySearchParams = {},
  perPage: number = 15
): Promise<PropertyListResponse> {
  return getProperties({
    ...params,
    include: params.include ? `${params.include},media` : "media",
    per_page: perPage,
  });
}

/**
 * Fetches properties with both media and features included and specific pagination
 */
export async function getPropertiesWithAllPaginated(
  params: PropertySearchParams = {},
  perPage: number = 15
): Promise<PropertyListResponse> {
  return getProperties({
    ...params,
    include: "media,features",
    per_page: perPage,
  });
}
