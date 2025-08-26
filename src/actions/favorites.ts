"use server";

import { auth } from "@/auth";
import { AddToFavorites } from "@/data/favourites";
import { revalidatePath } from "next/cache";

type ActionState = {
  success?: string;
  error?: string;
  authenticated?: string;
  timestamp?: number; // Add this to force state changes
};

export async function addToFavorite(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const propertyId = formData.get("propertyId") as string;
  const reference = formData.get("reference") as string;
  const pathName = formData.get("pathName") as string;

  try {
    const session = await auth();
    const token = session?.accessToken;

    if (!propertyId) {
      return {
        error: "Property ID is required",
        timestamp: Date.now(), // Force state change
      };
    }

    if (!token) {
      return {
        authenticated: "You must be logged in to add a property to favorites",
        timestamp: Date.now(), // Force state change
      };
    }

    await AddToFavorites(Number(propertyId), token);

    if (pathName) {
      revalidatePath(pathName);
    }

    return {
      success: `${reference} successfully Added to favorites!`,
      timestamp: Date.now(), // Force state change
    };
  } catch (error) {
    console.error("Add to favorites error:", error);
    return {
      error: `Failed to add ${reference} to favorites`,
      timestamp: Date.now(), // Force state change
    };
  }
}