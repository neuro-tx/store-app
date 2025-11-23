import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminCheck } from "./lib/auth";
import { ratelimit } from "./lib/rate-limit";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const ip = req.headers.get("x-forwarded-for") || "anonymous";

  const isAdminRoute = url.startsWith("/admin");
  const isApiRoute = url.startsWith("/api");

  let res = NextResponse.next();

  if (isAdminRoute) {
    const admin = await adminCheck();
    if (!admin) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }

    res.cookies.set("auth-role", "admin", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  }

  if (isApiRoute) {
    const userRole = req.cookies.get("auth-role")?.value || "user";

    const { success } = await ratelimit({
      ip,
      role: userRole as "admin" | "user",
    });

    if (!success) {
      const errorRes = NextResponse.json(
        {
          message:
            "لقد تجاوزت الحد المسموح به لعدد الطلبات. الرجاء المحاولة لاحقًا.",
        },
        { status: 429 }
      );

      errorRes.cookies.set("rate-limit-status", "exceeded", {
        path: "/",
        httpOnly: false,
        maxAge: 60,
      });

      return errorRes;
    }

    res.cookies.set("rate-limit-status", "ok", {
      path: "/",
      httpOnly: false,
      maxAge: 2,
    });

    return res;
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
