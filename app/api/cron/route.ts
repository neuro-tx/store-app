import { NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { productServices } from "@/services/product.service";

export const POST = verifySignatureAppRouter(async () => {
  try {
    const result = await productServices.syncDiscountProducts();
    console.log(result.state)
    return NextResponse.json({
      ...result,
    });
  } catch (error) {
    console.error("Sync failed:", error);
    return NextResponse.json(
      { message: "Sync failed", error: (error as Error).message },
      { status: 500 }
    );
  }
});
