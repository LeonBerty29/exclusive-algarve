"use server";

import { auth } from "@/auth";
import { AddToFavorites } from "@/data/favourites";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("favoritesAction");

  const propertyId = formData.get("propertyId") as string;
  const reference = formData.get("reference") as string;
  const pathName = formData.get("pathName") as string;

  try {
    const session = await auth();
    const token = session?.accessToken;

    if (!propertyId) {
      return {
        error: t("propertyIdRequired"),
        timestamp: Date.now(), // Force state change
      };
    }

    if (!token) {
      return {
        authenticated: t("mustBeLoggedInToAdd"),
        timestamp: Date.now(), // Force state change
      };
    }

    await AddToFavorites(Number(propertyId), token);

    if (pathName) {
      revalidatePath(pathName);
    }

    return {
      success: `${reference} ${t("successfullyAdded")}`,
      timestamp: Date.now(), // Force state change
    };
  } catch (error) {
    console.error(t("addToFavoritesError"), error);
    return {
      error: `${t("failedToAdd")} ${reference} ${t("toFavorites")}`,
      timestamp: Date.now(), // Force state change
    };
  }
}
