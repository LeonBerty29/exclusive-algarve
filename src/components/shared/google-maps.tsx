"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export function GoogleMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      // Import the advanced marker library
      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const position = {
        lat: latitude,
        lng: longitude,
      };

      // Map options - mapId is required for AdvancedMarkerElement
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };

      // Setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // Create advanced marker
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const marker = new AdvancedMarkerElement({
        map,
        position,
        title: "Location Marker", // Optional: adds tooltip on hover
      });
    };

    initMap();
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
