"use client";
import React, { useState } from "react";

interface PropertyImage {
  id: number;
  url: string;
  title: string;
  description: string | null;
  type: string;
}

interface AdditionalFeature {
  id: number;
  name: string;
}

interface PropertyVideo {
  id: number;
  url: string;
  title: string;
}

interface VirtualTour {
  id: number;
  url: string;
  title: string;
}

interface DrivingDistance {
  id: number;
  name: string;
  distance: string;
}

interface Property {
  id: number;
  reference: string;
  title: string;
  description: string;
  price: number;
  currency: "EUR" | "USD" | "GBP";
  show_price: boolean;
  agency: {
    id: number;
    name: string;
  };
  typology: {
    id: number;
    name: string;
  };
  is_featured_property: boolean;
  features: {
    bedrooms?: number;
    bathrooms?: number;
    construction_year?: string;
    private_area?: number;
    plot_size?: number;
    construction_area?: number;
    energy_class?: string;
    garage?: number;
  };
  additional_features: AdditionalFeature[];
  seo: {
    slugs: {
      de: string;
      en: string;
      fr: string;
      nl: string;
      pt: string;
      ru: string;
      se: string;
    };
    title: string;
    description: string;
    keywords: string[];
  };
  location: {
    country: string;
    district: string;
    municipality: string;
    zone: string;
    zip_code: string;
    latitude: number;
    longitude: number;
  };
  assets: {
    pdf_brochure: string;
    images: {
      gallery: PropertyImage[];
      floor_plans: PropertyImage[];
    };
    videos: PropertyVideo[] | null;
    virtual_tours: VirtualTour[];
  };
  sales_consultant: {
    name: string;
    profile_picture: string;
  };
  driving_distances: DrivingDistance[];
  similar_properties: number[];
  created_at: string;
  updated_at: string;
  banner: {
    color: string | null;
    name: string | null;
  };
}

const PropertyInventoryGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const mockProperty: Property = {
    id: 1,
    reference: "REF-001",
    title: "Luxury Portuguese Manor Estate",
    description:
      "This estate is a masterpiece of a traditional Portuguese manor house with 7 suites and 5 living rooms. Built on a property with 2.3hectares of Mediterranean gardens, immersed in a protected landscape of the seafront cliffs overlooking the ocean. It is located betweenthe beaches of Carvoeiro and Ferragudo. The villa has timeless finishes such as natural stones, hardwood floors, traditional beams,handmade terracota tiles and handcrafted mosaic and glazed tiles, while simultaneously adding a modern design and technology integrat-ed into the building, such as high performance windows frames with enhanced thermal insulation, top of the line appliances, domotics andsurveilance system.The garden completes this beautiful estate with an architecturally designed landscape, with fruit trees, calçadadriveway and a 20 metre swimming pool with electric cover. The layout comprises of a grand entrance patio leading to the main entrancehall, luxurious living room, family room, library / office, tea room, dining room, indoor court / garden large kitchen with central island,laundry room, and large outdoor terraces. This floor also has the staff/ guest accommodation with 3 ensuite bedrooms and a separateentrance. The first floor has 4 ensuite bedrooms, and 2 large balcony / terrace to enjoy the full view. The basement has the garage for 10vehicles, gym/spa room or cinema and storage area. This villa is a truly exclusive asset and a unique opportunity!This estate is a masterpiece of a traditional Portuguese manor house with 7 suites and 5 living rooms. Built on a property with 2.3 hectares of Mediterranean gardens, immersed in a protected landscape of the seafront cliffs overlooking the ocean. It is located between the beaches of Carvoeiro and Ferragudo. The villa has timeless finishes such as natural stones, hardwood floors, traditional beams, handmade terracota tiles and handcrafted mosaic and glazed tiles, while simultaneously adding a modern design and technology integrated into the building.",
    price: 10250000,
    currency: "EUR",
    show_price: true,
    agency: { id: 1, name: "Exclusive Algarve Villas" },
    typology: { id: 1, name: "Villa" },
    is_featured_property: true,
    features: {
      bedrooms: 7,
      bathrooms: 8,
      private_area: 1469,
      plot_size: 22940,
      construction_year: "2020",
      energy_class: "A",
    },
    additional_features: [],
    seo: {
      slugs: { de: "", en: "", fr: "", nl: "", pt: "", ru: "", se: "" },
      title: "",
      description: "",
      keywords: [],
    },
    location: {
      country: "Portugal",
      district: "Faro",
      municipality: "Lagoa",
      zone: "Carvoeiro",
      zip_code: "8400",
      latitude: 37.1,
      longitude: -8.4,
    },
    assets: {
      pdf_brochure: "",
      images: {
        gallery: [
          {
            id: 1,
            url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=600&fit=crop",
            title: "Main",
            description: null,
            type: "main",
          },
          {
            id: 2,
            url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop",
            title: "View",
            description: null,
            type: "gallery",
          },
          {
            id: 3,
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop",
            title: "Interior",
            description: null,
            type: "gallery",
          },
        ],
        floor_plans: [],
      },
      videos: null,
      virtual_tours: [],
    },
    sales_consultant: {
      name: "John Doe",
      profile_picture:
        "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=150&h=150&fit=crop",
    },
    driving_distances: [
      { id: 1, name: "Town", distance: "5 min" },
      { id: 2, name: "Beach", distance: "5 min" },
      { id: 3, name: "Restaurant", distance: "5 min" },
      { id: 4, name: "Shop", distance: "5 min" },
      { id: 5, name: "Golf", distance: "5 min" },
      { id: 6, name: "Airport", distance: "5 min" },
    ],
    similar_properties: [],
    created_at: "",
    updated_at: "",
    banner: { color: null, name: null },
  };

  const validateProperty = (property: Property): boolean => {
    if (
      !property.assets.images.gallery ||
      property.assets.images.gallery.length === 0
    ) {
      alert("Property must have at least one image");
      return false;
    }
    if (!property.title || property.title.trim() === "") {
      alert("Property must have a title");
      return false;
    }
    if (!property.description || property.description.trim() === "") {
      alert("Property must have a description");
      return false;
    }
    return true;
  };

  const prepareImages = (images: PropertyImage[]): string[] => {
    const REQUIRED_IMAGES = 10;

    if (!images || images.length === 0) {
      return Array(REQUIRED_IMAGES).fill(
        "https://via.placeholder.com/1200x600?text=No+Image"
      );
    }

    const imageUrls = images.map((img) => img.url);

    if (imageUrls.length >= REQUIRED_IMAGES) {
      return imageUrls.slice(0, REQUIRED_IMAGES);
    }

    const preparedImages: string[] = [];
    let index = 0;

    while (preparedImages.length < REQUIRED_IMAGES) {
      preparedImages.push(imageUrls[index % imageUrls.length]);
      index++;
    }

    return preparedImages;
  };

  const splitDescription = (
    description: string
  ): {
    page1: string;
    page2: string;
    page4: string;
  } => {
    const PAGE1_TARGET = 1140;
    const PAGE2_TARGET = 1430;

    const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];

    let page1 = "";
    let page2 = "";
    let page4 = "";
    let currentPage = 1;

    for (const sentence of sentences) {
      if (currentPage === 1) {
        if ((page1 + sentence).length <= PAGE1_TARGET) {
          page1 += sentence;
        } else {
          currentPage = 2;
          page2 += sentence;
        }
      } else if (currentPage === 2) {
        if ((page2 + sentence).length <= PAGE2_TARGET) {
          page2 += sentence;
        } else {
          currentPage = 4;
          page4 += sentence;
        }
      } else {
        page4 += sentence;
      }
    }

    return { page1, page2, page4 };
  };

  const generatePDF = async (property: Property) => {
    if (!validateProperty(property)) {
      return;
    }

    setIsGenerating(true);

    try {
      const images = prepareImages(property.assets.images.gallery);
      const descriptions = splitDescription(property.description);

      // Generate all pages HTML
      const page1HTML = createPage1HTML(property, images, descriptions.page1);
      const page2HTML = createPage2HTML(property, images, descriptions.page2);
      const page3HTML = createPage3HTML(property, images);
      const page4HTML = createPage4HTML(property, images, descriptions.page4);

      const completeHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Property Listing - ${property.reference}</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: white;
              }
              .page {
                width: 210mm;
                height: 297mm;
                margin: 0 auto;
                position: relative;
                background: white;
                page-break-after: always;
              }
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                }
                @page {
                  size: A4 portrait;
                  margin: 0;
                }
                .page {
                  page-break-after: always;
                }
              }
            </style>
          </head>
          <body>
            ${page1HTML}
            ${page2HTML}
            ${page3HTML}
            ${page4HTML}
            <script>
              window.onload = function() {
                setTimeout(() => {
                  window.print();
                }, 500);
              };
            </script>
          </body>
        </html>
      `;

      // Create Blob and open in new window
      const blob = new Blob([completeHTML], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);

      const printWindow = window.open(blobUrl, "_blank");

      if (!printWindow) {
        alert("Please allow pop-ups to print the PDF");
        URL.revokeObjectURL(blobUrl);
        setIsGenerating(false);
        return;
      }

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        setIsGenerating(false);
      }, 1000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
      setIsGenerating(false);
    }
  };

  const createPage1HTML = (
    property: Property,
    images: string[],
    description: string
  ): string => {
    // const formattedPrice = property.price.toLocaleString("en-US");

    const featureItems = [
      property.features.bedrooms &&
        `<div><strong>Bedrooms:</strong> ${property.features.bedrooms}</div>`,
      property.features.bathrooms &&
        `<div><strong>Bathrooms:</strong> ${property.features.bathrooms}</div>`,
      property.features.private_area &&
        `<div><strong>Area (m²):</strong> ${property.features.private_area}</div>`,
      property.features.plot_size &&
        `<div><strong>Size of plot (m²):</strong> ${property.features.plot_size}</div>`,
      property.features.construction_year &&
        `<div><strong>Construction Year:</strong> ${property.features.construction_year}</div>`,
      property.features.energy_class &&
        `<div><strong>Energy Efficiency:</strong> ${property.features.energy_class}</div>`,
    ]
      .filter(Boolean)
      .join("");

    const distancesHTML = property.driving_distances
      .map((d) => `<div><strong>${d.name}:</strong> ${d.distance}</div>`)
      .join("");

    return `
      <div class="page">
        ${createHeaderHTML(property)}
        
        <div style="position: absolute; top: 20mm; left: 0; width: 100%; height: 108.675mm;">
          <img src="${
            images[0]
          }" style="width: 100%; height: 100%; object-fit: cover;">
          <img src="${property.sales_consultant.profile_picture}" 
               style="position: absolute; bottom: 10px; right: 10px; width: 60px; height: 60px; object-fit: cover; border: 3px solid white;">
        </div>

        <div style="position: absolute; top: 126mm; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 15px 25px;">
          <h1 style="font-size: 25px; font-weight: bold; color: #1a1a1a; margin: 0;">${
            property.title
          }</h1>
          <img src="${
            property.sales_consultant.profile_picture
          }" style="width: 50px; height: 50px; object-fit: cover;">
        </div>

        <div style="position: absolute; top: 144mm; left: 0; width: 100%; display: flex; padding: 15px 25px; gap: 30px;">
          <div style="flex: 1; font-size: 12px;">
            <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #1a1a1a;">MAIN FEATURES</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; color: #333;">
              ${featureItems}
            </div>
          </div>
          <div style="flex: 1; font-size: 12px;">
            <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #1a1a1a;">DRIVING DISTANCES</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; color: #333;">
              ${distancesHTML}
            </div>
          </div>
        </div>

        <div style="position: absolute; top: 174mm; left: 0; width: 100%; padding: 15px 25px; font-size: 11px; line-height: 1.5; color: #333; text-align: justify;">
          ${description}
        </div>

        <div style="position: absolute; top: 244mm; left: 0; width: 100%; padding: 0 25px; font-size: 8px; line-height: 1.4; color: #666; text-align: justify; font-style: italic;">
          <strong>Important notice:</strong> These particulars are not an offer or contract, nor part of one. The photographs show only certain parts of the property as they appeared at the time they were taken. Areas, measurements, layout plans and distances are for guidance only and should not be relied upon as a statement of fact.
        </div>

        ${createFooterHTML()}
      </div>
    `;
  };

  const createPage2HTML = (
    property: Property,
    images: string[],
    description: string
  ): string => {
    return `
      <div class="page">
        ${createHeaderHTML(property)}
        
        <div style="position: absolute; top: 20mm; left: 0; width: 100%; height: 108.675mm;">
          <img src="${
            images[1]
          }" style="width: 100%; height: 100%; object-fit: cover;">
          <img src="${property.sales_consultant.profile_picture}" 
               style="position: absolute; bottom: 10px; right: 10px; width: 60px; height: 60px; object-fit: cover; border: 3px solid white;">
        </div>

        <div style="position: absolute; top: 132mm; left: 0; width: 100%; height: 122mm; display: flex; gap: 15px; padding: 0;">
          <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; padding-left: 25px;">
            <img src="${
              images[2]
            }" style="width: 100%; height: calc(50% - 5px); object-fit: cover;">
            <img src="${
              images[3]
            }" style="width: 100%; height: calc(50% - 5px); object-fit: cover;">
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; padding-right: 25px;">
            ${
              description.length > 0
                ? `<img src="${property.sales_consultant.profile_picture}" style="width: 60%; height: 80px; object-fit: cover; align-self: center;">`
                : ""
            }
            <div style="font-size: 11px; line-height: 1.5; color: #333; text-align: justify; flex: 1; overflow: hidden;">
              ${description}
            </div>
          </div>
        </div>

        ${createFooterHTML()}
      </div>
    `;
  };

  const createPage3HTML = (property: Property, images: string[]): string => {
    return `
      <div class="page">
        ${createHeaderHTML(property)}
        
        <div style="position: absolute; top: 20mm; left: 0; width: 100%; height: 108.675mm;">
          <img src="${
            images[4]
          }" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div style="position: absolute; top: 132mm; left: 0; width: 100%; height: 122mm; display: flex; gap: 15px; padding: 0;">
          <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; padding-left: 25px;">
            <img src="${
              images[5]
            }" style="width: 100%; height: calc(50% - 5px); object-fit: cover;">
            <img src="${
              images[6]
            }" style="width: 100%; height: calc(50% - 5px); object-fit: cover;">
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; padding-right: 25px;">
            <img src="${
              images[7]
            }" style="width: 100%; height: calc(50% - 5px); object-fit: cover;">
            <img src="${
              images[8]
            }" style="width: 100%; height: calc(50% - 5px); object-fit: cover;">
          </div>
        </div>

        ${createFooterHTML()}
      </div>
    `;
  };

  const createPage4HTML = (
    property: Property,
    images: string[],
    description: string
  ): string => {
    return `
      <div class="page">
        ${createHeaderHTML(property)}
        
        <div style="position: absolute; top: 20mm; left: 0; width: 100%; height: 108.675mm;">
          <img src="${
            images[9]
          }" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div style="position: absolute; top: 132mm; left: 0; width: 100%; padding: 0 25px; font-size: 11px; line-height: 1.5; color: #333; text-align: justify;">
          ${description}
        </div>

        <div style="position: absolute; top: 220mm; left: 0; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div style="width: 350px; text-align: center; font-size: 11px; line-height: 1.4; color: #333;">
            Exclusive Algarve Villas has been a known name in the sale of luxurious and unique Properties in the Western and Central Algarve since 2006.
          </div>
          <div style="text-align: center; font-size: 12px; font-weight: bold; color: #1a1a1a;">
            3 offices to serve you 7 days a week
          </div>
        </div>

        ${createFooterHTML()}
      </div>
    `;
  };

  const createHeaderHTML = (property: Property): string => {
    const formattedPrice = property.price.toLocaleString("en-US");
    return `
      <div style="position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 10px 25px;">
        <div style="font-size: 15px; font-weight: bold; color: #1a1a1a;">
          <span style="font-weight: normal;">Location:</span> ${property.location.zone}
        </div>
        <img src="/images/eav-dark-logo.png" style="height: 60px; object-fit: contain;">
        <div style="font-size: 15px; font-weight: bold; color: #D4A017;">
          <span style="font-weight: normal; color: #1a1a1a;">Price:</span> € ${formattedPrice}
        </div>
      </div>
    `;
  };

  const createFooterHTML = (): string => {
    return `
      <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 8px 25px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 11px; color: #1a1a1a;">
          <span style="font-weight: bold;">exclusivealgarvevillas.com</span>
          <span style="font-weight: bold;">info@eavillas.com</span>
        </div>
        <div style="width: 100%; height: 1px; background: #D4A017; margin: 3px 0;"></div>
        <div style="display: flex; justify-content: space-between; font-size: 8px; color: #333; line-height: 1.3;">
          <div>
            <div style="font-weight: bold; margin-bottom: 2px;">VILAMOURA</div>
            <div>Av. Tivoli, Conjunto Varandamar,</div>
            <div>Corpo B Bloco 3, R/C Esq.</div>
            <div>8125-465 Vilamoura</div>
            <div style="font-weight: bold; margin-top: 2px;">Tel. +351 289 321 276</div>
          </div>
          <div>
            <div style="font-weight: bold; margin-bottom: 2px;">LAGOA</div>
            <div>Rua Ernesto Cabrita,</div>
            <div>Edificio Vales Loja A</div>
            <div>8400-387 Lagoa</div>
            <div style="font-weight: bold; margin-top: 2px;">Tel. +351 282 353 019</div>
          </div>
          <div>
            <div style="font-weight: bold; margin-bottom: 2px;">LAGOS</div>
            <div>Rua Dr. José Francisco Tello Queiroz,</div>
            <div>Edif. Largo do Rossio de S. João Batista</div>
            <div>Lote 3 Loja R, 8600-707 Lagos</div>
            <div style="font-weight: bold; margin-top: 2px;">Tel. +351 282 353 019</div>
          </div>
        </div>
      </div>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Property Listing PDF Generator
          </h1>
          <p className="text-gray-600 mb-6">
            Generate a professional property listing PDF with location, price,
            features, and driving distances. Works on mobile and desktop.
          </p>

          <button
            onClick={() => generatePDF(mockProperty)}
            disabled={isGenerating}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
          >
            {isGenerating ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Generate PDF</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Property Details:
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Location:</strong> {mockProperty.location.zone}
            </p>
            <p>
              <strong>Price:</strong> €{" "}
              {mockProperty.price.toLocaleString("en-US")}
            </p>
            <p>
              <strong>Bedrooms:</strong> {mockProperty.features.bedrooms}
            </p>
            <p>
              <strong>Bathrooms:</strong> {mockProperty.features.bathrooms}
            </p>
            <p>
              <strong>Area:</strong> {mockProperty.features.private_area} m²
            </p>
            <p>
              <strong>Plot Size:</strong> {mockProperty.features.plot_size} m²
            </p>
            <p>
              <strong>Images Available:</strong>{" "}
              {mockProperty.assets.images.gallery.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInventoryGenerator;
