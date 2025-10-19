import "server-only";
import { NextResponse } from "next/server";

export function success<T>(
  data: T,
  status = 200,
  message = "تمت العملية بنجاح"
) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function fail(
  status = 500,
  message = "حدث خطأ ما، يرجى المحاولة مرة أخرى."
) {
  return NextResponse.json({ success: false, message }, { status });
}
