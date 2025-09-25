"use server";

import { auth } from "@/auth";
import { CreateNote } from "@/data/notes";
import { NoteSchema } from "@/types/notes";
// import { revalidatePath } from "next/cache";

type ActionState = {
  success?: string;
  error?: string;
  authenticated?: string;
  timestamp?: number; // Add this to force state changes
};

export async function createNote(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const propertyId = formData.get("propertyId") as string;
  const reference = formData.get("reference") as string;
  const note = formData.get("note") as string;

  const validatedData = NoteSchema.safeParse({ propertyId: Number(propertyId), note });

  if (!validatedData.success) {
    return {
      error: `Make sure you fill the form with the correct values and try again`,
      timestamp: Date.now(), // Force state change
    };
  }

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

    // Create Note Api
    await CreateNote({ propertyId: Number(propertyId), note });

    // if (pathName) {
    //   revalidatePath(pathName);
    // }

    return {
      success: `Successfully Created Notes for ${reference}`,
      timestamp: Date.now(), // Force state change
    };
  } catch (error) {
    console.error(`Failed to Create Note for ${reference}`, error);
    return {
      error: `Failed to create Note for ${reference}`,
      timestamp: Date.now(), // Force state change
    };
  }
}
