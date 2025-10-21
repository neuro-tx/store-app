import dbConnect from "@/lib/db";
import { Category } from "@/model/category.model";
import { Product } from "@/model/product.model";

await dbConnect();

export const getDashboardCards = async () => {
  const categoryCount = await Category.countDocuments();
  const productCount = await Product.countDocuments();

  const featuredProducts = await Product.countDocuments({ isFeatured: true });
  const discountedProducts = await Product.countDocuments({
    discount: { $gt: 0 },
  });

  return {
    categoryCount,
    productCount,
    featuredProducts,
    discountedProducts,
  };
};