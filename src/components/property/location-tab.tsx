import React from "react";
import { DrivingDistance } from "@/types/property";
import { GoogleMap } from "../shared/google-maps";
import { getTranslations } from "next-intl/server";

export const LocationTab = async({
  latitude,
  longitude,
  drivingDistances,
}: {
  latitude: number;
  longitude: number;
  drivingDistances: DrivingDistance[];
}) => {
  // interface DrivingDistanceInfo {
  //   destination: string;
  //   minutes: number;
  //   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  // }
  // const drivingDistanceInfo: DrivingDistanceInfo[] = [
  //   {
  //     destination: "Town",
  //     minutes: 5,
  //     icon: PiCityThin,
  //   },
  //   {
  //     destination: "Beach",
  //     minutes: 5,
  //     icon: TbBeach,
  //   },
  //   {
  //     destination: "Restaurant",
  //     minutes: 5,
  //     icon: IoRestaurantOutline,
  //   },
  //   {
  //     destination: "Shop",
  //     minutes: 5,
  //     icon: PiCityThin,
  //   },
  //   {
  //     destination: "Golf",
  //     minutes: 5,
  //     icon: IoGolfOutline,
  //   },
  //   {
  //     destination: "Airport",
  //     minutes: 5,
  //     icon: PiAirplaneLight,
  //   },
  // ];

  const t = await getTranslations("locationTab")

  return (
    <div>
      <GoogleMap longitude={longitude} latitude={latitude} />
      {drivingDistances.length > 0 && (
        <div className="pt-4">
          <p className="text-sm text-primary font-semibold mb-5">
            {t("drivingDistance")}
          </p>

          {/* <div className="flex gap-6 flex-wrap">
          {drivingDistanceInfo.length > 0 && (
            <ul className="flex gap-8 flex-wrap">
              {drivingDistanceInfo.map((info: DrivingDistanceInfo, index) => {
                const IconComponent = info.icon;
                return (
                  <li
                    key={`drivingDistanceInfo--${index}`}
                    className="flex gap-2 "
                  >
                    <IconComponent className="h-8 w-8 text-gray-600" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">
                        {info.destination}
                      </span>
                      <span className="text-sm font-bold">
                        {info.minutes} min
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div> */}
          <div className="flex gap-6 flex-wrap mt-6">
            <ul className="flex gap-8 flex-wrap">
              {drivingDistances.map(
                (drivingDistance: DrivingDistance, index) => {
                  // const IconComponent = info.icon;
                  return (
                    <li
                      key={`drivingDistanceInfo--${index}`}
                      className="flex gap-2 "
                    >
                      {/* <IconComponent className="h-8 w-8 text-gray-600" /> */}
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          {drivingDistance.label}
                        </span>
                        <span className="text-sm font-bold">
                          {drivingDistance.value} {t("min")}
                        </span>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
