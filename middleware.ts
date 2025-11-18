import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminCheck } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  const isAdminRoute = url.startsWith("/admin");

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
    return res;
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
