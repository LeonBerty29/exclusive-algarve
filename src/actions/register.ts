"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schema";
// import { registerUser } from "@/data/user";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        password_confirmation: "",
      },
    };
  }

  const { email, password, first_name, last_name, password_confirmation } =
    validatedFields.data;
  const newsletter = false;

  try {
    const endpoint = `/client/register`;
    const config: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
        password_confirmation,
        newsletter,
      }),
    };

    const url = `${process.env.API_BASE_URL}${endpoint}`;

    const response: Response = await fetch(url, config);

    // console.log({response})

    if (!response.ok) {
      const errorText = await response.text();
      // console.log({ errorText });
      // console.log(response);

      if (errorText || response.status === 422) {
        const error = {
          message: "There was an error while creating the user",
          password: "",
          email: "",
          first_name: "",
          last_name: "",
          password_confirmation: "",
        };

        // console.log({errorText})

        const responseErros = JSON.parse(errorText);
        const errorObject = responseErros.errors;

        if (errorObject.password) {
          error.password = errorObject.password[0];
        }

        if (errorObject.email) {
          error.email = errorObject.email[0];
        }

        if (errorObject.first_name) {
          error.first_name = errorObject.first_name[0];
        }

        if (errorObject.last_name) {
          error.last_name = errorObject.last_name[0];
        }

        if (errorObject.password_confirmation) {
          error.password_confirmation = errorObject.password_confirmation[0];
        }

        return {
          error,
        };
      }

      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${errorText}`,
        {
          cause: response,
        }
      );
    }

    const user = await response.json();

    if (!user) {
      return {
        error: {
          message: "There was an error while creating the user",
          password: "",
          email: "",
          first_name: "",
          last_name: "",
          password_confirmation: "",
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
    return {
      error: {
        message:
          "An error occcured while creating the user. Please check your internet Connection and try again",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        password_confirmation: "",
      },
    };
  }

  /* TODO: send verification token email */

  return { success: "User created!" };
};
