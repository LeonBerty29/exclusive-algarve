import { z } from "zod";

// Server-side schema (for API validation)
export const bookVisitSchema = z.object({
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

  visit_date: z
    .string()
    .min(1, "Visit date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),

  visit_time: z
    .string()
    .min(1, "Visit time is required")
    .regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),

  additional_text: z.string().optional(),

  source_url: z.string().url().optional().or(z.literal("")),
});

export type BookVisitFormData = z.infer<typeof bookVisitSchema>;

// Client-side schema (matching your form field names and types)
export const clientBookVisitSchema = z.object({
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

  visit_date: z
    .date({
      required_error: "Visit date is required",
      invalid_type_error: "Please select a valid date",
    })
    .nullable()
    .refine((date) => date !== null, {
      message: "Visit date is required",
    }),

  visit_time: z
    .string()
    .min(1, "Visit time is required")
    .regex(/^\d{2}:\d{2}$/, "Please select a valid time"),

  additional_text: z.string().optional(),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),

  source_url: z.string().optional(),
});

export type ClientBookVisitFormData = z.infer<typeof clientBookVisitSchema>;
