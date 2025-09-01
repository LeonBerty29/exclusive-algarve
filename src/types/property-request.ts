    import { z } from "zod";

    // Server-side schema (matches API)
    export const propertyFormSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    property_types: z.string().min(1, "At least one property type is required"),
    budget_min: z.string().min(1, "Minimum budget is required"),
    budget_max: z.string().min(1, "Maximum budget is required"),
    location: z.string().min(1, "Location is required"),
    bedrooms_min: z.number().min(0, "Minimum bedrooms is required"),
    bedrooms_max: z.number().min(0, "Maximum bedrooms is required"),
    bathrooms_min: z.number().min(0, "Minimum bathrooms is required"),
    bathrooms_max: z.number().min(0, "Maximum bathrooms is required"),
    with_pool: z.boolean(),
    with_garage: z.boolean(),
    additional_text: z.string().optional(),
    source_url: z.string().url().min(1, "Source URL is required"),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must authorize us to contact you",
    }),
    });

    export type PropertyFormData = z.infer<typeof propertyFormSchema>;

    export const clientPropertyFormStepOneSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must authorize us to contact you",
    }),
    });

    export const clientPropertyFormStepTwoSchema = z.object({
    property_types: z
        .array(z.string())
        .min(1, "At least one property type is required"),
    budget_min: z.string().min(1, "Minimum budget is required"),
    budget_max: z.string().min(1, "Maximum budget is required"),
    location: z.string().min(1, "Location is required"),
    bedrooms_min: z.number().min(0, "Minimum bedrooms is required"),
    bedrooms_max: z.number().min(0, "Maximum bedrooms is required"),
    bathrooms_min: z.number().min(0, "Minimum bathrooms is required"),
    bathrooms_max: z.number().min(0, "Maximum bathrooms is required"),
    with_pool: z.boolean(),
    with_garage: z.boolean(),
    });

    export const clientPropertyFormStepThreeSchema = z.object({
    additional_text: z.string().optional(),
    source_url: z.string().min(1, "Source URL is required"),
    });

    // Main client schema - all fields required except additional_text
    export const clientPropertyFormSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    property_types: z
        .array(z.string())
        .min(1, "At least one property type is required"),
    budget_min: z.string().min(1, "Minimum budget is required"),
    budget_max: z.string().min(1, "Maximum budget is required"),
    location: z.string().min(1, "Location is required"),
    bedrooms_min: z.number().min(0, "Minimum bedrooms is required"),
    bedrooms_max: z.number().min(0, "Maximum bedrooms is required"),
    bathrooms_min: z.number().min(0, "Minimum bathrooms is required"),
    bathrooms_max: z.number().min(0, "Maximum bathrooms is required"),
    with_pool: z.boolean(),
    with_garage: z.boolean(),
    additional_text: z.string().optional(),
    source_url: z.string().min(1, "Source URL is required"),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must authorize us to contact you",
    }),
    });

    export type ClientPropertyFormData = z.infer<typeof clientPropertyFormSchema>;

    // API request/response types
    export interface PropertyFormRequest {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    property_types: string;
    budget_min: string;
    budget_max: string;
    location: string;
    bedrooms_min: number;
    bedrooms_max: number;
    bathrooms_min: number;
    bathrooms_max: number;
    with_pool: boolean;
    with_garage: boolean;
    additional_text?: string;
    source_url: string;
    }

    export interface PropertyFormResponse {
    success: true;
    message: string;
    data: PropertyFormRequest;
    }

    export interface PropertyFormError {
    error?: string;
    message?: string;
    errors?: {
        [key: string]: string[];
    };
    }
