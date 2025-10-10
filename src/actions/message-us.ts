"use server";

import { ZodIssue } from "zod";
import { messageFormSchema } from "@/types/message-us";
import { submitMessageFormWithDetailedErrors } from "@/data/message-us";

export interface MessageFormActionResult {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  fieldErrors?: { [key: string]: string };
}

export async function messageFormAction(
  formData: FormData
): Promise<MessageFormActionResult> {
  try {
    // Extract data from FormData
    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      source_url: (formData.get("source_url") as string) || undefined,
    };

    const recaptchaToken = formData.get("recaptcha_token") as string;

    // Validate the data using Zod schema
    const validationResult = messageFormSchema.safeParse(rawData);

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
      // console.log({ success: true, score: verification.score });
    } else {
      // console.log({
      //   success: false,
      //   score: verification.score,
      //   errorCodes: verification["error-codes"],
      // });
      return {
        success: false,
        message:
          "ReCaptcha verification failed. Please refresh the page and try again.",
      };
    } 

    // Call the API
    const result = await submitMessageFormWithDetailedErrors(
      validationResult.data
    );

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Failed to submit message",
        errors: result.validationErrors,
      };
    }

    return {
      success: true,
      message: result.data?.message || "Message submitted successfully!",
    };
  } catch (error) {
    console.error("Message form action error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
