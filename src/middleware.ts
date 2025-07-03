import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the Basic Auth header
  const basicAuth = request.headers.get('authorization');
  
  if (basicAuth) {
    // Parse the Basic Auth header
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    
    // Check credentials (you should use environment variables)
    const validUser = process.env.BASIC_AUTH_USER || 'admin';
    const validPassword = process.env.BASIC_AUTH_PASSWORD || 'password123';
    
    if (user === validUser && pwd === validPassword) {
      // Authentication successful, continue to the page
      return NextResponse.next();
    }
  }
  
  // Authentication failed or missing, return 401 with Basic Auth challenge
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Apply middleware to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};