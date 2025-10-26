import { adminCheck } from "@/lib/auth";
import { errorHandler } from "@/lib/errorHandler";
import { fail, success } from "@/lib/states";
import { NextResponse } from "next/server";

export const POST = errorHandler(async (req: Request) => {
  const { userKey, password } = await req.json();

  const check =
    process.env.ACCESS_STROE_USERKEY === userKey &&
    process.env.ACCESS_STROE_PASSWORD === password;

  if (!check) {
    return fail(400, "غير مصرح بالوصول.");
  }

  const response = success(
    null,
    200,
    "تم تسجيل الدخول بنجاح، سيتم تحويلك إلى لوحة التحكم..."
  );

  response.cookies.set("auth-role", "admin", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 60 * 60 * 24,
  });

  return response;
});

export const GET = errorHandler(async (req: Request) => {
  const admin = await adminCheck();

  if (admin) {
    return NextResponse.json({ auth: true }, { status: 200 });
  }
  return NextResponse.json({ auth: false }, { status: 403 });
});
