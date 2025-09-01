import { z } from "zod";

// Server-side schema (matches API)
export const messageFormSchema = z.object({
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

export type MessageFormData = z.infer<typeof messageFormSchema>;

// Client-side schema
export const clientMessageFormSchema = z.object({
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

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),

  sourceUrl: z.string().optional(),
});

export type ClientMessageFormData = z.infer<typeof clientMessageFormSchema>;

// API request/response types
export interface MessageFormRequest {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  source_url?: string;
}

export interface MessageFormResponse {
  success: true;
  message: string;
  data: MessageFormRequest;
}

export interface MessageFormError {
  error?: string;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}
