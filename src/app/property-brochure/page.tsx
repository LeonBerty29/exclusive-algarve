
"use client";
import { PDFViewer, PropertyBrochureDocument, getSamplePropertyData } from "@/components/pdf";

const PropertyBrochurePage = () => {
  const propertyData = getSamplePropertyData();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Property Brochure PDF</h1>
        <PDFViewer className="w-full h-[800px] border rounded-lg shadow-lg">
          <PropertyBrochureDocument 
            propertyData={propertyData} 
            title="Property Brochure"
          />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PropertyBrochurePage;