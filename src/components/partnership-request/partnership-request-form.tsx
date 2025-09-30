"use client";
import React, { useState, useTransition, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { PartnershipRequestFormAction } from "@/actions/partnership-requests";
import { clientPartnershipRequestFormSchema } from "@/types/partnership-request";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";

export function PartnershipRequestForm() {
  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Capture the source URL once when component mounts
  const sourceUrlRef = useRef<string>("");

  // Initialize sourceUrl on first render
  if (!sourceUrlRef.current && typeof window !== "undefined") {
    sourceUrlRef.current = window.location.href;
  }

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

  const form = useForm<z.infer<typeof clientPartnershipRequestFormSchema>>({
    resolver: zodResolver(clientPartnershipRequestFormSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      contactPerson: "",
      clientFirstName: "",
      clientLastName: "",
      partialClientEmail: "",
      partialClientPhone: "",
      interestedProperty: "",
      remarks: "",
      confirmedVisitDate: null,
      confirmedVisitTime: "",
      acceptTerms: false,
      sourceUrl: sourceUrlRef.current,
    },
    mode: "onChange",
  });

  const onSubmit = async (
    values: z.infer<typeof clientPartnershipRequestFormSchema>
  ) => {
    if (!executeRecaptcha) {
      toast("ReCaptcha Error", {
        description:
          "ReCaptcha is not available. Please Refresh the page and try again.",
        duration: 1500,
      });
      return;
    }

    const token = await executeRecaptcha("partnershipRequest");
    
    setError("");
    setHasAttemptedSubmit(true);

    // Manually trigger validation to show all errors
    form.trigger();

    // Check if form is valid before proceeding
    if (!form.formState.isValid) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("company_name", values.companyName);
    formDataToSubmit.append("company_email", values.companyEmail);
    formDataToSubmit.append("company_phone", values.companyPhone);
    formDataToSubmit.append("contact_person", values.contactPerson);
    formDataToSubmit.append("client_first_name", values.clientFirstName);
    formDataToSubmit.append("client_last_name", values.clientLastName);
    formDataToSubmit.append("partial_client_email", values.partialClientEmail);
    formDataToSubmit.append("partial_client_phone", values.partialClientPhone);
    formDataToSubmit.append(
      "interested_property",
      values.interestedProperty || ""
    );
    formDataToSubmit.append("remarks", values.remarks || "");
    formDataToSubmit.append("recaptcha_token", token || "");

    // Format date as YYYY-MM-DD if provided
    if (values.confirmedVisitDate) {
      formDataToSubmit.append(
        "confirmed_visit_date",
        values.confirmedVisitDate.toISOString().split("T")[0]
      );
    }

    formDataToSubmit.append(
      "confirmed_visit_time",
      values.confirmedVisitTime || ""
    );
    formDataToSubmit.append("source_url", values.sourceUrl || "");

    startTransition(async () => {
      try {
        const result = await PartnershipRequestFormAction(formDataToSubmit);

        if (result.success) {
          // Show success dialog
          setSuccessMessage(
            result.message || "Partnership request submitted successfully!"
          );
          setShowSuccessDialog(true);

          // Reset form but keep sourceUrl
          form.reset({
            companyName: "",
            companyEmail: "",
            companyPhone: "",
            contactPerson: "",
            clientFirstName: "",
            clientLastName: "",
            partialClientEmail: "",
            partialClientPhone: "",
            interestedProperty: "",
            remarks: "",
            confirmedVisitDate: null,
            confirmedVisitTime: "",
            acceptTerms: false,
            sourceUrl: sourceUrlRef.current,
          });

          // Reset the attempted submit flag
          setHasAttemptedSubmit(false);
        } else {
          // Handle server validation errors
          if (result.fieldErrors) {
            // Map server field names to client field names and set form errors
            Object.entries(result.fieldErrors).forEach(([key, message]) => {
              const fieldMapping: {
                [key: string]: keyof z.infer<
                  typeof clientPartnershipRequestFormSchema
                >;
              } = {
                company_name: "companyName",
                company_email: "companyEmail",
                company_phone: "companyPhone",
                contact_person: "contactPerson",
                client_first_name: "clientFirstName",
                client_last_name: "clientLastName",
                partial_client_email: "partialClientEmail",
                partial_client_phone: "partialClientPhone",
                interested_property: "interestedProperty",
                remarks: "remarks",
                confirmed_visit_date: "confirmedVisitDate",
                confirmed_visit_time: "confirmedVisitTime",
                source_url: "sourceUrl",
              };

              const clientFieldName =
                fieldMapping[key] ||
                (key as keyof z.infer<
                  typeof clientPartnershipRequestFormSchema
                >);
              form.setError(clientFieldName, {
                type: "server",
                message: message,
              });
            });
          }

          if (result.errors) {
            // Handle detailed validation errors from API
            const errorMessages = Object.entries(result.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("; ");
            setError(`Validation errors: ${errorMessages}`);
          } else {
            setError(
              result.message ||
                "Failed to submit partnership request. Please try again."
            );
          }
        }
      } catch (error) {
        console.error("Submit error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  // Custom submit handler that doesn't rely on form validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formValues = form.getValues();
    onSubmit(formValues);
  };

  const handleDateSelect = (date: Date | undefined): void => {
    form.setValue("confirmedVisitDate", date || null);
    setIsDatePopoverOpen(false);
  };

  const handleTimeSelect = (value: string): void => {
    form.setValue("confirmedVisitTime", value);
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Information - 2 column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="COMPANY NAME*"
                      className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.companyName) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="COMPANY EMAIL*"
                      className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.companyEmail) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companyPhone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="COMPANY PHONE*"
                      className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.companyPhone) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="CONTACT PERSON*"
                      className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.contactPerson) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Client Details Section */}
          <h3 className="text-black text-lg font-semibold mb-4 mt-6">
            CLIENT DETAILS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="clientFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="CLIENT FIRST NAME*"
                      className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.clientFirstName) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientLastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="CLIENT LAST NAME*"
                      className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.clientLastName) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="partialClientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="PARTIAL CLIENT EMAIL*"
                      className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.partialClientEmail) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="partialClientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="PARTIAL CLIENT PHONE*"
                      className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.partialClientPhone) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Property Interest Textarea */}
          <FormField
            control={form.control}
            name="interestedProperty"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="PROPERTY THE CLIENT IS INTERESTED IN..."
                    className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 min-h-[120px] w-full"
                    disabled={isPending}
                  />
                </FormControl>
                {(hasAttemptedSubmit ||
                  form.formState.touchedFields.interestedProperty) && (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          {/* Remarks Textarea */}
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="ADDITIONAL NOTES OR REMARKS..."
                    className="indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 min-h-[120px] w-full"
                    disabled={isPending}
                  />
                </FormControl>
                {(hasAttemptedSubmit ||
                  form.formState.touchedFields.remarks) && <FormMessage />}
              </FormItem>
            )}
          />

          {/* Visit Date and Time Section */}
          <h3 className="text-black text-lg font-semibold mb-4 mt-6">
            CONFIRMED VISIT (Optional)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="confirmedVisitDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover
                      open={isDatePopoverOpen}
                      onOpenChange={setIsDatePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 ${
                            !field.value ? "text-gray-600" : "text-black"
                          }`}
                          disabled={isPending}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "CONFIRMED VISIT DATE"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={handleDateSelect}
                          disabled={isDateDisabled}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.confirmedVisitDate) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmedVisitTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={handleTimeSelect}
                      disabled={isPending}
                    >
                      <SelectTrigger className="w-full indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400">
                        <SelectValue placeholder="CONFIRMED VISIT TIME" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time: string) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {(hasAttemptedSubmit ||
                    form.formState.touchedFields.confirmedVisitTime) && (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 mt-8">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="my-0 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={isPending}
                  />
                </FormControl>
                <label className="text-black text-xs">
                  By requesting information you are authorizing Exclusive
                  Algarve Villas to use your data in order to contact you.
                </label>
                {(hasAttemptedSubmit ||
                  form.formState.touchedFields.acceptTerms) && <FormMessage />}
              </FormItem>
            )}
          />

          {/* Show general error message */}
          {error && (
            <div className="flex justify-center mt-2">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Hidden sourceUrl field */}
          <FormField
            control={form.control}
            name="sourceUrl"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} type="hidden" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-8">
            <Button
              type="submit"
              disabled={isPending}
              className={cn(
                "bg-primary hover:bg-primary/90 text-white font-medium py-5 px-14 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Partnership Request Submitted!
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
}
