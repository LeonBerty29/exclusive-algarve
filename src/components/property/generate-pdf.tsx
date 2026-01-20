/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property, PropertyImage } from "@/types/property";
import { pdf } from "@react-pdf/renderer";
import { PropertyBrochurePDF } from "./pdf-brochure-generate";

interface GenerateBrochureProps {
  property: Property;
  buttonText?: string;
  className?: string;
}

interface DrivingDistanceResult {
  label: string;
  value: string;
}

export const GenerateBrochure: React.FC<GenerateBrochureProps> = ({
  property,
  buttonText = "Download Brochure",
  className = "text-xs rounded-none bg-black text-white px-6",
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [drivingDistances, setDrivingDistances] = useState<
    DrivingDistanceResult[]
  >([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Place types to search for
  const placeTypes = [
    { type: "restaurant", label: "Restaurant" },
    { type: "beach", label: "Beach" },
    { type: "airport", label: "Airport" },
    { type: "hospital", label: "Hospital" },
    { type: "bus_station", label: "Bus Station" },
    { type: "shopping_mall", label: "Shopping" },
  ];

  // Create hidden map for Places Service
  useEffect(() => {
    if (typeof window === "undefined" || !window.google) return;

    const mapDiv = document.createElement("div");
    const tempMap = new google.maps.Map(mapDiv, {
      center: {
        lat: property.location.latitude,
        lng: property.location.longitude,
      },
      zoom: 12,
    });

    setMap(tempMap);
  }, [property.location.latitude, property.location.longitude]);

  // Fetch driving distances
  useEffect(() => {
    if (!map) return;

    const fetchDrivingDistances = async () => {
      const service = new google.maps.places.PlacesService(map);
      const distanceService = new google.maps.DistanceMatrixService();
      const origin = new google.maps.LatLng(
        property.location.latitude,
        property.location.longitude
      );

      const distances: DrivingDistanceResult[] = [];

      for (const { type, label } of placeTypes) {
        try {
          const result =
            await new Promise<google.maps.places.PlaceResult | null>(
              (resolve) => {
                service.nearbySearch(
                  {
                    location: origin,
                    radius: 10000,
                    type: type,
                  },
                  (results, status) => {
                    if (
                      status === google.maps.places.PlacesServiceStatus.OK &&
                      results &&
                      results.length > 0
                    ) {
                      resolve(results[0]);
                    } else {
                      resolve(null);
                    }
                  }
                );
              }
            );

          if (result?.geometry?.location) {
            const destination = {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
            };

            const distanceResult = await new Promise<string>((resolve) => {
              distanceService.getDistanceMatrix(
                {
                  origins: [origin],
                  destinations: [
                    new google.maps.LatLng(destination.lat, destination.lng),
                  ],
                  travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                  if (
                    status === google.maps.DistanceMatrixStatus.OK &&
                    response
                  ) {
                    const element = response.rows[0]?.elements[0];
                    if (element?.status === "OK") {
                      resolve(element.duration?.text || "N/A");
                      return;
                    }
                  }
                  resolve("N/A");
                }
              );
            });

            if (distanceResult !== "N/A") {
              distances.push({ label, value: distanceResult });
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      setDrivingDistances(distances);
    };

    fetchDrivingDistances();
  }, [map, property.location.latitude, property.location.longitude]);

  const validateProperty = (property: Property): boolean => {
    if (
      !property.assets.images.gallery ||
      property.assets.images.gallery.length === 0
    ) {
      alert("Property must have at least one image");
      return false;
    }
    if (!property.title || property.title.trim() === "") {
      alert("Property must have a title");
      return false;
    }
    if (!property.description || property.description.trim() === "") {
      alert("Property must have a description");
      return false;
    }
    return true;
  };

  const prepareImages = (images: PropertyImage[]): string[] => {
    const REQUIRED_IMAGES = 10;

    if (!images || images.length === 0) {
      return Array(REQUIRED_IMAGES).fill(
        "https://via.placeholder.com/1200x600?text=No+Image"
      );
    }

    const imageUrls = images.map((img) => img.url);

    if (imageUrls.length >= REQUIRED_IMAGES) {
      return imageUrls.slice(0, REQUIRED_IMAGES);
    }

    const preparedImages: string[] = [];
    let index = 0;

    while (preparedImages.length < REQUIRED_IMAGES) {
      preparedImages.push(imageUrls[index % imageUrls.length]);
      index++;
    }

    return preparedImages;
  };

  const splitDescriptionSmartly = (description: string) => {
    const PAGE1_LIMIT = 1000;
    const PAGE2_LIMIT = 800;

    let page1Text = "";
    let page2Text = "";
    let remainingText = "";

    const paragraphs = description
      .split(/\n\n|<\/p>\s*<p>|<\/div>\s*<div>/)
      .filter((p) => p.trim());

    let currentLength = 0;
    let currentPage = 1;

    for (let i = 0; i < paragraphs.length; i++) {
      const para = paragraphs[i];
      const paraText = para.replace(/<[^>]*>/g, "").trim();
      const paraLength = paraText.length;

      if (currentPage === 1) {
        if (currentLength + paraLength <= PAGE1_LIMIT) {
          page1Text += paraText + "\n\n";
          currentLength += paraLength;
        } else {
          currentPage = 2;
          page2Text += paraText + "\n\n";
          currentLength = paraLength;
        }
      } else if (currentPage === 2) {
        if (currentLength + paraLength <= PAGE2_LIMIT) {
          page2Text += paraText + "\n\n";
          currentLength += paraLength;
        } else {
          currentPage = 3;
          remainingText += paraText + "\n\n";
        }
      } else {
        remainingText += paraText + "\n\n";
      }
    }

    return {
      page1: page1Text.trim(),
      page2: page2Text.trim(),
      remaining: remainingText.trim(),
      hasPage2Content: page2Text.trim().length > 0,
      hasRemainingContent: remainingText.trim().length > 0,
    };
  };

  const generatePDF = async () => {
    if (!validateProperty(property)) {
      return;
    }

    setIsGenerating(true);

    try {
      const images = prepareImages(property.assets.images.gallery);
      const descriptionSplit = splitDescriptionSmartly(property.description);

      const distances =
        drivingDistances.length > 0
          ? drivingDistances
          : property.driving_distances.map((d) => ({
              label: d.label,
              value: `${d.value} min`,
            }));

      const blob = await pdf(
        <PropertyBrochurePDF
          property={property}
          images={images}
          descriptionSplit={descriptionSplit}
          distances={distances}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${property.reference}-brochure.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setIsGenerating(false);
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={generatePDF} disabled={isGenerating} className={className}>
      {isGenerating ? (
        <>
          <svg
            className="animate-spin h-4 w-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Generating...
        </>
      ) : (
        <>
          <Download className="size-4 mr-2" />
          {buttonText}
        </>
      )}
    </Button>
  );
};
