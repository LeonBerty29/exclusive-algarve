"use client";
import React, { useState, useTransition, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { newsletterFormAction } from "@/actions/newsletter";
import { clientNewsletterFormSchema } from "@/types/newsletter";
import { CheckCircle } from "lucide-react";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className = "" }: NewsletterFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<string | undefined>("");

  // Capture the source URL once when component mounts
  const source_urlRef = useRef<string>("");

  // Initialize source_url on first render
  if (!source_urlRef.current && typeof window !== "undefined") {
    source_urlRef.current = window.location.href;
  }

  const form = useForm<z.infer<typeof clientNewsletterFormSchema>>({
    resolver: zodResolver(clientNewsletterFormSchema),
    defaultValues: {
      email: "",
      source_url: source_urlRef.current,
    },
    reValidateMode: "onChange",
  });

  // Get current page URL on mount

  const onSubmit = (values: z.infer<typeof clientNewsletterFormSchema>) => {
    setError("");

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("email", values.email);
    formDataToSubmit.append("source_url", values.source_url || "");

    startTransition(async () => {
      try {
        const result = await newsletterFormAction(formDataToSubmit);

        if (result.success) {
          // Show success dialog
          setSuccessMessage(
            result.message || "Successfully subscribed to newsletter!"
          );
          setShowSuccessDialog(true);

          // Reset form but keep source_url
          form.reset({
            email: "",
            source_url: source_urlRef.current,
          });
        } else {
          // Handle server validation errors
          if (result.fieldErrors) {
            // Map server field names to client field names and set form errors
            Object.entries(result.fieldErrors).forEach(([key, message]) => {
              const fieldMapping: {
                [key: string]: keyof z.infer<typeof clientNewsletterFormSchema>;
              } = {
                email: "email",
                source_url: "source_url",
              };

              const clientFieldName =
                fieldMapping[key] ||
                (key as keyof z.infer<typeof clientNewsletterFormSchema>);
              form.setError(clientFieldName, {
                type: "server",
                message: message,
              });
            });
          }

          if (result.errors) {
            // Handle detailed validation errors from API
            const errorMessages = Object.entries(result.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("; ");
            setError(`Validation errors: ${errorMessages}`);
          } else {
            setError(
              result.message ||
                "Failed to subscribe to newsletter. Please try again."
            );
          }
        }
      } catch (error) {
        console.error("Submit error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && form.formState.isValid && !isPending) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex max-w-lg mx-auto items-stretch">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="ENTER YOUR EMAIL"
                      className="indent-4 h-12 rounded-none bg-black text-white placeholder:text-gray-400 border-none placeholder:text-xs"
                      onKeyDown={handleKeyDown}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 rounded-none text-white px-6 h-12 flex items-center justify-center"
            >
              {isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>

          {/* Show form validation errors */}
          <div className="max-w-lg mx-auto">
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <div className="flex justify-center mt-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Show general error message */}
          {error && (
            <div className="flex justify-center mt-2">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Hidden source_url field */}
          <FormField
            control={form.control}
            name="source_url"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} type="hidden" />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Successfully Subscribed!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">
              {successMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
