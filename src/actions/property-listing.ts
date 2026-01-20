"use server";

import { ZodIssue } from "zod";
import { getClientPropertyListingSchema } from "@/types/property-listing";
import { submitPropertyListingWithDetailedErrors } from "@/data/property-listing";
import { getTranslations } from "next-intl/server";

export interface PropertyListingActionResult {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  fieldErrors?: { [key: string]: string };
}

export async function submitPropertyListingAction(
  formData: FormData,
): Promise<PropertyListingActionResult> {
  const t = await getTranslations("propertyListingAction");

  try {
    // Extract data from FormData
    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      property_type: formData.get("property_type") as string,
      approximate_value: formData.get("approximate_value") as string,
      full_address: (formData.get("full_address") as string) || undefined,
      bedrooms: (formData.get("bedrooms") as string) || undefined,
      build_size: (formData.get("build_size") as string) || undefined,
      plot_size: (formData.get("plot_size") as string) || undefined,
      energy_cert_number:
        (formData.get("energy_cert_number") as string) || undefined,
      comments: (formData.get("comments") as string) || undefined,
    };

    // Validate the data using Zod schema
    const propertyListingSchemaJson = await getTranslations(
      "propertyListingTypes",
    );
    const propertyListingSchema = getClientPropertyListingSchema(
      propertyListingSchemaJson,
    );
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

    // Call the API
    const result = await submitPropertyListingWithDetailedErrors(
      validationResult.data,
    );

    if (!result.success) {
      return {
        success: false,
        message: result.error ? result.error : t("failedToSubmitForm"),
        errors: result.validationErrors,
      };
    }

    return {
      success: true,
      message: result.data?.message
        ? result.data.message
        : t("formSubmittedSuccessfully"),
    };
  } catch (error) {
    console.error("Property listing action error:", error);

    return {
      success: false,
      message: t("unexpectedError"),
    };
  }
}