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
      console.log("map init");

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      //   init a marker
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const position = {
        lat: latitude,
        lng: longitude,
      };

      //   map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };

      //   setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      //   put up a marker
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const marker = new Marker({
        map,
        position,
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
