"use client";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SignOutButton } from "./sign-out-button";

const NavbarUserAuth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }


  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full bg-black hover:bg-black/90 text-white min-h-9 aspect-square text-lg font-light flex items-center justify-center uppercase cursor-pointer transition-colors">
              {session?.user?.email?.[0]}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/favorites" className="cursor-pointer">
                Favourites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <SignOutButton className="cursor-pointer w-full" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className="rounded-none bg-black hover:bg-black/90 text-white px-6 text-sm font-light"
          asChild
        >
          <Link href="/login">SIGN IN</Link>
        </Button>
      )}
    </>
  );
};

export default NavbarUserAuth;
