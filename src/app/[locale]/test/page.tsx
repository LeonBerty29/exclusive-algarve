"use client"
import React, { useState, useRef } from 'react';
import { Download, Printer } from 'lucide-react';

export default function ReceiptGenerator() {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [receiptData,] = useState({
    receiptNumber: 'RCP-2026-001',
    date: new Date().toLocaleDateString(),
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { name: 'Product A', quantity: 2, price: 29.99 },
      { name: 'Product B', quantity: 1, price: 49.99 },
      { name: 'Service Fee', quantity: 1, price: 15.00 }
    ],
    tax: 0.1,
    companyName: 'Your Company Name',
    companyAddress: '123 Business St, City, State 12345',
    companyPhone: '(555) 123-4567'
  });

  const subtotal = receiptData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const taxAmount = subtotal * receiptData.tax;
  const total = subtotal + taxAmount;

  const handlePrint = () => {
    if (!receiptRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print the receipt');
      return;
    }
    
    const receiptHTML = receiptRef.current.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${receiptData.receiptNumber}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 20px;
              background: white;
            }
            .receipt-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
              background: white;
            }
            .header {
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              font-size: 28px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 10px;
            }
            .header p {
              color: #6b7280;
              margin: 4px 0;
            }
            .receipt-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 40px;
            }
            .info-section h2 {
              font-size: 20px;
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 12px;
            }
            .info-section p {
              color: #374151;
              margin: 6px 0;
            }
            .bill-to {
              text-align: right;
            }
            .bill-to h3 {
              font-size: 16px;
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 8px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 40px;
            }
            thead tr {
              border-bottom: 2px solid #333;
            }
            th {
              padding: 12px 0;
              font-weight: 600;
              color: #374151;
            }
            th:first-child { text-align: left; }
            th:nth-child(2) { text-align: center; }
            th:nth-child(3), th:nth-child(4) { text-align: right; }
            tbody tr {
              border-bottom: 1px solid #e5e7eb;
            }
            td {
              padding: 12px 0;
              color: #1f2937;
            }
            td:first-child { text-align: left; }
            td:nth-child(2) { text-align: center; color: #374151; }
            td:nth-child(3) { text-align: right; color: #374151; }
            td:nth-child(4) { text-align: right; font-weight: 500; }
            .totals {
              display: flex;
              justify-content: flex-end;
              margin-bottom: 40px;
            }
            .totals-table {
              width: 300px;
            }
            .totals-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              color: #374151;
            }
            .totals-total {
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-top: 2px solid #333;
              font-size: 20px;
              font-weight: bold;
              color: #1f2937;
              margin-top: 8px;
            }
            .footer {
              border-top: 2px solid #333;
              padding-top: 20px;
              text-align: center;
              color: #6b7280;
            }
            .footer p {
              margin: 8px 0;
            }
            .footer .small {
              font-size: 14px;
            }
            @media print {
              body {
                padding: 0;
              }
              .receipt-container {
                padding: 20px;
              }
              @page {
                margin: 0.5in;
              }
            }
          </style>
        </head>
        <body>
          ${receiptHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Print Buttons */}
      <div className="max-w-4xl mx-auto mb-4">
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Printer size={20} />
            Print Receipt
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Download size={20} />
            Download as PDF
          </button>
        </div>
      </div>

      {/* Receipt - Hidden from view, used for printing */}
      <div ref={receiptRef} style={{ display: 'none' }}>
        <div className="receipt-container">
          {/* Header */}
          <div className="header">
            <h1>{receiptData.companyName}</h1>
            <p>{receiptData.companyAddress}</p>
            <p>{receiptData.companyPhone}</p>
          </div>

          {/* Receipt Info */}
          <div className="receipt-info">
            <div className="info-section">
              <h2>Receipt</h2>
              <p><strong>Receipt #:</strong> {receiptData.receiptNumber}</p>
              <p><strong>Date:</strong> {receiptData.date}</p>
            </div>
            <div className="bill-to">
              <h3>Bill To:</h3>
              <p>{receiptData.customerName}</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>{receiptData.customerEmail}</p>
            </div>
          </div>

          {/* Items Table */}
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="totals">
            <div className="totals-table">
              <div className="totals-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="totals-row">
                <span>Tax ({(receiptData.tax * 100).toFixed(0)}%):</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="totals-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>Thank you for your business!</p>
            <p className="small">
              For questions about this receipt, please contact us at {receiptData.companyPhone}
            </p>
          </div>
        </div>
      </div>

      {/* Preview on Screen */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        <div className="p-8">
          {/* Header */}
          <div className="border-b-2 border-gray-300 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {receiptData.companyName}
            </h1>
            <p className="text-gray-600">{receiptData.companyAddress}</p>
            <p className="text-gray-600">{receiptData.companyPhone}</p>
          </div>

          {/* Receipt Info */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Receipt</h2>
              <p className="text-gray-700">
                <span className="font-medium">Receipt #:</span> {receiptData.receiptNumber}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Date:</span> {receiptData.date}
              </p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-gray-800 mb-2">Bill To:</h3>
              <p className="text-gray-700">{receiptData.customerName}</p>
              <p className="text-gray-600 text-sm">{receiptData.customerEmail}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 text-gray-700 font-semibold">Item</th>
                <th className="text-center py-3 text-gray-700 font-semibold">Qty</th>
                <th className="text-right py-3 text-gray-700 font-semibold">Price</th>
                <th className="text-right py-3 text-gray-700 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 text-gray-800">{item.name}</td>
                  <td className="py-3 text-center text-gray-700">{item.quantity}</td>
                  <td className="py-3 text-right text-gray-700">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3 text-right text-gray-800 font-medium">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 text-gray-700">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-gray-700">
                <span>Tax ({(receiptData.tax * 100).toFixed(0)}%):</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-300 text-xl font-bold text-gray-800">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-300 pt-6 text-center text-gray-600">
            <p className="mb-2">Thank you for your business!</p>
            <p className="text-sm">
              For questions about this receipt, please contact us at {receiptData.companyPhone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}