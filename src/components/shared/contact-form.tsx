"use client";
import React, { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ZodError, ZodIssue } from "zod";
import { contactFormAction } from "@/actions/contact-form";
import { clientContactFormSchema } from "@/types/contact-form";
import { CheckCircle } from "lucide-react";

// Client-side form data interface
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  acceptTerms: boolean;
  sourceUrl: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  message?: string;
  acceptTerms?: string;
  sourceUrl?: string;
}

type FormField = keyof FormData;

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
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    acceptTerms: true,
    sourceUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Get current page URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prev) => ({
        ...prev,
        sourceUrl: window.location.href,
      }));
    }
  }, []);

  const handleInputChange = <T extends FormField>(
    field: T,
    value: FormData[T]
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateClientForm = (): boolean => {
    try {
      clientContactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      const newErrors: FormErrors = {};

      if (error instanceof ZodError) {
        error.errors.forEach((err: ZodIssue) => {
          const fieldName = err.path[0] as keyof FormErrors;
          if (fieldName && typeof fieldName === "string") {
            newErrors[fieldName] = err.message;
          }
        });
      }

      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    // Client-side validation first
    if (!validateClientForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("first_name", formData.firstName);
    formDataToSubmit.append("last_name", formData.lastName);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("message", formData.message);
    formDataToSubmit.append("source_url", formData.sourceUrl);

    startTransition(async () => {
      try {
        const result = await contactFormAction(formDataToSubmit);

        if (result.success) {
          // Show success dialog instead of toast
          setSuccessMessage(
            result.message || "Contact form submitted successfully!"
          );
          setShowSuccessDialog(true);

          // Reset form
          setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            message: "",
            acceptTerms: false,
            sourceUrl: formData.sourceUrl, // Keep the source URL
          });
          setErrors({});
        } else {
          // Handle server validation errors
          if (result.fieldErrors) {
            const newErrors: FormErrors = {};
            Object.entries(result.fieldErrors).forEach(([key, message]) => {
              // Map server field names to client field names
              const fieldMapping: { [key: string]: keyof FormErrors } = {
                first_name: "firstName",
                last_name: "lastName",
                phone: "phone",
                email: "email",
                message: "message",
                source_url: "sourceUrl",
              };

              const clientFieldName =
                fieldMapping[key] || (key as keyof FormErrors);
              newErrors[clientFieldName] = message;
            });
            setErrors(newErrors);
          }

          if (result.errors) {
            // Handle detailed validation errors from API
            const errorMessages = Object.entries(result.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("; ");
            toast.error(`Validation errors: ${errorMessages}`);
          } else {
            toast.error(
              result.message ||
                "Failed to submit contact form. Please try again."
            );
          }
        }
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  const handleInputChangeEvent =
    (field: FormField) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      handleInputChange(field, e.target.value as FormData[typeof field]);
    };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleInputChange("acceptTerms", e.target.checked);
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
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChangeEvent("firstName")}
              className={cn(
                inputClasses,
                errors.firstName && "ring-2 ring-red-500"
              )}
              placeholder="FIRST NAME"
              disabled={isPending}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChangeEvent("lastName")}
              className={cn(
                inputClasses,
                errors.lastName && "ring-2 ring-red-500"
              )}
              placeholder="LAST NAME"
              disabled={isPending}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChangeEvent("email")}
              className={cn(
                inputClasses,
                errors.email && "ring-2 ring-red-500"
              )}
              placeholder="EMAIL ADDRESS"
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChangeEvent("phone")}
              className={cn(
                inputClasses,
                errors.phone && "ring-2 ring-red-500"
              )}
              placeholder="PHONE NUMBER"
              disabled={isPending}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChangeEvent("message")}
            className={cn(
              textareaClasses,
              "w-full",
              errors.message && "ring-2 ring-red-500"
            )}
            placeholder="MESSAGE..."
            disabled={isPending}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-3 mt-8">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleCheckboxChange}
            className="my-0 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            disabled={isPending}
          />
          <label htmlFor="acceptTerms" className={checkboxLabelClasses}>
            By requesting information you are authorizing Exclusive Algarve
            Villas to use your data in order to contact you.
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>
        )}

        <div className="mt-8">
          <Button
            onClick={handleSubmit}
            disabled={!formData.acceptTerms || isPending}
            className={cn(
              "bg-primary hover:bg-primary/90 text-white font-medium py-5 px-14 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
              submitBtnStyling
            )}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
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