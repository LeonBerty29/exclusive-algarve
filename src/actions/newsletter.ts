"use server";

import { ZodIssue } from "zod";
import { newsletterFormSchema } from "@/types/newsletter";
import { submitNewsletterFormWithDetailedErrors } from "@/data/newsletter";

export interface NewsletterFormActionResult {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  fieldErrors?: { [key: string]: string };
}

export async function newsletterFormAction(
  formData: FormData
): Promise<NewsletterFormActionResult> {
  try {
    // Extract data from FormData
    const rawData = {
      email: formData.get("email") as string,
      source_url: (formData.get("source_url") as string) || undefined,
    };

    // Validate the data using Zod schema
    const validationResult = newsletterFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      // Convert Zod errors to field errors with proper typing
      const fieldErrors: { [key: string]: string } = {};
      validationResult.error.errors.forEach((error: ZodIssue) => {
        const fieldName = error.path[0];
        if (fieldName && typeof fieldName === "string") {
          fieldErrors[fieldName] = error.message;
        }
      });

      return {
        success: false,
        message: "Please check the form for errors",
        fieldErrors,
      };
    }

    // Call the API
    const result = await submitNewsletterFormWithDetailedErrors(
      validationResult.data
    );

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Failed to subscribe to newsletter",
        errors: result.validationErrors,
      };
    }

    return {
      success: true,
      message: result.data?.message || "Successfully subscribed to newsletter!",
    };
  } catch (error) {
    console.error("Newsletter form action error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}