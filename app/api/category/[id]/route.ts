import { categoryController } from "@/controller/category.controller";
import { errorHandler } from "@/lib/errorHandler";
import { revalidateTag } from "next/cache";

interface ReqProps {
  params: {
    id: string;
  };
}

export const GET = errorHandler(async (req: Request, { params }: ReqProps) => {
  const { id } = await params;

  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") || "";

  return categoryController.getProdsByCateId(id, slug);
});

export const PUT = errorHandler(async (req: Request, { params }: ReqProps) => {
  const { id } = await params;
  const res = await categoryController.updateCat(id, req);
  revalidateTag("category");
  revalidateTag("categories");
  return res;
});

export const DELETE = errorHandler(
  async (_req: Request, { params }: ReqProps) => {
    const { id } = await params;
    const data = categoryController.deleteCat(id);
    revalidateTag("category");
    revalidateTag("categories");
    revalidateTag("products");
    return data;
  }
);
