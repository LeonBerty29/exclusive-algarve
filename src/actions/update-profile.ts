"use server";

import * as z from "zod";

import { UserProfileSchema } from "@/schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const updateProfile = async (
  values: z.infer<typeof UserProfileSchema>
  // callbackUrl: string | undefined
) => {
  const validatedFields = UserProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
        first_name: "",
        last_name: "",
      },
    };
  }

  const session = await auth();
  const accessToken = session?.accessToken;

  // console.log({validatedFieldsData: validatedFields.data})

  const { first_name, last_name, phone_number, newsletter } = validatedFields.data;
  // console.log({ first_name, last_name, phone_number, newsletter })
  try {
    const endpoint = `/v1/auth/client/update`;
    const config: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        phone: phone_number,
        newsletter: newsletter,
      }),
    };

    const url = `${process.env.API_BASE_URL}${endpoint}`;

    const response: Response = await fetch(url, config);
    // console.log({ response });

    if (!response.ok) {

      if(response.status === 401){
        return {
          error: {
            message: "We are unable to update your profile. Please try again later and contact us if problem persists",
            first_name: "",
            last_name: "",
          },
        };
      }

      const responseErrors = await response.json();

      // console.log({ errorText });
      // console.log(response);

      if (response.status === 422) {
        const error = {
          message: "There was an error while creating the user",
          first_name: "",
          last_name: "",
        };

        // console.log({ errorText });

        const errorObject = responseErrors.errors;

        // console.log(errorObject);

        if (errorObject.first_name) {
          error.first_name = errorObject.first_name[0];
        }

        if (errorObject.last_name) {
          error.last_name = errorObject.last_name[0];
        }

        if (responseErrors.message) {
          error.message = responseErrors.message;
        }

        return {
          error,
        };
      }

      return {
        error: {
          message: responseErrors.message,
          first_name: "",
          last_name: "",
        },
      };
    }

    const user = await response.json();

    if (!user) {
      return {
        error: {
          message: "There was an error while Updating profile",
          first_name: "",
          last_name: "",
        },
      };
    }
  } catch (error) {
    console.log(error);
    // console.log({error})
    // console.log({errorCause: error.cause})
    // console.log({errorStatus: error.cause.status})
    // console.log({errorText: error.cause.statusText})
    // console.log({errorBody: error.cause.body})

    // const err = await error.cause.response.text();

    // console.log({ err });
    if (error instanceof Error) {
      return {
        error: {
          message: error.message,
          first_name: "",
          last_name: "",
        },
      };
    }
    return {
      error: {
        message:
          "An error occcured while Updating your profile. Please check your internet Connection and try again",
        first_name: "",
        last_name: "",
      },
    };
  }

  /* TODO: send verification token email */

  revalidatePath("/settings");

  return { success: "Profile Updated" };
};
