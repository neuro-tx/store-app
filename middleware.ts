import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminCheck } from "./lib/auth";
import { ratelimit } from "./lib/rate-limit";
import { fail } from "./lib/states";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const ip = req.headers.get("x-forwarded-for") || "anonymous";

  const isAdminRoute = url.startsWith("/admin");
  const isApiRoute = url.startsWith("/api");

  const res = NextResponse.next();

  if (isAdminRoute) {
    const admin = await adminCheck();

    if (!admin) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    res.cookies.set("auth-role", "admin", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 60 * 60 * 24,
    });
  }

  if (isApiRoute) {
    const userRole = req.cookies.get("auth-role")?.value || "user";

    const { success, limit, remaining, reset } = await ratelimit({
      ip: ip,
      role: userRole as "admin" | "user",
    });

    if (!success) {
      return fail(
        429,
        "لقد تجاوزت الحد المسموح به لعدد الطلبات. الرجاء المحاولة لاحقًا."
      );
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
