import { z } from "zod";

// Server-side schema (matches API)
export const newsletterFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  source_url: z.string().url().optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

// Client-side schema
export const clientNewsletterFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  source_url: z.string().optional(),
});

export type ClientNewsletterFormData = z.infer<
  typeof clientNewsletterFormSchema
>;

// API request/response types
export interface NewsletterFormRequest {
  email: string;
  source_url?: string;
}

export interface NewsletterFormResponse {
  success: true;
  message: string;
  data: NewsletterFormRequest;
}

export interface NewsletterFormError {
  error?: string;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}
