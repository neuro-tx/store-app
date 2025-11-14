import { productController } from "@/controller/product.controller";
import { errorHandler } from "@/lib/errorHandler";
import { revalidateTag } from "next/cache";

interface ReqProps {
  params: {
    id: string;
  };
}

export const GET = errorHandler(async (req: Request, { params }: ReqProps) => {
  const { id } = await params;
  return await productController.getProductById(id);
});

export const PUT = errorHandler(async (req: Request, { params }: ReqProps) => {
  const { id } = await params;
  const res = await productController.updateProduct(id, req);
  revalidateTag("product");
  revalidateTag("products");
  return res;
});

export const DELETE = errorHandler(
  async (req: Request, { params }: ReqProps) => {
    const { id } = await params;
    const res = await productController.deleteProduct(id);
    revalidateTag("product");
    revalidateTag("products");
    return res;
  }
);
