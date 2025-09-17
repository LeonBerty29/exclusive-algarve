import { NextResponse } from "next/server";
import { fetchBuyResources } from "@/data/resources";

export async function GET() {
  try {
    const response = await fetchBuyResources({});
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
        error: "Internal server error Error fetching buy resources",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
