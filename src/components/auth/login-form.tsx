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
import { LoginSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { login } from "@/actions/login";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { AuthError } from "next-auth";
// import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
// import { toast } from "sonner";

export const LoginForm = ({
  callbackUrl,
}: {
  callbackUrl: string | undefined;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // login(values, callbackUrl).then((data) => {
      //   setError(data?.error);
      //   setSuccess(data?.success);
      // });

      try {
        signIn("credentials", {
          email: values.email,
          password: values.password,
          redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });

        // return { success: "Login successful!" };
        setSuccess("Login successful!");
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              // return { error: "Invalid credentials" };
              setError("Invalid credentials");
            default:
              // return {
              //   error:
              //     "Something went wrong. Please check your internet connection and try again",
              // };
              setError(
                "Something went wrong. Please check your internet connection and try again"
              );
          }
        }

        console.log(error);

        throw error;
      }
    });
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref={`/register${
          callbackUrl ? `?callbackUrl=${callbackUrl}` : ""
        }`}
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
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
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
