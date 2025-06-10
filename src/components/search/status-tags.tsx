"use client";
import React, { useState } from "react";
import {
  Star,
  Video,
  ShieldCheck,
  ShoppingBag,
  Clock,
  Check,
} from "lucide-react";

interface StatusTagsProps {
  onPropertyChange?: (property: string, checked: boolean) => void;
}

interface StatusTag {
  key: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
    color?: string;
    fill?: string;
  }>;
  fill?: boolean | undefined;
  fillColor?: string | undefined;
}

const StatusTags: React.FC<StatusTagsProps> = ({ onPropertyChange }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    exclusive: false,
    new: false,
    withVideo: false,
    sold: false,
    reserved: false,
  });

  const properties: StatusTag[] = [
    {
      key: "exclusive",
      label: "Exclusive",
      icon: Star,
      fill: true,
      fillColor: "#FFAB00",
    },
    {
      key: "new",
      label: "New",
      icon: ShieldCheck,
      fill: true,
      fillColor: "#000",
    },
    {
      key: "withVideo",
      label: "With Video",
      icon: Video,
      fill: true,
      fillColor: "#E83F3F",
    },
    { key: "sold", label: "Sold", icon: ShoppingBag },
    { key: "reserved", label: "Reserved", icon: Clock },
  ];

  const handleToggle = (propertyKey: string) => {
    const newChecked = !checkedItems[propertyKey];
    setCheckedItems((prev) => ({
      ...prev,
      [propertyKey]: newChecked,
    }));

    // Call the callback function if provided
    if (onPropertyChange) {
      onPropertyChange(propertyKey, newChecked);
    }
  };

  return (
    <div className="w-full flex gap-3 flex-wrap ">
      {properties.map((property) => {
        const isChecked = checkedItems[property.key];
        const IconComponent = property.icon;

        // Determine icon color based on state
        const iconColor = isChecked 
          ? "white" 
          : property.fill 
          ? property.fillColor 
          : "currentColor";

        // For icons that should be filled, use fill prop
        const iconFill = property.fill && !isChecked 
          ? property.fillColor 
          : isChecked 
          ? "white" 
          : "none";

        return (
          <div
            key={property.key}
            onClick={() => handleToggle(property.key)}
            className={`
              flex gap-2 items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out w-fit
              ${
                isChecked
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            <div className="flex items-center gap-2 w-fit">
              <IconComponent
                className="w-4 h-4"
                color={iconColor}
                {...(property.fill && { fill: iconFill })}
              />
              <span
                className={`font-medium ${
                  isChecked ? "text-white" : "text-gray-800"
                }`}
              >
                {property.label}
              </span>
            </div>

            <Check
              className={`
                w-4 h-4 transition-opacity duration-200
                ${isChecked ? "opacity-100 text-white" : "opacity-0 text-black"}
              `}
            />
          </div>
        );
      })}

      {/* <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Current Selection:</h4>
        <div className="text-sm text-gray-600">
          {Object.entries(checkedItems)
            .filter(([_, checked]) => checked)
            .map(([key, _]) => properties.find((p) => p.key === key)?.label)
            .join(", ") || "None selected"}
        </div>
      </div> */}
    </div>
  );
};

export default StatusTags;