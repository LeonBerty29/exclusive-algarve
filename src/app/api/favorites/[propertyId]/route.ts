import { NextRequest, NextResponse } from "next/server";

// interface FavoritesResponse {
//   favorite_properties: number[];
// }

function createBasicAuthHeader(): string {
  const credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  return `Basic ${credentials}`;
}

function createBearerAuthHeader(token: string): string {
  return `Bearer ${token}`;
}

async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  useBearer = false,
  token?: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const url = `${
    process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL
  }${endpoint}`;

  const authHeader =
    useBearer && token
      ? createBearerAuthHeader(token)
      : createBasicAuthHeader();

  const defaultHeaders = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response: Response = await fetch(url, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return response.json();
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  try {
    // Get the authorization header from the request
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token required" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // Await the params Promise
    const { propertyId: propertyIdParam } = await params;
    const propertyId = parseInt(propertyIdParam);

    if (isNaN(propertyId)) {
      return NextResponse.json(
        { error: "Invalid property ID" },
        { status: 400 }
      );
    }

    const endpoint = `/client/favorites/${propertyId}`;

    const result = await apiRequest(
      endpoint,
      {
        method: "DELETE",
      },
      true,
      token
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error removing favorite:", error);

    if (error instanceof Error && error.message.includes("401")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (error instanceof Error && error.message.includes("404")) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}
