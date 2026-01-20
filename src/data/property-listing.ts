import {
  PropertyListingRequest,
  PropertyListingResponse,
  PropertyListingError,
} from "@/types/property-listing";
import { getTranslations } from "next-intl/server";

export async function submitPropertyListingWithDetailedErrors(
  data: PropertyListingRequest
): Promise<{
  success: boolean;
  data?: PropertyListingResponse;
  error?: string;
  validationErrors?: { [key: string]: string[] };
}> {
  const t = await getTranslations("propertyListingData");
  const endpoint = "/v1/forms/local-expertise";
  
  try {
    const username = process.env.BASIC_AUTH_USER;
    const password = process.env.BASIC_AUTH_PASSWORD;
    const basicAuth =
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

    // Map the frontend field names to API field names
    const apiData = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      property_type: data.property_type,
      property_price: data.approximate_value, // Map approximate_value to property_price
      full_address: data.full_address,
      bedrooms: data.bedrooms,
      build_size: data.build_size,
      plot_size: data.plot_size,
      energy_class: data.energy_cert_number, // Map energy_cert_number to energy_class
      additional_text: data.comments, // Map comments to additional_text
    };

    const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "accept": "application/ld+json",
        "Content-Type": "application/json",
        "X-Internal-Token": process.env.BOOKING_INTERNAL_TOKEN || "",
        Authorization: basicAuth,
      },
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 404) {
        return {
          success: false,
          error: t("unauthorizedInvalidOrMissingInternalToken"),
        };
      }

      const errorData: PropertyListingError = await response.json();
      if (response.status === 422 && errorData.errors) {
        return {
          success: false,
          error: errorData.message || t("validationFailed"),
          validationErrors: errorData.errors,
        };
      }

      return {
        success: false,
        error:
          errorData.error ||
          errorData.message ||
          t("httpRequestFailed", { status: response.status }),
      };
    }

    const result: PropertyListingResponse = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error while submitting property listing", error);
    return {
      success: false,
      error: t("unExpectedError"),
    };
  }
}