import { productController } from "@/controller/product.controller";
import { errorHandler } from "@/lib/errorHandler";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

interface ReqProps {
  params: Promise<{ id: string }>
}

export const GET = errorHandler(async (req: NextRequest, { params }: ReqProps) => {
  const { id } = await params;
  return await productController.getProductById(id ,req);
});

export const PUT = errorHandler(async (req: NextRequest, { params }: ReqProps) => {
  const { id } = await params;
  const res = await productController.updateProduct(id, req);
  revalidateTag("product");
  revalidateTag("products");
  return res;
});

export const DELETE = errorHandler(
  async (_req: NextRequest, { params }: ReqProps) => {
    const { id } = await params;
    const res = await productController.deleteProduct(id);
    revalidateTag("product");
    revalidateTag("products");
    return res;
  }
);
