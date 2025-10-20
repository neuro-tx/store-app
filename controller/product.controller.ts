import { productSchema } from "@/lib/product-schema";
import { fail } from "@/lib/states";
import { productServices } from "@/services/product.service";
import { isValidObjectId } from "mongoose";

const getProducts = async () => {
  return await productServices.getAllProducts();
};

const getProductById = async (id: string) => {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID format");
  return await productServices.getProductById(id);
};

const createProduct = async (request: Request) => {
  const data = await request.json();
  const validate = productSchema.safeParse(data);
  if (!validate.success) {
    return fail(400, validate.error?.message || "بيانات غير صالحة.");
  }

  const prodData = validate.data;
  return await productServices.createProduct(prodData);
};

const updateProduct = async (id: string, request: Request) => {
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

export const productController = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
