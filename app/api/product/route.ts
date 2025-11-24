import { productController } from "@/controller/product.controller";
import { errorHandler } from "@/lib/errorHandler";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const GET = errorHandler(async (req: NextRequest) => {
  return await productController.getProducts(req);
});

export const POST = errorHandler(async (req: NextRequest) => {
  const data = await productController.createProduct(req);
  revalidateTag("product");
  return data;
});
