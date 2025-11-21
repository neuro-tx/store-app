import dbConnect from "@/lib/db";
import { errorHandler } from "@/lib/errorHandler";
import { Product } from "@/model/product.model";

export const syncProducts = errorHandler(async () => {
  dbConnect();
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

  return {
    success: true,
    state: `${result.modifiedCount} Document are updated...`,
  };
});
