import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { logoutUser } from "@/data/user";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    await logoutUser((session as any).accessToken);

    return NextResponse.json({ message: "Successfully logged out" });
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: error.message || "Logout failed" },
      { status: 400 }
    );
  }
}
