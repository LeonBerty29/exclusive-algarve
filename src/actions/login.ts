"use server";

import * as z from "zod";

import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

interface ErrResponse {
  message: string;
  responseStatus: number;
}

export const login = async (
  values: z.infer<typeof LoginSchema>
  // callbackUrl: string | undefined
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      redirect: false,
    });

    return { success: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      const response: ErrResponse = error.cause?.response as ErrResponse;

      switch (error.type) {
        case "CredentialsSignin":
          // The custom error message will be in error.cause
          const errorMessage = error.cause?.err?.message;
          return {
            error: errorMessage || "Invalid credentials",
            response,
          };

        default:
          return {
            error:
              error.cause?.err?.message ||
              "Something went wrong. Please check your internet connection and try again",
            response,
          };
      }
    }

    // throw error;
    return {
      error:
        "Something went wrong. Please check your internet connection and try again",
    };
  }
};
