import "server-only";

import { CategoryType } from "@/lib/category-schema";
import dbConnect from "@/lib/db";
import { fail, success } from "@/lib/states";
import { Category } from "@/model/category.model";
import { extractKey } from "@/lib/utils";
import { deleteFromS3 } from "@/lib/fileOperations";
import { Product } from "@/model/product.model";

await dbConnect();

const getCategories = async () => {
  const categories = await Category.find().sort({ createdAt: -1 }).lean();
  if (!categories) return success([], 404, "لا توجد فئات حتى الآن.");
  return success(categories, 200);
};

const getCategoryById = async (id: string) => {
  const result = await Category.findById(id).lean();
  if (!result) return fail(404, "الفئة غير موجودة");

  return success(result, 200);
};

const createCategory = async (data: CategoryType) => {
  const newCat = await Category.create(data);
  if (!newCat) return fail(400, "فشل في إضافة الفئة الجديدة");

  return success(newCat, 201, "تم إنشاء الفئة بنجاح");
};

const updateCategory = async (id: string, data: CategoryType) => {
  const target = await Category.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true, lean: true }
  );

  if (!target) return fail(404, "الفئة غير موجودة أو فشل التحديث");

  return success(target, 200, "تم تحديث الفئة بنجاح");
};

const deleteCategory = async (id: string) => {
  try {
    const cat = await getCategoryById(id);
    const res = await cat.json();
    if (!res?.data) {
      return fail(404, "الفئة غير موجودة");
    }

    const delProducts = await deleteProductsByCatId(id);

    if (!delProducts) {
      return fail(500, "فشل حذف منتجات الفئة");
    }

    const key = extractKey(res.data.image);
    if (!key) {
      return fail(400, "لم يتم العثور على مفتاح الصورة");
    }

    const delRes = await deleteFromS3(key);
    if (!delRes?.success) {
      return fail(400, "فشل حذف الصورة من التخزين السحابي");
    }

    const result = await Category.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return fail(404, "الفئة غير موجودة");
    }

    return success(null, 200, "تم حذف الفئة بنجاح");
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return fail(500, "حدث خطأ أثناء حذف الفئة");
  }
};

const deleteProductsByCatId = async (catId: string): Promise<boolean> => {
  try {
    const products = await Product.find({ category: catId });
    for (const prod of products) {
      for (const img of prod.images) {
        try {
          await deleteFromS3(extractKey(img));
        } catch (err) {
          console.error("❌ Error deleting image from S3:", img, err);
        }
      }
    }

    await Product.deleteMany({ category: catId });
    return true;
  } catch (error) {
    console.error("❌ Error deleting products:", error);
    return false;
  }
};

const getProductsById = async (id: string, slug: string) => {
  try {
    const data = await Category.findBySlugWithProducts(slug);
    if (!data) {
      return success(null, 404, "الفئة غير موجودة أو لا تحتوي على منتجات");
    }
    return success(data, 200);
  } catch (err) {
    console.error("getProductsById error:", err);
    return fail(500, "حدث خطأ أثناء جلب المنتجات");
  }
};

export const categoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsById,
};
