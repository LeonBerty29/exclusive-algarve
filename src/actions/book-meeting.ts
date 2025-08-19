"use server";

import { ZodIssue } from "zod";
import { bookMeetingSchema } from "@/types/book-a-meeting";
import { bookMeetingWithDetailedErrors } from "@/data/book-meeting";

export interface BookMeetingActionResult {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  fieldErrors?: { [key: string]: string };
}

export async function bookMeetingAction(
  formData: FormData
): Promise<BookMeetingActionResult> {
  try {
    // Extract data from FormData
    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      meeting_date: formData.get("meeting_date") as string,
      meeting_time: formData.get("meeting_time") as string,
      meeting_type: formData.get("meeting_type") as string,
      meeting_location: formData.get("meeting_location") as string,
      additional_text: (formData.get("additional_text") as string) || undefined,
      source_url: (formData.get("source_url") as string) || undefined,
    };

    // Validate the data using Zod schema
    const validationResult = bookMeetingSchema.safeParse(rawData);

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
    const result = await bookMeetingWithDetailedErrors(validationResult.data);

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Failed to book meeting",
        errors: result.validationErrors,
      };
    }

    return {
      success: true,
      message: result.data?.message || "Meeting booked successfully!",
    };
  } catch (error) {
    console.error("Book meeting action error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
