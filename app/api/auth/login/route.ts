import { NextResponse, NextRequest } from "next/server";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { api } from "@/app/api/api";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const response = await api.post("auth/login", payload);
  const cookieJar = await cookies();
  const rawCookies = response.headers["set-cookie"];

  if (!rawCookies) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cookiesArray = Array.isArray(rawCookies) ? rawCookies : [rawCookies];

  for (const cookieStr of cookiesArray) {
    const parsedCookie = parse(cookieStr);

    const cookieOptions = {
      expires: parsedCookie.Expires
        ? new Date(parsedCookie.Expires)
        : undefined,

      path: parsedCookie.Path,
      maxAge: Number(parsedCookie["Max-Age"]),
    };

    if (parsedCookie.accessToken) {
      cookieJar.set("accessToken", parsedCookie.accessToken, cookieOptions);
    }
    if (parsedCookie.refreshToken) {
      cookieJar.set("refreshToken", parsedCookie.refreshToken, cookieOptions);
    }
  }

  return NextResponse.json(response.data);
}
