// / types/bookVisit.ts
export interface BookVisitRequest {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  visit_date: string; // YYYY-MM-DD format
  visit_time: string; // HH:MM format (24h)
  additional_text?: string;
  source_url?: string;
}

export interface BookVisitResponse {
  success: true;
  message: string;
  data: BookVisitRequest;
}

export interface BookVisitError {
  error?: string;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}

// utils/bookVisit.ts
// export async function bookVisit(data: BookVisitRequest): Promise<BookVisitResponse> {
//   const response = await fetch('/v1/forms/book-visit', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Internal-Token': process.env.BOOKING_INTERNAL_TOKEN as string,
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     const errorData: BookVisitError = await response.json();
    
//     // Handle different error types
//     if (response.status === 401) {
//       throw new Error('Unauthorized: Invalid or missing internal token');
//     }
    
//     if (response.status === 422) {
//       // Validation errors
//       const validationErrors = errorData.errors;
//       if (validationErrors) {
//         const errorMessages = Object.entries(validationErrors)
//           .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
//           .join('; ');
//         throw new Error(`Validation errors: ${errorMessages}`);
//       }
//       throw new Error(errorData.message || 'Validation failed');
//     }

//     // Generic error handling
//     throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: Request failed`);
//   }

//   const result: BookVisitResponse = await response.json();
//   return result;
// }

// Alternative version with more detailed error handling
export async function bookVisitWithDetailedErrors(data: BookVisitRequest): Promise<{
  success: boolean;
  data?: BookVisitResponse;
  error?: string;
  validationErrors?: { [key: string]: string[] };
}> {
  const endpoint = "/v1/forms/book-visit";
  try {
    const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Token': process.env.BOOKING_INTERNAL_TOKEN || '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData: BookVisitError = await response.json();
      
      if (response.status === 401) {
        return {
          success: false,
          error: 'Unauthorized: Invalid or missing internal token'
        };
      }
      
      if (response.status === 422 && errorData.errors) {
        return {
          success: false,
          error: errorData.message || 'Validation failed',
          validationErrors: errorData.errors
        };
      }

      return {
        success: false,
        error: errorData.error || errorData.message || `HTTP ${response.status}: Request failed`
      };
    }

    const result: BookVisitResponse = await response.json();
    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred'
    };
  }
}