import { z } from "zod";

export function getClientPropertyListingSchema(t: (key: string) => string) {
  return z.object({
    first_name: z
      .string()
      .min(1, t("firstNameRequired"))
      .max(255, t("firstNameTooLong")),
    last_name: z
      .string()
      .min(1, t("lastNameRequired"))
      .max(255, t("lastNameTooLong")),
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid"))
      .max(255, t("emailTooLong")),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .max(255, t("phoneTooLong")),
    approximate_value: z
      .string()
      .min(1, t("approximateValueRequired"))
      .max(255, t("approximateValueTooLong")),
    property_type: z
      .string()
      .max(255)
      .optional()
      .or(z.literal("")),
    full_address: z
      .string()
      .max(255, t("fullAddressTooLong"))
      .optional()
      .or(z.literal("")),
    bedrooms: z
      .string()
      .optional()
      .or(z.literal("")),
    build_size: z
      .string()
      .optional()
      .or(z.literal("")),
    plot_size: z
      .string()
      .optional()
      .or(z.literal("")),
    energy_cert_number: z
      .string()
      .optional()
      .or(z.literal("")),
    comments: z
      .string()
      .max(1000, t("commentsTooLong"))
      .optional()
      .or(z.literal("")),
  });
}

export type PropertyListingRequest = z.infer<
  ReturnType<typeof getClientPropertyListingSchema>
>;

export type ClientPropertyListingFormData = z.infer<
  ReturnType<typeof getClientPropertyListingSchema>
>;

export interface PropertyListingResponse {
  success: true;
  message: string;
  data: PropertyListingRequest;
}

export interface PropertyListingError {
  error?: string;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}