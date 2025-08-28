"use server";

import { ZodIssue } from "zod";
import { bookVisitWithDetailedErrors } from "@/data/book-visit";
import { bookVisitSchema } from "@/types/book-a-visit";

export interface BookVisitActionResult {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  fieldErrors?: { [key: string]: string };
}

export async function bookVisitAction(
  formData: FormData
): Promise<BookVisitActionResult> {
  try {
    // Extract data from FormData
    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      visit_date: formData.get("visit_date") as string,
      visit_time: formData.get("visit_time") as string,
      additional_text: (formData.get("additional_text") as string) || undefined,
      source_url: (formData.get("source_url") as string) || undefined,
    };

    // console.log("Raw form data:", rawData); // Debug log

    // Validate the data using Zod schema
    const validationResult = bookVisitSchema.safeParse(rawData);

    if (!validationResult.success) {
      console.log("Validation errors:", validationResult.error.errors); // Debug log

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
    const result = await bookVisitWithDetailedErrors(validationResult.data);

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Failed to book visit",
        errors: result.validationErrors,
      };
    }

    return {
      success: true,
      message: result.data?.message || "Visit booked successfully!",
    };
  } catch (error) {
    console.error("Book visit action error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
