// app\api\notes\route.ts
import { NextRequest, NextResponse } from "next/server";
import { api } from "../api"; // Переконайтеся, що це правильний шлях до вашого інстансу Axios
import { cookies } from "next/headers";
import { AxiosError } from "axios"; // ✅ Додаємо імпорт AxiosError

// Допоміжна функція для формування заголовка Cookie
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

export async function GET(request: NextRequest) {
  const authCookieHeader = await getAuthCookieHeader(); // ✅ Використовуємо нову функцію
  const search = request.nextUrl.searchParams.get("search") ?? "";
  const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
  const rawTag = request.nextUrl.searchParams.get("tag") ?? "";
  const tag = rawTag === "All" ? "" : rawTag;

  try {
    // ✅ Додаємо try-catch блок
    const { data } = await api.get("/notes", {
      // ✅ Змінено 'api' на 'api.get'
      params: {
        ...(search !== "" && { search }),
        page,
        perPage: 12,
        ...(tag && { tag }),
      },
      headers: {
        ...(authCookieHeader && { Cookie: authCookieHeader }), // ✅ Передаємо сформований заголовок
      },
    });
    if (data) {
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  } catch (error: unknown) {
    // ✅ Обробка помилок
    if (error instanceof AxiosError) {
      console.error(
        "Error fetching notes list:",
        error.response?.status,
        error.response?.data
      );
      return NextResponse.json(
        { error: error.response?.data?.message || "Failed to fetch notes" },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error(
        "An unexpected error occurred while fetching notes list:",
        error
      );
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  const authCookieHeader = await getAuthCookieHeader(); // ✅ Використовуємо нову функцію

  try {
    const body = await request.json();

    const { data } = await api.post("/notes", body, {
      headers: {
        ...(authCookieHeader && { Cookie: authCookieHeader }), // ✅ Передаємо сформований заголовок
        "Content-Type": "application/json",
      },
    });

    if (data) {
      return NextResponse.json(data, { status: 201 });
    }
  } catch (error: unknown) {
    // ✅ Обробка помилок
    if (error instanceof AxiosError) {
      console.error(
        "Error creating note:",
        error.response?.status,
        error.response?.data
      );
      return NextResponse.json(
        { error: error.response?.data?.message || "Failed to create note" },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error("An unexpected error occurred while creating note:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
  // Цей return NextResponse.json(...) { status: 500 } стане недосяжним,
  // оскільки всі шляхи мають повертати щось у catch.
  // Можна його видалити, або залишити як запасний варіант, якщо у catch не повертається значення.
  // Але з поточною логікою він вже не потрібен.
  // return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
}
