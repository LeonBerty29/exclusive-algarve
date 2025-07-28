import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { logoutUser } from "@/data/user";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    await logoutUser(session.accessToken);

    return NextResponse.json({ message: "Successfully logged out" });
  } catch (error: unknown) {
    console.error("Logout error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Logout failed";

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
