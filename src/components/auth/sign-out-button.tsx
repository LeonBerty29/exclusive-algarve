"use client"

// import { signOut } from "@/auth";
import { signOut } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

export const SignOutButton = ({ className }: { className?: string }) => {

  async function handleSignOut() {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    })

    const response = await res.json()

    if (response.success) {
      signOut({redirectTo:"/login"})
    } else {
      toast.error(response.message, {
        duration: 1000
      })
    }
  }

  return (
      <button type="submit" className={className} onClick={handleSignOut}>
        Sign Out
      </button>
  );
};
