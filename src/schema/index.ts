import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email(),
    password: z
      .string()
      .min(1, {
        message: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      }),
    password_confirmation: z
      .string()
      .min(1, {
        message: "Password confirmation is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters long",
      }),
    first_name: z.string().min(1, {
      message: "First Name is required",
    }),
    last_name: z.string().min(1, {
      message: "Last Name is required",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"], // This will show the error on the password_confirmation field
  });

export const UserProfileSchema = z.object({
  first_name: z.string().min(1, {
    message: "First Name is required",
  }),
  last_name: z.string().min(1, {
    message: "Last Name is required",
  }),
  phone_number: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 1, // Only validate if value exists
      {
        message: "Phone number must be at least 10 digits",
      }
    ),
});
