import { errorHandler } from "@/lib/errorHandler";
import { success } from "@/lib/states";
import { Product } from "@/model/product.model";

export const GET = errorHandler(async (req: Request) => {
  const now = new Date();

  const result = await Product.updateMany(
    { hasDiscount: true, endDate: { $lt: now } },
    {
      $set: {
        hasDiscount: false,
        discount: 0,
      },
      $unset: {
        endDate: "",
      },
    }
  );

  return success(
    null,
    201,
    `Products synced successfully, ${result.modifiedCount} updated`
  );
});
