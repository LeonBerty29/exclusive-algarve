// import { signOut } from "@/auth";
import { signOut } from "next-auth/react";
import React from "react";

export const SignOutButton = ({ className }: { className?: string }) => {
  return (
      <button type="submit" className={className} onClick={()=>signOut({redirectTo:"/login"})}>
        Sign Out
      </button>
  );
};
