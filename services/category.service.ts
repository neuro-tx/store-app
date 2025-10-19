import "server-only";

import { CategoryType } from "@/lib/category-schema";
import dbConnect from "@/lib/db";
import { fail, success } from "@/lib/states";
import { Category } from "@/model/category.model";

const getCategories = async () => {
  await dbConnect();

  const categories = await Category.find().lean();
  if (!categories.length) return success([], 404, "لا توجد فئات حتى الآن.");

  return success(categories, 200);
};

const getCategoryById = async (id: string) => {
  await dbConnect();

  const result = await Category.findById(id);
  if (!result) return fail(404, "الفئة غير موجودة");

  return success(result, 200);
};

const createCategory = async (data: CategoryType) => {
  await dbConnect();

  const newCat = await Category.create(data);
  if (!newCat) return fail(400, "فشل في إضافة الفئة الجديدة");

  return success(newCat, 201, "تم إنشاء الفئة بنجاح");
};

const updateCategory = async (id: string, data: CategoryType) => {
  await dbConnect();

  const target = await Category.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!target) return success(null, 404, "الفئة غير موجودة أو فشل التحديث");

  return success(target, 200, "تم تحديث الفئة بنجاح");
};

const deleteCategory = async (id: string) => {
  await dbConnect();

  const result = await Category.deleteOne({ _id: id });
  if (result.deletedCount === 0) return success(null, 200, "الفئة غير موجودة");

  return success(null, 200, "تم حذف الفئة بنجاح");
};

export const categoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
