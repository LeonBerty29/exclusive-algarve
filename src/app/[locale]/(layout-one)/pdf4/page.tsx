// "use client"

// import { useState } from 'react';

// export default function PDFDownloadComponent() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const downloadPDF = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const htmlContent = document.getElementById('content-to-convert')?.outerHTML;
      
//       const response = await fetch('http://localhost:3001/api/generate-pdf', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ html: htmlContent })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate PDF');
//       }
      
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
      
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'document.pdf';
//       link.click();
      
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       setError(err);
//       console.error('PDF generation error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Download Button */}
//         <div className="mb-8 flex justify-end">
//           <button
//             onClick={downloadPDF}
//             disabled={loading}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
//           >
//             {loading ? 'Generating PDF...' : 'Download PDF'}
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
//             <p className="font-medium">Error:</p>
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Content to Convert */}
//         <div 
//           id="content-to-convert" 
//           className="bg-white p-8 rounded-lg shadow-lg"
//         >
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Sample Document
//           </h1>
          
//           <p className="text-gray-700 mb-4">
//             This is the content that will be converted to PDF. You can replace
//             this with any HTML content you want to export.
//           </p>

//           <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//             Section 1: Introduction
//           </h2>
          
//           <p className="text-gray-700 mb-4">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris.
//           </p>

//           <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//             Section 2: Details
//           </h2>
          
//           <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
//             <li>First important point with detailed information</li>
//             <li>Second key consideration to keep in mind</li>
//             <li>Third essential element of the document</li>
//             <li>Fourth critical aspect to remember</li>
//           </ul>

//           <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
//             <p className="text-blue-900 font-medium">
//               Important Note: This content will appear exactly as shown in your PDF,
//               including styles and formatting.
//             </p>
//           </div>

//           <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//             Section 3: Conclusion
//           </h2>
          
//           <p className="text-gray-700">
//             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
//             dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//             proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from 'react';
import { Download } from 'lucide-react';

// Test Property Data
const testProperty = {
  id: 1,
  reference: "EAV-3943",
  title: "Luxury Villa with Ocean Views in Vilamoura",
  description: `This magnificent luxury villa represents the pinnacle of sophisticated living in the prestigious Vilamoura area. Boasting contemporary architecture and premium finishes throughout, this exceptional property offers an unparalleled lifestyle experience. The spacious open-plan living areas seamlessly flow onto expansive terraces, perfect for entertaining while enjoying breathtaking ocean views. The state-of-the-art kitchen features top-of-the-line appliances and elegant design elements. Each bedroom is a private sanctuary, complete with en-suite bathrooms finished to the highest standards. The master suite includes a private terrace and luxurious spa-like bathroom. The outdoor space is equally impressive, featuring a stunning infinity pool, manicured gardens, and multiple seating areas ideal for al fresco dining. Located in one of the Algarve's most sought-after locations, this villa offers proximity to world-class golf courses, marina, beaches, and fine dining establishments. Smart home technology, underfloor heating, air conditioning, and a private garage complete this exceptional offering. This is more than a home; it's a lifestyle statement for those who demand the very best.`,
  price: 2500000,
  currency: "EUR",
  show_price: true,
  agency: {
    id: 1,
    name: "Exclusive Algarve Villas"
  },
  typology: {
    id: 1,
    name: "Villa"
  },
  is_featured_property: true,
  features: {
    bedrooms: 5,
    bathrooms: 5,
    construction_year: "2022",
    private_area: 450,
    plot_size: 1500,
    construction_area: 450,
    energy_class: "A+",
    garage: 2
  },
  additional_features: [],
  seo: {
    slugs: {
      de: "luxus-villa-vilamoura",
      en: "luxury-villa-vilamoura",
      fr: "villa-luxe-vilamoura",
      nl: "luxe-villa-vilamoura",
      pt: "moradia-luxo-vilamoura",
      ru: "villa-vilamoura",
      se: "lyxvilla-vilamoura"
    },
    title: "Luxury Villa Vilamoura | Ocean Views",
    description: "Stunning 5-bedroom luxury villa in Vilamoura with ocean views",
    keywords: ["luxury villa", "vilamoura", "ocean view", "algarve"]
  },
  location: {
    country: "Portugal",
    district: "Faro",
    municipality: "Loulé",
    zone: "Vilamoura",
    zip_code: "8125-000",
    latitude: 37.0829,
    longitude: -8.1166
  },
  assets: {
    pdf_brochure: "",
    images: {
      gallery: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
          title: "Exterior View",
          description: null,
          type: "gallery"
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
          title: "Living Room",
          description: null,
          type: "gallery"
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
          title: "Kitchen",
          description: null,
          type: "gallery"
        },
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
          title: "Master Bedroom",
          description: null,
          type: "gallery"
        },
        {
          id: 5,
          url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
          title: "Bathroom",
          description: null,
          type: "gallery"
        },
        {
          id: 6,
          url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
          title: "Pool Area",
          description: null,
          type: "gallery"
        },
        {
          id: 7,
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
          title: "Terrace",
          description: null,
          type: "gallery"
        },
        {
          id: 8,
          url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
          title: "Dining Room",
          description: null,
          type: "gallery"
        },
        {
          id: 9,
          url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
          title: "Bedroom 2",
          description: null,
          type: "gallery"
        },
        {
          id: 10,
          url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
          title: "Garden",
          description: null,
          type: "gallery"
        }
      ],
      floor_plans: []
    },
    videos: null,
    virtual_tours: []
  },
  sales_consultant: {
    name: "John Silva",
    profile_picture: ""
  },
  driving_distances: [
    { label: "Beach", value: 5 },
    { label: "Restaurant", value: 3 },
    { label: "Airport", value: 25 },
    { label: "Shopping", value: 10 },
    { label: "Hospital", value: 15 },
    { label: "Bus Station", value: 8 }
  ],
  similar_properties: [],
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-27T14:20:00Z",
  banner: {
    color: null,
    name: null
  }
};

export default function PDFDownloadComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadPDF = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Sending property data to PDF service...');
      
      const response = await fetch('http://localhost:3001/api/generate-pdf', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          property: testProperty,
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
      link.download = `${testProperty.reference}-brochure.pdf`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up object URL
      URL.revokeObjectURL(url);
      
      console.log('PDF downloaded!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('PDF generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Property Brochure Generator
          </h1>
          <p className="text-gray-600">
            Generate a professional PDF brochure for your property
          </p>
        </div>

        {/* Download Button */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={downloadPDF}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Brochure</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">Error generating PDF</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Property Preview */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Property Image */}
          <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
            <img 
              src={testProperty.assets.images.gallery[0].url}
              alt={testProperty.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
              {testProperty.reference}
            </div>
          </div>

          {/* Property Details */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {testProperty.title}
            </h2>

            <div className="flex items-center gap-2 text-2xl font-bold text-blue-600 mb-6">
              <span>€ {testProperty.price.toLocaleString('en-US')}</span>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Bedrooms</div>
                <div className="text-2xl font-bold text-gray-900">{testProperty.features.bedrooms}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Bathrooms</div>
                <div className="text-2xl font-bold text-gray-900">{testProperty.features.bathrooms}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Area</div>
                <div className="text-2xl font-bold text-gray-900">{testProperty.features.private_area}m²</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Plot</div>
                <div className="text-2xl font-bold text-gray-900">{testProperty.features.plot_size}m²</div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">
                {testProperty.location.zone}, {testProperty.location.municipality}, {testProperty.location.district}
              </p>
            </div>

            {/* Description Preview */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 line-clamp-4">
                {testProperty.description}
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">How it works</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click &quot;Download Brochure&quot; to generate a PDF</li>
            <li>The property data is sent to the Express.js backend</li>
            <li>Puppeteer generates a professional 4-page PDF brochure</li>
            <li>The PDF is downloaded directly via blob (no Internet Manager interruption)</li>
          </ol>
          <p className="mt-4 text-sm text-blue-700">
            <strong>Note:</strong> Make sure your Express.js server is running on port 3001
          </p>
        </div>
      </div>
    </div>
  );
}