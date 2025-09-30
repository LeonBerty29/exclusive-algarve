"use client";
import React, { useState, useTransition, useEffect } from "react";
import { Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { ZodError, ZodIssue } from "zod";
import {
  Dialog,
  DialogContent,
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
import { bookMeetingAction } from "@/actions/book-meeting";
import { clientBookMeetingSchema } from "@/types/book-a-meeting";
import { cn } from "@/lib/utils";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// Client-side form data interface
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  date: Date | null;
  time: string;
  message: string;
  meetingType: "onsite" | "virtual";
  onsiteLocation: string;
  virtualPlatform: string;
  acceptTerms: boolean;
  sourceUrl: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
  message?: string;
  onsiteLocation?: string;
  virtualPlatform?: string;
  acceptTerms?: string;
  sourceUrl?: string;
  meetingType?: string;
}

type FormField = keyof FormData;

const BookMeetingDialog = ({ buttonStyle }: { buttonStyle?: string }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    date: null,
    time: "",
    message: "",
    meetingType: "onsite",
    onsiteLocation: "",
    virtualPlatform: "",
    acceptTerms: false,
    sourceUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Get current page URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prev) => ({
        ...prev,
        sourceUrl: window.location.href,
      }));
    }
  }, []);

  const timeSlots: string[] = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const onsiteLocations: string[] = [
    "Vilamoura office",
    "Lagoa (carvoeiro) office",
    "Lagos office",
  ];

  const virtualPlatforms: string[] = ["Google meet", "Zoom"];

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
      clientBookMeetingSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      const newErrors: FormErrors = {};

      if (error instanceof ZodError) {
        error.errors.forEach((err: ZodIssue) => {
          const fieldName = err.path[0] as keyof FormErrors;
          if (fieldName && typeof fieldName === "string") {
            // Handle specific validation for meeting type dependent fields
            if (err.message.includes("location or platform")) {
              if (formData.meetingType === "onsite") {
                newErrors.onsiteLocation = "Please select an office location";
              } else {
                newErrors.virtualPlatform = "Please select a virtual platform";
              }
            } else {
              newErrors[fieldName] = err.message;
            }
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

    if (!executeRecaptcha) {
      toast("ReCaptcha Error", {
        description:
          "ReCaptcha is not available. Please Refresh the page and try again.",
        duration: 1500,
      });
      return;
    }

    const token = await executeRecaptcha("contactForm");

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("first_name", formData.firstName);
    formDataToSubmit.append("last_name", formData.lastName);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append(
      "meeting_date",
      formData.date?.toISOString().split("T")[0] || ""
    );
    formDataToSubmit.append("meeting_time", formData.time);
    formDataToSubmit.append("additional_text", formData.message);
    formDataToSubmit.append("source_url", formData.sourceUrl);

    // Determine meeting type and location
    const meetingType =
      formData.meetingType === "onsite" ? "On-site meeting" : "Virtual meeting";
    const meetingLocation =
      formData.meetingType === "onsite"
        ? formData.onsiteLocation
        : formData.virtualPlatform;

    formDataToSubmit.append("meeting_type", meetingType);
    formDataToSubmit.append("meeting_location", meetingLocation);
    formDataToSubmit.append("recaptcha_token", token || "");


    startTransition(async () => {
      try {
        const result = await bookMeetingAction(formDataToSubmit);

        if (result.success) {
          setSuccessMessage(result.message || "Meeting booked successfully!");

          // Reset form
          setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            date: null,
            time: "",
            message: "",
            meetingType: "onsite",
            onsiteLocation: "",
            virtualPlatform: "",
            acceptTerms: false,
            sourceUrl: formData.sourceUrl, // Keep the source URL
          });
          setErrors({});
          setIsOpen(false);
          setShowSuccessDialog(true); // Show success dialog
        } else {
          // Handle server validation errors
          if (result.fieldErrors) {
            const newErrors: FormErrors = {};
            Object.entries(result.fieldErrors).forEach(([key, message]) => {
              // Map server field names to client field names
              const fieldMapping: { [key: string]: keyof FormErrors } = {
                first_name: "firstName",
                last_name: "lastName",
                phone: "phone",
                email: "email",
                meeting_date: "date",
                meeting_time: "time",
                meeting_type: "meetingType",
                meeting_location:
                  formData.meetingType === "onsite"
                    ? "onsiteLocation"
                    : "virtualPlatform",
                additional_text: "message",
                source_url: "sourceUrl",
              };

              const clientFieldName =
                fieldMapping[key] || (key as keyof FormErrors);
              newErrors[clientFieldName] = message;
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
              result.message || "Failed to book meeting. Please try again."
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
    handleInputChange("date", date || null);
    setIsDatePopoverOpen(false);
  };

  const handleTimeSelect = (value: string): void => {
    handleInputChange("time", value);
  };

  const handleMeetingTypeChange = (type: "onsite" | "virtual"): void => {
    handleInputChange("meetingType", type);
    // Clear the other location type when switching
    if (type === "onsite") {
      handleInputChange("virtualPlatform", "");
    } else {
      handleInputChange("onsiteLocation", "");
    }
  };

  const handleOnsiteLocationSelect = (value: string): void => {
    handleInputChange("onsiteLocation", value);
  };

  const handleVirtualPlatformSelect = (value: string): void => {
    handleInputChange("virtualPlatform", value);
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="">
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-xl text-center">
              Meeting Booked Successfully!
            </DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-4">
            <p className="text-gray-600">{successMessage}</p>
            <p className="text-sm text-gray-500">
              We&apos;ll get back to you immediately
            </p>
          </div>

          <div className="flex justify-center pt-4 mb-2">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-primary text-white hover:bg-black transition-colors"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Booking Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "rounded-none border-gray-300 bg-transparent hover:bg-gray-50 text-sm font-light",
              buttonStyle
            )}
          >
            BOOK A MEETING
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
          <DialogHeader className="pb-5 flex-shrink-0">
            <DialogTitle>Book A Meeting</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4 pr-2">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="sr-only" htmlFor="firstName">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChangeEvent("firstName")}
                    placeholder="First Name*"
                    className={errors.firstName ? "border-red-500" : ""}
                    disabled={isPending}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="sr-only" htmlFor="lastName">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChangeEvent("lastName")}
                    placeholder="Last Name*"
                    className={errors.lastName ? "border-red-500" : ""}
                    disabled={isPending}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
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
                        !formData.date ? "text-gray-500" : ""
                      } ${errors.date ? "border-red-500" : ""}`}
                      disabled={isPending}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.date
                        ? formData.date.toLocaleDateString()
                        : "Pick a date*"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.date || undefined}
                      onSelect={handleDateSelect}
                      disabled={isDateDisabled}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <Label className="sr-only" htmlFor="time">
                  Time *
                </Label>
                <Select
                  value={formData.time}
                  onValueChange={handleTimeSelect}
                  disabled={isPending}
                >
                  <SelectTrigger
                    className={errors.time ? "border-red-500 w-full" : "w-full"}
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
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                )}
              </div>

              {/* Meeting Type Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Meeting Type
                </Label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="meetingType"
                      value="onsite"
                      checked={formData.meetingType === "onsite"}
                      onChange={() => handleMeetingTypeChange("onsite")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      disabled={isPending}
                    />
                    <span className="text-sm">On-site meeting</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="meetingType"
                      value="virtual"
                      checked={formData.meetingType === "virtual"}
                      onChange={() => handleMeetingTypeChange("virtual")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      disabled={isPending}
                    />
                    <span className="text-sm">Virtual meeting</span>
                  </label>
                </div>
              </div>

              {/* Conditional Location/Platform Selection */}
              {formData.meetingType === "onsite" && (
                <div>
                  <Label className="sr-only" htmlFor="onsiteLocation">
                    Office Location *
                  </Label>
                  <Select
                    value={formData.onsiteLocation}
                    onValueChange={handleOnsiteLocationSelect}
                    disabled={isPending}
                  >
                    <SelectTrigger
                      className={
                        errors.onsiteLocation
                          ? "border-red-500 w-full"
                          : "w-full"
                      }
                    >
                      <SelectValue placeholder="Select office location*" />
                    </SelectTrigger>
                    <SelectContent>
                      {onsiteLocations.map((location: string) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.onsiteLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.onsiteLocation}
                    </p>
                  )}
                </div>
              )}

              {formData.meetingType === "virtual" && (
                <div>
                  <Label className="sr-only" htmlFor="virtualPlatform">
                    Virtual Platform *
                  </Label>
                  <Select
                    value={formData.virtualPlatform}
                    onValueChange={handleVirtualPlatformSelect}
                    disabled={isPending}
                  >
                    <SelectTrigger
                      className={
                        errors.virtualPlatform
                          ? "border-red-500 w-full"
                          : "w-full"
                      }
                    >
                      <SelectValue placeholder="Select virtual platform*" />
                    </SelectTrigger>
                    <SelectContent>
                      {virtualPlatforms.map((platform: string) => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.virtualPlatform && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.virtualPlatform}
                    </p>
                  )}
                </div>
              )}

              <div>
                <Label className="sr-only" htmlFor="message">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChangeEvent("message")}
                  placeholder="Enter any additional information & questions"
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
    </div>
  );
};

export default BookMeetingDialog;
