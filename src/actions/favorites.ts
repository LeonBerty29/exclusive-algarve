"use server";

import { auth } from "@/auth";
import { AddToFavorites } from "@/data/favourites";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToFavorite(formData: FormData) {
  const propertyId = formData.get("propertyId") as string;
//   const pathName = formData.get("pathName") as string;
  const session = await auth()
  const token = session?.accessToken

  if(!propertyId) {
    return
  }

  if(!token) {
    redirect('/login')
  }

  const data = await AddToFavorites(Number(propertyId), token)
  console.log(data)

  revalidatePath(`/properties/${propertyId}`);
}
