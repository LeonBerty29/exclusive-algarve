import { z } from "zod";

export function getClientPropertyListingSchema(t: (key: string) => string) {
  return z.object({
    first_name: z
      .string()
      .min(1, t("firstNameRequired")),
    last_name: z
      .string()
      .min(1, t("lastNameRequired")),
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
    phone: z
      .string()
      .min(1, t("phoneRequired")),
    property_type: z
      .string()
      .min(1, t("propertyTypeRequired")),
    approximate_value: z
      .string()
      .min(1, t("approximateValueRequired")),
    full_address: z
      .string()
      .min(1, t("fullAddressRequired")),
    bedrooms: z
      .string()
      .min(1, t("bedroomsRequired")),
    build_size: z
      .string()
      .min(1, t("buildSizeRequired")),
    plot_size: z
      .string()
      .min(1, t("plotSizeRequired")),
    energy_cert_number: z
      .string()
      .min(1, t("energyCertRequired")),
    comments: z.string().optional(),
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