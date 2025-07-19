import { api } from "@/app/api/api";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function GET() {
  const cookieJar = await cookies();

  const accessToken = cookieJar.get("accessToken")?.value;

  const refreshToken = cookieJar.get("refreshToken")?.value;

  if (accessToken) {
    return NextResponse.json({});
  }

  if (refreshToken) {
    const response = await api.get("auth/session", {
      headers: {
        Cookie: cookieJar.toString(),
      },
    });

    const rawCookies = response.headers["set-cookie"];
    if (rawCookies) {
      const cookiesArray = Array.isArray(rawCookies)
        ? rawCookies
        : [rawCookies];
      let newAccessToken = "";
      let newRefreshToken = "";

      for (const cookieString of cookiesArray) {
        const parsedCookies = parse(cookieString);
        if (parsedCookies.accessToken)
          newAccessToken = parsedCookies.accessToken;
        if (parsedCookies.refreshToken)
          newRefreshToken = parsedCookies.refreshToken;
      }

      if (newAccessToken) cookieJar.set("accessToken", newAccessToken);
      if (newRefreshToken) cookieJar.set("refreshToken", newRefreshToken);

      return NextResponse.json({});
    }
  }

  return NextResponse.json({});
}
