// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState, useEffect } from "react";
// import { Download } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Property, PropertyImage } from "@/types/property";

// interface GenerateBrochureProps {
//   property: Property;
//   buttonText?: string;
//   className?: string;
// }

// interface DrivingDistanceResult {
//   label: string;
//   value: string;
// }

// export const GenerateBrochure: React.FC<GenerateBrochureProps> = ({
//   property,
//   buttonText = "Download Brochure",
//   className = "text-xs rounded-none bg-black text-white px-6",
// }) => {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [drivingDistances, setDrivingDistances] = useState<
//     DrivingDistanceResult[]
//   >([]);
//   const [map, setMap] = useState<google.maps.Map | null>(null);

//   // Place types to search for
//   const placeTypes = [
//     { type: "restaurant", label: "Restaurant" },
//     { type: "beach", label: "Beach" },
//     { type: "bus_station", label: "Bus Station" },
//     { type: "airport", label: "Airport" },
//     { type: "hospital", label: "Hospital" },
//     { type: "shopping_mall", label: "Shopping" },
//   ];

//   // Create hidden map for Places Service
//   useEffect(() => {
//     if (typeof window === "undefined" || !window.google) return;

//     const mapDiv = document.createElement("div");
//     const tempMap = new google.maps.Map(mapDiv, {
//       center: {
//         lat: property.location.latitude,
//         lng: property.location.longitude,
//       },
//       zoom: 12,
//     });

//     setMap(tempMap);
//   }, [property.location.latitude, property.location.longitude]);

//   // Fetch driving distances
//   useEffect(() => {
//     if (!map) return;

//     const fetchDrivingDistances = async () => {
//       const service = new google.maps.places.PlacesService(map);
//       const distanceService = new google.maps.DistanceMatrixService();
//       const origin = new google.maps.LatLng(
//         property.location.latitude,
//         property.location.longitude
//       );

//       const distances: DrivingDistanceResult[] = [];

//       for (const { type, label } of placeTypes) {
//         try {
//           const result =
//             await new Promise<google.maps.places.PlaceResult | null>(
//               (resolve) => {
//                 service.nearbySearch(
//                   {
//                     location: origin,
//                     radius: 10000,
//                     type: type,
//                   },
//                   (results, status) => {
//                     if (
//                       status === google.maps.places.PlacesServiceStatus.OK &&
//                       results &&
//                       results.length > 0
//                     ) {
//                       resolve(results[0]);
//                     } else {
//                       resolve(null);
//                     }
//                   }
//                 );
//               }
//             );

//           if (result?.geometry?.location) {
//             const destination = {
//               lat: result.geometry.location.lat(),
//               lng: result.geometry.location.lng(),
//             };

//             const distanceResult = await new Promise<string>((resolve) => {
//               distanceService.getDistanceMatrix(
//                 {
//                   origins: [origin],
//                   destinations: [
//                     new google.maps.LatLng(destination.lat, destination.lng),
//                   ],
//                   travelMode: google.maps.TravelMode.DRIVING,
//                 },
//                 (response, status) => {
//                   if (
//                     status === google.maps.DistanceMatrixStatus.OK &&
//                     response
//                   ) {
//                     const element = response.rows[0]?.elements[0];
//                     if (element?.status === "OK") {
//                       resolve(element.duration?.text || "N/A");
//                       return;
//                     }
//                   }
//                   resolve("N/A");
//                 }
//               );
//             });

//             if (distanceResult !== "N/A") {
//               distances.push({ label, value: distanceResult });
//             }
//           }
//         } catch (error) {
//           // Silently continue on error
//           console.log(error)
//         }
//       }

//       setDrivingDistances(distances);
//     };

//     fetchDrivingDistances();
//   }, [map, property.location.latitude, property.location.longitude]);

//   const validateProperty = (property: Property): boolean => {
//     if (
//       !property.assets.images.gallery ||
//       property.assets.images.gallery.length === 0
//     ) {
//       alert("Property must have at least one image");
//       return false;
//     }
//     if (!property.title || property.title.trim() === "") {
//       alert("Property must have a title");
//       return false;
//     }
//     if (!property.description || property.description.trim() === "") {
//       alert("Property must have a description");
//       return false;
//     }
//     return true;
//   };

//   const prepareImages = (images: PropertyImage[]): string[] => {
//     const REQUIRED_IMAGES = 10;

//     if (!images || images.length === 0) {
//       return Array(REQUIRED_IMAGES).fill(
//         "https://via.placeholder.com/1200x600?text=No+Image"
//       );
//     }

//     const imageUrls = images.map((img) => img.url);

//     if (imageUrls.length >= REQUIRED_IMAGES) {
//       return imageUrls.slice(0, REQUIRED_IMAGES);
//     }

//     const preparedImages: string[] = [];
//     let index = 0;

//     while (preparedImages.length < REQUIRED_IMAGES) {
//       preparedImages.push(imageUrls[index % imageUrls.length]);
//       index++;
//     }

//     return preparedImages;
//   };

//   const splitDescriptionSmartly = (description: string) => {

//     const PAGE1_LIMIT = 1000;
//     const PAGE2_LIMIT = 800;
//     const PAGE4_LIMIT = 2000;
//     const ADDITIONAL_PAGE_LIMIT = 2500;

//     let page1Text = "";
//     let page2Text = "";
//     let page4Text = "";
//     const additionalPages: string[] = [];

//     const paragraphs = description
//       .split(/\n\n|<\/p>\s*<p>|<\/div>\s*<div>/)
//       .filter((p) => p.trim());

//     let currentLength = 0;
//     let currentPage = 1;
//     let currentAdditionalPageText = "";

//     for (let i = 0; i < paragraphs.length; i++) {
//       const para = paragraphs[i];
//       const paraText = para.replace(/<[^>]*>/g, "").trim();
//       const paraLength = paraText.length;

//       if (currentPage === 1) {
//         if (currentLength + paraLength <= PAGE1_LIMIT) {
//           page1Text += para + " ";
//           currentLength += paraLength;
//         } else {
//           currentPage = 2;
//           page2Text += para + " ";
//           currentLength = paraLength;
//         }
//       } else if (currentPage === 2) {
//         if (currentLength + paraLength <= PAGE2_LIMIT) {
//           page2Text += para + " ";
//           currentLength += paraLength;
//         } else {
//           currentPage = 4;
//           page4Text += para + " ";
//           currentLength = paraLength;
//         }
//       } else if (currentPage === 4) {
//         if (currentLength + paraLength <= PAGE4_LIMIT) {
//           page4Text += para + " ";
//           currentLength += paraLength;
//         } else {
//           currentPage = 5;
//           currentAdditionalPageText += para + " ";
//           currentLength = paraLength;
//         }
//       } else {
//         if (currentLength + paraLength <= ADDITIONAL_PAGE_LIMIT) {
//           currentAdditionalPageText += para + " ";
//           currentLength += paraLength;
//         } else {
//           additionalPages.push(currentAdditionalPageText.trim());
//           currentAdditionalPageText = para + " ";
//           currentLength = paraLength;
//         }
//       }
//     }

//     if (currentAdditionalPageText.trim()) {
//       additionalPages.push(currentAdditionalPageText.trim());
//     }

//     return {
//       page1: page1Text.trim(),
//       page2: page2Text.trim(),
//       page4: page4Text.trim(),
//       additionalPages: additionalPages,
//       hasPage2Content: page2Text.trim().length > 0,
//       hasPage4Content: page4Text.trim().length > 0,
//     };
//   };

//   const generatePDF = async (property: Property) => {
//     if (!validateProperty(property)) {
//       return;
//     }

//     setIsGenerating(true);

//     try {
//       const images = prepareImages(property.assets.images.gallery);
//       const descriptionSplit = splitDescriptionSmartly(property.description);

//       const page1HTML = createPage1HTML(
//         property,
//         images,
//         descriptionSplit,
//         drivingDistances
//       );
//       const page2HTML = createPage2HTML(property, images, descriptionSplit);
//       const page3HTML = createPage3HTML(property, images);
//       const page4HTML = createPage4HTML(property, images, descriptionSplit);

//       const additionalPagesHTML = descriptionSplit.additionalPages
//         .map((pageText: string) => createAdditionalPageHTML(property, pageText))
//         .join("");

//       const completeHTML = `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <meta charset="utf-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Property Listing - ${property.reference}</title>
//             <style>
//               * {
//                 margin: 0;
//                 padding: 0;
//                 box-sizing: border-box;
//               }

//               body {
//                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//                 background: white;
//                 color: #333;
//               }

//               .page {
//                 width: 210mm;
//                 height: 297mm;
//                 margin: 0 auto;
//                 background: white;
//                 page-break-after: always;
//                 display: flex;
//                 flex-direction: column;
//                 overflow: hidden;
//               }

//               .header {
//                 display: flex;
//                 align-items: center;
//                 justify-content: space-between;
//                 padding: 10px 25px;
//                 border-bottom: 1px solid #eee;
//               }

//               .header-location {
//                 font-size: 15px;
//                 color: #1a1a1a;
//               }

//               .header-location span {
//                 font-weight: normal;
//               }

//               .header-logo {
//                 height: 60px;
//                 object-fit: contain;
//               }

//               .header-price {
//                 font-size: 15px;
//                 font-weight: bold;
//                 color: #D4A017;
//               }

//               .header-price span {
//                 font-weight: normal;
//                 color: #1a1a1a;
//               }

//               .hero-image {
//                 width: 100%;
//                 height: 400px;
//                 object-fit: cover;
//                 position: relative;
//               }

//               .hero-container {
//                 position: relative;
//               }

//               .badge {
//                 position: absolute;
//                 bottom: 10px;
//                 right: 10px;
//                 width: 60px;
//                 height: 60px;
//                 object-fit: cover;
//                 border: 3px solid white;
//                 border-radius: 4px;
//               }

//               .content {
//                 flex: 1;
//                 padding: 20px 25px;
//                 display: flex;
//                 flex-direction: column;
//               }

//               .title-section {
//                 display: flex;
//                 align-items: center;
//                 justify-content: space-between;
//                 margin-bottom: 20px;
//               }

//               .title {
//                 font-size: 24px;
//                 font-weight: bold;
//                 color: #1a1a1a;
//                 flex: 1;
//               }

//               .title-badge {
//                 width: 50px;
//                 height: 50px;
//                 object-fit: cover;
//                 border-radius: 4px;
//                 margin-left: 15px;
//               }

//               .features-grid {
//                 display: grid;
//                 grid-template-columns: 1fr 1fr;
//                 gap: 25px;
//                 margin-bottom: 20px;
//               }

//               .feature-section h3 {
//                 font-weight: bold;
//                 font-size: 14px;
//                 margin-bottom: 10px;
//                 color: #1a1a1a;
//                 text-transform: uppercase;
//               }

//               .feature-items {
//                 display: flex;
//                 flex-wrap: wrap;
//                 gap: 8px;
//                 font-size: 12px;
//               }

//               .description {
//                 font-size: 11px;
//                 line-height: 1.6;
//                 text-align: justify;
//                 margin-bottom: auto;
//               }

//               .footer {
//                 margin-top: auto;
//                 padding: 15px 25px;
//               }

//               .footer-top {
//                 display: flex;
//                 justify-content: space-between;
//                 margin-bottom: 8px;
//                 padding-bottom: 8px;
//                 border-bottom: 2px solid #D4A017;
//                 font-size: 11px;
//                 font-weight: bold;
//                 color: #1a1a1a;
//               }

//               .footer-divider {
//                 display: none;
//               }

//               .footer-offices {
//                 display: grid;
//                 grid-template-columns: 1fr 1fr 1fr;
//                 gap: 20px;
//                 font-size: 8px;
//                 line-height: 1.4;
//               }

//               .office h4 {
//                 font-weight: bold;
//                 margin-bottom: 3px;
//               }

//               .notice {
//                 font-size: 8px;
//                 line-height: 1.4;
//                 color: #666;
//                 font-style: italic;
//                 margin-top: 15px;
//                 padding: 10px 0;
//               }

//               .image-grid {
//                 display: grid;
//                 grid-template-columns: 1fr 1fr;
//                 gap: 15px;
//                 flex: 1;
//                 padding: 0 25px 20px;
//               }

//               .image-grid img {
//                 width: 100%;
//                 height: 100%;
//                 object-fit: cover;
//                 border-radius: 4px;
//               }

//               .image-column {
//                 display: flex;
//                 flex-direction: column;
//                 gap: 15px;
//               }

//               .text-with-image {
//                 display: flex;
//                 flex-direction: column;
//                 gap: 15px;
//               }

//               .company-info {
//                 text-align: center;
//                 padding: 20px 25px;
//                 margin-top: auto;
//               }

//               .company-description {
//                 max-width: 400px;
//                 margin: 0 auto 15px;
//                 font-size: 11px;
//                 line-height: 1.5;
//               }

//               .company-tagline {
//                 font-size: 12px;
//                 font-weight: bold;
//                 color: #1a1a1a;
//               }

//               @media print {
//                 body {
//                   margin: 0;
//                   padding: 0;
//                 }

//                 @page {
//                   size: A4 portrait;
//                   margin: 0;
//                 }

//                 .page {
//                   page-break-after: always;
//                 }
//               }
//             </style>
//           </head>
//           <body>
//             ${page1HTML}
//             ${page2HTML}
//             ${page3HTML}
//             ${page4HTML}
//             ${additionalPagesHTML}
//             <script>
//               window.onload = function() {
//                 setTimeout(() => {
//                   window.print();
//                 }, 500);
//               };
//             </script>
//           </body>
//         </html>
//       `;

//       const blob = new Blob([completeHTML], { type: "text/html" });
//       const blobUrl = URL.createObjectURL(blob);

//       const printWindow = window.open(blobUrl, "_blank");

//       if (!printWindow) {
//         alert("Please allow pop-ups to print the PDF");
//         URL.revokeObjectURL(blobUrl);
//         setIsGenerating(false);
//         return;
//       }

//       setTimeout(() => {
//         URL.revokeObjectURL(blobUrl);
//         setIsGenerating(false);
//       }, 1000);
//     } catch (error) {
//       console.log(error)
//       alert("Failed to generate PDF. Please try again.");
//       setIsGenerating(false);
//     }
//   };

//   const createPage1HTML = (
//     property: Property,
//     images: string[],
//     descriptionSplit: any,
//     distances: DrivingDistanceResult[]
//   ): string => {
//     const featureItems = [
//       property.features.bedrooms &&
//         `<div><strong>Bedrooms:</strong> <span>${property.features.bedrooms}</span></div>`,
//       property.features.bathrooms &&
//         `<div><strong>Bathrooms:</strong> <span>${property.features.bathrooms}</span></div>`,
//       property.features.private_area &&
//         `<div><strong>Area:</strong> <span>${property.features.private_area} m²</span></div>`,
//       property.features.plot_size &&
//         `<div><strong>Plot Size:</strong> <span>${property.features.plot_size} m²</span></div>`,
//       property.features.construction_year &&
//         `<div><strong>Year:</strong> <span>${property.features.construction_year}</span></div>`,
//       property.features.energy_class &&
//         `<div><strong>Energy:</strong> <span>${property.features.energy_class}</span></div>`,
//     ]
//       .filter(Boolean)
//       .join("");

//     const distancesHTML =
//       distances.length > 0
//         ? distances
//             .map(
//               (d) =>
//                 `<div><strong>${d.label}:</strong> <span>${d.value}</span></div>`
//             )
//             .join("")
//         : property.driving_distances
//             .map(
//               (d) =>
//                 `<div><strong>${d.label}:</strong> <span>${d.value} min</span></div>`
//             )
//             .join("");

//     const formattedPrice = property.price.toLocaleString("en-US");

//     return `
//       <div class="page">
//         <div class="header">
//           <div class="header-location">
//             <span>Location:</span> <strong>${property.location.zone}</strong>
//           </div>
//           <img src="/images/eav-dark-logo.png" class="header-logo" alt="Logo">
//           <div class="header-price">
//             <span>Price:</span> € ${formattedPrice}
//           </div>
//         </div>

//         <div class="hero-container">
//           <img src="${images[0]}" class="hero-image" alt="Property">
//           <img src="${
//             property.sales_consultant.profile_picture
//           }" class="badge" alt="Badge">
//         </div>

//         <div class="content">
//           <div class="title-section">
//             <h1 class="title">${property.title}</h1>
//             <img src="${
//               property.sales_consultant.profile_picture
//             }" class="title-badge" alt="Consultant">
//           </div>

//           <div class="features-grid">
//             <div class="feature-section">
//               <h3>Main Features</h3>
//               <div class="feature-items">
//                 ${featureItems}
//               </div>
//             </div>
//             <div class="feature-section">
//               <h3>Driving Distances</h3>
//               <div class="feature-items">
//                 ${distancesHTML}
//               </div>
//             </div>
//           </div>

//           <div class="description">
//             ${descriptionSplit.page1}
//           </div>

//           <div class="notice">
//             <strong>Important notice:</strong> These particulars are not an offer or contract, nor part of one. The photographs show only certain parts of the property as they appeared at the time they were taken. Areas, measurements, layout plans and distances are for guidance only and should not be relied upon as a statement of fact. All property details have been provided by the seller and should not be considered factually accurate about the property, its condition or value. Exclusvie Living Mediaçao Imobiliaria Lda. holds no responsibility to the accuracy of the information and will not be held liable for any errors on any representation on the property. A buyer must not rely on this information without conducting an inspection or hiring professionals for surveys or legal services to verify all details and documentation prior to a property purchase.
//           </div>
//         </div>

//         ${createFooterHTML()}
//       </div>
//     `;
//   };

//   const createPage2HTML = (
//     property: Property,
//     images: string[],
//     descriptionSplit: any
//   ): string => {
//     const formattedPrice = property.price.toLocaleString("en-US");

//     return `
//       <div class="page">
//         <div class="header">
//           <div class="header-location">
//             <span>Location:</span> <strong>${property.location.zone}</strong>
//           </div>
//           <img src="/images/eav-dark-logo.png" class="header-logo" alt="Logo">
//           <div class="header-price">
//             <span>Price:</span> € ${formattedPrice}
//           </div>
//         </div>

//         <div class="hero-container">
//           <img src="${images[1]}" class="hero-image" alt="Property">
//           <img src="${
//             property.sales_consultant.profile_picture
//           }" class="badge" alt="Badge">
//         </div>

//         <div class="image-grid">
//           <div class="image-column">
//             <img src="${images[2]}" alt="Property">
//             <img src="${images[3]}" alt="Property">
//           </div>
//           ${
//             descriptionSplit.hasPage2Content
//               ? `
//           <div class="text-with-image">
//             <img src="${property.sales_consultant.profile_picture}" style="width: 60%; height: 100px; object-fit: cover; align-self: center; border-radius: 4px;" alt="Consultant">
//             <div style="font-size: 11px; line-height: 1.6; text-align: justify;">
//               ${descriptionSplit.page2}
//             </div>
//           </div>
//           `
//               : `
//           <div class="image-column">
//             <img src="${images[10] || images[4]}" alt="Property">
//             <img src="${images[11] || images[5]}" alt="Property">
//           </div>
//           `
//           }
//         </div>

//         ${createFooterHTML()}
//       </div>
//     `;
//   };

//   const createPage3HTML = (property: Property, images: string[]): string => {
//     const formattedPrice = property.price.toLocaleString("en-US");

//     return `
//       <div class="page">
//         <div class="header">
//           <div class="header-location">
//             <span>Location:</span> <strong>${property.location.zone}</strong>
//           </div>
//           <img src="/images/eav-dark-logo.png" class="header-logo" alt="Logo">
//           <div class="header-price">
//             <span>Price:</span> € ${formattedPrice}
//           </div>
//         </div>

//         <div class="hero-container">
//           <img src="${images[4]}" class="hero-image" alt="Property">
//         </div>

//         <div class="image-grid">
//           <div class="image-column">
//             <img src="${images[5]}" alt="Property">
//             <img src="${images[6]}" alt="Property">
//           </div>
//           <div class="image-column">
//             <img src="${images[7]}" alt="Property">
//             <img src="${images[8]}" alt="Property">
//           </div>
//         </div>

//         ${createFooterHTML()}
//       </div>
//     `;
//   };

//   const createPage4HTML = (
//     property: Property,
//     images: string[],
//     descriptionSplit: any
//   ): string => {
//     const formattedPrice = property.price.toLocaleString("en-US");

//     return `
//       <div class="page">
//         <div class="header">
//           <div class="header-location">
//             <span>Location:</span> <strong>${property.location.zone}</strong>
//           </div>
//           <img src="/images/eav-dark-logo.png" class="header-logo" alt="Logo">
//           <div class="header-price">
//             <span>Price:</span> € ${formattedPrice}
//           </div>
//         </div>

//         <div class="hero-container">
//           <img src="${images[9]}" class="hero-image" alt="Property">
//         </div>

//         ${
//           descriptionSplit.hasPage4Content
//             ? `
//         <div class="content">
//           <div class="description">
//             ${descriptionSplit.page4}
//           </div>
//         </div>
//         `
//             : ""
//         }

//         <div class="company-info">
//           <div class="company-description">
//             Exclusive Algarve Villas has been a known name in the sale of luxurious and unique Properties in the Western and Central Algarve since 2006.
//           </div>
//           <div class="company-tagline">
//             3 offices to serve you 7 days a week
//           </div>
//         </div>

//         ${createFooterHTML()}
//       </div>
//     `;
//   };

//   const createAdditionalPageHTML = (
//     property: Property,
//     content: string
//   ): string => {
//     const formattedPrice = property.price.toLocaleString("en-US");

//     return `
//       <div class="page">
//         <div class="header">
//           <div class="header-location">
//             <span>Location:</span> <strong>${property.location.zone}</strong>
//           </div>
//           <img src="/images/eav-dark-logo.png" class="header-logo" alt="Logo">
//           <div class="header-price">
//             <span>Price:</span> € ${formattedPrice}
//           </div>
//         </div>

//         <div class="content" style="padding-top: 30px;">
//           <div class="description">
//             ${content}
//           </div>
//         </div>

//         ${createFooterHTML()}
//       </div>
//     `;
//   };

//   const createFooterHTML = (): string => {
//     return `
//       <div class="footer">
//         <div class="footer-top">
//           <span>exclusivealgarvevillas.com</span>
//           <span>info@eavillas.com</span>
//         </div>
//         <div class="footer-divider"></div>
//         <div class="footer-offices">
//           <div class="office">
//             <h4>VILAMOURA</h4>
//             <div>Av. Tivoli, Conjunto Varandamar,</div>
//             <div>Corpo B Bloco 3, R/C Esq.</div>
//             <div>8125-465 Vilamoura</div>
//             <div style="font-weight: bold; margin-top: 3px;">Tel. +351 289 321 276</div>
//           </div>
//           <div class="office">
//             <h4>LAGOA</h4>
//             <div>Rua Ernesto Cabrita,</div>
//             <div>Edificio Vales Loja A</div>
//             <div>8400-387 Lagoa</div>
//             <div style="font-weight: bold; margin-top: 3px;">Tel. +351 282 353 019</div>
//           </div>
//           <div class="office">
//             <h4>LAGOS</h4>
//             <div>Rua Dr. José Francisco Tello Queiroz,</div>
//             <div>Edif. Largo do Rossio de S. João Batista</div>
//             <div>Lote 3 Loja R, 8600-707 Lagos</div>
//             <div style="font-weight: bold; margin-top: 3px;">Tel. +351 282 353 019</div>
//           </div>
//         </div>
//       </div>
//     `;
//   };

//   return (
//     <Button
//       onClick={() => generatePDF(property)}
//       disabled={isGenerating}
//       className={className}
//     >
//       {isGenerating ? (
//         <>
//           <svg
//             className="animate-spin h-4 w-4 mr-2"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           Generating...
//         </>
//       ) : (
//         <>
//           <Download className="size-4 mr-2" />
//           {buttonText}
//         </>
//       )}
//     </Button>
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property, PropertyImage } from "@/types/property";
import { pdf } from "@react-pdf/renderer";
import { PropertyBrochurePDF } from "./pdf-brochure-generate";

interface GenerateBrochureProps {
  property: Property;
  buttonText?: string;
  className?: string;
}

interface DrivingDistanceResult {
  label: string;
  value: string;
}

export const GenerateBrochure: React.FC<GenerateBrochureProps> = ({
  property,
  buttonText = "Download Brochure",
  className = "text-xs rounded-none bg-black text-white px-6",
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [drivingDistances, setDrivingDistances] = useState<
    DrivingDistanceResult[]
  >([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Place types to search for
  const placeTypes = [
    { type: "restaurant", label: "Restaurant" },
    { type: "beach", label: "Beach" },
    { type: "bus_station", label: "Bus Station" },
    { type: "airport", label: "Airport" },
    { type: "hospital", label: "Hospital" },
    { type: "shopping_mall", label: "Shopping" },
  ];

  // Create hidden map for Places Service
  useEffect(() => {
    if (typeof window === "undefined" || !window.google) return;

    const mapDiv = document.createElement("div");
    const tempMap = new google.maps.Map(mapDiv, {
      center: {
        lat: property.location.latitude,
        lng: property.location.longitude,
      },
      zoom: 12,
    });

    setMap(tempMap);
  }, [property.location.latitude, property.location.longitude]);

  // Fetch driving distances
  useEffect(() => {
    if (!map) return;

    const fetchDrivingDistances = async () => {
      const service = new google.maps.places.PlacesService(map);
      const distanceService = new google.maps.DistanceMatrixService();
      const origin = new google.maps.LatLng(
        property.location.latitude,
        property.location.longitude
      );

      const distances: DrivingDistanceResult[] = [];

      for (const { type, label } of placeTypes) {
        try {
          const result =
            await new Promise<google.maps.places.PlaceResult | null>(
              (resolve) => {
                service.nearbySearch(
                  {
                    location: origin,
                    radius: 10000,
                    type: type,
                  },
                  (results, status) => {
                    if (
                      status === google.maps.places.PlacesServiceStatus.OK &&
                      results &&
                      results.length > 0
                    ) {
                      resolve(results[0]);
                    } else {
                      resolve(null);
                    }
                  }
                );
              }
            );

          if (result?.geometry?.location) {
            const destination = {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
            };

            const distanceResult = await new Promise<string>((resolve) => {
              distanceService.getDistanceMatrix(
                {
                  origins: [origin],
                  destinations: [
                    new google.maps.LatLng(destination.lat, destination.lng),
                  ],
                  travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                  if (
                    status === google.maps.DistanceMatrixStatus.OK &&
                    response
                  ) {
                    const element = response.rows[0]?.elements[0];
                    if (element?.status === "OK") {
                      resolve(element.duration?.text || "N/A");
                      return;
                    }
                  }
                  resolve("N/A");
                }
              );
            });

            if (distanceResult !== "N/A") {
              distances.push({ label, value: distanceResult });
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      setDrivingDistances(distances);
    };

    fetchDrivingDistances();
  }, [map, property.location.latitude, property.location.longitude]);

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

  const splitDescriptionSmartly = (description: string) => {
    const PAGE1_LIMIT = 1000;
    const PAGE2_LIMIT = 800;

    let page1Text = "";
    let page2Text = "";
    let remainingText = "";

    const paragraphs = description
      .split(/\n\n|<\/p>\s*<p>|<\/div>\s*<div>/)
      .filter((p) => p.trim());

    let currentLength = 0;
    let currentPage = 1;

    for (let i = 0; i < paragraphs.length; i++) {
      const para = paragraphs[i];
      const paraText = para.replace(/<[^>]*>/g, "").trim();
      const paraLength = paraText.length;

      if (currentPage === 1) {
        if (currentLength + paraLength <= PAGE1_LIMIT) {
          page1Text += paraText + "\n\n";
          currentLength += paraLength;
        } else {
          currentPage = 2;
          page2Text += paraText + "\n\n";
          currentLength = paraLength;
        }
      } else if (currentPage === 2) {
        if (currentLength + paraLength <= PAGE2_LIMIT) {
          page2Text += paraText + "\n\n";
          currentLength += paraLength;
        } else {
          currentPage = 3;
          remainingText += paraText + "\n\n";
        }
      } else {
        remainingText += paraText + "\n\n";
      }
    }

    return {
      page1: page1Text.trim(),
      page2: page2Text.trim(),
      remaining: remainingText.trim(),
      hasPage2Content: page2Text.trim().length > 0,
      hasRemainingContent: remainingText.trim().length > 0,
    };
  };

  const generatePDF = async () => {
    if (!validateProperty(property)) {
      return;
    }

    setIsGenerating(true);

    try {
      const images = prepareImages(property.assets.images.gallery);
      const descriptionSplit = splitDescriptionSmartly(property.description);

      const distances =
        drivingDistances.length > 0
          ? drivingDistances
          : property.driving_distances.map((d) => ({
              label: d.label,
              value: `${d.value} min`,
            }));

      const blob = await pdf(
        <PropertyBrochurePDF
          property={property}
          images={images}
          descriptionSplit={descriptionSplit}
          distances={distances}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${property.reference}-brochure.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setIsGenerating(false);
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={generatePDF} disabled={isGenerating} className={className}>
      {isGenerating ? (
        <>
          <svg
            className="animate-spin h-4 w-4 mr-2"
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
          Generating...
        </>
      ) : (
        <>
          <Download className="size-4 mr-2" />
          {buttonText}
        </>
      )}
    </Button>
  );
};
