import "server-only";
import { cookies } from "next/headers";

export const adminCheck = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth-role")?.value;
  return role === "admin";
};
