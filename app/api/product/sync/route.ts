import { errorHandler } from "@/lib/errorHandler";
import { productServices } from "@/services/product.service";
import { success } from "@/lib/states";

export const GET = errorHandler(async () => {
  const result = await productServices.syncDiscountProducts();
  return success(result, 200);
});
