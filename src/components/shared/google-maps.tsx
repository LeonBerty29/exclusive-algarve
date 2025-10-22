"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useTranslations } from "next-intl";

export function GoogleMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const t = useTranslations("googleMaps");

  // Initialize map once
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const position = {
        lat: latitude,
        lng: longitude,
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };

      mapInstanceRef.current = new Map(mapRef.current, mapOptions);

      markerInstanceRef.current = new AdvancedMarkerElement({
        map: mapInstanceRef.current,
        position,
        title: t("title"), // Read once during initialization
      });
    };

    initMap();

    return () => {
      if (markerInstanceRef.current) {
        markerInstanceRef.current.map = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initialize only once

  // Update position when coordinates change
  useEffect(() => {
    if (mapInstanceRef.current && markerInstanceRef.current) {
      const position = {
        lat: latitude,
        lng: longitude,
      };

      mapInstanceRef.current.setCenter(position);
      markerInstanceRef.current.position = position;
    }
  }, [latitude, longitude]);

  return (
    <div
      style={{
        height: "600px",
      }}
      ref={mapRef}
    />
  );
}