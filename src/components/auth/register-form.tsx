"use client";

import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { RegisterSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { register } from "@/actions/register";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { toast } from "sonner";

type ErrorType = {
  message: string;
  password?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  password_confirmation?: string;
};

export const RegisterForm = ({
  callbackUrl,
}: {
  callbackUrl: string | undefined;
}) => {
  const [error, setError] = useState<ErrorType | undefined>({
    message: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    password_confirmation: "",
  });
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError({
      message: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
      password_confirmation: "",
    });
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          try {
            signIn("credentials", {
              email: values.email,
              password: values.password,
              redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            });

            return { success: "Login successful!" };
          } catch (error) {
            if (error instanceof AuthError) {
              // switch (error.type) {
              //   case "CredentialsSignin":
              //     return { error: "Invalid credentials" };
              //   default:
              //     return {
              //       error:
              //         "Something went wrong. Please check your internet connection and try again",
              //     };
              // }

              toast.error(
                "User successfully created, but an error occured while signing you in, Try to sign in"
              );
            }

            console.log(error);

            // throw error;
          }
        }
      });
    });
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Alreay have an account?"
        backButtonHref="/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your First Name"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your Last Name"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="johndoe@example.com"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder=""
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder=""
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error?.message} />
            <FormSuccess message={success} />

            <Button type="submit" className="w-full" disabled={isPending}>
              Create an account
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
