import React from "react";
import { FaBed } from "react-icons/fa";
import { MdAreaChart, MdBathtub, MdOutlineTimeline } from "react-icons/md";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import { Home } from "lucide-react";
import { Property } from "@/types/property";

const PropertyDetailsIcons = ({
  features,
  propertyType,
}: {
  features: Property["features"];
  propertyType: string;
}) => {
  console.log(typeof features.bathrooms);
  return (
    <div className="items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-5 mb-14">
      {(features.bedrooms || features.bedrooms !== 0) && (
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
            <FaBed className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-2">
            <span className="font-semibold text-lg">{features.bedrooms}</span>
            <p className="text-xs text-gray-700">Bedrooms</p>
          </div>
        </div>
      )}

      {(features.bathrooms || features.bathrooms !== 0) && (
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
            <MdBathtub className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-2">
            <span className="font-semibold text-lg">{features.bathrooms}</span>
            <p className="text-xs text-gray-700">Bathrooms</p>
          </div>
        </div>
      )}

      {(features.construction_year || features.construction_year !== "0") && (
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
            <MdOutlineTimeline className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-2">
            <span className="font-semibold text-lg">
              {features.construction_year}
            </span>
            <p className="text-xs text-gray-700">Built Year</p>
          </div>
        </div>
      )}

      {(features.private_area || features.private_area !== 0) && (
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
            <MdAreaChart className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-2">
            <span className="font-semibold text-lg">
              {features.private_area}m<sup>2</sup>
            </span>
            <p className="text-xs text-gray-700">Private area</p>
          </div>
        </div>
      )}

      {(features.plot_size || features.plot_size !== 0) && (
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
            <LiaExpandArrowsAltSolid className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-2">
            <span className="font-semibold text-lg">
              {features.plot_size}m<sup>2</sup>
            </span>
            <p className="text-xs text-gray-700">Plot size</p>
          </div>
        </div>
      )}

      {(features.construction_area || features.construction_area !== 0) && (
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
            <MdAreaChart className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-2">
            <span className="font-semibold text-lg">
              {features.construction_area}m<sup>2</sup>
            </span>
            <p className="text-xs text-gray-700">Construction area</p>
          </div>
        </div>
      )}

      {features.energy_class && (
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
            <MdAreaChart className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-2">
            <span className="font-semibold text-lg">
              {features.energy_class}
            </span>
            <p className="text-xs text-gray-700">Energy Class</p>
          </div>
        </div>
      )}

      {propertyType && (
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
            <Home className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-2">
            <span className="font-semibold text-lg">{propertyType}</span>
            <p className="text-xs text-gray-700">Property Type</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsIcons;
