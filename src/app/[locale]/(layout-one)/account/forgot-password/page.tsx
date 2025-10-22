import { ForgotPasswordForm } from "@/components/forgot-password/forgot-password-form";
import React from "react";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("accountForgotPasswordPage");

  return (
    <div className="h-screen w-full flex flex-col align-center justify-center py-24 px-6 md:px-10 container mx-auto">
      <div className="space-y-4 mt-5 shadow-2xl w-fit p-8 rounded-xl mx-auto border-gray-100">
        <div className="border-b pb-3">
          <p className="text-gray-600 mb-2 font-semibold text-xl">
            {t("forgotPasswordHeading")}
          </p>
        </div>
        <p className="text-gray-700 font-light text-base text-center max-w-xl mx-auto">
          {t("forgotPasswordDescription")}
        </p>

        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default page;