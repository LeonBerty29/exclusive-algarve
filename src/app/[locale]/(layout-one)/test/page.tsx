"use client"

import React from 'react';

export default function DownloadButton() {
  const handleDownload = () => {
    // Create a new window with only the content we want to print
    const printWindow = window.open('', '', 'width=800,height=600');
    
    if (!printWindow) {
      alert('Unable to open print window. Please check your browser settings.');
      return;
    }
    
    // Write the HTML content for the PDF
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Thank You</title>
          <style>
            @page {
              margin: 20mm;
            }
            body {
              margin: 0;
              padding: 40px;
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            }
            .message {
              text-align: center;
              font-size: 24px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="message">
            <h1>Thank you for your purchase!</h1>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Order is Complete
        </h1>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-md">
          <p className="text-gray-700 mb-2">
            Order #12345 has been successfully processed.
          </p>
          <p className="text-gray-600 text-sm">
            You will receive a confirmation email shortly.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Download Receipt (PDF)
        </button>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Other Page Content
          </h2>
          <p className="text-gray-600 mb-4">
            This content and everything else on the page will NOT be included in the PDF download.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Navigation menus</li>
            <li>Sidebar content</li>
            <li>Footer information</li>
            <li>Any other page elements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}