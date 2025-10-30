"use server";

import { ZodIssue } from "zod";
import { getTranslations } from "next-intl/server";
// import { submitMessageFormWithDetailedErrors } from "@/data/message-us";
import { getRequestFloorPlanSchema } from "@/types/schema.request-floor-plan";

export interface requestFloorPlanActionResult {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
  fieldErrors?: { [key: string]: string };
}

export async function requestFloorPlanAction(
  formData: FormData
): Promise<requestFloorPlanActionResult> {
  const t = await getTranslations("requestFloorPlanAction");
  const requestFloorPlanSchemaTranslation = await getTranslations(
    "requestFloorPlanSchema"
  );
  const FloorPlanSchema = getRequestFloorPlanSchema(
    requestFloorPlanSchemaTranslation
  );

  try {
    // Extract data from FormData
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      additional_text: formData.get("additional_text") as string,
    };

    const recaptchaToken = formData.get("recaptcha_token") as string;

    // Validate the data using Zod schema
    const validationResult = FloorPlanSchema.safeParse(rawData);

    console.log({ validationResult });

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
        message: t("pleaseCheckFormForErrors"),
        fieldErrors,
      };
    }

    if (!recaptchaToken) {
      return {
        success: false,
        message: t("recaptchaTokenIsMissing"),
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
      // Passed verification
    } else {
      return {
        success: false,
        message: t("recaptchaVerificationFailed"),
      };
    }

    // Call the API
    // const result = await submitMessageFormWithDetailedErrors(
    //   validationResult.data
    // );

    const result = {
      success: false,
      error: t("serviceNotAvailable"),
      validationErrors: {},
      data: {
        message: "",
      },
    };

    if (!result.success) {
      return {
        success: false,
        message: result.error || t("failedToSubmitRequest"),
        errors: result.validationErrors,
      };
    }

    return {
      success: true,
      message:
        result.data?.message || t("floorPlanRequestSubmittedSuccessfully"),
    };
  } catch (error) {
    console.error("Message form action error:", error);

    return {
      success: false,
      message: t("unexpectedErrorOccurred"),
    };
  }
}
