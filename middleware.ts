import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("accessToken")?.value;

  if (
    !sessionToken &&
    privateRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (sessionToken && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
