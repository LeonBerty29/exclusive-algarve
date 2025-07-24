"use server"

import * as z from "zod"

import { RegisterSchema } from "@/schema"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    console.log(user)
  } catch (error) {
    return { error: "An error occcured while creating the user. Please check your internet Connection and try again"}
  }

  /* TODO: send verification token email */

  return { success: "User created!" }
}