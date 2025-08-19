import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to generate proxied image URL
export const getProxiedImageUrl = (originalUrl: string) => {
  // return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
  return originalUrl;
};
