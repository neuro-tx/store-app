import "server-only";

import dbConnect from "@/lib/db";
import { fail, success } from "@/lib/states";
import { Product } from "@/model/product.model";

const getAllProducts = async ({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  if (page < 1) {
    return fail(400, "يجب أن تكون الصفحة أكبر من 0");
  }

  const skip = (page - 1) * limit;

  await dbConnect();

  const products = await Product.find()
    .populate("category", "name slug _id")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  if (!products.length) return success([], 404, "لا توجد منتجات حتى الآن.");

  return success(products, 200);
};

const createProduct = async (data: any) => {
  await dbConnect();

  const newProduct = await Product.create(data);
  if (!newProduct) return fail(400, "فشل في إنشاء المنتج");

  await newProduct.populate("category", "name slug _id");

  return success(newProduct, 201, "تم إنشاء المنتج بنجاح");
};

const getProductById = async (id: string) => {
  await dbConnect();

  const getProduct = await Product.findById(id)
    .populate("category", "name slug _id")
    .lean();

  if (!getProduct) return fail(404, "المنتج غير موجود");

  return success(getProduct, 200);
};

const updateProduct = async (id: string, data: any) => {
  await dbConnect();

  const targetProduct = await Product.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).populate("category", "name slug _id");

  if (!targetProduct)
    return success(null, 404, "المنتج غير موجود أو فشل التحديث");

  return success(targetProduct, 200, "تم تحديث المنتج بنجاح");
};

const deleteProduct = async (id: string) => {
  await dbConnect();

  const result = await Product.deleteOne({ _id: id });
  if (result.deletedCount === 0) return success(null ,404, "المنتج غير موجود");

  return success(null, 201, "تم حذف المنتج بنجاح");
};

export const productServices = {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
};
