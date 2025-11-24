import { categorySchema } from "@/lib/category-schema";
import { fail } from "@/lib/states";
import { categoryService } from "@/services/category.service";
import { isValidObjectId } from "mongoose";
import { NextRequest } from "next/server";

const getCats = async (request: NextRequest) => {
  return await categoryService.getCategories();
};

const getCatById = async (id: string) => {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID format");
  return await categoryService.getCategoryById(id)
}

const createCat = async (request: NextRequest) => {
  const data = await request.json();

  const validate = categorySchema.safeParse(data);
  if (!validate.success) {
    return fail(400, validate.error?.message || "بيانات غير صالحة.");
  }

  const catData = validate.data;
  return await categoryService.createCategory(catData);
};

const getProdsByCateId = async (id: string, slug: string) => {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID format");
  if (!slug) {
    return fail(400, "معرّف الفئة غير محدد");
  }
  return await categoryService.getProductsById(id, slug);
};

const updateCat = async (id: string, request: NextRequest) => {
  const data = await request.json();
  if (!isValidObjectId(id)) throw new Error("Invalid category ID format");

  const validate = categorySchema.safeParse(data);
  if (!validate.success) throw new Error(validate.error.message);

  const newData = validate.data;
  return await categoryService.updateCategory(id, newData);
};

const deleteCat = async (id: string) => {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID format");

  return await categoryService.deleteCategory(id);
};

export const categoryController = {
  getCats,
  getCatById,
  getProdsByCateId,
  createCat,
  updateCat,
  deleteCat,
};
