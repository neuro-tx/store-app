import { getDashboardCards } from "@/features/dashborad";
import { errorHandler } from "@/lib/errorHandler";
import { NextResponse } from "next/server";

export const GET = errorHandler(async (req: Request) => {
  const data = await getDashboardCards();
  return NextResponse.json({ ...data }, { status: 200 });
});
