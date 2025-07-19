import { parse } from "cookie";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { api } from "@/app/api/api";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const response = await api.post("auth/register", payload);

  const cookieJar = await cookies();
  const rawSetCookie = response.headers["set-cookie"];

  if (!rawSetCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cookieEntries = Array.isArray(rawSetCookie)
    ? rawSetCookie
    : [rawSetCookie];

  for (const cookieString of cookieEntries) {
    const parsedCookie = parse(cookieString);
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
