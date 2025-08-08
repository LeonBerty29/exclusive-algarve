import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"; // Adjust this import path to match your auth setup
import { revalidatePath } from "next/cache";


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  try {
    // Get the current path from query parameters
    const requestUrl = new URL(request.url);
    const currentPath = requestUrl.searchParams.get("currentPath");

    // Get the session and token directly in the route handler
    const session = await auth();

    const token = session?.accessToken;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required - no access token" },
        { status: 401 }
      );
    }

    // Await the params Promise
    const { propertyId: propertyIdParam } = await params;

    const propertyId = parseInt(propertyIdParam);

    if (isNaN(propertyId)) {
      return NextResponse.json(
        { error: "Invalid property ID" },
        { status: 400 }
      );
    }

    // Check environment variables
    const apiBaseUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    const endpoint = `/client/favorites/${propertyId}`;
    const url = `${apiBaseUrl}${endpoint}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Use token from session
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log("External API returned error status");
      let errorText = "";

      try {
        errorText = await response.text();
        console.log("Error response body:", errorText);
      } catch (textError) {
        console.log("Could not read error response body:", textError);
      }

      console.log(
        `Forwarding error: ${response.status} ${response.statusText}`
      );

      // Forward the same status code from the backend
      return NextResponse.json(
        {
          error: `Failed to remove favorite: ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    // Revalidate the specific path that made the request
    if (currentPath) {
      console.log("Revalidating current path:", currentPath);
      revalidatePath(currentPath);
    }

    // Handle 204 No Content response (successful deletion with no body)
    if (response.status === 204) {
      console.log("Returning 204 No Content");
      return new NextResponse(null, { status: 204 });
    }

    // For other successful responses, try to parse JSON
    let result = null;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      try {
        result = await response.json();
      } catch (jsonError) {
        console.log("Could not parse JSON response:", jsonError);
      }
    }

    console.log("Returning successful response");
    return NextResponse.json(result || { success: true });
  } catch (error) {
    console.error("=== CRITICAL ERROR in DELETE handler ===");
    console.error("Error type:", error?.constructor?.name);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    console.error("=== END CRITICAL ERROR ===");

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
