// types/contact-agent.ts
import { z } from "zod";

// Server-side validation schema
export const contactAgentSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
  primary_contact_channel: z
    .enum(["Email", "Phone", "Whatsapp", "SMS"])
    .optional(),
  source_url: z.string().optional(),
});

// Client-side validation schema (matches the form data interface)
export const clientContactAgentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
  primaryContactChannel: z
    .enum(["Email", "Phone", "Whatsapp", "SMS"], {
      required_error: "Please select a primary contact channel",
      invalid_type_error: "Please select a valid primary contact channel",
      message: "Please select a valid primary contact channel",
    })
    .optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  sourceUrl: z.string().optional(),
});

// Type definitions based on schemas
export type ContactAgentRequest = z.infer<typeof contactAgentSchema>;
export type ClientContactAgentData = z.infer<typeof clientContactAgentSchema>;

// API Response types
export interface ContactAgentResponse {
  success: boolean;
  message: string;
  data: ContactAgentRequest;
}

export interface ContactAgentError {
  error?: string;
  message?: string;
  errors?: { [key: string]: string[] };
}
