"use client";
import React, { useState, useTransition, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { contactFormAction } from "@/actions/contact-form";
import { clientContactFormSchema } from "@/types/contact-form";
import { CheckCircle } from "lucide-react";

interface ContactFormProps {
  theme?: "dark" | "light";
  formTitle?: boolean;
  titleStyling?: string;
  submitBtnStyling?: string;
}

export function ContactForm({
  theme = "dark",
  formTitle = true,
  titleStyling = "",
  submitBtnStyling = "",
}: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<string | undefined>("");

  // Capture the source URL once when component mounts
  const sourceUrlRef = useRef<string>("");

  // Initialize sourceUrl on first render
  if (!sourceUrlRef.current && typeof window !== "undefined") {
    sourceUrlRef.current = window.location.href;
  }

  const form = useForm<z.infer<typeof clientContactFormSchema>>({
    resolver: zodResolver(clientContactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
      acceptTerms: false,
      sourceUrl: sourceUrlRef.current,
    },
    reValidateMode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof clientContactFormSchema>) => {
    setError("");

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("first_name", values.firstName);
    formDataToSubmit.append("last_name", values.lastName);
    formDataToSubmit.append("phone", values.phone);
    formDataToSubmit.append("email", values.email);
    formDataToSubmit.append("message", values.message || "");
    formDataToSubmit.append("source_url", values.sourceUrl || "");

    startTransition(async () => {
      try {
        const result = await contactFormAction(formDataToSubmit);

        if (result.success) {
          // Show success dialog
          setSuccessMessage(
            result.message || "Contact form submitted successfully!"
          );
          setShowSuccessDialog(true);

          // Reset form but keep sourceUrl
          form.reset({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            message: "",
            acceptTerms: true,
            sourceUrl: sourceUrlRef.current,
          });
        } else {
          // Handle server validation errors
          if (result.fieldErrors) {
            // Map server field names to client field names and set form errors
            Object.entries(result.fieldErrors).forEach(([key, message]) => {
              const fieldMapping: {
                [key: string]: keyof z.infer<typeof clientContactFormSchema>;
              } = {
                first_name: "firstName",
                last_name: "lastName",
                phone: "phone",
                email: "email",
                message: "message",
                source_url: "sourceUrl",
              };

              const clientFieldName =
                fieldMapping[key] ||
                (key as keyof z.infer<typeof clientContactFormSchema>);
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
                "Failed to submit contact form. Please try again."
            );
          }
        }
      } catch (error) {
        console.error("Submit error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  const inputClasses =
    theme === "dark"
      ? "indent-4 bg-white text-black placeholder:text-gray-500 border-none rounded-none py-5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 placeholder:text-sm"
      : "indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm";

  const textareaClasses =
    theme === "dark"
      ? "indent-4 bg-white text-black placeholder:text-gray-500 border-none rounded-none py-5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 min-h-[120px]"
      : "indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 min-h-[120px]";

  const checkboxLabelClasses =
    theme === "dark" ? "text-white text-xs" : "text-black text-xs";

  return (
    <div className="w-full">
      {formTitle && (
        <h2
          className={cn(
            "text-xl lg:text-2xl mb-6 font-semibold",
            theme === "dark" ? "text-white" : "text-black",
            titleStyling
          )}
        >
          CONTACT US
        </h2>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="FIRST NAME"
                      className={inputClasses}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="LAST NAME"
                      className={inputClasses}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      className={inputClasses}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="PHONE NUMBER"
                      className={inputClasses}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="MESSAGE..."
                    className={cn(textareaClasses, "w-full")}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 mt-8">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="my-0 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={isPending}
                  />
                </FormControl>
                <label className={checkboxLabelClasses}>
                  By requesting information you are authorizing Exclusive
                  Algarve Villas to use your data in order to contact you.
                </label>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Show general error message */}
          {error && (
            <div className="flex justify-center mt-2">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Hidden sourceUrl field */}
          <FormField
            control={form.control}
            name="sourceUrl"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} type="hidden" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-8">
            <Button
              type="submit"
              disabled={
                isPending
              }
              className={cn(
                "bg-primary hover:bg-primary/90 text-white font-medium py-5 px-14 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                submitBtnStyling
              )}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
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
              Message Sent Successfully!
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
