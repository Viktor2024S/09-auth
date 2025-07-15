import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { AxiosError } from "axios";

type Props = {
  params: Promise<{ id: string }>;
};

const getAuthCookieHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let cookieHeader = "";
  if (accessToken) {
    cookieHeader += `accessToken=${accessToken}`;
  }
  if (refreshToken) {
    if (cookieHeader) cookieHeader += "; ";
    cookieHeader += `refreshToken=${refreshToken}`;
  }
  return cookieHeader;
};

export async function GET(request: Request, { params }: Props) {
  const authCookieHeader = await getAuthCookieHeader();
  const { id } = await params;

  try {
    const { data } = await api.get(`/notes/${id}`, {
      headers: {
        ...(authCookieHeader && { Cookie: authCookieHeader }),
      },
    });
    if (data) {
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Error fetching note:",
        error.response?.status,
        error.response?.data
      );
      return NextResponse.json(
        { error: error.response?.data?.message || "Failed to fetch note" },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error("An unexpected error occurred while fetching note:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const authCookieHeader = await getAuthCookieHeader();
  const { id } = await params;

  try {
    await api.delete(`/notes/${id}`, {
      headers: {
        ...(authCookieHeader && { Cookie: authCookieHeader }),
      },
    });
    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Error deleting note:",
        error.response?.status,
        error.response?.data
      );
      return NextResponse.json(
        { error: error.response?.data?.message || "Failed to delete note" },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error("An unexpected error occurred while deleting note:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}

export async function PATCH(request: Request, { params }: Props) {
  const authCookieHeader = await getAuthCookieHeader();
  const { id } = await params;
  const body = await request.json();

  try {
    const { data } = await api.patch(`/notes/${id}`, body, {
      headers: {
        ...(authCookieHeader && { Cookie: authCookieHeader }),
      },
    });
    if (data) {
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Error patching note:",
        error.response?.status,
        error.response?.data
      );
      return NextResponse.json(
        { error: error.response?.data?.message || "Failed to update note" },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error("An unexpected error occurred while patching note:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}
