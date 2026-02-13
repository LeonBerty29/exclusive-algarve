import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property, images, language } = body;

    // Validate required fields
    if (!property) {
      return NextResponse.json(
        { error: 'Property data is required' },
        { status: 400 }
      );
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'Images array is required' },
        { status: 400 }
      );
    }

    // Get Basic Auth credentials from environment variables
    const username = process.env.PDF_SERVICE_USERNAME;
    const password = process.env.PDF_SERVICE_PASSWORD;
    
    // Create Basic Auth header
    const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

    // Call PDF service with Basic Auth
    const pdfServiceUrl = process.env.NEXT_PUBLIC_PDF_SERVICE_URL || 'http://localhost:3001';
    const response = await fetch(`${pdfServiceUrl}/api/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        property,
        images,
        language: language || 'en',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('PDF service error:', errorData);
      return NextResponse.json(
        { 
          error: errorData.error || 'Failed to generate PDF',
          code: errorData.code,
        },
        { status: response.status }
      );
    }

    // Get PDF blob from response
    const pdfBlob = await response.blob();

    // Return PDF with appropriate headers
    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${property.reference}-brochure.pdf"`,
      },
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate PDF',
        code: 'API_ERROR'
      },
      { status: 500 }
    );
  }
}