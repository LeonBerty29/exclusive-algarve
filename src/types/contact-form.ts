import { z } from "zod";

// Server-side schema (matches API)
export const contactFormSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),

  last_name: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),

  source_url: z.string().url().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Client-side schema
export const clientContactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  message: z
    .string().optional(),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),

  sourceUrl: z.string().optional(),
});

export type ClientContactFormData = z.infer<typeof clientContactFormSchema>;

// API request/response types
export interface ContactFormRequest {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  message: string;
  source_url?: string;
}

export interface ContactFormResponse {
  success: true;
  message: string;
  data: ContactFormRequest;
}

export interface ContactFormError {
  error?: string;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}
