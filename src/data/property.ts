import { PropertyListResponse, PropertyResponse } from "@/types/property";
import { notFound } from "next/navigation";

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

  // Helper function to get error status from Response
  const getErrorStatus = (error: unknown): number | undefined => {
    if (error instanceof Error && error.cause instanceof Response) {
      return error.cause.status;
    }
    return undefined;
  };

  try {
    const response: Response = await fetch(url, config);

    // Check for 404 specifically
    if (response.status === 404) {
      console.log(response.status);
      throw new Error(`API Error: ${response.status} ${response.statusText}`, {
        cause: response,
      });
    }

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${errorText}`,
        {
          cause: response,
        }
      );
    }

    return response.json();
  } catch (error: unknown) {
    const errorStatus = getErrorStatus(error);

    console.log({ errorStatus });

    if (errorStatus === 404) {
      notFound();
    }

    console.error(error);
    // Re-throw the error with proper typing
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to fetch from API: ${String(error)}`);
    }
  }
}

export const getProperty = async (
  propertyId: string
): Promise<PropertyResponse> => {
  const endpoint = `/properties/${propertyId}`;

  return apiRequest<PropertyResponse>(endpoint);
};

export const getSimilarProperties = async (
  propertyIds: number[]
): Promise<PropertyListResponse> => {
  
  const ids = propertyIds.join(",");
  const endpoint = `/properties?ids=${ids}`;

  return apiRequest<PropertyListResponse>(endpoint);
};
