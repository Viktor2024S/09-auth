import { parse } from "cookie";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { api } from "@/app/api/api";
import { isAxiosError } from "axios";
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const response = await api.post("auth/register", payload);

    const cookieJar = await cookies();
    const rawSetCookie = response.headers["set-cookie"];

    if (!rawSetCookie) {
      return NextResponse.json(
        { message: "Could not set session cookies from API" },
        { status: 500 }
      );
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
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Registration failed" },
        { status: error.response?.status || 500 }
      );
    }

    console.error("Unexpected error during registration:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
