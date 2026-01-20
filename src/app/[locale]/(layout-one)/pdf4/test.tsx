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