"use client"

import React from 'react';

export default function DownloadButton() {
  const handleDownload = () => {
    // Hide all content except what we want to print
    const printContent = document.getElementById('print-content');
    // const bodyContent = document.body.innerHTML;
    
    if (!printContent) return;
    
    // Store original content
    const originalContent = document.body.innerHTML;
    
    // Replace body with only print content
    document.body.innerHTML = printContent.innerHTML;
    
    // Add print styles
    const style = document.createElement('style');
    style.innerHTML = `
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
        min-height: 100vh;
      }
      .print-message {
        text-align: center;
        font-size: 24px;
        color: #333;
      }
    `;
    document.head.appendChild(style);
    
    // Trigger print
    window.print();
    
    // Restore original content after print dialog closes
    setTimeout(() => {
      document.body.innerHTML = originalContent;
      // Re-attach event listeners by reloading React
      window.location.reload();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Hidden content for printing */}
      <div id="print-content" style={{ display: 'none' }}>
        <div className="print-message">
          <h1>Thank you for your purchase!</h1>
        </div>
      </div>

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