"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useTranslations } from "next-intl";

interface NearbyPlace {
  type: string;
  name: string;
  distance?: number;
  found: boolean;
}

export function GoogleMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef =
    useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );
  const t = useTranslations("googleMaps");

  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState(false);

  // Place types to search for
  const placeTypes = [
    { type: "airport", label: "Airport" },
    { type: "restaurant", label: "Restaurant" },
    { type: "beach", label: "Beach" },
    { type: "golf_course", label: "Golf Course" },
  ];

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

      await loader.importLibrary("places");

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
      placesServiceRef.current = new google.maps.places.PlacesService(
        mapInstanceRef.current
      );

      markerInstanceRef.current = new AdvancedMarkerElement({
        map: mapInstanceRef.current,
        position,
        title: t("title"),
      });
    };

    initMap();

    return () => {
      if (markerInstanceRef.current) {
        markerInstanceRef.current.map = null;
      }
    };
  }, []);

  // Search for nearby places
  const searchNearbyPlaces = async () => {
    if (!placesServiceRef.current) return;

    setLoading(true);
    const results: NearbyPlace[] = [];
    const position = new google.maps.LatLng(latitude, longitude);

    for (const placeType of placeTypes) {
      try {
        const result = await new Promise<NearbyPlace>((resolve) => {
          const request: google.maps.places.PlaceSearchRequest = {
            location: position,
            radius: 1000, // 1000 meters
            type: placeType.type,
          };

          placesServiceRef.current!.nearbySearch(request, (results, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              results &&
              results.length > 0
            ) {
              const closest = results[0];
              const distance = closest.geometry?.location
                ? google.maps.geometry.spherical.computeDistanceBetween(
                    position,
                    closest.geometry.location
                  )
                : undefined;

              resolve({
                type: placeType.label,
                name: closest.name || placeType.label,
                distance: distance ? Math.round(distance) : undefined,
                found: true,
              });
            } else {
              resolve({
                type: placeType.label,
                name: "",
                found: false,
              });
            }
          });
        });

        results.push(result);
      } catch (error) {
        console.log(error)
        results.push({
          type: placeType.label,
          name: "",
          found: false,
        });
      }
    }

    setNearbyPlaces(results);
    setLoading(false);
  };

  // Update position when coordinates change
  useEffect(() => {
    if (mapInstanceRef.current && markerInstanceRef.current) {
      const position = {
        lat: latitude,
        lng: longitude,
      };

      mapInstanceRef.current.setCenter(position);
      markerInstanceRef.current.position = position;

      // Automatically search for nearby places when position changes
      searchNearbyPlaces();
    }
  }, [latitude, longitude]);

  // Initial search when map is ready
  useEffect(() => {
    if (placesServiceRef.current && nearbyPlaces.length === 0) {
      searchNearbyPlaces();
    }
  }, [placesServiceRef.current]);

  return (
    <div>
      <div style={{ height: "600px" }} ref={mapRef} />

      <div style={{ marginTop: "20px" }}>
        {loading && (
          <p style={{ color: "#666", marginBottom: "10px" }}>
            Searching for nearby places...
          </p>
        )}

        {nearbyPlaces.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ marginBottom: "10px" }}>
              Nearby Places (within 1km):
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {nearbyPlaces.map((place, index) => (
                <li
                  key={index}
                  style={{
                    padding: "10px",
                    marginBottom: "8px",
                    backgroundColor: place.found ? "#e8f5e9" : "#ffebee",
                    borderRadius: "4px",
                  }}
                >
                  <strong>{place.type}:</strong>{" "}
                  {place.found ? (
                    <>
                      {place.name}
                      {place.distance && ` (${place.distance}m away)`}
                    </>
                  ) : (
                    <span style={{ color: "#666" }}>Not found nearby</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
