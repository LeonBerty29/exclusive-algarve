import { RegisterForm } from "@/components/auth/register-form";
import React from "react";

interface SearchParams {
  callbackUrl: string;
}

interface LoginPageProps {
  searchParams: Promise<SearchParams>;
}

const RegisterPage = async ({ searchParams }: LoginPageProps) => {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl;
  return (
    <div className="flex items-center justify-center min-h-screen pt-24 pb-8">
      <RegisterForm callbackUrl={callbackUrl} />
    </div>
  );
};

export default RegisterPage;
