import { PDFViewer, PropertyBrochureDocument } from "@/components/pdf";
import { getSamplePropertyData } from "@/components/pdf/property/data";

const PropertyBrochurePage = () => {
  const propertyData = getSamplePropertyData();

  return (
    <div className="min-h-screen bg-gray-100">
      <PDFViewer className="min-h-screen w-full">
        <PropertyBrochureDocument
          propertyData={propertyData}
          title="Property Brochure"
        />
      </PDFViewer>
    </div>
  );
};

export default PropertyBrochurePage;
