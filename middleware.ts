import { checkServerSession } from "./lib/api/serverApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";

const privatePaths = ["/profile", "/notes"];
const publicPaths = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieJar = await cookies();
  const accessToken = cookieJar.get("accessToken")?.value;
  const refreshToken = cookieJar.get("refreshToken")?.value;

  const onPublicRoute = publicPaths.some((p) => pathname.startsWith(p));
  const onPrivateRoute = privatePaths.some((p) => pathname.startsWith(p));

  if (!accessToken) {
    if (refreshToken) {
      const sessionRes = await checkServerSession();
      const setCookieHeader = sessionRes.headers["set-cookie"];

      if (setCookieHeader) {
        const cookiesList = Array.isArray(setCookieHeader)
          ? setCookieHeader
          : [setCookieHeader];
        for (const cookieStr of cookiesList) {
          const parsedCookie = parse(cookieStr);
          const opts = {
            expires: parsedCookie.Expires
              ? new Date(parsedCookie.Expires)
              : undefined,
            path: parsedCookie.Path,
            maxAge: Number(parsedCookie["Max-Age"]),
          };
          if (parsedCookie.accessToken)
            cookieJar.set("accessToken", parsedCookie.accessToken, opts);
          if (parsedCookie.refreshToken)
            cookieJar.set("refreshToken", parsedCookie.refreshToken, opts);
        }

        if (onPublicRoute) {
          return NextResponse.redirect(new URL("/", req.url), {
            headers: {
              Cookie: cookieJar.toString(),
            },
          });
        }

        if (onPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieJar.toString(),
            },
          });
        }
      }
    }

    if (onPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (onPublicRoute) {
      return NextResponse.next();
    }

    return NextResponse.next();
  }

  if (accessToken) {
    if (pathname === "/sign-up") {
      return NextResponse.next();
    }

    if (onPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
