// data/contact-agent.ts
import {
  ContactAgentRequest,
  ContactAgentResponse,
  ContactAgentError,
} from "@/types/contact-agent";

export async function contactAgentWithDetailedErrors(
  data: ContactAgentRequest
): Promise<{
  success: boolean;
  data?: ContactAgentResponse;
  error?: string;
  validationErrors?: { [key: string]: string[] };
}> {
  const endpoint = "/forms/request-information";
  try {
    const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Token": process.env.BOOKING_INTERNAL_TOKEN || "",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData: ContactAgentError = await response.json();

      if (response.status === 401) {
        return {
          success: false,
          error: "Unauthorized: Invalid or missing internal token",
        };
      }

      if (response.status === 422 && errorData.errors) {
        return {
          success: false,
          error: errorData.message || "Validation failed",
          validationErrors: errorData.errors,
        };
      }

      return {
        success: false,
        error:
          errorData.error ||
          errorData.message ||
          `HTTP ${response.status}: Request failed`,
      };
    }

    const result: ContactAgentResponse = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}
