import React from "react";
import { FaBed } from "react-icons/fa";
import { MdAreaChart, MdBathtub, MdOutlinePool } from "react-icons/md";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";

const PropertyDetailsIcons = () => {
  return (
    <div className="flex items-center gap-x-24 gap-y-6 flex-wrap mt-5 mb-14">
      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
          <FaBed className="h-6 w-6 text-gray-500" />
        </div>

        <div className="sapce-y-2">
          <span className="font-semibold text-lg">03</span>
          <p className="text-xs text-gray-700">Bedrooms</p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
          <MdBathtub className="h-6 w-6 text-gray-500" />
        </div>

        <div className="sapce-y-2">
          <span className="font-semibold text-lg">02</span>
          <p className="text-xs text-gray-700">Bathrooms</p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
          <MdAreaChart className="h-6 w-6 text-gray-500" />
        </div>

        <div className="sapce-y-2">
          <span className="font-semibold text-lg">
            100m<sup>2</sup>
          </span>
          <p className="text-xs text-gray-700">Private area</p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
          <LiaExpandArrowsAltSolid className="h-6 w-6 text-gray-500" />
        </div>

        <div className="sapce-y-2">
          <span className="font-semibold text-lg">
            203m<sup>2</sup>
          </span>
          <p className="text-xs text-gray-700">Plot size</p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-4">
          <MdOutlinePool className="h-6 w-6 text-gray-500" />
        </div>

        <div className="sapce-y-2">
          <span className="font-semibold text-lg">3X5m</span>
          <p className="text-xs text-gray-700">pool</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsIcons;
