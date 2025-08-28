"use client";
import React, { useState, useTransition, useEffect } from "react";
import { Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { ZodError, ZodIssue } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookVisitAction } from "@/actions/book-visit";
import { clientBookVisitSchema } from "@/types/book-a-visit";

// Client-side form data interface
interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  visit_date: Date | null;
  visit_time: string;
  additional_text: string;
  acceptTerms: boolean;
  source_url: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  visit_date?: string;
  visit_time?: string;
  additional_text?: string;
  acceptTerms?: string;
  source_url?: string;
}

type FormField = keyof FormData;

const BookVisitDialog: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    visit_date: null,
    visit_time: "",
    additional_text: "",
    acceptTerms: true,
    source_url: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  // Get current page URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prev) => ({
        ...prev,
        source_url: window.location.href,
      }));
    }
  }, []);

  const timeSlots: string[] = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const handleInputChange = <T extends FormField>(
    field: T,
    value: FormData[T]
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateClientForm = (): boolean => {
    try {
      clientBookVisitSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      const newErrors: FormErrors = {};

      if (error instanceof ZodError) {
        error.errors.forEach((err: ZodIssue) => {
          const fieldName = err.path[0] as keyof FormErrors;
          if (fieldName && typeof fieldName === "string") {
            newErrors[fieldName] = err.message;
          }
        });
      }

      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    // Client-side validation first
    if (!validateClientForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    // Validate that date is not null before proceeding
    if (!formData.visit_date) {
      toast.error("Please select a visit date");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("first_name", formData.first_name);
    formDataToSubmit.append("last_name", formData.last_name);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append(
      "visit_date",
      formData.visit_date.toISOString().split("T")[0]
    );
    formDataToSubmit.append("visit_time", formData.visit_time);
    formDataToSubmit.append("additional_text", formData.additional_text);
    formDataToSubmit.append("source_url", formData.source_url);

    // Include acceptTerms if you need it on the server
    // formDataToSubmit.append("acceptTerms", formData.acceptTerms.toString());

    startTransition(async () => {
      try {
        const result = await bookVisitAction(formDataToSubmit);

        if (result.success) {
          setSuccessMessage(result.message || "Visit booked successfully!");

          // Reset form
          setFormData({
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            visit_date: null,
            visit_time: "",
            additional_text: "",
            acceptTerms: false,
            source_url: formData.source_url, // Keep the source URL
          });
          setErrors({});
          setIsOpen(false);

          // Show success dialog
          setIsSuccessDialogOpen(true);
        } else {
          // Handle server validation errors
          if (result.fieldErrors) {
            const newErrors: FormErrors = {};
            Object.entries(result.fieldErrors).forEach(([key, message]) => {
              const fieldName = key as keyof FormErrors;
              newErrors[fieldName] = message;
            });
            setErrors(newErrors);
          }

          if (result.errors) {
            // Handle detailed validation errors from API
            const errorMessages = Object.entries(result.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("; ");
            toast.error(`Validation errors: ${errorMessages}`);
          } else {
            toast.error(
              result.message || "Failed to book visit. Please try again."
            );
          }
        }
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  const handleInputChangeEvent =
    (field: FormField) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      handleInputChange(field, e.target.value as FormData[typeof field]);
    };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleInputChange("acceptTerms", e.target.checked);
  };

  const handleDateSelect = (date: Date | undefined): void => {
    handleInputChange("visit_date", date || null);
    setIsDatePopoverOpen(false);
  };

  const handleTimeSelect = (value: string): void => {
    handleInputChange("visit_time", value);
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary text-lg px-8 py-5 text-white hover:bg-black/85 transition-all">
            Book Visit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
          <DialogHeader className="pb-5 flex-shrink-0">
            <DialogTitle>Book Visit</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4 pr-2">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="sr-only" htmlFor="first_name">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChangeEvent("first_name")}
                    placeholder="First Name*"
                    className={errors.first_name ? "border-red-500" : ""}
                    disabled={isPending}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="sr-only" htmlFor="last_name">
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChangeEvent("last_name")}
                    placeholder="Last Name*"
                    className={errors.last_name ? "border-red-500" : ""}
                    disabled={isPending}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label className="sr-only" htmlFor="phone">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChangeEvent("phone")}
                  placeholder="Phone*"
                  className={errors.phone ? "border-red-500" : ""}
                  disabled={isPending}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChangeEvent("email")}
                  placeholder="Email*"
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isPending}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label className="sr-only">Date *</Label>
                <Popover
                  open={isDatePopoverOpen}
                  onOpenChange={setIsDatePopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !formData.visit_date ? "text-gray-500" : ""
                      } ${errors.visit_date ? "border-red-500" : ""}`}
                      disabled={isPending}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.visit_date
                        ? formData.visit_date.toLocaleDateString()
                        : "Pick a date*"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.visit_date || undefined}
                      onSelect={handleDateSelect}
                      disabled={isDateDisabled}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.visit_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.visit_date}
                  </p>
                )}
              </div>

              <div>
                <Label className="sr-only" htmlFor="visit_time">
                  Time *
                </Label>
                <Select
                  value={formData.visit_time}
                  onValueChange={handleTimeSelect}
                  disabled={isPending}
                >
                  <SelectTrigger
                    className={
                      errors.visit_time ? "border-red-500 w-full" : "w-full"
                    }
                  >
                    <SelectValue placeholder="Select a time*" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time: string) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.visit_time && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.visit_time}
                  </p>
                )}
              </div>

              <div>
                <Label className="sr-only" htmlFor="additional_text">
                  Message
                </Label>
                <Textarea
                  id="additional_text"
                  value={formData.additional_text}
                  onChange={handleInputChangeEvent("additional_text")}
                  placeholder="Enter any additional information"
                  rows={3}
                  disabled={isPending}
                />
              </div>

              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isPending}
                />
                <Label
                  htmlFor="acceptTerms"
                  className="text-sm text-gray-500 font-light"
                >
                  By requesting information you are authorizing Exclusive
                  Algarve Villas to use your data in order to contact you.
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 flex-shrink-0 border-t mt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-white hover:bg-black/85 transition-all"
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      {/* <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600">Success!</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">{successMessage}</p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setIsSuccessDialogOpen(false)}
              className="bg-primary text-white hover:bg-black/85 transition-all"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Success!!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">
              {successMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setIsSuccessDialogOpen(false)}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookVisitDialog;
