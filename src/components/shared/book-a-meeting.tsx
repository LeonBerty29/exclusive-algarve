"use client";
import React, { useState } from "react";
import { Calendar } from "lucide-react";
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

// Type definitions
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
}

type FormField = keyof FormData;

export const BookMeeting: React.FC = () => {
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
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const timeSlots: string[] = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
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
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (formData.meetingType === "onsite" && !formData.onsiteLocation) {
      newErrors.onsiteLocation = "Please select an office location";
    }

    if (formData.meetingType === "virtual" && !formData.virtualPlatform) {
      newErrors.virtualPlatform = "Please select a virtual platform";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Visit booked successfully!");

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
      });
    }
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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-none border-gray-300 bg-transparent hover:bg-gray-50 text-sm font-light"
          >
            BOOK A MEETING
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-5">
            <DialogTitle>Book A Meeting</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
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
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
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
              <Select value={formData.time} onValueChange={handleTimeSelect}>
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
                >
                  <SelectTrigger
                    className={
                      errors.onsiteLocation ? "border-red-500 w-full" : "w-full"
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
              />
            </div>

            <div className="flex space-x-2">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label
                htmlFor="acceptTerms"
                className="text-sm text-gray-500 font-light"
              >
                By requesting information you are authorizing Exclusive Algarve
                Villas to use your data in order to contact you.
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <Button
                className="bg-primary text-white hover:bg-black/85 transition-all"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
