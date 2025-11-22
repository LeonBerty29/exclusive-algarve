"use client";
import type { ReactNode } from "react";
import { LoadScript } from "@react-google-maps/api";

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  return (
    <LoadScript
      libraries={["places", "geometry"]}
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
    >
      {children}
    </LoadScript>
  );
}
