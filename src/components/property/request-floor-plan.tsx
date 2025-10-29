"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiaEdit } from "react-icons/lia";
import { Button } from "../ui/button";
import { useState, useTransition, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { messageFormAction } from "@/actions/message-us";
import { CheckCircle } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { getRequestFloorPlanSchema } from "@/types/schema.request-floor-plan";
// import { CheckCircle } from "lucide-react";
// import { useTranslations } from "next-intl";

export const RequestFloorPlan = () => {
  //   const t = useTranslations("requestInformation");
  const [isOpen, setIsOpen] = React.useState(false);
  //   const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);

  //   const handleSuccess = () => {
  //     setIsOpen(false);
  //     setShowSuccessDialog(true);
  //   };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="text-sm font-semibold rounded-none bg-primary text-white !px-6 hover:text-white hover:bg-primary/80 transition-colors"
          >
            <LiaEdit className="h-3 w-3" />
            Request Floor Plan
          </Button>
        </DialogTrigger>
        <DialogContent
          showCloseButton={true}
          closeButtonStyles="bg-white"
          className="border-primary overflow-y-auto sm:max-w-sm max-h-[90vh]"
        >
          <div>
            <DialogHeader>
              <DialogTitle className="font-medium my-5 leading-relaxed">
                How Can the Agent Send You the Floor plan
              </DialogTitle>
            </DialogHeader>
            <div className="px-2 py-4">
              <RequestFloorPlanForm />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

function RequestFloorPlanForm() {
  const t = useTranslations("messageUsForm");
  const FloorPlanSchema = getRequestFloorPlanSchema();
  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Capture the source URL once when component mounts
  const sourceUrlRef = useRef<string>("");

  // Initialize source_url on first render
  if (!sourceUrlRef.current && typeof window !== "undefined") {
    sourceUrlRef.current = window.location.href;
  }

  const form = useForm<z.infer<typeof FloorPlanSchema>>({
    resolver: zodResolver(FloorPlanSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      additional_text: "",
    },
    reValidateMode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof FloorPlanSchema>) => {
    if (!executeRecaptcha) {
      toast(`${t("toastReCaptchaErrorTitle")}`, {
        description: t("toastReCaptchaErrorDescription"),
        duration: 1500,
      });
      return;
    }

    setError("");

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", values.name);
    formDataToSubmit.append("email", values.email);
    formDataToSubmit.append("phone", values.phone!);
    formDataToSubmit.append("additional_text", values.additional_text!);

    startTransition(async () => {
      const token = await executeRecaptcha("messageUsForm");
      formDataToSubmit.append("recaptcha_token", token || "");

      try {
        const result = await messageFormAction(formDataToSubmit);

        if (result.success) {
          // Show success dialog
          setSuccessMessage(result.message || t("successMessageDefault"));
          setShowSuccessDialog(true);

          form.reset({
            name: "",
            email: "",
            phone: "",
            additional_text: "",
          });
        } else {
          // Handle server validation errors
          if (result.fieldErrors) {
            Object.entries(result.fieldErrors).forEach(([key, message]) => {
              const fieldMapping: {
                [key: string]: keyof z.infer<typeof FloorPlanSchema>;
              } = {
                name: "name",
                email: "email",
                phone: "phone",
                additional_text: "additional_text",
              };

              const clientFieldName =
                fieldMapping[key] ||
                (key as keyof z.infer<typeof FloorPlanSchema>);
              form.setError(clientFieldName, {
                type: "server",
                message: message,
              });
            });
          }

          if (result.errors) {
            const errorMessages = Object.entries(result.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("; ");
            setError(`Validation errors: ${errorMessages}`);
          } else {
            setError(
              result.message || "Failed to send message. Please try again."
            );
          }
        }
      } catch (error) {
        console.error("Submit error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Name"
                    className="indent-4 bg-gray-200 placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary/80 placeholder:text-sm"
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
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="indent-4 bg-gray-200 placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary/80 placeholder:text-sm"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Phone"
                    className="indent-4 bg-gray-200 placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary/80 placeholder:text-sm"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Textarea */}
          <FormField
            control={form.control}
            name="additional_text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add a message (optional)"
                    className="indent-4 bg-gray-200 placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary/80 min-h-[120px]"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              "bg-primary hover:bg-primary/90 text-white font-medium py-5 px-8 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            Send
          </Button>

          {/* Show general error message */}
          {error && (
            <div className="flex justify-center mt-2">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
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
              {t("dialogTitleSuccess")}
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
              {t("buttonClose")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
