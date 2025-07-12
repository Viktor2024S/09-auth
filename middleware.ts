import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("connect.sid")?.value;

  if (
    !sessionToken &&
    privateRoutes.some((route) => pathname.startsWith(route))
  ) {
    const absoluteURL = new URL("/sign-in", request.url);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (sessionToken && authRoutes.includes(pathname)) {
    const absoluteURL = new URL("/profile", request.url);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  // This matcher ensures the middleware runs on all paths except for static assets and internal Next.js paths.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
