"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import useScroll from "@/lib/use-scroll";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function NavBar({colorChange = false}: {colorChange?: boolean}) {
  const scrolled = useScroll(50);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Properties" },
    { href: "/about-us", label: "About Us" },
    { href: "/blog", label: "Blog" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        className={`fixed top-0 flex w-full justify-center  ${scrolled
          ? "border-b border-gray-200 bg-white/95 backdrop-blur-md"
          : "bg-white/0"
          } z-50 transition-all duration-300`}
      >
        <div className="2xl:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14 flex h-16 items-center justify-between">

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gray-900",
                  scrolled  ? "text-gray-600" : colorChange ? "text-white" : "text-gray-600",
                  isActiveLink(link.href) && "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <div className="flex items-center z-50">
            <Link href="/" className="text-xl font-bold text-gray-900">
              <Image
                src={scrolled || !colorChange ? "/images/eav-logo-dark.svg" : "/images/eav-logo.png"}
                alt="Logo"
                width={70}
                height={50}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className={cn(
            "hidden lg:flex items-center space-x-4",
            scrolled ? "text-gray-600" : colorChange ? "text-white" : "text-gray-600"
          )}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">ENG</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-20">
                <DropdownMenuItem className="cursor-pointer">
                  <span className="text-sm">ENG</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="text-sm">FRE</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="rounded-none border-gray-300 bg-transparent hover:bg-gray-50 text-sm font-light"
              asChild
            >
              <Link href="/book-meeting">BOOK A MEETING</Link>
            </Button>
            <Button
              className="rounded-none bg-black hover:bg-black/90 text-white px-6 text-sm font-light"
              asChild
            >
              <Link href="/sign-in">SIGN IN</Link>
            </Button>
          </div>

          {/* Mobile/Tablet Right Section */}
          <div className="flex lg:hidden items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs">ENG</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-20">
                <DropdownMenuItem className="cursor-pointer">
                  <span className="text-sm">ENG</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="text-sm">FRE</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 left-1/4 bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="pt-20 px-6 h-full flex flex-col">

          {/* Mobile Navigation Links */}
          <nav className="flex-1">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-sm font-light py-4 transition-colors ${isActiveLink(link.href)
                    ? "text-primary border-l-2 border-primary pl-4"
                    : "text-gray-700 hover:text-gray-900 pl-0"
                    }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isMobileMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Action Buttons */}
          <div className="pb-8 space-y-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-none border-gray-300 bg-transparent hover:bg-gray-50 text-sm font-light h-12"
              asChild
            >
              <Link href="/book-meeting" onClick={() => setIsMobileMenuOpen(false)}>
                BOOK A MEETING
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full rounded-none bg-black hover:bg-black/90 text-white text-sm font-light h-12"
              asChild
            >
              <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                SIGN IN
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}