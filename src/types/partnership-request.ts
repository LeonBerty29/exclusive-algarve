import { z } from "zod";

// Server-side schema (matches API exactly)
export const PartnershipFormSchema = z.object({
  company_name: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),

  company_email: z
    .string()
    .min(1, "Company email is required")
    .email("Please enter a valid company email address"),

  company_phone: z
    .string()
    .min(1, "Company phone is required")
    .regex(/^[\+]?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),

  contact_person: z
    .string()
    .min(1, "Contact person is required")
    .min(2, "Contact person must be at least 2 characters")
    .max(100, "Contact person must be less than 100 characters"),

  client_first_name: z
    .string()
    .min(1, "Client first name is required")
    .min(2, "Client first name must be at least 2 characters")
    .max(50, "Client first name must be less than 50 characters"),

  client_last_name: z
    .string()
    .min(1, "Client last name is required")
    .min(2, "Client last name must be at least 2 characters")
    .max(50, "Client last name must be less than 50 characters"),

  partial_client_email: z
    .string()
    .min(1, "Partial client email is required")
    .min(3, "Partial client email must be at least 3 characters")
    .max(100, "Partial client email must be less than 100 characters"),

  partial_client_phone: z
    .string()
    .min(1, "Partial client phone is required")
    .regex(/^[\+]?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),

  interested_property: z
    .string()
    .min(1, "Interested property is required")
    .max(1000, "Interested property must be less than 1000 characters")
    .optional(),

  remarks: z
    .string()
    .min(1, "Remarks is required")
    .max(1000, "Remarks must be less than 1000 characters")
    .optional(),

  confirmed_visit_date: z.string().optional(),

  confirmed_visit_time: z.string().optional(),

  source_url: z.string().url().optional(),
});

export type PartnershipFormData = z.infer<typeof PartnershipFormSchema>;

// Client-side schema
export const clientPartnershipRequestFormSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),

  companyEmail: z
    .string()
    .min(1, "Company email is required")
    .email("Please enter a valid company email address"),

  companyPhone: z
    .string()
    .min(1, "Company phone is required")
    .regex(/^[\+]?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),

  contactPerson: z
    .string()
    .min(1, "Contact person is required")
    .min(2, "Contact person must be at least 2 characters")
    .max(100, "Contact person must be less than 100 characters"),

  clientFirstName: z
    .string()
    .min(1, "Client first name is required")
    .min(2, "Client first name must be at least 2 characters")
    .max(50, "Client first name must be less than 50 characters"),

  clientLastName: z
    .string()
    .min(1, "Client last name is required")
    .min(2, "Client last name must be at least 2 characters")
    .max(50, "Client last name must be less than 50 characters"),

  partialClientEmail: z
    .string(),

  partialClientPhone: z
    .string()
    .min(1, "Partial client phone is required"),

  interestedProperty: z
    .string()
    .min(1, "Interested property is required")
    .max(1000, "Interested property must be less than 1000 characters")
    .optional(),

  remarks: z
    .string()
    .min(1, "Remarks is required")
    .max(1000, "Remarks must be less than 1000 characters")
    .optional(),

  confirmedVisitDate: z.date().nullable().optional(),

  confirmedVisitTime: z.string().optional(),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),

  sourceUrl: z.string().optional(),
});

export type ClientPartnershipRequestFormData = z.infer<
  typeof clientPartnershipRequestFormSchema
>;

// API request/response types
export interface PartnershipRequestFormRequest {
  company_name: string;
  company_email: string;
  company_phone: string;
  contact_person: string;
  client_first_name: string;
  client_last_name: string;
  partial_client_email: string;
  partial_client_phone: string;
  interested_property?: string;
  remarks?: string;
  confirmed_visit_date?: string;
  confirmed_visit_time?: string;
  source_url?: string;
}

export interface PartnershipFormResponse {
  success: true;
  message: string;
  data: PartnershipRequestFormRequest;
}

export interface PartnershipFormError {
  error?: string;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}
