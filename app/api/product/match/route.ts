import { errorHandler } from "@/lib/errorHandler";
import { productServices } from "@/services/product.service";

export const GET = errorHandler(async (req: Request) => {
    return await productServices.getProductsWithFilter(req)
})