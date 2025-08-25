"use client";
import React, { useState, useTransition, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ZodError, ZodIssue } from "zod";
import { contactAgentAction } from "@/actions/contact-agent";
import { clientContactAgentSchema } from "@/types/contact-agent";
import { Property } from "@/types/property";

// Client-side form data interface
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  primaryContactChannel: string;
  acceptTerms: boolean;
  sourceUrl: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  message?: string;
  primaryContactChannel?: string;
  acceptTerms?: string;
  sourceUrl?: string;
}

type FormField = keyof FormData;

const ContactAgentForm = ({
  salesConsultant,
}: {
  salesConsultant: Property["sales_consultant"];
}) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    primaryContactChannel: "Email",
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

  const contactChannels = ["Email", "Phone", "Whatsapp", "SMS"];

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
      clientContactAgentSchema.parse(formData);
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

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

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
    formDataToSubmit.append(
      "primary_contact_channel",
      formData.primaryContactChannel
    );
    formDataToSubmit.append("source_url", formData.sourceUrl);

    startTransition(async () => {
      try {
        const result = await contactAgentAction(formDataToSubmit);

        if (result.success) {
          toast.success(result.message || "Request submitted successfully!");

          // Reset form
          setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            message: "",
            primaryContactChannel: "",
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
                primary_contact_channel: "primaryContactChannel",
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
              result.message || "Failed to submit request. Please try again."
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

  const handleCheckboxChange = (checked: boolean): void => {
    handleInputChange("acceptTerms", checked);
  };

  const handleContactChannelSelect = (value: string): void => {
    handleInputChange("primaryContactChannel", value);
  };

  return (
    <>
      {/* Agent Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
          {salesConsultant.profile_picture && (
            <Image
              src={salesConsultant.profile_picture}
              alt={salesConsultant.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">
            {salesConsultant.name}
          </h3>
          <p className="text-sm text-gray-300">Request more information</p>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChangeEvent("firstName")}
              className={`bg-transparent border-0 border-b rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2 ${
                errors.firstName ? "border-red-500" : "border-primary"
              }`}
              disabled={isPending}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChangeEvent("lastName")}
              className={`bg-transparent border-0 border-b rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2 ${
                errors.lastName ? "border-red-500" : "border-primary"
              }`}
              disabled={isPending}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <Input
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleInputChangeEvent("phone")}
            className={`bg-transparent border-0 border-b rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2 ${
              errors.phone ? "border-red-500" : "border-primary"
            }`}
            disabled={isPending}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Input
            type="email"
            placeholder="E-mail address"
            value={formData.email}
            onChange={handleInputChangeEvent("email")}
            className={`bg-transparent border-0 border-b rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2 ${
              errors.email ? "border-red-500" : "border-primary"
            }`}
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Message"
            rows={4}
            value={formData.message}
            onChange={handleInputChangeEvent("message")}
            className={`bg-transparent border-0 border-b rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2 resize-none ${
              errors.message ? "border-red-500" : "border-primary"
            }`}
            disabled={isPending}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <div>
          <Select
            value={formData.primaryContactChannel}
            onValueChange={handleContactChannelSelect}
            disabled={isPending}
          >
            <SelectTrigger
              className={`w-full bg-transparent border-0 border-b rounded-none text-white focus:border-primary focus:ring-0 focus:ring-offset-0 px-0 pb-2 [&>svg]:text-white ${
                errors.primaryContactChannel
                  ? "border-red-500"
                  : "border-primary"
              }`}
            >
              <SelectValue
                placeholder="Primary contact Channel"
                className="text-white/70"
              />
            </SelectTrigger>
            <SelectContent className="bg-black border-primary">
              {contactChannels.map((channel) => (
                <SelectItem
                  key={channel}
                  value={channel}
                  className="text-white hover:bg-gray-800"
                >
                  {channel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.primaryContactChannel && (
            <p className="text-red-500 text-sm mt-1">
              {errors.primaryContactChannel}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox
            id="terms"
            className="border-primary data-[state=checked]:bg-white data-[state=checked]:text-black"
            checked={formData.acceptTerms}
            onCheckedChange={handleCheckboxChange}
            disabled={isPending}
          />
          <label
            htmlFor="terms"
            className="text-sm text-white/90 cursor-pointer"
          >
            I agree to the terms and conditions
          </label>
          {errors.acceptTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-none py-3 mt-6 relative flex items-center justify-center border border-primary"
          disabled={isPending}
        >
          <span className="absolute left-1/2 transform -translate-x-1/2 font-semibold">
            {isPending ? "SUBMITTING..." : "REQUEST INFORMATION"}
          </span>
          <Send className="w-4 h-4 absolute right-4" />
        </Button>
      </form>
    </>
  );
};

export default ContactAgentForm;
