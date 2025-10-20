import { categorySchema } from "@/lib/category-schema";
import { fail } from "@/lib/states";
import { categoryService } from "@/services/category.service";
import { isValidObjectId } from "mongoose";

const getCats = async (request: Request) => {
  return await categoryService.getCategories();
};

const createCat = async (request: Request) => {
  const data = await request.json();

  const validate = categorySchema.safeParse(data);
  if (!validate.success){
    return fail(400, validate.error?.message || "بيانات غير صالحة.");
  }

  const catData = validate.data;
  return await categoryService.createCategory(catData);
};

const getCatById = async (id: string) => {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID format");
  return await categoryService.getCategoryById(id);
};

const updateCat = async (id: string ,request: Request) => {
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
  createCat,
  updateCat,
  deleteCat,
};
