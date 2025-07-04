import React from "react";
import { BiArea } from "react-icons/bi";
import {
  MdOutlineLocalHotel,
  MdOutlineShower,
  MdOutlinePool,
} from "react-icons/md";
import { BsTextarea } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Property } from "@/types/property";

interface PropertyInfoProps {
  property: Property;
}

export const PropertyInfo = ({ property }: PropertyInfoProps) => {
  const constructionYear = property.features.construction_year;
  const features = property.features;

  // Find pool information from additional features
  const poolFeature = property.additional_features
    .find((category) => category.category_name.toLowerCase().includes("pool"))
    ?.features.find((feature) =>
      feature.feature_name.toLowerCase().includes("pool")
    );

  const poolLength = poolFeature?.field_value || null;

  return (
    <>
      <div className="flex gap-6">
        <div className="flex-1 flex gap-12 flex-wrap">
          {features.bedrooms && (
            <div className="flex gap-3">
              <MdOutlineLocalHotel className="h-8 w-8" />
              <div>
                <p className="text-sm font-semibold">{features.bedrooms}</p>
                <p className="text-xs text-gray-600">Bedrooms</p>
              </div>
            </div>
          )}

          {features.bathrooms && (
            <div className="flex gap-3">
              <MdOutlineShower className="h-8 w-8" />
              <div>
                <p className="text-sm font-semibold">{features.bathrooms}</p>
                <p className="text-xs text-gray-600">Bathrooms</p>
              </div>
            </div>
          )}

          {features.private_area && (
            <div className="flex gap-3">
              <BiArea className="h-8 w-8" />
              <div>
                <p className="text-sm font-semibold">
                  {features.private_area} m<sup>2</sup>
                </p>
                <p className="text-xs text-gray-600">Private Area</p>
              </div>
            </div>
          )}

          {features.construction_area && (
            <div className="flex gap-3">
              <BsTextarea className="h-8 w-8" />
              <div>
                <p className="text-sm font-semibold">
                  {features.construction_area} m<sup>2</sup>
                </p>
                <p className="text-xs text-gray-600">Construction Area</p>
              </div>
            </div>
          )}

          {poolLength && (
            <div className="flex gap-3">
              <MdOutlinePool className="h-8 w-8" />
              <div>
                <p className="text-sm font-semibold">
                  {typeof poolLength === "number"
                    ? `${poolLength} mtrs`
                    : poolLength}
                </p>
                <p className="text-xs text-gray-600">Pool</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold text-right">{constructionYear}</h2>
          <p className="text-xs text-gray-500 text-right">Construction Year</p>
        </div>
      </div>

      <Separator className="mt-7 bg-gray-300" />
    </>
  );
};
