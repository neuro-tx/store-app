import "server-only";

import dbConnect from "@/lib/db";
import { fail, success } from "@/lib/states";
import { Product } from "@/model/product.model";
import { extractKey } from "@/lib/utils";
import { deleteFromS3 } from "@/lib/fileOperations";

await dbConnect();

const getAllProducts = async (limit: number = 10, page: number = 1) => {
  if (page < 1) {
    return fail(400, "يجب أن تكون الصفحة أكبر من 0");
  }

  const skip = (page - 1) * limit;

  const products = await Product.find()
    .populate("category", "name slug _id")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();

  if (!products.length) return success([], 404, "لا توجد منتجات حتى الآن.");

  return success(products, 200);
};

const createProduct = async (data: any) => {
  const newProduct = await Product.create(data);
  if (!newProduct) return fail(400, "فشل في إنشاء المنتج");

  await newProduct.populate("category", "name slug _id");

  return success(newProduct, 201, "تم إنشاء المنتج بنجاح");
};

const getProductById = async (id: string) => {
  const getProduct = await Product.findById(id)
    .populate("category", "name slug _id")
    .lean();

  if (!getProduct) return fail(404, "المنتج غير موجود");

  return success(getProduct, 200);
};

const updateProduct = async (id: string, data: any) => {
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
  try {
    const cat = await getProductById(id);
    const res = await cat.json();
    if (!res?.data) {
      return fail(404, "المنتج غير موجود");
    }

    const deletePromises = res.data.images.map((img: string) =>
      deleteFromS3(extractKey(img))
    );

    const deleteResults = await Promise.allSettled(deletePromises);

    const failed = deleteResults.filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      console.warn("⚠️ بعض الصور لم تُحذف من S3");
    }

    const result = await Product.deleteOne({ _id: id });
    if (result.deletedCount === 0)
      return success(null, 404, "المنتج غير موجود");

    return success(null, 201, "تم حذف المنتج بنجاح");
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return fail(500, "حدث خطأ أثناء حذف المنتج");
  }
};

export const productServices = {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
};
