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

    const recaptchaToken = formData.get("recaptcha_token") as string;

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

    if (!recaptchaToken) {
      return {
        success: false,
        message: "ReCaptcha token is missing",
      };
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const verificationResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const verification = await verificationResponse.json();

    if (verification.success && verification.score > 0.5) {
      console.log({ success: true, score: verification.score });
    } else {
      console.log({
        success: false,
        score: verification.score,
        errorCodes: verification["error-codes"],
      });
      return {
        success: false,
        message:
          "ReCaptcha verification failed. Please refresh the page and try again.",
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
