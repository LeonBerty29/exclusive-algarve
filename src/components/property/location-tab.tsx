import React from "react";
import { PiCityThin } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoGolfOutline } from "react-icons/io5";
import { PiAirplaneLight } from "react-icons/pi";
import { HomeMap } from "./location-map";

export const LocationTab = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  interface DrivingDistanceInfo {
    destination: string;
    minutes: number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
  const drivingDistanceInfo: DrivingDistanceInfo[] = [
    {
      destination: "Town",
      minutes: 5,
      icon: PiCityThin,
    },
    {
      destination: "Beach",
      minutes: 5,
      icon: TbBeach,
    },
    {
      destination: "Restaurant",
      minutes: 5,
      icon: IoRestaurantOutline,
    },
    {
      destination: "Shop",
      minutes: 5,
      icon: PiCityThin,
    },
    {
      destination: "Golf",
      minutes: 5,
      icon: IoGolfOutline,
    },
    {
      destination: "Airport",
      minutes: 5,
      icon: PiAirplaneLight,
    },
  ];

  return (
    <div>
      <HomeMap locationValue={[latitude, longitude]} />

      <div className="pt-4">
        <p className="text-sm text-primary font-semibold mb-5">
          DRIVING DISTANCE
        </p>

        <div className="flex gap-6 flex-wrap">
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
        </div>
      </div>
    </div>
  );
};
