// actions/contact-agent.ts
"use server";

import { ZodIssue } from "zod";
import { contactAgentSchema } from "@/types/contact-agent";
import { contactAgentWithDetailedErrors } from "@/data/contact-agent";

export interface ContactAgentActionResult {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  fieldErrors?: { [key: string]: string };
}

export async function contactAgentAction(
  formData: FormData
): Promise<ContactAgentActionResult> {
  try {
    // Extract data from FormData
    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: (formData.get("message") as string) || undefined,
      primary_contact_channel:
        (formData.get("primary_contact_channel") as string) || undefined,
      source_url: (formData.get("source_url") as string) || undefined,
    };

    // Validate the data using Zod schema
    const validationResult = contactAgentSchema.safeParse(rawData);

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
    const result = await contactAgentWithDetailedErrors(validationResult.data);

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Failed to submit request",
        errors: result.validationErrors,
      };
    }

    return {
      success: true,
      message: result.data?.message || "Request submitted successfully!",
    };
  } catch (error) {
    console.error("Contact agent action error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
