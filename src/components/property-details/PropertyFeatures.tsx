"use client"
import React, { ReactNode } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { GiWaterDrop } from "react-icons/gi";
import { FaHotTub } from "react-icons/fa";
import { FcElectricity } from "react-icons/fc";
import { PiSwimmingPoolBold } from "react-icons/pi";
import { BiSolidCarGarage } from "react-icons/bi";
import { MdBalcony } from "react-icons/md";
import { Wifi } from 'lucide-react';
import { LuCircleParking } from "react-icons/lu";
import { BsCameraVideo } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { PiWashingMachineThin } from "react-icons/pi";
import { TbAirConditioningDisabled } from "react-icons/tb";

interface PropertyFeature {
  title: string,
  label: string,
  icon: ReactNode
}

interface Amenity {
  name: string,
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const PropertyFeatures = () => {
  const propertyFeatures: PropertyFeature[] = [
    {
      title: "Water",
      label: "Mains Water",
      icon: <GiWaterDrop className='h-8 w-8 mb-1 fill-[#26ADE8]' />
    },
    {
      title: "Hot Water System",
      label: "Heatpump",
      icon: <FaHotTub className='h-8 w-8 mb-1 fill-[#26ADE8]' />
    },
    {
      title: "Electricity",
      label: "Mains Electricity",
      icon: <FcElectricity className='h-8 w-8 mb-1 fill-[#FEBC08]' />
    },
    {
      title: "Swimming Pool",
      label: "Pool",
      icon: <PiSwimmingPoolBold className='h-8 w-8 mb-1 fill-[#26ADE8]' />
    },
    {
      title: "Garage",
      label: "Garage",
      icon: <BiSolidCarGarage className='h-8 w-8 mb-1' />
    },
    {
      title: "Balcony",
      label: "balcony",
      icon: <MdBalcony className='h-8 w-8 mb-1 fill-[#01d9a3]' />
    },
  ];

  const amenities: Amenity[] = [
    {
      name: "Wifi",
      icon: Wifi
    },
    {
      name: "Parking space",
      icon: LuCircleParking
    },
    {
      name: "Security cameras",
      icon: BsCameraVideo
    },
    {
      name: "Pets allowed",
      icon: MdOutlinePets
    },
    {
      name: "Laundry",
      icon: PiWashingMachineThin
    },
    {
      name: "Air conditionner",
      icon: TbAirConditioningDisabled
    },
  ];

  const chunkArray = (arr: Amenity[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const chunkArrayOfAmenities = chunkArray(amenities, 4);

  return (
    <div className='pt-5 w-full max-w-full'>
      <section className='mb-8'>
        <p className='text-base font-bold text-mainYellowColor mb-4'>PROPERTY FEATURES</p>
        <div className='w-full max-w-full'>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {propertyFeatures.map((feature, index) => (
                <CarouselItem
                  key={index}
                  className="w-auto sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="border-none rounded-none shadow-none bg-transparent w-fit">
                      <CardContent className="p-0">
                        <div className='text-center flex flex-col gap-1 items-center'>
                          {feature.icon}
                          <p className='font-semibold text-sm uppercase'>{feature.title}</p>
                          <p className='text-xs text-gray-600 capitalize'>{feature.label}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='rounded-none' hideOnDisable={true} />
            <CarouselNext className='rounded-none' hideOnDisable={true} />
          </Carousel>
        </div>
      </section>

      <section>
        <p className='text-base font-bold text-mainYellowColor mb-4'>AMENITIES</p>

        {chunkArrayOfAmenities.length > 0 && (
          <div className='w-full max-w-full'>
            <ul className='flex gap-16 flex-wrap'>
              {chunkArrayOfAmenities.map((subArrOfAmenities: Amenity[], index) => (
                <li key={`SubGroupOfAmenities--${index}`}>
                  <ul className='space-y-4'>
                    {subArrOfAmenities.map((amenity: Amenity, i) => {
                      const IconComponent = amenity.icon;
                      return (
                        <li key={`Amenity-item--${index}--${i}`} className='flex items-center gap-2'>
                          <IconComponent className='h-4 w-4' />
                          <span className='text-gray-500 text-sm'>{amenity.name}</span>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}

export default PropertyFeatures;