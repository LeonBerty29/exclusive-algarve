"use client";
import React, { useState } from "react";

const PropertyInventoryGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Property data
  const propertyData = {
    location: "Lisbon",
    price: "10.250.000",
    mainImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=600&fit=crop",
    page2MainImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop",
    page2LeftImage1:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
    page2LeftImage2:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop",
    page3MainImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop",
    page3GridImages: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=500&fit=crop",
    ],
    awardsImage:
      "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=150&h=150&fit=crop",
    title: "Luxury Portuguese Manor Estate",
    features: {
      bedrooms: 7,
      bathrooms: 8,
      area: 1469,
      plotSize: 22940,
      pool: "24x6 mtrs",
      constructionYear: 2020,
      energyEfficiency: "A",
    },
    drivingDistances: {
      town: "5 min",
      beach: "5 min",
      restaurant: "5 min",
      shop: "5 min",
      golf: "5 min",
      airport: "5 min",
    },
    description:
      "This estate is a masterpiece of a traditional Portuguese manor house with 7 suites and 5 living rooms. Built on a property with 2.3hectares of Mediterranean gardens, immersed in a protected landscape of the seafront cliffs overlooking the ocean. It is located betweenthe beaches of Carvoeiro and Ferragudo. The villa has timeless finishes such as natural stones, hardwood floors, traditional beams,handmade terracota tiles and handcrafted mosaic and glazed tiles, while simultaneously adding a modern design and technology integrat-ed into the building, such as high performance windows frames with enhanced thermal insulation, top of the line appliances, domotics andsurveilance system.The garden completes this beautiful estate with an architecturally designed landscape, with fruit trees, calçadadriveway and a 20 metre swimming pool with electric cover. The layout comprises of a grand entrance patio leading to the main entrancehall, luxurious living room, family room, library / office, tea room, dining room, indoor court / garden large kitchen with central island,laundry room, and large outdoor terraces. This floor also has the staff/ guest accommodation with 3 ensuite bedrooms and a separateentrance. The first floor has 4 ensuite bedrooms, and 2 large balcony / terrace to enjoy the full view. The basement has the garage for 10vehicles, gym/spa room or cinema and storage area. This villa is a truly exclusive asset and a unique opportunity!This estate is a masterpiece of a traditional Portuguese manor house with 7 suites and 5 living rooms. Built on a property with 2.3",
    descriptionPage2:
      "hectares of Mediterranean gardens, immersed in a protected landscape of the seafront cliffs overlooking the ocean. It is located between the beaches of Carvoeiro and Ferragudo. The villa has timeless finishes such as natural stones, hardwood floors, traditional beams, handmade terracota tiles and handcrafted mosaic and glazed tiles, while simultaneously adding a modern design and technology integrated into the building, such as high performance windows frames with enhanced thermal insulation, top of the line appliances, domotics and surveilance system. The garden completes this beautiful estate with an architecturally designed landscape, with fruit trees, calçada driveway and a 20 metre swimming pool with electric cover. The layout comprises of a grand entrance patio leading to the main entrance hall, luxurious living room, family room, library / office, tea room, dining room, indoor court / garden large kitchen with central island, laundry room, and large outdoor terraces. This floor also has the staff/ guest accommodation with 3 ensuite bedrooms and a separate entrance. The first floor has 4 ensuite bedrooms, and 2 large balcony / terrace to enjoy the full view. The basement has the garage for 10 vehicles, gym/spa room or cinema and storage area. This villa is a truly exclusive asset and a unique opportunity",
    page4MainImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=600&fit=crop",
    descriptionPage4:
      "indoor court / garden large kitchen with central island, laundry room, and large outdoor terraces. This floor also has the staff/ guest accommodation with 3 ensuite bedrooms and a separate entrance. The first floor has 4 ensuite bedrooms, and 2 large balcony / terrace to enjoy the full view. The basement has the garage for 10 vehicles, gym/spa room or cinema and storage area. This villa is a truly exclusive asset and a unique opportunity! This estate is a masterpiece of a traditional Portuguese manor house with 7 suites and 5 living rooms. Built on a property with 2.3 hectares of Mediterranean gardens, immersed in a protected landscape of the seafront cliffs overlooking the ocean. It is located between the beaches of Carvoeiro and Ferragudo. The villa has timeless finishes such as natural stones, hardwood floors, traditional beams, hand made terracota tiles and handcrafted mosaic and glazed tiles, while simultaneously adding a modern design and technology integrated into the building, such as high performance windows frames with enhanced thermal insulation, top of the line appliances, domotics and surveilance system.The garden completes this beautiful estate with an architecturally designed landscape, with fruit trees, calçada driveway and a 20metre swimming pool with electric cover. The layout comprises of a grand entrance patio leading to the main entrance hall, luxurious living room, family room, library / office, tea room, dining room, indoor court / garden large kitchen with central island, laundry room, and large outdoor terraces. This floor also has the staff/ guest accommodation with 3 ensuite bedrooms and a separate entrance. The first floor has 4ensuite bedrooms, and 2 large balcony / terrace to enjoy the full view. The basement has the garage for 10 vehicles, gym/spa room or cinema and storage area. This villa is a truly exclusive asset and a unique opportunity",
  };

  const generatePDF = () => {
    setIsGenerating(true);

    const printContainer = document.createElement("div");
    printContainer.id = "print-container";
    printContainer.style.cssText =
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; background: white; overflow: auto;";
    document.body.appendChild(printContainer);

    // Create page
    const page = document.createElement("div");
    page.style.cssText =
      "width: 210mm; height: 297mm; margin: 0 auto; position: relative; background: white; padding: 0; page-break-after: always; box-sizing: border-box;";

    // Header
    const header = createHeader();
    page.appendChild(header);

    // Main Image Container (with awards badge)
    const imageContainer = document.createElement("div");
    imageContainer.style.cssText =
      "position: absolute; top: 20mm; left: 0; width: 100%; height: 108.675mm;";

    const mainImage = document.createElement("img");
    mainImage.src = propertyData.mainImage;
    mainImage.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
    imageContainer.appendChild(mainImage);

    // Awards badge on image
    const awardsOnImage = document.createElement("img");
    awardsOnImage.src = propertyData.awardsImage;
    awardsOnImage.style.cssText =
      "position: absolute; bottom: 10px; right: 10px; width: 60px; height: 60px; object-fit: cover; border: 3px solid white;";
    imageContainer.appendChild(awardsOnImage);

    page.appendChild(imageContainer);

    // Title and Awards Section
    const titleSection = document.createElement("div");
    titleSection.style.cssText =
      "position: absolute; top: 126mm; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 15px 25px;";

    const title = document.createElement("h1");
    title.style.cssText =
      "font-size: 25px; font-weight: bold; color: #1a1a1a; margin: 0;";
    title.textContent = propertyData.title;

    const awardsSmall = document.createElement("img");
    awardsSmall.src = propertyData.awardsImage;
    awardsSmall.style.cssText = "width: 50px; height: 50px; object-fit: cover;";

    titleSection.appendChild(title);
    titleSection.appendChild(awardsSmall);
    page.appendChild(titleSection);

    // Features and Driving Distances Section
    const infoSection = document.createElement("div");
    infoSection.style.cssText =
      "position: absolute; top: 144mm; left: 0; width: 100%; display: flex; padding: 15px 25px; gap: 30px;";

    // Main Features (Left)
    const featuresDiv = document.createElement("div");
    featuresDiv.style.cssText = "flex: 1; font-size: 12px;";
    featuresDiv.innerHTML = `
      <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #1a1a1a;">MAIN FEATURES</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; color: #333;">
        <div><strong>Bedrooms:</strong> ${propertyData.features.bedrooms}</div>
        <div><strong>Bathrooms:</strong> ${propertyData.features.bathrooms}</div>
        <div><strong>Area (m²):</strong> ${propertyData.features.area}</div>
        <div><strong>Size of plot (m²):</strong> ${propertyData.features.plotSize}</div>
        <div><strong>Pool:</strong> ${propertyData.features.pool}</div>
        <div><strong>Construction Year:</strong> ${propertyData.features.constructionYear}</div>
        <div><strong>Energy Efficiency:</strong> ${propertyData.features.energyEfficiency}</div>
      </div>
    `;

    // Driving Distances (Right)
    const distancesDiv = document.createElement("div");
    distancesDiv.style.cssText = "flex: 1; font-size: 12px;";
    distancesDiv.innerHTML = `
      <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #1a1a1a;">DRIVING DISTANCES</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; color: #333;">
        <div><strong>Town:</strong> ${propertyData.drivingDistances.town}</div>
        <div><strong>Beach:</strong> ${propertyData.drivingDistances.beach}</div>
        <div><strong>Restaurant:</strong> ${propertyData.drivingDistances.restaurant}</div>
        <div><strong>Shop:</strong> ${propertyData.drivingDistances.shop}</div>
        <div><strong>Golf:</strong> ${propertyData.drivingDistances.golf}</div>
        <div><strong>Airport:</strong> ${propertyData.drivingDistances.airport}</div>
      </div>
    `;

    infoSection.appendChild(featuresDiv);
    infoSection.appendChild(distancesDiv);
    page.appendChild(infoSection);

    // Description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.style.cssText =
      "position: absolute; top: 174mm; left: 0; width: 100%; padding: 15px 25px; font-size: 11px; line-height: 1.5; color: #333; text-align: justify;";
    descriptionDiv.textContent = propertyData.description;
    page.appendChild(descriptionDiv);

    // Important Notice
    const noticeDiv = document.createElement("div");
    noticeDiv.style.cssText =
      "position: absolute; top: 244mm; left: 0; width: 100%; padding: 0 25px; font-size: 8px; line-height: 1.4; color: #666; text-align: justify; font-style: italic;";
    noticeDiv.innerHTML =
      "<strong>Important notice:</strong> These particulars are not an offer or contract, nor part of one. The photographs show only certain parts of the property as they appeared at the time they were taken. Areas, measurements,layout plans and distances are for guidance only and should not be relied upon as a statement of fact. All property details have been provided by the seller and should not be considered factually accurate aboutthe property, its condition or value. Exclusvie Living Mediaçao Imobiliaria Lda. holds no responsibility to the accuracy of the information and will not be held liable for any errors on any representation on theproperty. A buyer must not rely on this information without conducting an inspection or hiring professionals for surveys or legal services to verify all details and documentation prior to a property purchase.";
    page.appendChild(noticeDiv);

    // Footer
    const footer = createFooter();
    page.appendChild(footer);

    printContainer.appendChild(page);

    // Create Page 2
    const page2 = createPage2();
    printContainer.appendChild(page2);

    // Create Page 3
    const page3 = createPage3();
    printContainer.appendChild(page3);

    // Create Page 4
    const page4 = createPage4();
    printContainer.appendChild(page4);

    // Print
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.removeChild(printContainer);
        setIsGenerating(false);
      }, 1000);
    }, 500);
  };

  const createHeader = () => {
    const header = document.createElement("div");
    header.style.cssText =
      "position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 10px 25px; background: #f8f8f8;";

    // Location (left)
    const location = document.createElement("div");
    location.style.cssText =
      "font-size: 15px; font-weight: bold; color: #1a1a1a;";
    location.innerHTML =
      '<span style="font-weight: normal;">Location:</span> ' +
      propertyData.location;

    // Logo (center)
    const logo = document.createElement("img");
    logo.src = "/images/eav-dark-logo.png";
    logo.style.cssText = "height: 60px; object-fit: contain;";

    // Price (right)
    const price = document.createElement("div");
    price.style.cssText = "font-size: 15px; font-weight: bold; color: #D4A017;";
    price.innerHTML =
      '<span style="font-weight: normal; color: #1a1a1a;">Price:</span> € ' +
      propertyData.price;

    header.appendChild(location);
    header.appendChild(logo);
    header.appendChild(price);

    return header;
  };

  const createFooter = () => {
    const footer = document.createElement("div");
    footer.style.cssText =
      "position: absolute; bottom: 0; left: 0; width: 100%; padding: 8px 25px; background: #f8f8f8; border-top: 2px solid #D4A017;";

    // Website and Email
    const topRow = document.createElement("div");
    topRow.style.cssText =
      "display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 11px; color: #1a1a1a;";
    topRow.innerHTML = `
      <span style="font-weight: bold;">exclusivealgarvevillas.com</span>
      <span style="font-weight: bold;">info@eavillas.com</span>
    `;
    footer.appendChild(topRow);

    // Horizontal line
    const line = document.createElement("div");
    line.style.cssText =
      "width: 100%; height: 1px; background: #D4A017; margin: 3px 0;";
    footer.appendChild(line);

    // Office locations
    const offices = document.createElement("div");
    offices.style.cssText =
      "display: flex; justify-content: space-between; font-size: 8px; color: #333; line-height: 1.3;";
    offices.innerHTML = `
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
    `;
    footer.appendChild(offices);

    return footer;
  };

  const createPage2 = () => {
    const page = document.createElement("div");
    page.style.cssText =
      "width: 210mm; height: 297mm; margin: 0 auto; position: relative; background: white; padding: 0; page-break-after: always; box-sizing: border-box;";

    // Header
    const header = createHeader();
    page.appendChild(header);

    // Main Image Container (with awards badge)
    const imageContainer = document.createElement("div");
    imageContainer.style.cssText =
      "position: absolute; top: 20mm; left: 0; width: 100%; height: 108.675mm;";

    const mainImage = document.createElement("img");
    mainImage.src = propertyData.page2MainImage;
    mainImage.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
    imageContainer.appendChild(mainImage);

    // Awards badge on image
    const awardsOnImage = document.createElement("img");
    awardsOnImage.src = propertyData.awardsImage;
    awardsOnImage.style.cssText =
      "position: absolute; bottom: 10px; right: 10px; width: 60px; height: 60px; object-fit: cover; border: 3px solid white;";
    imageContainer.appendChild(awardsOnImage);

    page.appendChild(imageContainer);

    // Content Section (Images and Text)
    const contentSection = document.createElement("div");
    contentSection.style.cssText =
      "position: absolute; top: 132mm; left: 0; width: 100%; height: 122mm; display: flex; gap: 15px; padding: 0;";

    // Left Section - Two Images (flex: 1)
    const leftSection = document.createElement("div");
    leftSection.style.cssText =
      "flex: 1; display: flex; flex-direction: column; gap: 10px; padding-left: 25px;";

    const leftImage1 = document.createElement("img");
    leftImage1.src = propertyData.page2LeftImage1;
    leftImage1.style.cssText =
      "width: 100%; height: calc(50% - 5px); object-fit: cover;";

    const leftImage2 = document.createElement("img");
    leftImage2.src = propertyData.page2LeftImage2;
    leftImage2.style.cssText =
      "width: 100%; height: calc(50% - 5px); object-fit: cover;";

    leftSection.appendChild(leftImage1);
    leftSection.appendChild(leftImage2);

    // Right Section - Awards Badge and Text (flex: 1)
    const rightSection = document.createElement("div");
    rightSection.style.cssText =
      "flex: 1; display: flex; flex-direction: column; gap: 10px; padding-right: 25px;";

    // Awards Badge (rectangular)
    const awardsBadge = document.createElement("img");
    awardsBadge.src = propertyData.awardsImage;
    awardsBadge.style.cssText =
      "width: 60%; height: 80px; object-fit: cover; align-self: center;";

    // Description Text
    const descriptionText = document.createElement("div");
    descriptionText.style.cssText =
      "font-size: 11px; line-height: 1.5; color: #333; text-align: justify; flex: 1; overflow: hidden;";
    descriptionText.textContent = propertyData.descriptionPage2;

    rightSection.appendChild(awardsBadge);
    rightSection.appendChild(descriptionText);

    contentSection.appendChild(leftSection);
    contentSection.appendChild(rightSection);
    page.appendChild(contentSection);

    // Footer
    const footer = createFooter();
    page.appendChild(footer);

    return page;
  };

  const createPage3 = () => {
    const page = document.createElement("div");
    page.style.cssText =
      "width: 210mm; height: 297mm; margin: 0 auto; position: relative; background: white; padding: 0; page-break-after: always; box-sizing: border-box;";

    // Header
    const header = createHeader();
    page.appendChild(header);

    // Main Image Container (no awards badge)
    const imageContainer = document.createElement("div");
    imageContainer.style.cssText =
      "position: absolute; top: 20mm; left: 0; width: 100%; height: 108.675mm;";

    const mainImage = document.createElement("img");
    mainImage.src = propertyData.page3MainImage;
    mainImage.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
    imageContainer.appendChild(mainImage);

    page.appendChild(imageContainer);

    // Content Section
    const contentSection = document.createElement("div");
    contentSection.style.cssText =
      "position: absolute; top: 132mm; left: 0; width: 100%; height: 122mm; display: flex; gap: 15px; padding: 0;";

    const images = propertyData.page3GridImages || [];

    // Handle different number of images
    if (images.length === 4) {
      // Left Section - Two Images
      const leftSection = document.createElement("div");
      leftSection.style.cssText =
        "flex: 1; display: flex; flex-direction: column; gap: 10px; padding-left: 25px;";

      const leftImage1 = document.createElement("img");
      leftImage1.src = images[0];
      leftImage1.style.cssText =
        "width: 100%; height: calc(50% - 5px); object-fit: cover;";

      const leftImage2 = document.createElement("img");
      leftImage2.src = images[1];
      leftImage2.style.cssText =
        "width: 100%; height: calc(50% - 5px); object-fit: cover;";

      leftSection.appendChild(leftImage1);
      leftSection.appendChild(leftImage2);

      // Right Section - Two Images
      const rightSection = document.createElement("div");
      rightSection.style.cssText =
        "flex: 1; display: flex; flex-direction: column; gap: 10px; padding-right: 25px;";

      const rightImage1 = document.createElement("img");
      rightImage1.src = images[2];
      rightImage1.style.cssText =
        "width: 100%; height: calc(50% - 5px); object-fit: cover;";

      const rightImage2 = document.createElement("img");
      rightImage2.src = images[3];
      rightImage2.style.cssText =
        "width: 100%; height: calc(50% - 5px); object-fit: cover;";

      rightSection.appendChild(rightImage1);
      rightSection.appendChild(rightImage2);

      contentSection.appendChild(leftSection);
      contentSection.appendChild(rightSection);
    } else if (images.length === 3) {
      // Left Section - Two Images
      const leftSection = document.createElement("div");
      leftSection.style.cssText =
        "flex: 1; display: flex; flex-direction: column; gap: 10px; padding-left: 25px;";

      const leftImage1 = document.createElement("img");
      leftImage1.src = images[0];
      leftImage1.style.cssText =
        "width: 100%; height: calc(50% - 5px); object-fit: cover;";

      const leftImage2 = document.createElement("img");
      leftImage2.src = images[1];
      leftImage2.style.cssText =
        "width: 100%; height: calc(50% - 5px); object-fit: cover;";

      leftSection.appendChild(leftImage1);
      leftSection.appendChild(leftImage2);

      // Right Section - One Image
      const rightSection = document.createElement("div");
      rightSection.style.cssText =
        "flex: 1; display: flex; flex-direction: column; gap: 10px; padding-right: 25px;";

      const rightImage1 = document.createElement("img");
      rightImage1.src = images[2];
      rightImage1.style.cssText =
        "width: 100%; height: 100%; object-fit: cover;";

      rightSection.appendChild(rightImage1);

      contentSection.appendChild(leftSection);
      contentSection.appendChild(rightSection);
    } else if (images.length === 2) {
      // Left Section - Two Images
      const leftSection = document.createElement("div");
      leftSection.style.cssText =
        "flex: 1; display: flex; flex-direction: column; gap: 10px; padding-left: 25px;";

      const leftImage1 = document.createElement("img");
      leftImage1.src = images[0];
      leftImage1.style.cssText =
        "width: 100%; height: calc(50% - 5px); object-fit: cover;";

      const leftImage2 = document.createElement("img");
      leftImage2.src = images[1];
      leftImage2.style.cssText =
        "width: 100%; height: calc(50% - 5px); object-fit: cover;";

      leftSection.appendChild(leftImage1);
      leftSection.appendChild(leftImage2);

      contentSection.appendChild(leftSection);
    } else if (images.length === 1) {
      // Single Image - Full Width
      const singleSection = document.createElement("div");
      singleSection.style.cssText = "flex: 1; display: flex; padding: 0 25px;";

      const singleImage = document.createElement("img");
      singleImage.src = images[0];
      singleImage.style.cssText =
        "width: 100%; height: 100%; object-fit: cover;";

      singleSection.appendChild(singleImage);
      contentSection.appendChild(singleSection);
    }

    page.appendChild(contentSection);

    // Footer
    const footer = createFooter();
    page.appendChild(footer);

    return page;
  };

  const createPage4 = () => {
    const page = document.createElement("div");
    page.style.cssText =
      "width: 210mm; height: 297mm; margin: 0 auto; position: relative; background: white; padding: 0; page-break-after: always; box-sizing: border-box;";

    // Header
    const header = createHeader();
    page.appendChild(header);

    // Main Image Container (no awards badge)
    const imageContainer = document.createElement("div");
    imageContainer.style.cssText =
      "position: absolute; top: 20mm; left: 0; width: 100%; height: 108.675mm;";

    const mainImage = document.createElement("img");
    mainImage.src = propertyData.page4MainImage;
    mainImage.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
    imageContainer.appendChild(mainImage);

    page.appendChild(imageContainer);

    // Description Text
    const descriptionDiv = document.createElement("div");
    descriptionDiv.style.cssText =
      "position: absolute; top: 132mm; left: 0; width: 100%; padding: 0 25px; font-size: 11px; line-height: 1.5; color: #333; text-align: justify;";
    descriptionDiv.textContent = propertyData.descriptionPage4;
    page.appendChild(descriptionDiv);

    // Company Info Section
    const companyInfoDiv = document.createElement("div");
    companyInfoDiv.style.cssText =
      "position: absolute; top: 220mm; left: 0; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 8px;";

    // First text with 350px width
    const companyText = document.createElement("div");
    companyText.style.cssText =
      "width: 350px; text-align: center; font-size: 11px; line-height: 1.4; color: #333;";
    companyText.textContent =
      "Exclusive Algarve Villas has been a known name in the sale of luxurious and unique Properties in the Western and Central Algarve since 2006.";

    // Second text centered, no max width
    const officesText = document.createElement("div");
    officesText.style.cssText =
      "text-align: center; font-size: 12px; font-weight: bold; color: #1a1a1a;";
    officesText.textContent = "3 offices to serve you 7 days a week";

    companyInfoDiv.appendChild(companyText);
    companyInfoDiv.appendChild(officesText);
    page.appendChild(companyInfoDiv);

    // Footer
    const footer = createFooter();
    page.appendChild(footer);

    return page;
  };

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-container, #print-container * {
            visibility: visible;
          }
          #print-container {
            position: absolute !important;
            left: 0;
            top: 0;
            overflow: visible !important;
            height: auto !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Property Listing PDF Generator
            </h1>
            <p className="text-gray-600 mb-6">
              Generate a professional property listing PDF with location, price,
              features, and driving distances.
            </p>

            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
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
              {isGenerating ? "Generating..." : "Generate PDF"}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Property Details:
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Location:</strong> {propertyData.location}
              </p>
              <p>
                <strong>Price:</strong> € {propertyData.price}
              </p>
              <p>
                <strong>Bedrooms:</strong> {propertyData.features.bedrooms}
              </p>
              <p>
                <strong>Bathrooms:</strong> {propertyData.features.bathrooms}
              </p>
              <p>
                <strong>Area:</strong> {propertyData.features.area} m²
              </p>
              <p>
                <strong>Plot Size:</strong> {propertyData.features.plotSize} m²
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyInventoryGenerator;
