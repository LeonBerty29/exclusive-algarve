"use client";
import React, { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";

interface GenerateBrochureProps {
  property: Property;
  buttonText?: string;
  className?: string;
}

export const GenerateBrochure: React.FC<GenerateBrochureProps> = ({
  property,
  buttonText = "Download Brochure",
  className = "text-xs rounded-none bg-black text-white px-6",
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      console.log('Sending property data to PDF service...');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_PDF_SERVICE_URL}/api/generate-pdf`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          property: property,
          // token: 'your-secret-token' // Optional: if you add token validation
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate PDF');
      }
      
      console.log('PDF generated successfully, downloading...');
      
      // Create blob from response
      const blob = await response.blob();
      
      // Create object URL from blob
      const url = URL.createObjectURL(blob);
      
      // Create temporary anchor element
      const link = document.createElement('a');
      link.href = url;
      link.download = `${property.reference}-brochure.pdf`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up object URL
      URL.revokeObjectURL(url);
      
      console.log('PDF downloaded!');
      
    } catch (error) {
      console.error('PDF generation error:', error);
      alert(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
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