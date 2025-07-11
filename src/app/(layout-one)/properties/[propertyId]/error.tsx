"use client";

import { useEffect } from "react";
import { RefreshCw, AlertTriangle, Search, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PropertyError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error("Property page error:", error);
  }, [error]);

  const isNetworkError =
    error.message.includes("fetch") || error.message.includes("network");
  const isAPIError = error.message.includes("API Error");
  const is404Error = error.message.includes("404");

  const getErrorMessage = () => {
    if (is404Error) {
      return {
        title: "Property Not Found",
        description:
          "The property you're looking for doesn't exist or has been removed from our listings.",
        suggestion:
          "Browse our available properties or search for something else.",
      };
    }

    if (isNetworkError) {
      return {
        title: "Connection Problem",
        description:
          "We're having trouble connecting to our servers right now.",
        suggestion: "Please check your internet connection and try again.",
      };
    }

    if (isAPIError) {
      return {
        title: "Service Unavailable",
        description: "Our property service is temporarily unavailable.",
        suggestion:
          "We're working to fix this. Please try again in a few moments.",
      };
    }

    return {
      title: "Something Went Wrong",
      description: "An unexpected error occurred while loading this property.",
      suggestion:
        "Please try refreshing the page or contact support if the problem persists.",
    };
  };

  const { title, description, suggestion } = getErrorMessage();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Icon with glow effect */}
          <div className="mb-8 relativ">
            <div className="w-24 h-24 mx-auto relative">
              <div className="relative bg-gradient-to-r from-purple-500 to-primary rounded-2xl w-full h-full flex items-center justify-center">
                <Building2 className="w-12 h-12 text-white animate-pulse" />
              </div>

              <div className="absolute -top-14 -right-10 text-center mb-8">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-white rounded-full p-6 shadow-lg border-2 border-red-100">
                    <AlertTriangle className="w-5 h-5 text-red-500 mx-auto animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-sm text-gray-600 mb-2">{description}</p>
            <p className="text-sm text-gray-500">{suggestion}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button
                onClick={reset}
                className="flex-1 hover:scale-105 bg-black hover:bg-primary text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                Try Again
              </Button>

              <Button
                asChild
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              >
                <Link href="/properties">
                  <Search className="w-5 h-5" />
                  Browse Properties
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If you believe this is an error, please{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                contact us
              </Link>
            </p>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-6 p-4 bg-slate-50 rounded-lg border">
              <summary className="cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
                Error Details (Development)
              </summary>
              <div className="mt-2 text-xs text-slate-600 font-mono bg-white p-3 rounded border overflow-auto">
                <div className="mb-2">
                  <strong>Message:</strong> {error.message}
                </div>
                {error.digest && (
                  <div className="mb-2">
                    <strong>Digest:</strong> {error.digest}
                  </div>
                )}
                {error.stack && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap text-xs mt-1">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    </>
  );
}
