"use client";
import React, { useState } from "react";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import "intl-tel-input/build/css/intlTelInput.css";
import { useTranslations } from "next-intl";

interface PhoneNumberInputTwoProps {
  value: string;
  disabled?: boolean;
  error?: string;
  theme?: "dark" | "light";
  onValidityChange?: (isValid: boolean, phoneNumber: string) => void;
  translations?: {
    phoneRequired?: string;
    phoneInvalid?: string;
    invalidCountryCode?: string;
    tooShort?: string;
    tooLong?: string;
    invalidFormat?: string;
  };
  className?: string;
}

const ERROR_MESSAGES: { [key: number]: string } = {
  1: "invalidCountryCode",
  2: "tooShort",
  3: "tooLong",
  4: "invalidFormat",
};

export const PhoneNumberInputTwo: React.FC<PhoneNumberInputTwoProps> = ({
  value,
  disabled = false,
  error,
  theme = "light",
  onValidityChange,
  className = "",
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(value);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [phoneErrorCode, setPhoneErrorCode] = useState<number | null>(null);
  const [phoneValidationMessage, setPhoneValidationMessage] = useState<string>("");
  const [phoneFieldTouched, setPhoneFieldTouched] = useState<boolean>(false);


  const phoneNumberTranslation = useTranslations("phoneNumberFormSchema")

  const phoneInputClasses =
    theme === "dark"
      ? "indent-4 bg-white text-black placeholder:text-gray-500 border-none rounded-none p-3 h-9 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 placeholder:text-sm w-full"
      : "indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none p-3 h-9 focus:ring-2 focus:ring-gray-400 placeholder:text-sm w-full";

  const handleNumberChange = (number: string | undefined) => {
    const validNumber = number || "";
    setPhoneNumber(validNumber);
  };

  const handleValidityChange = (isValid: boolean) => {
    setIsPhoneValid(isValid);
    if (onValidityChange) {
      onValidityChange(isValid, phoneNumber);
    }
  };

  const handleBlur = () => {
    setPhoneFieldTouched(true);

    if (phoneNumber && !isPhoneValid) {
      const errorKey = phoneErrorCode ? ERROR_MESSAGES[phoneErrorCode] : null;
      const message = errorKey
        ? phoneNumberTranslation[errorKey as keyof typeof phoneNumberTranslation] ||
          phoneNumberTranslation("phoneInvalid")
        : phoneNumberTranslation("phoneInvalid");

      setPhoneValidationMessage(message as string);
    } else if (!phoneNumber || phoneNumber.trim() === "") {
      setPhoneValidationMessage(phoneNumberTranslation("phoneRequired"));
    } else {
      setPhoneValidationMessage("");
    }
  };

  const handleFocus = () => {
    if (phoneFieldTouched) {
      setPhoneValidationMessage("");
    }
  };

  return (
    <div>
      <IntlTelInput
        onChangeNumber={handleNumberChange}
        onChangeValidity={handleValidityChange}
        onChangeErrorCode={setPhoneErrorCode}
        initOptions={{
          initialCountry: "auto",
          nationalMode: true,
          separateDialCode: true,
          placeholderNumberType: "MOBILE",
          autoPlaceholder: "aggressive",
          geoIpLookup: (callback) => {
            fetch("https://ipapi.co/json")
              .then((res) => res.json())
              .then((data) => callback(data.country_code))
              .catch(() => callback("us"));
          },
        }}
        inputProps={{
          className: className || phoneInputClasses,
          disabled: disabled,
          onBlur: handleBlur,
          onFocus: handleFocus,
        }}
      />
      {(error || (phoneFieldTouched && phoneValidationMessage)) && (
        <p className="text-sm text-red-500 mt-1">
          {error || phoneValidationMessage}
        </p>
      )}
    </div>
  );
};

// Export validation utility function
export const validatePhoneNumber = (
  phoneNumber: string,
  isValid: boolean,
  translations?: {
    phoneRequired?: string;
    phoneInvalid?: string;
  }
) => {
    
  const defaultTranslations = {
    ...translations,
  };

  if (!phoneNumber || phoneNumber.trim() === "") {
    return {
      isValid: false,
      message: defaultTranslations.phoneRequired,
    };
  }

  if (!isValid) {
    return {
      isValid: false,
      message: defaultTranslations.phoneInvalid,
    };
  }

  return {
    isValid: true,
    message: "",
  };
};