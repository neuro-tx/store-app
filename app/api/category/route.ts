import { categoryController } from "@/controller/category.controller";
import { errorHandler } from "@/lib/errorHandler";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = errorHandler(
  async (req: NextRequest): Promise<NextResponse> => {
    const data = await categoryController.getCats(req);
    return NextResponse.json(data);
  }
);

export const POST = errorHandler(
  async (req: NextRequest): Promise<NextResponse> => {
    const res = await categoryController.createCat(req);

    revalidateTag("categories");
    revalidateTag("category");

    return NextResponse.json(res);
  }
);
