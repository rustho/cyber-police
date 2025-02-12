import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { languages, fallbackLng } from "./src/i18n/settings";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with a locale
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract language from URL and set it in headers
    const lang = pathname.split("/")[1];
    const response = NextResponse.next();
    response.headers.set("x-lang", lang);
    return response;
  }

  // Redirect if there is no locale
  const locale =
    request.headers.get("accept-language")?.split(",")[0].split("-")[0] ||
    fallbackLng;

  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
