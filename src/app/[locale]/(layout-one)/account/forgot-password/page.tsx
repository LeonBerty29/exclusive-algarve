import { ForgotPasswordForm } from "@/components/forgot-password/forgot-password-form";
import React from "react";

const page = async () => {
  return (
    <div className="h-screen w-full flex flex-col align-center justify-center py-24 px-6 md:px-10 container mx-auto">
      <div className="space-y-4 mt-5 shadow-2xl w-fit p-8 rounded-xl mx-auto border-gray-100">
        <div className="border-b pb-3">
          <p className="text-gray-600 mb-2 font-semibold text-xl">
            Forgot you password!
          </p>
        </div>
        <p className="text-gray-700 font-light text-base text-center max-w-xl mx-auto">
          Please enter your account email to receive a reset link message.
        </p>

        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default page;
