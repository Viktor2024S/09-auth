import { cookies } from "next/headers";
import instance from "./api";
import { User } from "@/types/user";

export const serverFetchCurrentUser = async (): Promise<User> => {
  const cookieStore = cookies();
  const { data } = await instance.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
