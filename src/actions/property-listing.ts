"use server";

import { ZodIssue } from "zod";
import { getClientPropertyListingSchema } from "@/types/property-listing";
import { getTranslations } from "next-intl/server";

export interface PropertyListingActionResult {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  fieldErrors?: { [key: string]: string };
}

export async function submitPropertyListingAction(
  formData: FormData
): Promise<PropertyListingActionResult> {
  const t = await getTranslations("submitPropertyListingAction");
  const tTypes = await getTranslations("propertyListingTypes");
  
  try {
    // Extract data from FormData
    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      property_type: formData.get("property_type") as string,
      approximate_value: formData.get("approximate_value") as string,
      full_address: formData.get("full_address") as string,
      bedrooms: formData.get("bedrooms") as string,
      build_size: formData.get("build_size") as string,
      plot_size: formData.get("plot_size") as string,
      energy_cert_number: formData.get("energy_cert_number") as string,
      comments: (formData.get("comments") as string) || undefined,
    };

    // Validate the data using Zod schema
    const propertyListingSchema = getClientPropertyListingSchema(tTypes);
    const validationResult = propertyListingSchema.safeParse(rawData);

    if (!validationResult.success) {
      // Convert Zod errors to field errors
      const fieldErrors: { [key: string]: string } = {};
      validationResult.error.errors.forEach((error: ZodIssue) => {
        const fieldName = error.path[0];
        if (fieldName && typeof fieldName === "string") {
          fieldErrors[fieldName] = error.message;
        }
      });

      return {
        success: false,
        message: t("checkFormForErrors"),
        fieldErrors,
      };
    }

    // DUMMY SUBMISSION - Replace this with actual API call when endpoint is ready
    console.log("Property listing data:", validationResult.data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful submission
    return {
      success: true,
      message: t("submittedSuccessfully"),
    };

    /* 
    // When API endpoint is ready, replace the dummy code above with:
    
    const result = await submitPropertyListingToAPI(validationResult.data);

    if (!result.success) {
      return {
        success: false,
        message: result.error || t("failedToSubmit"),
        errors: result.validationErrors,
      };
    }

    return {
      success: true,
      message: result.data?.message || t("submittedSuccessfully"),
    };
    */
  } catch (error) {
    console.error("Property listing submission error:", error);

    return {
      success: false,
      message: t("unexpectedError"),
    };
  }
}

/*
// Example of what the actual API submission function would look like:

async function submitPropertyListingToAPI(
  data: PropertyListingRequest
): Promise<{
  success: boolean;
  data?: PropertyListingResponse;
  error?: string;
  validationErrors?: { [key: string]: string[] };
}> {
  const endpoint = "/v1/forms/property-listing";
  
  try {
    const username = process.env.BASIC_AUTH_USER;
    const password = process.env.BASIC_AUTH_PASSWORD;
    const basicAuth =
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

    const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "accept": "application/ld+json",
        "Content-Type": "application/json",
        "X-Internal-Token": process.env.PROPERTY_INTERNAL_TOKEN || "",
        Authorization: basicAuth,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 404) {
        return {
          success: false,
          error: "Unauthorized or invalid token",
        };
      }

      const errorData: PropertyListingError = await response.json();
      if (response.status === 422 && errorData.errors) {
        return {
          success: false,
          error: errorData.message || "Validation failed",
          validationErrors: errorData.errors,
        };
      }

      return {
        success: false,
        error: errorData.error || errorData.message || `Request failed with status ${response.status}`,
      };
    }

    const result: PropertyListingResponse = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error submitting property listing:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
*/