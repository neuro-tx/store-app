import { productController } from "@/controller/product.controller";
import { errorHandler } from "@/lib/errorHandler";
import { revalidateTag } from "next/cache";

export const GET = errorHandler(async (req: Request) => {
  return await productController.getProducts(req);
});

export const POST = errorHandler(async (req: Request) => {
  const data = await productController.createProduct(req);
  revalidateTag("product");
  return data;
});
