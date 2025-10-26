import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminCheck } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  const isAdminRoute = url.startsWith("/admin");

  if (isAdminRoute) {
    const admin = await adminCheck();

    if (!admin) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
