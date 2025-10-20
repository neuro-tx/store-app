import { categoryController } from "@/controller/category.controller";
import { errorHandler } from "@/lib/errorHandler";

export const GET = errorHandler(async (req: Request) => {
  return await categoryController.getCats(req);
});

export const POST = errorHandler(async (req: Request) => {
  return await categoryController.createCat(req);
});
