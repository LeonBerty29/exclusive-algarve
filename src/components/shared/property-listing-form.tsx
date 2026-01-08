"use client";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { ZodIssue } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClientPropertyListingFormData,
  getClientPropertyListingSchema,
} from "@/types/property-listing";
import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { submitPropertyListingAction } from "@/actions/property-listing";

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  property_type?: string;
  approximate_value?: string;
  full_address?: string;
  bedrooms?: string;
  build_size?: string;
  plot_size?: string;
  energy_cert_number?: string;
  comments?: string;
}

type FormField = keyof ClientPropertyListingFormData;

const PropertyListingForm = () => {
  const t = useTranslations("propertyListingForm");
  const tTypes = useTranslations("propertyListingTypes");

  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState<ClientPropertyListingFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    property_type: "",
    approximate_value: "",
    full_address: "",
    bedrooms: "",
    build_size: "",
    plot_size: "",
    energy_cert_number: "",
    comments: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const propertyTypes = [
    { value: "Villa", label: t("propertyTypeVilla") },
    { value: "Apartment", label: t("propertyTypeApartment") },
    { value: "Townhouse", label: t("propertyTypeTownhouse") },
    { value: "Land/Plot", label: t("propertyTypeLand") },
    { value: "Commercial", label: t("propertyTypeCommercial") },
    { value: "Other", label: t("propertyTypeOther") },
  ];

  const handleInputChange = <T extends FormField>(
    field: T,
    value: ClientPropertyListingFormData[T]
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const schema = getClientPropertyListingSchema(tTypes);
    const validationResult = schema.safeParse(formData);
    setErrors({});

    if (validationResult.success) return true;

    const newErrors: FormErrors = {};
    validationResult.error.errors.forEach((err: ZodIssue) => {
      const fieldName = err.path[0] as keyof FormErrors;
      if (fieldName && typeof fieldName === "string") {
        newErrors[fieldName] = err.message;
      }
    });
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      toast.error(t("pleaseFixFormErrors"));
      return;
    }

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    startTransition(async () => {
      try {
        const result = await submitPropertyListingAction(formDataToSubmit);
        if (result.success) {
          setSuccessMessage(result.message || t("thankYouMessage"));
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            property_type: "",
            approximate_value: "",
            full_address: "",
            bedrooms: "",
            build_size: "",
            plot_size: "",
            energy_cert_number: "",
            comments: "",
          });
          setErrors({});
          setShowSuccessDialog(true);
        } else {
          if (result.fieldErrors) {
            const newErrors: FormErrors = {};
            Object.entries(result.fieldErrors).forEach(([key, message]) => {
              newErrors[key as keyof FormErrors] = message;
            });
            setErrors(newErrors);
          }
          toast.error(result.message || t("unexpectedErrorTryAgain"));
        }
      } catch (error) {
        console.error("Submit error:", error);
        toast.error(t("unexpectedErrorTryAgain"));
      }
    });
  };

  const handleInputChangeEvent =
    (field: FormField) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      handleInputChange(
        field,
        e.target.value as ClientPropertyListingFormData[typeof field]
      );
    };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-xl text-center">
              {t("submissionSuccessful")}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-gray-600">{successMessage}</p>
            <p className="text-sm text-gray-500">{t("weWillReview")}</p>
          </div>
          <div className="flex justify-center pt-4 mb-2">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-primary text-white hover:bg-black transition-colors"
            >
              {t("close")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1.5" htmlFor="first_name">{t("firstName")}</Label>
            <Input
              id="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleInputChangeEvent("first_name")}
              placeholder={t("firstNamePlaceholder")}
              className={errors.first_name ? "border-red-500" : ""}
              disabled={isPending}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </div>

          <div>
            <Label className="mb-1.5" htmlFor="last_name">{t("lastName")}</Label>
            <Input
              id="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleInputChangeEvent("last_name")}
              placeholder={t("lastNamePlaceholder")}
              className={errors.last_name ? "border-red-500" : ""}
              disabled={isPending}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </div>

          <div>
            <Label className="mb-1.5" htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChangeEvent("email")}
              placeholder={t("emailPlaceholder")}
              className={errors.email ? "border-red-500" : ""}
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label className="mb-1.5" htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChangeEvent("phone")}
              placeholder={t("phonePlaceholder")}
              className={errors.phone ? "border-red-500" : ""}
              disabled={isPending}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-4">
            {t("aboutTheProperty")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5" htmlFor="property_type">{t("propertyType")}</Label>
              <Select
                value={formData.property_type}
                onValueChange={(value) =>
                  handleInputChange("property_type", value)
                }
                disabled={isPending}
              >
                <SelectTrigger
                  className={
                    errors.property_type ? "border-red-500 w-full" : "w-full"
                  }
                >
                  <SelectValue placeholder={t("selectPropertyType")} />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.property_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.property_type}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="approximate_value">{t("approximateValue")}</Label>
              <Input
                id="approximate_value"
                type="text"
                value={formData.approximate_value}
                onChange={handleInputChangeEvent("approximate_value")}
                placeholder={t("approximateValuePlaceholder")}
                className={errors.approximate_value ? "border-red-500" : ""}
                disabled={isPending}
              />
              {errors.approximate_value && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.approximate_value}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label className="mb-1.5" htmlFor="full_address">{t("fullAddress")}</Label>
              <Input
                id="full_address"
                type="text"
                value={formData.full_address}
                onChange={handleInputChangeEvent("full_address")}
                placeholder={t("fullAddressPlaceholder")}
                className={errors.full_address ? "border-red-500" : ""}
                disabled={isPending}
              />
              {errors.full_address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.full_address}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="bedrooms">{t("bedrooms")}</Label>
              <Input
                id="bedrooms"
                type="text"
                value={formData.bedrooms}
                onChange={handleInputChangeEvent("bedrooms")}
                placeholder={t("bedroomsPlaceholder")}
                className={errors.bedrooms ? "border-red-500" : ""}
                disabled={isPending}
              />
              {errors.bedrooms && (
                <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>
              )}
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="build_size">{t("buildSize")}</Label>
              <Input
                id="build_size"
                type="text"
                value={formData.build_size}
                onChange={handleInputChangeEvent("build_size")}
                placeholder={t("buildSizePlaceholder")}
                className={errors.build_size ? "border-red-500" : ""}
                disabled={isPending}
              />
              {errors.build_size && (
                <p className="text-red-500 text-sm mt-1">{errors.build_size}</p>
              )}
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="plot_size">{t("plotSize")}</Label>
              <Input
                id="plot_size"
                type="text"
                value={formData.plot_size}
                onChange={handleInputChangeEvent("plot_size")}
                placeholder={t("plotSizePlaceholder")}
                className={errors.plot_size ? "border-red-500" : ""}
                disabled={isPending}
              />
              {errors.plot_size && (
                <p className="text-red-500 text-sm mt-1">{errors.plot_size}</p>
              )}
            </div>

            <div>
              <Label className="mb-1.5" htmlFor="energy_cert_number">
                {t("energyCertNumber")}
              </Label>
              <Input
                id="energy_cert_number"
                type="text"
                value={formData.energy_cert_number}
                onChange={handleInputChangeEvent("energy_cert_number")}
                placeholder={t("energyCertPlaceholder")}
                className={errors.energy_cert_number ? "border-red-500" : ""}
                disabled={isPending}
              />
              {errors.energy_cert_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.energy_cert_number}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-4">
            {t("propertyDescription")}
          </h3>
          <div>
            <Label className="mb-1.5" htmlFor="comments">{t("comments")}</Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={handleInputChangeEvent("comments")}
              placeholder={t("commentsPlaceholder")}
              rows={5}
              disabled={isPending}
              className={errors.comments ? "border-red-500" : ""}
            />
            {errors.comments && (
              <p className="text-red-500 text-sm mt-1">{errors.comments}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            className="bg-primary text-white hover:bg-black/85 transition-all"
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? t("submitting") : t("submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingForm;
