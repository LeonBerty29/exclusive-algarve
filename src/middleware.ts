import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { routing } from "./i18n/routing";
import createIntlMiddleware from "next-intl/middleware";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
} from "./routes";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware(routing);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Check if this is an API route (excluding auth API routes)
  const isApiRoute =
    nextUrl.pathname.startsWith("/api/") &&
    !nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Basic Auth Check First
  const basicAuth = req.headers.get("authorization");

  if (!basicAuth) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  // Parse the Basic Auth header
  const authValue = basicAuth.split(" ")[1];
  const [user, pwd] = atob(authValue).split(":");

  // Check credentials
  const validUser = process.env.BASIC_AUTH_USER || "admin";
  const validPassword = process.env.BASIC_AUTH_PASSWORD || "password123";

  if (user !== validUser || pwd !== validPassword) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  // For regular API routes (not auth), skip all other middleware processing
  if (isApiRoute) {
    return NextResponse.next();
  }

  // Skip internationalization for API auth routes
  if (isApiAuthRoute) {
    return;
  }

  // // Check for invalid locale and redirect to default
  // const segments = nextUrl.pathname.split("/");
  // const potentialLocale = segments[1];

  // if (
  //   potentialLocale &&
  //   !routing.locales.includes(potentialLocale as typeof routing.defaultLocale)
  // ) {
  //   // Invalid locale detected, replace with default locale
  //   // Remove the invalid locale and rebuild path with default locale
  //   const pathWithoutInvalidLocale = "/" + segments.slice(2).join("/");
  //   const newPath = `/${routing.defaultLocale}${pathWithoutInvalidLocale}`;
  //   return NextResponse.redirect(new URL(newPath, nextUrl));
  // }

  // Extract locale from pathname for route checking
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) =>
      !nextUrl.pathname.startsWith(`/${locale}/`) &&
      nextUrl.pathname !== `/${locale}`
  );

  // Get the pathname without locale for route checking
  let pathnameWithoutLocale = nextUrl.pathname;
  if (!pathnameIsMissingLocale) {
    const segments = nextUrl.pathname.split("/");
    pathnameWithoutLocale = "/" + segments.slice(2).join("/") || "/";
  }

  const isPublicRoute = !privateRoutes.includes(pathnameWithoutLocale);
  const isAuthRoute = authRoutes.includes(pathnameWithoutLocale);

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Apply internationalization middleware first
      const intlResponse = intlMiddleware(req as NextRequest);
      if (intlResponse) {
        // If intl middleware wants to redirect/rewrite, modify the redirect to go to default redirect
        const url = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl);
        return NextResponse.redirect(url);
      }
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // Apply internationalization middleware for auth routes
    return intlMiddleware(req as NextRequest);
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Apply internationalization middleware first to get the correct locale
    const intlResponse = intlMiddleware(req as NextRequest);

    let locale = routing.defaultLocale;
    if (intlResponse && intlResponse.headers.get("x-middleware-rewrite")) {
      // Extract locale from the rewrite URL
      const rewriteUrl = intlResponse.headers.get("x-middleware-rewrite");
      if (rewriteUrl) {
        const rewritePath = new URL(rewriteUrl).pathname;
        const localeMatch = rewritePath.match(/^\/([^\/]+)/);
        if (
          localeMatch &&
          routing.locales.includes(
            localeMatch[1] as typeof routing.defaultLocale
          )
        ) {
          locale = localeMatch[1] as typeof routing.defaultLocale;
        }
      }
    } else if (!pathnameIsMissingLocale) {
      const segments = nextUrl.pathname.split("/");
      const pathLocale = segments[1];
      if (
        pathLocale &&
        routing.locales.includes(pathLocale as typeof routing.defaultLocale)
      ) {
        locale = pathLocale as typeof routing.defaultLocale;
      }
    }

    const loginUrl = new URL(`/${locale}/login`, nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Apply internationalization middleware for all other routes
  return intlMiddleware(req as NextRequest);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // Added video extensions: mp4, webm, avi, mov, mkv, flv, wmv, m4v
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm|avi|mov|mkv|flv|wmv|m4v)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
