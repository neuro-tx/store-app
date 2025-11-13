import { productController } from "@/controller/product.controller";
import { errorHandler } from "@/lib/errorHandler";

export const GET = errorHandler(async (req: Request) => {
  return await productController.getProducts(req);
});

export const POST = errorHandler(async (req: Request) => {
  return await productController.createProduct(req);
});
