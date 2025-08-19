import { z } from "zod";

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

  source_url: z.string().url().optional(),
});

export type BookVisitFormData = z.infer<typeof bookVisitSchema>;

export const clientBookVisitSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  date: z.date({ required_error: "Date is required" }),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  sourceUrl: z.string().optional(),
});

export type ClientBookVisitFormData = z.infer<typeof clientBookVisitSchema>;
