import { Property } from '@/types/property';

interface PDFServiceConfig {
  apiUrl: string;
  apiKey: string;
}

const PDF_SERVICE_CONFIG: PDFServiceConfig = {
  apiUrl: process.env.NEXT_PUBLIC_PDF_SERVICE_URL || 'http://localhost:3001/api/generate',
  apiKey: process.env.NEXT_PUBLIC_PDF_API_KEY || 'eav-secret-key-2025'
};

export async function downloadPropertyBrochure(property: Property): Promise<void> {
  try {
    const response = await fetch(PDF_SERVICE_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PDF_SERVICE_CONFIG.apiKey}`
      },
      body: JSON.stringify({ property })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate PDF');
    }

    // Download the PDF
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${property.reference}-brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('PDF download failed:', error);
    throw error;
  }
}