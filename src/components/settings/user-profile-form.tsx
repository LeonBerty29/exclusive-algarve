"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Zod schema for form validation
const userProfileSchema = z.object({
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
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
});

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

interface UserProfileFormProps {
  initialData: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string | null; // Allow null here
  } | null;
  accessToken: string | undefined;
  onSuccess?: () => void; // Added missing prop
  onCancel?: () => void; // Added missing prop
}

export function UserProfileForm({
  initialData,
  //   accessToken,
  onSuccess,
  onCancel,
}: UserProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      phoneNumber: initialData?.phoneNumber || "", // Handle null by converting to empty string
    },
  });

  async function onSubmit(data: UserProfileFormValues) {
    try {
      setIsLoading(true);

      // API call to update user profile
      //   const response = await fetch("/api/user/profile", {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //     body: JSON.stringify(data),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Failed to update profile");
      //   }

      //   const result = await response.json();

      // Using sonner toast

      console.log({ data });
      toast.success("Profile updated", {
        description: "Your profile has been successfully updated.",
      });

      // Call onSuccess callback if provided
      onSuccess?.();
    } catch (error) {
      console.error("Error updating profile:", error);

      // Using sonner toast for error
      toast.error("Error", {
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your public display first name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your public display last name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your phone number"
                  {...field}
                  disabled={isLoading}
                  type="tel"
                />
              </FormControl>
              <FormDescription className="sr-only">
                Your phone number for account verification and notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onCancel?.()} // Fixed: use onCancel prop instead of onSuccess
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-primary text-white hover:bg-black transition-colors">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
