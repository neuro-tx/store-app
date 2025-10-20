import { categoryController } from "@/controller/category.controller";
import { errorHandler } from "@/lib/errorHandler";

interface ReqProps {
  params: {
    id: string;
  };
}

export const GET = errorHandler(async (_req: Request, { params }: ReqProps) => {
  const { id } = await params;
  return categoryController.getCatById(id);
});

export const PUT = errorHandler(async (req: Request, { params }: ReqProps) => {
  const { id } = await params;
  return categoryController.updateCat(id, req);
});

export const DELETE = errorHandler(
  async (_req: Request, { params }: ReqProps) => {
    const { id } = await params;
    return categoryController.deleteCat(id);
  }
);
