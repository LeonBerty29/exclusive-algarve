// actions/contact-agent.ts
"use server";

import { ZodIssue } from "zod";
import { ForgotPasswordSchema } from "@/schema/schema.forgot-password";
import { forgotPassword } from "@/data/user";

export interface ForgotPasswordResult {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  fieldErrors?: { [key: string]: string };
}

export async function forgotPasswordAction(
  formData: FormData
): Promise<ForgotPasswordResult> {
  try {
    // Extract data from FormData
    const rawData = {
      email: formData.get("email") as string,
    };

    const recaptchaToken = formData.get("recaptcha_token") as string;

    // Validate the data using Zod schema
    const validationResult = ForgotPasswordSchema.safeParse(rawData);

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
    const result = await forgotPassword(validationResult.data);

    // console.log({result})

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to submit request",
        errors: result.errors,
      };
    }

    return {
      success: true,
      message: result.message || "Request submitted successfully! Check your email",
    };
  } catch (error) {
    console.error("Error in forgot password action:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
