import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("SERVER ROUTE: /api/auth/login - Received request body:", body);

  try {
    const apiRes = await api.post("auth/login", body);

    console.log(
      "SERVER ROUTE: /api/auth/login - Backend API response status:",
      apiRes.status
    );
    console.log(
      "SERVER ROUTE: /api/auth/login - Backend API response data:",
      apiRes.data
    );
    console.log(
      "SERVER ROUTE: /api/auth/login - Backend API headers:",
      apiRes.headers
    );

    const cookieStore = await cookies();

    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options: Parameters<typeof cookieStore.set>[2] = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          httpOnly: parsed.HttpOnly === "true" || parsed.httponly === "true",
          secure: parsed.Secure === "true" || parsed.secure === "true",
          sameSite:
            parsed.SameSite === "Lax"
              ? "lax"
              : parsed.SameSite === "Strict"
                ? "strict"
                : undefined,
        };

        if (parsed.accessToken) {
          await cookieStore.set("accessToken", parsed.accessToken, options);
          console.log(
            "SERVER ROUTE: /api/auth/login - Set accessToken cookie."
          );
        }
        if (parsed.refreshToken) {
          await cookieStore.set("refreshToken", parsed.refreshToken, options);
          console.log(
            "SERVER ROUTE: /api/auth/login - Set refreshToken cookie."
          );
        }
      }
      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    console.warn(
      "SERVER ROUTE: /api/auth/login - Backend did not return Set-Cookie headers."
    );
    return NextResponse.json(
      { error: "Authentication failed: No cookies received." },
      { status: 401 }
    );
  } catch (error: unknown) {
    console.error(
      "SERVER ROUTE: /api/auth/login - Error during login request to backend:",
      error
    );

    if (error instanceof AxiosError) {
      console.error("SERVER ROUTE: /api/auth/login - Axios error details:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      return NextResponse.json(
        error.response?.data || {
          message: "Login failed. Invalid credentials.",
        },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error("SERVER ROUTE: /api/auth/login - Non-Axios error:", error);
      return NextResponse.json(
        { message: "Login failed. An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}
