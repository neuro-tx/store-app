import dbConnect from "@/lib/db";
import { Product } from "@/model/product.model";

dbConnect();
export async function syncProducts() {
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
}
