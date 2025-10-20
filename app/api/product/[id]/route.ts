import { productController } from "@/controller/product.controller";
import { errorHandler } from "@/lib/errorHandler";

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
  return await productController.updateProduct(id, req);
});

export const DELETE = errorHandler(
  async (req: Request, { params }: ReqProps) => {
    const { id } = await params;
    return await productController.deleteProduct(id);
  }
);
