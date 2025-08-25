import {
  ContactFormRequest,
  ContactFormResponse,
  ContactFormError,
} from "@/types/contact-form";

interface DetailedResult {
  success: boolean;
  data?: ContactFormResponse;
  error?: string;
  validationErrors?: { [key: string]: string[] };
}

export async function submitContactFormWithDetailedErrors(
  data: ContactFormRequest
): Promise<DetailedResult> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/forms/contact-us`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Token": process.env.BOOKING_INTERNAL_TOKEN || "",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      if (response.status === 422) {
        // Validation errors
        const errorData: ContactFormError = await response.json();
        return {
          success: false,
          error: errorData.message || "Validation failed",
          validationErrors: errorData.errors,
        };
      }

      if (response.status === 401) {
        return {
          success: false,
          error: "Unauthorized - please try again",
        };
      }

      // Other HTTP errors
      const errorText = await response.text();
      return {
        success: false,
        error: `Server error: ${response.status} ${errorText}`,
      };
    }

    const responseData: ContactFormResponse = await response.json();
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error("Contact form API error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}
