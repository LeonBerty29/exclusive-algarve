import { fetchSellResources } from "@/data/resources";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetchSellResources({});
    const data = response.data.stories;

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    // console.error("=== END CRITICAL ERROR ===");

    return NextResponse.json(
      {
        error: "Internal server error Error fetching sell resources",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
