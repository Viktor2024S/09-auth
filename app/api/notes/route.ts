import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/app/api/api";

export async function GET(req: NextRequest) {
  const cookieJar = await cookies();
  const urlParams = req.nextUrl.searchParams;

  const query = urlParams.get("search") ?? "";
  const pageNum = Number(urlParams.get("page") ?? 1);
  const filter = urlParams.get("tag") ?? "";
  const finalTag = filter === "All" ? "" : filter;

  const queryParams = {
    ...(query && { search: query }),
    page: pageNum,
    perPage: 10,
    ...(finalTag && { tag: finalTag }),
  };

  try {
    const serverResponse = await api.get("/notes", {
      params: queryParams,
      headers: {
        Cookie: cookieJar.toString(),
      },
    });

    return NextResponse.json(serverResponse.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const cookieJar = await cookies();

  try {
    const payload = await req.json();

    const serverResponse = await api.post("/notes", payload, {
      headers: {
        Cookie: cookieJar.toString(),
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(serverResponse.data, { status: 201 });
  } catch (err) {
    console.error("Note creation error:", err);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
