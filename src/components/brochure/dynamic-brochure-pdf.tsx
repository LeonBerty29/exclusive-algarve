"use client"
import React from "react";
import { Home, MapPin } from "lucide-react";
import { BiArea } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { IoGolfOutline, IoRestaurantOutline } from "react-icons/io5";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import { MdAreaChart, MdBathtub, MdOutlineTimeline } from "react-icons/md";
import { PiAirplaneLight, PiCityThin } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";
import Image from "next/image";

// Types for property data
interface PropertyData {
  id?: string;
  reference: string;
  title: string;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  construction_year?: number;
  private_area?: number;
  plot_size?: number;
  construction_area?: number;
  energy_class?: string;
  propertyType: string;
  description: string;
  images?: string[];
  drivingDistances?: Array<{
    destination: string;
    minutes: number;
    icon: string;
  }>;
}

interface DynamicBrochurePDFProps {
  property: PropertyData;
  logoUrl?: string;
  companyInfo?: {
    offices: Array<{
      name: string;
      address: string;
      city: string;
    }>;
    contact: {
      phone: string;
      mobile: string;
      email: string;
    };
  };
  awardImageUrl?: string;
}

const DynamicBrochurePDF: React.FC<DynamicBrochurePDFProps> = ({
  property,
  logoUrl = "/images/eav-logo-dark.svg",
  companyInfo,
  awardImageUrl = "/images/eav-award-portrait.jpg",
}) => {
  // Default company info
  const defaultCompanyInfo = {
    offices: [
      {
        name: "LAGOA",
        address: "Rua Ernesto Cabrita, Edificio Vales L/A",
        city: "8400-387 Lagoa - Algarve",
      },
      {
        name: "VILAMOURA",
        address: "Avenida Tivoli, B, Bloco 3, R/C Esq",
        city: "8125-465 Vilamoura - Algarve",
      },
      {
        name: "LAGOS",
        address: "R. Dr. José Francisco Tello Queiroz, L 3, R",
        city: "Loja R, 8600-707 Lagos",
      },
    ],
    contact: {
      phone: "+351 282 353 019",
      mobile: "+351 918 024 082",
      email: "info@exclusive-algarve.com",
    },
  };

  const finalCompanyInfo = companyInfo || defaultCompanyInfo;

  // Icon mapping for driving distances
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconMap: Record<string, React.ComponentType<any>> = {
    PiCityThin: PiCityThin,
    TbBeach: TbBeach,
    IoRestaurantOutline: IoRestaurantOutline,
    IoGolfOutline: IoGolfOutline,
    PiAirplaneLight: PiAirplaneLight,
  };

  const generatePDF = async () => {
    // Create print styles
    const printStyle = document.createElement("style");
    printStyle.id = "brochure-print-style";
    printStyle.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        #brochure-content, #brochure-content * {
          visibility: visible;
        }
        #brochure-content {
          position: absolute !important;
          left: 0;
          top: 0;
          width: 100% !important;
          height: auto !important;
          overflow: visible !important;
          display: block !important;
        }
        @page {
          size: A4 portrait;
          margin: 20mm;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;

          @top-center {
          content: "Exclusive Algarve Villas";
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: bold;
          color: #000;
          text-align: center;
        }
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .page-break {
          page-break-before: always;
        }
        .avoid-break {
          page-break-inside: avoid;
        }
        .print-button {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(printStyle);

    try {
      // Small delay to ensure styles are applied
      setTimeout(() => {
        window.print();

        // Cleanup after print
        setTimeout(() => {
          if (document.head.contains(printStyle)) {
            document.head.removeChild(printStyle);
          }
        }, 1000);
      }, 100);
    } catch (error) {
      console.error("PDF generation error:", error);
      if (document.head.contains(printStyle)) {
        document.head.removeChild(printStyle);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Only the Print Button is visible on screen */}
      <div className="print-button flex items-center justify-center min-h-screen">
        <div className="">
          <button
            onClick={generatePDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium flex items-center gap-3 mx-auto transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Brochure
          </button>
        </div>
      </div>

      {/* Hidden PDF Content - Only visible when printing */}
      <div
        id="brochure-content"
        className="hidden bg-white max-w-4xl mx-auto p-6 md:p-12"
        style={{ display: 'none' }}
      >
        {/* Header with Logo */}
        <div className="mb-6 w-fit mx-auto avoid-break">
          <Image
            src={logoUrl}
            alt="Company Logo"
            width={192}
            height={48}
            className="w-48 h-12 object-contain"
          />
        </div>

        {/* Main Property Image */}
        <div className="relative w-full aspect-video avoid-break">
          <Image
            src={property.images?.[0] || "/images/featured-property-1.png"}
            alt="Property"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-12 px-6 text-base font-semibold flex items-center justify-center bg-primary text-white">
            {property.reference}
          </div>
        </div>

        {/* Property Type and Location */}
        <div className="flex flex-col items-center py-10 mb-8 bg-black text-white avoid-break">
          <p className="font-semibold text-4xl text-center mb-0.5">
            {property.propertyType}
          </p>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <p className="text-center text-gray-300 text-lg">
              {property.location}
            </p>
          </div>
        </div>

        {/* Title and Price Section */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:justify-between mb-10 avoid-break">
          <div className="space-y-2 lg:w-3/5">
            <h1 className="font-semibold text-3xl">{property.title}</h1>
            <p className="text-base text-gray-600">
              {property.description.length > 200
                ? `${property.description.substring(0, 200)}...`
                : property.description}
            </p>
          </div>
          <div className="border border-gray-500 py-4 px-8 w-fit text-xl font-semibold">
            <h2 className="text-primary text-2xl">
              €{property.price.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="mb-14 avoid-break">
          <h3 className="font-medium text-2xl text-primary mb-6">
            Property Details
          </h3>
          <div className="grid grid-cols-3 gap-x-6 gap-y-10">
            {property.bedrooms && property.bedrooms > 0 && (
              <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center border border-gray-500 bg-gray-200 p-3">
                  <FaBed className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <span className="font-semibold text-lg block">
                    {property.bedrooms}
                  </span>
                  <p className="text-xs text-gray-700">Bedrooms</p>
                </div>
              </div>
            )}

            {property.bathrooms && property.bathrooms > 0 && (
              <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center border border-gray-500 bg-gray-200 p-3">
                  <MdBathtub className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <span className="font-semibold text-lg block">
                    {property.bathrooms}
                  </span>
                  <p className="text-xs text-gray-700">Bathrooms</p>
                </div>
              </div>
            )}

            {property.construction_year && property.construction_year > 0 && (
              <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center border border-gray-500 bg-gray-200 p-3">
                  <MdOutlineTimeline className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <span className="font-semibold text-lg block">
                    {property.construction_year}
                  </span>
                  <p className="text-xs text-gray-700">Built Year</p>
                </div>
              </div>
            )}

            {property.private_area && property.private_area > 0 && (
              <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center border border-gray-500 bg-gray-200 p-3">
                  <BiArea className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <span className="font-semibold text-lg block">
                    {property.private_area}m²
                  </span>
                  <p className="text-xs text-gray-700">Private area</p>
                </div>
              </div>
            )}

            {property.plot_size && property.plot_size > 0 && (
              <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center border border-gray-500 bg-gray-200 p-3">
                  <LiaExpandArrowsAltSolid className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <span className="font-semibold text-lg block">
                    {property.plot_size}m²
                  </span>
                  <p className="text-xs text-gray-700">Plot size</p>
                </div>
              </div>
            )}

            {property.construction_area && property.construction_area > 0 && (
              <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center border border-gray-500 bg-gray-200 p-3">
                  <MdAreaChart className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <span className="font-semibold text-lg block">
                    {property.construction_area}m²
                  </span>
                  <p className="text-xs text-gray-700">Construction area</p>
                </div>
              </div>
            )}

            {property.energy_class && (
              <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center border border-gray-500 bg-gray-200 p-3">
                  <GiElectric className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <span className="font-semibold text-lg block">
                    {property.energy_class}
                  </span>
                  <p className="text-xs text-gray-700">Energy Class</p>
                </div>
              </div>
            )}

            <div className="flex gap-3 items-center">
              <div className="flex items-center justify-center border border-gray-500 bg-gray-200 p-3">
                <Home className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <span className="font-semibold text-lg block">
                  {property.propertyType}
                </span>
                <p className="text-xs text-gray-700">Property Type</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Property Images */}
        {property.images && property.images.length > 1 && (
          <div className="mb-14 page-break">
            <h3 className="font-medium text-2xl text-primary mb-6">
              Property Images
            </h3>
            <div className="grid gap-6">
              {property.images.map((image, index) => (
                <div key={index} className="relative aspect-video avoid-break">
                  <Image
                    src={image}
                    alt={`Property view ${index + 1}`}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Driving Distances */}
        {property.drivingDistances && property.drivingDistances.length > 0 && (
          <div className="mb-14 avoid-break">
            <h3 className="font-medium text-2xl text-primary mb-6">
              Driving Distances
            </h3>
            <div className="grid grid-cols-3 gap-8 flex-wrap">
              {property.drivingDistances.map((info, index) => {
                const IconComponent = iconMap[info.icon] || PiCityThin;
                return (
                  <div key={index} className="flex gap-2 items-end">
                    <IconComponent className="h-10 w-10 text-gray-600" />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        {info.destination}
                      </span>
                      <span className="text-base font-bold">
                        {info.minutes} min
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Full Description */}
        <div className="mb-14 avoid-break">
          <h3 className="font-medium text-2xl text-primary mb-6">
            Property Description
          </h3>
          <div className="text-gray-600 text-base leading-relaxed">
            {property.description}
          </div>
        </div>

        {/* Company Info and Contact */}
        <div className="page-break">
          <div className="bg-gray-100 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {finalCompanyInfo.offices.map((office, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <p className="font-medium text-sm text-center">
                    {office.name}
                  </p>
                  <p className="text-gray-600 text-sm text-center">
                    {office.address}
                  </p>
                  <p className="text-gray-600 text-sm text-center">
                    {office.city}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <p className="text-gray-600 text-sm">
              Tel.: {finalCompanyInfo.contact.phone}
            </p>
            <p className="text-gray-600 text-sm">
              Mobile: {finalCompanyInfo.contact.mobile}
            </p>
            <p className="text-gray-600 text-sm">
              Email: {finalCompanyInfo.contact.email}
            </p>
          </div>

          {/* Award Image */}
          <div className="mb-10">
            <div className="relative w-full h-36">
              <Image
                src={awardImageUrl}
                alt="Company Awards"
                fill
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Legal Notice */}
          <div className="avoid-break">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-primary">Important notice:</span>{" "}
              These particulars are not an offer or contract, nor part of one.
              The photographs show only certain parts of the property as they
              appeared at the time they were taken. Areas, measurements, layout
              plans and distances are for guidance only and should not be relied
              upon as a statement of fact. All property details have been
              provided by the seller and should not be considered factually
              accurate about the property, its condition or value. Exclusive
              Living Mediacao Imobiliaria Lda. holds no responsibility to the
              accuracy of the information and will not be held liable for any
              errors on any representation on the property. A buyer must not
              rely on this information without conducting an inspection or
              hiring professionals for surveys or legal services to verify all
              details and documentation prior to a property purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const ExampleUsage = () => {
  const sampleProperty: PropertyData = {
    reference: "EAV-3500",
    title: "Modern Villa near Gale beach and Salgados Golf for sale Algarve",
    location: "Albufeira, Algarve",
    price: 4500000,
    bedrooms: 4,
    bathrooms: 2,
    construction_year: 2020,
    private_area: 150,
    plot_size: 200,
    construction_area: 180,
    energy_class: "A",
    propertyType: "Modern Villa",
    description:
      "In a sought after location, close to the Porto de mos beach and all amenities, this amazing contemporary villa is a great opportunity not to miss. With its elegant fluid arquitectural lines and well thought design, this property is being built to the highest standard to ensure maximum comfort and tranquility. Perfectly distributed over three floors, on the ground floor you will have a fully fitted kitchen, living and dining room, office (that can be used as a fourth bedroom) and one bedroom. On the first floor, there will be 2 bedrooms, one of them being the spacious master, with almost 35m2. All of the bedrooms, including the office, have their own private bathroom and the property has several surrounding terraces perfect for enjoying the wonderful Algarvian weather and distant sea views. In addition, it has a very large basement consisting of a garage with space for at least 2 cars, storage room, laundry room and technical area. Some of the features of this incredible villa include underfloor heating, solar panels and pre-installation for air conditioning.",
    images: [
      "/images/featured-property-1.png",
      "/images/featured-property-1.png",
      "/images/featured-property-1.png",
      "/images/featured-property-1.png",
      "/images/featured-property-1.png",
      "/images/featured-property-1.png",
      "/images/featured-property-1.png",
    ],
    drivingDistances: [
      { destination: "Town", minutes: 5, icon: "PiCityThin" },
      { destination: "Beach", minutes: 5, icon: "TbBeach" },
      { destination: "Restaurant", minutes: 5, icon: "IoRestaurantOutline" },
      { destination: "Shop", minutes: 5, icon: "PiCityThin" },
      { destination: "Golf", minutes: 5, icon: "IoGolfOutline" },
      { destination: "Airport", minutes: 5, icon: "PiAirplaneLight" },
    ],
  };

  return <DynamicBrochurePDF property={sampleProperty} />;
};

export default ExampleUsage;