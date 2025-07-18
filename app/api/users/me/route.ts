import { NextResponse } from "next/server";
import { serverFetchCurrentUser } from "@/lib/api/serverApi";

export async function GET() {
  try {
    const user = await serverFetchCurrentUser();
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching current user in API route:", error);
    return NextResponse.json(
      { message: "Failed to fetch user data." },
      { status: 500 }
    );
  }
}
