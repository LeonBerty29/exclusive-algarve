import { Home, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { BiArea } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { IoGolfOutline, IoRestaurantOutline } from "react-icons/io5";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import { MdAreaChart, MdBathtub, MdOutlineTimeline } from "react-icons/md";
import { PiAirplaneLight, PiCityThin } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";

const page = () => {
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <div className="mb-3 w-fit mx-auto">
        <Image
          src="/images/eav-logo-dark.svg"
          width={200}
          height={60}
          alt="brochure"
          className="w-50 h-14"
        />
      </div>
      <div className="relative w-full aspect-video">
        <Image
          src="/images/featured-property-1.png"
          alt="brochure"
          className="w-full object-fit"
          priority
          fill
        />

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-12 px-6 text-base font-semibold flex items-center justify-center bg-primary text-white">
          EAV-3500
        </div>
      </div>

      <PropertyImages />
      {/* Property Type */}
      <div className="flex flex-col items-center py-10 mb-8 bg-white text-black">
        <p className="font-semibold text-5xl text-center ">Modern Villa</p>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <p className="text-center text-gray-900 text-lg">
            Albufeira, Algarve
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 justify-between">
        <div className="space-y-2 w-[58%]">
          <h1 className="font-semibold text-3xl">
            Modern Villa near Gale beach and Salgados Golf for sale Algarve
          </h1>
          <p className="text-base text-gray-600">
            This villa is composed of three levels. On the ground floor, from
            the main entrance, the hall leads you to the living room and dining
            area, towards the kitchen.
          </p>
        </div>

        <div className="border border-gray-500 py-4 px-8 w-fit text-xl font-semibold">
          <h2 className="text-primary text-2xl">€4,500,000</h2>
        </div>
      </div>

      <BrochurePropertyDetailsIcons />
      <PropertyImages />
      <DrivingDistances />
      <PropertyDescription />
      <ContactSection />
      <Award />
      <Notice />
    </div>
  );
};

export default page;

function BrochurePropertyDetailsIcons() {
  const bedrooms = 4;
  const bathrooms = 2;
  const construction_year = 2020;
  const private_area = 150;
  const plot_size = 200;
  const construction_area = 180;
  const energy_class = "A";
  const propertyType = "Modern Villa";
  return (
    <div className="mt-10">
      <h3 className="font-medium text-2xl text-primary">Property Details</h3>
      <div className="items-center grid grid-cols-4 gap-8 mt-5 mb-14">
        {(bedrooms || bedrooms !== 0) && (
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-3">
              <FaBed className="h-6 w-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-lg">{bedrooms}</span>
              <p className="text-xs text-gray-700">Bedrooms</p>
            </div>
          </div>
        )}

        {(bathrooms || bathrooms !== 0) && (
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-3">
              <MdBathtub className="h-6 w-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-lg">{bathrooms}</span>
              <p className="text-xs text-gray-700">Bathrooms</p>
            </div>
          </div>
        )}

        {(construction_year || construction_year !== "0") && (
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-3">
              <MdOutlineTimeline className="h-6 w-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-lg">{construction_year}</span>
              <p className="text-xs text-gray-700">Built Year</p>
            </div>
          </div>
        )}

        {(private_area || private_area !== 0) && (
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-3">
              <BiArea className="h-6 w-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-lg">
                {private_area}m<sup>2</sup>
              </span>
              <p className="text-xs text-gray-700">Private area</p>
            </div>
          </div>
        )}

        {(plot_size || plot_size !== 0) && (
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-3">
              <LiaExpandArrowsAltSolid className="h-6 w-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-lg">
                {plot_size}m<sup>2</sup>
              </span>
              <p className="text-xs text-gray-700">Plot size</p>
            </div>
          </div>
        )}

        {(construction_area || construction_area !== 0) && (
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-3">
              <MdAreaChart className="h-6 w-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-lg">
                {construction_area}m<sup>2</sup>
              </span>
              <p className="text-xs text-gray-700">Construction area</p>
            </div>
          </div>
        )}

        {energy_class && (
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-3">
              <GiElectric className="h-6 w-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-lg">{energy_class}</span>
              <p className="text-xs text-gray-700">Energy Class</p>
            </div>
          </div>
        )}

        {propertyType && (
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3 justify-center border border-gray-500 bg-gray-200 p-3">
              <Home className="h-6 w-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-lg">{propertyType}</span>
              <p className="text-xs text-gray-700">Property Type</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyImages() {
  return (
    <div className="mt-10">
      {/* <h3 className="font-medium text-2xl text-primary">Property Details</h3> */}
      <div className="grid grid-cols-2 gap-6 mt-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative aspect-video">
            <Image
              src={`/images/featured-property-1.png`}
              alt="brochure"
              className="w-full object-fit object-center"
              priority
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DrivingDistances() {
  const drivingDistanceInfo = [
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
    <div className="mt-10">
      <p className="font-medium text-2xl text-primary mb-5">DRIVING DISTANCE</p>

      <div className="">
        {drivingDistanceInfo.length > 0 && (
          <ul className="flex justify-between gap-8 flex-wrap">
            {drivingDistanceInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <li
                  key={`drivingDistanceInfo--${index}`}
                  className="flex gap-2 "
                >
                  <IconComponent className="h-10 w-10 text-gray-600" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      {info.destination}
                    </span>
                    <span className="text-base font-bold">
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
  );
}

function PropertyDescription() {
  const propertyDescription =
    "In a sought after location, close to the Porto de mos beach and all amenities, this amazing contemporary villa is a great opportunity not to miss. With its elegant fluid arquitectural lines and well thought design, this property is being built to the highest standard to ensure maximum comfort and tranquility. Perfectly distributed over three floors, on the ground floor you will have a fully fitted kitchen, living and dining room, office (that can be used as a fourth bedroom) and one bedroom. On the first floor, there will be 2 bedrooms, one of them being the spacious master, with almost 35m2. All of the bedrooms, including the office, have their own private bathroom and the property has several surrounding terraces perfect for enjoying the wonderful Algarvian weather and distant sea views. In addition, it has a very large basement consisting of a garage with space for at least 2 cars, storage room, laundry room and technical area. Some of the features of this incredible villa include underfloor heating, solar panels and pre-installation for air conditioning.";
  return (
    <div className="mt-10">
      <div
        className="prose text-gray-600 !max-w-none text-base"
        dangerouslySetInnerHTML={{
          __html: propertyDescription,
        }}
      />
    </div>
  );
}

function ContactSection() {
  return (
    <>
      <div className="mt-10 bg-gray-100 p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1">
            <p className="font-medium text-sm text-center">LAGOA</p>
            <p className="text-gray-600 text-sm text-center">
              Rua Ernesto Cabrita, Edificio Vales L/A
            </p>
            <p className="text-gray-600 text-sm text-center">
              8400-387 Lagoa - Algarve
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-medium text-sm text-center">VILAMOURA</p>
            <p className="text-gray-600 text-sm text-center">
              Avenida Tivoli, B, Bloco 3, R/C Esq
            </p>
            <p className="text-gray-600 text-sm text-center">
              8125-465 Vilamoura - Algarve
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-medium text-sm text-center">LAGOS</p>
            <p className="text-gray-600 text-sm text-center">
              R. Dr. José Francisco Tello Queiroz, L 3, R
            </p>
            <p className="text-gray-600 text-sm text-center">
              Loja R, 8600-707 Lagos
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 mt-6">
        <p className="text-gray-600 text-sm text-center">
          Tel.: +351 282 353 019
        </p>
        <p className="text-gray-600 text-sm text-center">
          Mobile: +351 918 024 082{" "}
        </p>
        <p className="text-gray-600 text-sm text-center">
          Email: info@exclusive-algarve.com
        </p>
      </div>
    </>
  );
}

function Notice() {
  return (
    <>
      <div className="mt-10">
        <p className="text-sm text-gray-600">
          <span className="font-bold text-primary leading-relaxed">
            Important notice:
          </span>{" "}
          These particulars are not an offer or contract, nor part of one. The
          photographs show only certain parts of the property as they appeared
          at the time they were taken. Areas, measurements, layout plans and
          distances are for guidance only and should not be relied upon as a
          statement of fact. All property details have been provided by the
          seller and should not be considered factually accurate about the
          property, its condition or value. Exclusive Living Mediacao
          Imobiliaria Lda. holds no responsibility to the accuracy of the
          information and will not be held liable for any errors on any
          representation on the property. A buyer must not rely on this
          information without conducting an inspection or hiring professionals
          for surveys or legal services to verify all details and documentation
          prior to a property purchase.
        </p>
      </div>
    </>
  );
}

function Award() {
  return (
    <>
      <div className="mt-10">
        <div className="relative w-full h-[143px]">
          <Image
            src="/images/eav-award-portrait.jpg"
            alt="who we are"
            // width={1082}
            // height={143}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
}
