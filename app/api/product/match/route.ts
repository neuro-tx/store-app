import { errorHandler } from "@/lib/errorHandler";
import { productServices } from "@/services/product.service";
import { NextRequest } from "next/server";

export const GET = errorHandler(async (req: NextRequest) => {
    return await productServices.getProductsWithFilter(req)
})