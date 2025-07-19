import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/app/api/api";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Props) {
  const cookieBox = await cookies();
  const { id } = await params;

  try {
    const response = await api(`/notes/${id}`, {
      headers: {
        Cookie: cookieBox.toString(),
      },
    });

    return NextResponse.json(response.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const cookiesList = await cookies();
  const { id } = await params;

  try {
    await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookiesList.toString(),
      },
    });

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete operation error:", err);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: Props) {
  const cookieData = await cookies();
  const { id } = await params;

  try {
    const updatedNote = await req.json();

    const response = await api.patch(`/notes/${id}`, updatedNote, {
      headers: {
        Cookie: cookieData.toString(),
      },
    });

    return response.data
      ? NextResponse.json(response.data)
      : NextResponse.json({ error: "Failed to update note" }, { status: 500 });
  } catch (e) {
    console.log("Patch error:", e);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}
