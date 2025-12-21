"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export default function LogoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl");

  useEffect(() => {
    const handleLogout = async () => {
        signOut({redirectTo:"/login"})

    };

    handleLogout();
  }, [callbackUrl, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
        <div className="space-y-2">
          <p className="text-gray-600">
            Please wait a minute...
          </p>
        </div>
      </div>
    </div>
  );
}
