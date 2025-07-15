// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const privateRoutes = ["/profile", "/notes"];
// const authRoutes = ["/sign-in", "/sign-up"];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const sessionToken = request.cookies.get("connect.sid")?.value;

//   if (
//     !sessionToken &&
//     privateRoutes.some((route) => pathname.startsWith(route))
//   ) {
//     const absoluteURL = new URL("/sign-in", request.url);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   if (sessionToken && authRoutes.includes(pathname)) {
//     const absoluteURL = new URL("/profile", request.url);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SESSION_API_ROUTE = `${API_URL}/api/auth/session`;

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
const PRIVATE_ROUTES = [
  "/profile",
  "/profile/edit",
  "/notes",
  "/notes/create",
  "/notes/[id]",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route.replace("/[id]", ""))
  );

  let isAuthenticated = false;

  if (accessToken || refreshToken) {
    try {
      const sessionResponse = await fetch(SESSION_API_ROUTE, {
        method: "GET",
        headers: {
          Cookie: requestHeaders.get("Cookie") || "",
        },
      });

      if (sessionResponse.ok) {
        isAuthenticated = true;
      } else {
        console.warn("Session API check failed:", sessionResponse.status);
        isAuthenticated = false;
      }
    } catch (error) {
      console.error("Error calling session API in middleware:", error);
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated && isPrivateRoute) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && isPublicRoute) {
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.css$|.*\\.js$).*)",
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};