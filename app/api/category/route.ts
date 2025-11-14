import { categoryController } from "@/controller/category.controller";
import { errorHandler } from "@/lib/errorHandler";
import { revalidateTag } from "next/cache";

export const GET = errorHandler(async (req: Request) => {
  return await categoryController.getCats(req);
});

export const POST = errorHandler(async (req: Request) => {
  const res = await categoryController.createCat(req);
  revalidateTag("categories");
  revalidateTag("category");
  return res;
});
