import { productSchema } from "@/lib/product-schema";
import { fail } from "@/lib/states";
import { productServices } from "@/services/product.service";
import { isValidObjectId } from "mongoose";
import { NextRequest } from "next/server";

const getProducts = async (request: NextRequest) => {
  return await productServices.getAllProducts(request);
};

const getProductById = async (id: string ,req:NextRequest) => {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID format");
  const {searchParams} = new URL(req.url);
  const getRecommends = searchParams.get("recommends")?.trim() || false;
  return await productServices.getProductById(id ,getRecommends as boolean);
};

const createProduct = async (request: NextRequest) => {
  const data = await request.json();
  const validate = productSchema.safeParse(data);
  if (!validate.success) {
    return fail(400, validate.error?.message || "بيانات غير صالحة.");
  }

  const prodData = validate.data;
  return await productServices.createProduct(prodData);
};

const updateProduct = async (id: string, request: NextRequest) => {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID format");
  const data = await request.json();

  const validate = productSchema.safeParse(data);
  if (!validate.success) throw new Error(validate.error.message);

  const newData = validate.data;
  return await productServices.updateProduct(id ,newData);
};

const deleteProduct = async (id: string) => {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID format");

  return await productServices.deleteProduct(id);
};

const getProdsWithFilter = async(req:NextRequest) => {
  return await productServices.getProductsWithFilter(req);
}

export const productController = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProdsWithFilter
};
