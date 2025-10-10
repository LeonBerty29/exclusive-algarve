"use client";
import React from "react"; // ReactNode
import { Card, CardContent } from "@/components/ui/card";
// import { GiWaterDrop } from "react-icons/gi";
// import { FaHotTub } from "react-icons/fa";
// import { FcElectricity } from "react-icons/fc";
// import { PiSwimmingPoolBold } from "react-icons/pi";
// import { BiSolidCarGarage } from "react-icons/bi";
// import { MdBalcony } from "react-icons/md";
import { Wifi } from "lucide-react";
import { LuCircleParking } from "react-icons/lu";
import { BsCameraVideo } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { PiWashingMachineThin } from "react-icons/pi";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { AdditionalFeature } from "@/types/property";
import { featuresIcons } from "@/data/icons";

// interface PropertyFeature {
//   title: string;
//   label: string;
//   icon: ReactNode;
// }

interface Amenity {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface PropertyFeaturesProps {
  additionalFeatures: AdditionalFeature[];
}

export const PropertyFeatures = ({
  additionalFeatures,
}: PropertyFeaturesProps) => {
  // Helper function to get icon for feature category
  // const getFeatureIcon = (categoryName: string): ReactNode => {
  //   const name = categoryName.toLowerCase();
  //   if (name.includes("water"))
  //     return <GiWaterDrop className="h-8 w-8 mb-1 fill-[#26ADE8]" />;
  //   if (name.includes("hot") || name.includes("heating"))
  //     return <FaHotTub className="h-8 w-8 mb-1 fill-[#26ADE8]" />;
  //   if (name.includes("electric"))
  //     return <FcElectricity className="h-8 w-8 mb-1 fill-[#FEBC08]" />;
  //   if (name.includes("pool"))
  //     return <PiSwimmingPoolBold className="h-8 w-8 mb-1 fill-[#26ADE8]" />;
  //   if (name.includes("garage") || name.includes("parking"))
  //     return <BiSolidCarGarage className="h-8 w-8 mb-1" />;
  //   if (name.includes("balcony") || name.includes("terrace"))
  //     return <MdBalcony className="h-8 w-8 mb-1 fill-[#01d9a3]" />;
  //   return <div className="h-8 w-8 mb-1 bg-gray-300 rounded-full" />;
  // };

  // Generate property features from additional_features
  // const propertyFeatures: FeatureItem[] = additionalFeatures.map(
  //   (category) => ({
  //     title: category.category_name,
  //     label:
  //       category.features.length > 0
  //         ? String(category.features[0].field_value)
  //         : category.category_name,
  //     icon: getFeatureIcon(category.category_name),
  //   })
  // );

  // Static amenities - you can expand this based on your needs
  // const amenities: Amenity[] = [
  //   {
  //     name: "Wifi",
  //     icon: Wifi,
  //   },
  //   {
  //     name: "Parking space",
  //     icon: LuCircleParking,
  //   },
  //   {
  //     name: "Security cameras",
  //     icon: BsCameraVideo,
  //   },
  //   {
  //     name: "Pets allowed",
  //     icon: MdOutlinePets,
  //   },
  //   {
  //     name: "Laundry",
  //     icon: PiWashingMachineThin,
  //   },
  //   {
  //     name: "Air conditioner",
  //     icon: TbAirConditioningDisabled,
  //   },
  // ];

  // Find specific amenities from additional features
  const extractedAmenities: Amenity[] = [];

  additionalFeatures.forEach((category) => {
    category.features.forEach((feature) => {
      const featureName = feature.feature_name.toLowerCase();
      if (featureName.includes("wifi") || featureName.includes("internet")) {
        extractedAmenities.push({ name: "Wifi", icon: Wifi });
      }
      if (featureName.includes("parking") || featureName.includes("garage")) {
        extractedAmenities.push({
          name: "Parking space",
          icon: LuCircleParking,
        });
      }
      if (featureName.includes("security") || featureName.includes("camera")) {
        extractedAmenities.push({
          name: "Security cameras",
          icon: BsCameraVideo,
        });
      }
      if (featureName.includes("pet")) {
        extractedAmenities.push({ name: "Pets allowed", icon: MdOutlinePets });
      }
      if (featureName.includes("laundry") || featureName.includes("washing")) {
        extractedAmenities.push({
          name: "Laundry",
          icon: PiWashingMachineThin,
        });
      }
      if (featureName.includes("air") || featureName.includes("conditioning")) {
        extractedAmenities.push({
          name: "Air conditioner",
          icon: TbAirConditioningDisabled,
        });
      }
    });
  });

  // Combine extracted amenities with default ones, removing duplicates
  // const combinedAmenities = [...new Set([...extractedAmenities, ...amenities])];

  // const chunkArray = (arr: Amenity[], size: number) => {
  //   return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
  //     arr.slice(i * size, i * size + size)
  //   );
  // };

  // const chunkArrayOfAmenities = chunkArray(combinedAmenities, 4);

  const getIcon = (icon: string) => {
    // console.log({ icon });
    // console.log({ featuresIcons });
    // console.log(featuresIcons["default"]);
    // console.log(featuresIcons[icon]);
    if (featuresIcons[icon]) {
      const Icon = featuresIcons[icon];
      return <Icon className="h-6 w-6 text-gray-600" />;
    } else {
      const Icon = featuresIcons.default;
      return <Icon className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="pt-5 w-full max-w-full">
      <section className="mb-8">
        <p className="text-base font-bold text-primary mb-4">
          PROPERTY FEATURES
        </p>
        {additionalFeatures.length > 0 ? (
          <div className="w-full max-w-full">
            <div
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                {additionalFeatures.map((additionalFeature, index) => (
                  
                    <div className="p-1 w-full bg-gray-100 h-full" key={`additionalFeature--${index}`}>
                      <Card className="border-none rounded-none shadow-none bg-transparent w-full">
                        <CardContent className="p-0">
                          <div className="text-center flex flex-col gap-1.5 items-center">
                            {getIcon(additionalFeature.category_icon)}
                            <p className="font-semibold text-sm uppercase">
                              {additionalFeature.category_name}
                            </p>
                            {additionalFeature.features.map(
                              (feature, featureIndex) => (
                                <React.Fragment
                                  key={`feature--${index}--${featureIndex}`}
                                >
                                  {feature.field_type === "select" ? (
                                    <p className="text-xs text-gray-600 capitalize">
                                      {feature.feature_name} -{" "}
                                      {feature.field_value}
                                    </p>
                                  ) : (
                                    <p className="text-xs text-gray-600 capitalize">
                                      {feature.feature_name}
                                    </p>
                                  )}
                                </React.Fragment>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No additional features available.
          </p>
        )}
      </section>

      {/* <section>
        <p className="text-base font-bold text-primary mb-4">AMENITIES</p>

        {chunkArrayOfAmenities.length > 0 ? (
          <div className="w-full max-w-full">
            <ul className="flex gap-16 flex-wrap">
              {chunkArrayOfAmenities.map(
                (subArrOfAmenities: Amenity[], index) => (
                  <li key={`SubGroupOfAmenities--${index}`}>
                    <ul className="space-y-4">
                      {subArrOfAmenities.map((amenity: Amenity, i) => {
                        const IconComponent = amenity.icon;
                        return (
                          <li
                            key={`Amenity-item--${index}--${i}`}
                            className="flex items-center gap-2"
                          >
                            <IconComponent className="h-4 w-4" />
                            <span className="text-gray-500 text-sm">
                              {amenity.name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No amenities available.</p>
        )}
      </section> */}
    </div>
  );
};

export default PropertyFeatures;
