import { z } from "zod";

export const bookMeetingSchema = z.object({
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

  meeting_date: z
    .string()
    .min(1, "Meeting date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),

  meeting_time: z
    .string()
    .min(1, "Meeting time is required")
    .regex(/^\d{1,2}:\d{2}$/, "Time must be in H:MM or HH:MM format"),

  meeting_type: z.string().min(1, "Meeting type is required"),

  meeting_location: z.string().min(1, "Meeting location is required"),

  additional_text: z.string().optional(),

  source_url: z.string().url().optional(),
});

export type BookMeetingFormData = z.infer<typeof bookMeetingSchema>;

export const clientBookMeetingSchema = z
  .object({
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
    meetingType: z.enum(["onsite", "virtual"], {
      required_error: "Meeting type is required",
    }),
    onsiteLocation: z.string().optional(),
    virtualPlatform: z.string().optional(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    sourceUrl: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.meetingType === "onsite" && !data.onsiteLocation) {
        return false;
      }
      if (data.meetingType === "virtual" && !data.virtualPlatform) {
        return false;
      }
      return true;
    },
    {
      message: "Please select a location or platform based on meeting type",
      path: ["onsiteLocation"], // This will be handled in the component
    }
  );

export type ClientBookMeetingFormData = z.infer<typeof clientBookMeetingSchema>;

// API request/response types
export interface BookMeetingRequest {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  meeting_date: string; // YYYY-MM-DD format
  meeting_time: string; // H:MM or HH:MM format (24h)
  meeting_type: string;
  meeting_location: string;
  additional_text?: string;
  source_url?: string;
}

export interface BookMeetingResponse {
  success: true;
  message: string;
  data: BookMeetingRequest;
}

export interface BookMeetingError {
  error?: string;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}
