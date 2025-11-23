import { categoryController } from "@/controller/category.controller";
import { errorHandler } from "@/lib/errorHandler";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface ReqProps {
  params: { id: string };
}

export const GET = errorHandler(
  async (req: NextRequest, { params }: ReqProps): Promise<NextResponse> => {
    const { id } = params;
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug") || "";

    const data = !slug
      ? await categoryController.getCatById(id)
      : await categoryController.getProdsByCateId(id, slug);

    return NextResponse.json(data);
  }
);

export const PUT = errorHandler(
  async (req: NextRequest, { params }: ReqProps): Promise<NextResponse> => {
    const { id } = params;
    const res = await categoryController.updateCat(id, req);
    revalidateTag("category");
    revalidateTag("categories");
    return NextResponse.json(res);
  }
);

export const DELETE = errorHandler(
  async (_req: NextRequest, { params }: ReqProps): Promise<NextResponse> => {
    const { id } = params;
    const data = await categoryController.deleteCat(id);
    revalidateTag("category");
    revalidateTag("categories");
    revalidateTag("products");
    return NextResponse.json(data);
  }
);
