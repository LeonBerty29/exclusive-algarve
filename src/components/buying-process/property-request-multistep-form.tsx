"use client";
import React, { useState, ChangeEvent, JSX } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface PropertyType {
  id: string;
  name: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyTypes: string[];
  minBudget: string;
  maxBudget: string;
  location: string;
  minBedrooms: string;
  maxBedrooms: string;
  minBathrooms: string;
  maxBathrooms: string;
  hasPool: boolean;
  hasGarage: boolean;
  additionalInfo: string;
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
  { id: "1", name: "Apartment" },
  { id: "2", name: "House" },
  { id: "3", name: "Villa" },
  { id: "4", name: "Condo" },
  { id: "5", name: "Townhouse" },
  { id: "6", name: "Penthouse" },
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
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
    additionalInfo: "",
  });

  const totalSteps: number = 3;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const target = e.target;
    const { name, value } = target;

    if (target.type === "checkbox") {
      // Type assertion for checkbox inputs
      const checkboxTarget = target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checkboxTarget.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePropertyTypeChange = (selected: string[]): void => {
    setFormData((prev) => ({
      ...prev,
      propertyTypes: selected,
    }));
  };

  // Budget validation and swapping - only when fields are not focused
  const handleBudgetBlur = (): void => {
    const minBudget: number = parseFloat(formData.minBudget.replace(/,/g, ""));
    const maxBudget: number = parseFloat(formData.maxBudget.replace(/,/g, ""));

    if (formData.minBudget && formData.maxBudget && minBudget > maxBudget) {
      setFormData((prev) => ({
        ...prev,
        minBudget: prev.maxBudget,
        maxBudget: prev.minBudget,
      }));
    }
  };

  // Validation functions
  const validateStep1 = (): boolean => {
    return !!(formData.firstName && formData.lastName);
  };

  const validateStep2 = (): boolean => {
    return !!(
      formData.propertyTypes.length > 0 &&
      formData.minBudget &&
      formData.maxBudget
    );
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      default:
        return true;
    }
  };

  const nextStep = (): void => {
    if (currentStep < totalSteps && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (): void => {
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  const formatNumberInput = (value: string): string => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const formattedValue = formatNumberInput(value);
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const generateMinSelectOptions = (
    min: number,
    max: number,
    currentMax: string
  ): JSX.Element[] => {
    const options: JSX.Element[] = [];
    const maxValue = currentMax ? parseInt(currentMax) : max;

    for (let i = min; i <= Math.min(max, maxValue); i++) {
      options.push(
        <option key={i} value={i.toString()}>
          {i}
        </option>
      );
    }
    return options;
  };

  const generateMaxSelectOptions = (
    min: number,
    max: number,
    currentMin: string
  ): JSX.Element[] => {
    const options: JSX.Element[] = [];
    const minValue = currentMin ? parseInt(currentMin) : min;

    for (let i = Math.max(min, minValue); i <= max; i++) {
      options.push(
        <option key={i} value={i.toString()}>
          {i === max ? `${i}+` : i}
        </option>
      );
    }
    return options;
  };

  const StepIndicator = (): JSX.Element => (
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

  const renderStepContent = (): JSX.Element | null => {
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
                  type="text"
                  name="firstName"
                  placeholder="FIRST NAME *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="LAST NAME *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="PHONE NUMBER"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" className="text-yellow-600" />
              <span>
                By requesting information you are authorizing Exclusive Agence
                Villa to use your data in order to contact you.
              </span>
            </div>
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
                selectedItems={formData.propertyTypes}
                onSelectionChange={handlePropertyTypeChange}
              />
            </div>

            {/* Budget Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Budget Range *
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="minBudget"
                    placeholder="MIN BUDGET"
                    value={formData.minBudget}
                    onChange={handleBudgetChange}
                    onBlur={handleBudgetBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="maxBudget"
                    placeholder="MAX BUDGET"
                    value={formData.maxBudget}
                    onChange={handleBudgetChange}
                    onBlur={handleBudgetBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <input
                type="text"
                name="location"
                placeholder="PREFERRED LOCATION"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Bedrooms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select
                    name="minBedrooms"
                    value={formData.minBedrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">MIN BEDROOMS</option>
                    {generateMinSelectOptions(0, 10, formData.maxBedrooms)}
                  </select>
                </div>
                <div>
                  <select
                    name="maxBedrooms"
                    value={formData.maxBedrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">MAX BEDROOMS</option>
                    {generateMaxSelectOptions(0, 10, formData.minBedrooms)}
                  </select>
                </div>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Bathrooms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select
                    name="minBathrooms"
                    value={formData.minBathrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">MIN BATHROOMS</option>
                    {generateMinSelectOptions(0, 10, formData.maxBathrooms)}
                  </select>
                </div>
                <div>
                  <select
                    name="maxBathrooms"
                    value={formData.maxBathrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">MAX BATHROOMS</option>
                    {generateMaxSelectOptions(0, 10, formData.minBathrooms)}
                  </select>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Amenities</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="hasPool"
                    id="hasPool"
                    checked={formData.hasPool}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 rounded"
                  />
                  <label htmlFor="hasPool" className="text-sm text-gray-700">
                    Property should have a pool
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="hasGarage"
                    id="hasGarage"
                    checked={formData.hasGarage}
                    onChange={handleInputChange}
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
                  name="additionalInfo"
                  placeholder="ADDITIONAL REQUIREMENTS OR COMMENTS"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white">
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-center text-black mb-10">
            REQUEST FOR A PROPERTY
          </h1>

          <StepIndicator />

          <div>
            <div className="mb-8">{renderStepContent()}</div>

            <div className="flex justify-between flex-wrap gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors duration-200"
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
                  disabled={!canProceed()}
                  className={`flex items-center px-8 py-3 font-semibold transition-colors duration-200 ${
                    canProceed()
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
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition-colors duration-200"
                >
                  SUBMIT REQUEST
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
