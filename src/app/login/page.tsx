import { LoginForm } from "@/components/auth/login-form";
import React from "react";

interface SearchParams {
  callbackUrl: string;
}

interface LoginPageProps {
  searchParams: Promise<SearchParams>;
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
};

export default LoginPage;
