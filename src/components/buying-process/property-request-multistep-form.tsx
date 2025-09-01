"use client";
import React, { useState, useTransition, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import * as z from "zod";
import { propertyFormAction } from "@/actions/property-request";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

// Validation schemas for each step
const stepOneSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must authorize us to contact you",
  }),
});

const stepTwoSchema = z.object({
  propertyTypes: z
    .array(z.string())
    .min(1, "At least one property type is required"),
  minBudget: z.string().min(1, "Minimum budget is required"),
  maxBudget: z.string().min(1, "Maximum budget is required"),
  location: z.string().min(1, "Location is required"),
  minBedrooms: z.string().min(1, "Minimum bedrooms is required"),
  maxBedrooms: z.string().min(1, "Maximum bedrooms is required"),
  minBathrooms: z.string().min(1, "Minimum bathrooms is required"),
  maxBathrooms: z.string().min(1, "Maximum bathrooms is required"),
  hasPool: z.boolean(),
  hasGarage: z.boolean(),
});

const stepThreeSchema = z.object({
  additionalInfo: z.string().optional(),
  sourceUrl: z.string().min(1, "Source URL is required"),
});

// Combined schema for final submission
const fullFormSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema);

type StepOneData = z.infer<typeof stepOneSchema>;
type StepTwoData = z.infer<typeof stepTwoSchema>;
type StepThreeData = z.infer<typeof stepThreeSchema>;

// Types
interface PropertyType {
  id: string;
  name: string;
}

interface CheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

interface PropertyTypesProps {
  typologies: PropertyType[];
  selectedItems: string[];
  onSelectionChange: (selected: string[]) => void;
}

// Mock data for property types
const mockPropertyTypes: PropertyType[] = [
  { id: "apartment", name: "Apartment" },
  { id: "house", name: "House" },
  { id: "villa", name: "Villa" },
  { id: "condo", name: "Condo" },
  { id: "townhouse", name: "Townhouse" },
  { id: "penthouse", name: "Penthouse" },
];

// Simple Checkbox component
const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  className = "",
}) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className={`inline-flex items-center justify-center w-4 h-4 border-2 cursor-pointer transition-colors rounded-sm ${
          checked
            ? "bg-yellow-600 border-yellow-600"
            : "bg-gray-400/70 border-gray-400/70"
        } ${className}`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </label>
    </div>
  );
};

// Property Types component
const PropertyTypes: React.FC<PropertyTypesProps> = ({
  typologies,
  selectedItems,
  onSelectionChange,
}) => {
  const handleCheckboxChange = (itemId: string, checked: boolean): void => {
    let newSelection: string[];

    if (checked) {
      newSelection = selectedItems.includes(itemId)
        ? selectedItems
        : [...selectedItems, itemId];
    } else {
      newSelection = selectedItems.filter((id) => id !== itemId);
    }

    onSelectionChange(newSelection);
  };

  return (
    <div className="space-y-4">
      {typologies.map((typology, index) => (
        <div
          key={`${typology.id}-${index}`}
          className="flex justify-between items-center"
        >
          <div className="flex items-center space-x-3">
            <Checkbox
              id={`${typology.id}-${index}`}
              checked={selectedItems.includes(typology.id.toString())}
              onCheckedChange={(checked) =>
                handleCheckboxChange(typology.id.toString(), checked)
              }
            />
            <label
              htmlFor={`${typology.id}-${index}`}
              className={`text-sm font-normal text-neutral-500 cursor-pointer ${
                selectedItems.includes(typology.id.toString()) &&
                "font-bold text-yellow-600"
              }`}
            >
              {typology.name}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export const MultiStepPropertyForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState<string>("");

  // Capture the source URL once when component mounts
  const sourceUrlRef = useRef<string>("");
  if (!sourceUrlRef.current && typeof window !== "undefined") {
    sourceUrlRef.current = window.location.href;
  }

  const totalSteps: number = 3;

  // Form instances for each step
  const stepOneForm = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      consent: false,
    },
    mode: "onChange",
  });

  const stepTwoForm = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      propertyTypes: [],
      minBudget: "",
      maxBudget: "",
      location: "",
      minBedrooms: "",
      maxBedrooms: "",
      minBathrooms: "",
      maxBathrooms: "",
      hasPool: false,
      hasGarage: false,
    },
    mode: "onChange",
  });

  const stepThreeForm = useForm<StepThreeData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      additionalInfo: "",
      sourceUrl: sourceUrlRef.current,
    },
    mode: "onChange",
  });

  const getCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return stepOneForm;
      case 2:
        return stepTwoForm;
      case 3:
        return stepThreeForm;
      default:
        return stepOneForm;
    }
  };

  const canProceedToNextStep = (): boolean => {
    const form = getCurrentForm();
    return form.formState.isValid;
  };

  const nextStep = async (): Promise<void> => {
    const form = getCurrentForm();

    // Trigger validation
    const isValid = await form.trigger();

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateSelectOptions = (
    min: number,
    max: number,
    isMax: boolean = false
  ): React.JSX.Element[] => {
    const options: React.JSX.Element[] = [];

    for (let i = min; i <= max; i++) {
      options.push(
        <option key={i} value={i.toString()}>
          {isMax && i === max ? `${i}+` : i}
        </option>
      );
    }
    return options;
  };

  const handleFinalSubmit = (): void => {
    setGeneralError("");

    // Combine all form data
    const stepOneData = stepOneForm.getValues();
    const stepTwoData = stepTwoForm.getValues();
    const stepThreeData = stepThreeForm.getValues();

    const combinedData = {
      ...stepOneData,
      ...stepTwoData,
      ...stepThreeData,
    };

    // Validate the complete form
    const validationResult = fullFormSchema.safeParse(combinedData);

    if (!validationResult.success) {
      setGeneralError("Please check all form fields for errors");
      return;
    }

    // Create FormData for submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("first_name", combinedData.firstName);
    formDataToSubmit.append("last_name", combinedData.lastName);
    formDataToSubmit.append("email", combinedData.email);
    formDataToSubmit.append("phone", combinedData.phone);
    formDataToSubmit.append(
      "property_types",
      combinedData.propertyTypes.join(",")
    );
    formDataToSubmit.append("budget_min", combinedData.minBudget);
    formDataToSubmit.append("budget_max", combinedData.maxBudget);
    formDataToSubmit.append("location", combinedData.location);
    formDataToSubmit.append("bedrooms_min", combinedData.minBedrooms);
    formDataToSubmit.append("bedrooms_max", combinedData.maxBedrooms);
    formDataToSubmit.append("bathrooms_min", combinedData.minBathrooms);
    formDataToSubmit.append("bathrooms_max", combinedData.maxBathrooms);
    formDataToSubmit.append("with_pool", combinedData.hasPool.toString());
    formDataToSubmit.append("with_garage", combinedData.hasGarage.toString());
    formDataToSubmit.append(
      "additional_text",
      combinedData.additionalInfo || ""
    );
    formDataToSubmit.append("source_url", combinedData.sourceUrl);
    formDataToSubmit.append("consent", combinedData.consent.toString());

    startTransition(async () => {
      try {
        const result = await propertyFormAction(formDataToSubmit);

        if (result.success) {
          // Show success dialog
          setSuccessMessage(
            result.message || "Property request submitted successfully!"
          );
          setShowSuccessDialog(true);

          // Reset all forms
          stepOneForm.reset({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            consent: false,
          });
          stepTwoForm.reset({
            propertyTypes: [],
            minBudget: "",
            maxBudget: "",
            location: "",
            minBedrooms: "",
            maxBedrooms: "",
            minBathrooms: "",
            maxBathrooms: "",
            hasPool: false,
            hasGarage: false,
          });
          stepThreeForm.reset({
            additionalInfo: "",
            sourceUrl: sourceUrlRef.current,
          });
          setCurrentStep(1);
        } else {
          // Handle server validation errors
          if (result.fieldErrors) {
            // Map server field names to client field names and set form errors
            Object.entries(result.fieldErrors).forEach(([key, message]) => {
              // Map server field names to client form fields
              const fieldMapping: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                [key: string]: { form: any; field: string };
              } = {
                first_name: { form: stepOneForm, field: "firstName" },
                last_name: { form: stepOneForm, field: "lastName" },
                email: { form: stepOneForm, field: "email" },
                phone: { form: stepOneForm, field: "phone" },
                consent: { form: stepOneForm, field: "consent" },
                property_types: { form: stepTwoForm, field: "propertyTypes" },
                budget_min: { form: stepTwoForm, field: "minBudget" },
                budget_max: { form: stepTwoForm, field: "maxBudget" },
                location: { form: stepTwoForm, field: "location" },
                bedrooms_min: { form: stepTwoForm, field: "minBedrooms" },
                bedrooms_max: { form: stepTwoForm, field: "maxBedrooms" },
                bathrooms_min: { form: stepTwoForm, field: "minBathrooms" },
                bathrooms_max: { form: stepTwoForm, field: "maxBathrooms" },
                additional_text: {
                  form: stepThreeForm,
                  field: "additionalInfo",
                },
                source_url: { form: stepThreeForm, field: "sourceUrl" },
              };

              const mapping = fieldMapping[key];
              if (mapping) {
                mapping.form.setError(mapping.field, {
                  type: "server",
                  message: message,
                });

                // Navigate to the step containing the error
                if (
                  [
                    "first_name",
                    "last_name",
                    "email",
                    "phone",
                    "consent",
                  ].includes(key)
                ) {
                  setCurrentStep(1);
                } else if (
                  [
                    "property_types",
                    "budget_min",
                    "budget_max",
                    "location",
                    "bedrooms_min",
                    "bedrooms_max",
                    "bathrooms_min",
                    "bathrooms_max",
                  ].includes(key)
                ) {
                  setCurrentStep(2);
                } else if (["additional_text", "source_url"].includes(key)) {
                  setCurrentStep(3);
                }
              }
            });
          }

          if (result.errors) {
            // Handle detailed validation errors from API
            const errorMessages = Object.entries(result.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("; ");
            setGeneralError(`Validation errors: ${errorMessages}`);
          } else {
            setGeneralError(
              result.message ||
                "Failed to submit property request. Please try again."
            );
          }
        }
      } catch (error) {
        console.error("Submit error:", error);
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    });
  };

  const StepIndicator = (): React.JSX.Element => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              step <= currentStep
                ? "bg-yellow-600 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              className={`w-16 h-1 mx-2 transition-all duration-300 ${
                step < currentStep ? "bg-yellow-600" : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStepContent = (): React.JSX.Element | null => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-center text-black mb-8">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  {...stepOneForm.register("firstName")}
                  type="text"
                  placeholder="FIRST NAME *"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
                {stepOneForm.formState.errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {stepOneForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...stepOneForm.register("lastName")}
                  type="text"
                  placeholder="LAST NAME *"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
                {stepOneForm.formState.errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {stepOneForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...stepOneForm.register("email")}
                  type="email"
                  placeholder="EMAIL ADDRESS *"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
                {stepOneForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {stepOneForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...stepOneForm.register("phone")}
                  type="tel"
                  placeholder="PHONE NUMBER *"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
                {stepOneForm.formState.errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {stepOneForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                {...stepOneForm.register("consent")}
                type="checkbox"
                className="text-yellow-600"
                id="consent"
              />
              <label htmlFor="consent">
                By requesting information you are authorizing Exclusive Agence
                Villa to use your data in order to contact you. *
              </label>
            </div>
            {stepOneForm.formState.errors.consent && (
              <p className="text-red-500 text-xs">
                {stepOneForm.formState.errors.consent.message}
              </p>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-center text-black mb-8">
              Property Preferences
            </h2>

            {/* Property Types */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Property Types *
              </h3>
              <PropertyTypes
                typologies={mockPropertyTypes}
                selectedItems={stepTwoForm.watch("propertyTypes")}
                onSelectionChange={(selected) =>
                  stepTwoForm.setValue("propertyTypes", selected, {
                    shouldValidate: true,
                  })
                }
              />
              {stepTwoForm.formState.errors.propertyTypes && (
                <p className="text-red-500 text-xs">
                  {stepTwoForm.formState.errors.propertyTypes.message}
                </p>
              )}
            </div>

            {/* Budget Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Budget Range *
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...stepTwoForm.register("minBudget")}
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="MIN BUDGET"
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                  {stepTwoForm.formState.errors.minBudget && (
                    <p className="text-red-500 text-xs mt-1">
                      {stepTwoForm.formState.errors.minBudget.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...stepTwoForm.register("maxBudget")}
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="MAX BUDGET"
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                  {stepTwoForm.formState.errors.maxBudget && (
                    <p className="text-red-500 text-xs mt-1">
                      {stepTwoForm.formState.errors.maxBudget.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <input
                {...stepTwoForm.register("location")}
                type="text"
                placeholder="PREFERRED LOCATION *"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
              {stepTwoForm.formState.errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {stepTwoForm.formState.errors.location.message}
                </p>
              )}
            </div>

            {/* Bedrooms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Bedrooms *
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select
                    {...stepTwoForm.register("minBedrooms")}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">MIN BEDROOMS</option>
                    {generateSelectOptions(0, 10)}
                  </select>
                  {stepTwoForm.formState.errors.minBedrooms && (
                    <p className="text-red-500 text-xs mt-1">
                      {stepTwoForm.formState.errors.minBedrooms.message}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    {...stepTwoForm.register("maxBedrooms")}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">MAX BEDROOMS</option>
                    {generateSelectOptions(0, 10, true)}
                  </select>
                  {stepTwoForm.formState.errors.maxBedrooms && (
                    <p className="text-red-500 text-xs mt-1">
                      {stepTwoForm.formState.errors.maxBedrooms.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Bathrooms *
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select
                    {...stepTwoForm.register("minBathrooms")}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">MIN BATHROOMS</option>
                    {generateSelectOptions(0, 10)}
                  </select>
                  {stepTwoForm.formState.errors.minBathrooms && (
                    <p className="text-red-500 text-xs mt-1">
                      {stepTwoForm.formState.errors.minBathrooms.message}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    {...stepTwoForm.register("maxBathrooms")}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">MAX BATHROOMS</option>
                    {generateSelectOptions(0, 10, true)}
                  </select>
                  {stepTwoForm.formState.errors.maxBathrooms && (
                    <p className="text-red-500 text-xs mt-1">
                      {stepTwoForm.formState.errors.maxBathrooms.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Amenities</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    {...stepTwoForm.register("hasPool")}
                    type="checkbox"
                    id="hasPool"
                    className="w-4 h-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 rounded"
                  />
                  <label htmlFor="hasPool" className="text-sm text-gray-700">
                    Property should have a pool
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    {...stepTwoForm.register("hasGarage")}
                    type="checkbox"
                    id="hasGarage"
                    className="w-4 h-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 rounded"
                  />
                  <label htmlFor="hasGarage" className="text-sm text-gray-700">
                    Property should have a garage
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-center text-black mb-8">
              Additional Information
            </h2>
            <div className="space-y-4">
              <div>
                <textarea
                  {...stepThreeForm.register("additionalInfo")}
                  placeholder="ADDITIONAL REQUIREMENTS OR COMMENTS"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none"
                />
              </div>

              {/* Hidden source URL field */}
              <input {...stepThreeForm.register("sourceUrl")} type="hidden" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-center text-black mb-10">
            REQUEST FOR A PROPERTY
          </h1>

          <StepIndicator />

          <div>
            <div className="mb-8">{renderStepContent()}</div>

            {/* Show general error message */}
            {generalError && (
              <div className="flex justify-center mb-4">
                <p className="text-red-500 text-sm">{generalError}</p>
              </div>
            )}

            <div className="flex justify-between flex-wrap gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isPending}
                  className="flex items-center px-6 py-3 bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  PREVIOUS
                </button>
              )}

              <div className="flex-1" />

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedToNextStep() || isPending}
                  className={`flex items-center px-8 py-3 font-semibold transition-colors duration-200 ${
                    canProceedToNextStep() && !isPending
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  NEXT
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={!canProceedToNextStep() || isPending}
                  className={`px-8 py-3 font-semibold transition-colors duration-200 ${
                    canProceedToNextStep() && !isPending
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isPending ? "SUBMITTING..." : "SUBMIT REQUEST"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Successful Submission!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">
              {successMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowSuccessDialog(false)}
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
