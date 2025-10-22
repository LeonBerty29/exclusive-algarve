"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getTranslations } from "next-intl/server";

interface ErrResponse {
  message: string;
  responseStatus: number;
}

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const t = await getTranslations("loginAction");
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t("invalidFields") };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: t("loginSuccessful") };
  } catch (error) {
    if (error instanceof AuthError) {
      const response: ErrResponse = error.cause?.response as ErrResponse;

      switch (error.type) {
        case "CredentialsSignin":
          const errorMessage = error.cause?.err?.message;
          return {
            error: errorMessage || t("invalidCredentials"),
            response,
          };

        default:
          return {
            error: error.cause?.err?.message || t("somethingWentWrong"),
            response,
          };
      }
    }

    return {
      error: t("somethingWentWrong"),
    };
  }
};