"use client";
import React from "react";
import { Button } from "../ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

export const AddNoteRedirectBtn = ({ propertyId }: { propertyId: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();
  return (
    <Button asChild className="bg-primary text-white">
      <Link
        href={{
          pathname: "/login",
          query: { callbackUrl: paramsString ? `/${pathname}/?${paramsString}&addNote=${propertyId}` : `/${pathname}/?addNote=${propertyId}` },
        }}
      >
        Login
      </Link>
    </Button>
  );
};
