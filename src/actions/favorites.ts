"use server";

import { auth } from "@/auth";
import { AddToFavorites } from "@/data/favourites";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

type ActionState = {
  success?: string;
  error?: string;
  authenticated?: string;
};

export async function addToFavorite(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const propertyId = formData.get("propertyId") as string;
  const pathName = formData.get("pathName") as string;

  try {
    const session = await auth();
    const token = session?.accessToken;

    if (!propertyId) {
      return {
        error: "Property ID is required",
      };
    }

    if (!token) {
      // redirect("/login");
      return {
        authenticated: "You must be logged in to add a property to favorites",
      };
    }

    await AddToFavorites(Number(propertyId), token);

    if (pathName) {
      revalidatePath(pathName);
    }

    return {
      success: `${propertyId} successfully Added to favorites!`,
    };
  } catch (error) {
    console.error("Add to favorites error:", error);
    return {
      error: `Failed to add ${propertyId} to favorites`,
    };
  }
}
