import dbConnect from "@/lib/db";
import { Category } from "@/model/category.model";
import { Product } from "@/model/product.model";

interface DayData {
  date: string;
  products: number;
  categories: number;
}

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

export const getChartData = async () => {
  const today = new Date();
  const thirtyDay = new Date();

  thirtyDay.setDate(today.getDate() - 30);

  const ProductRes = await Product.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDay },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  const categoryRes = await Category.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDay },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  const productMap = new Map(ProductRes.map((item) => [item._id, item.count]));
  const categoryMap = new Map(
    categoryRes.map((item) => [item._id, item.count])
  );

  const chartData: DayData[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dateString = date.toISOString().split("T")[0];

    chartData.push({
      date: dateString,
      products: productMap.get(dateString) || 0,
      categories: categoryMap.get(dateString) || 0,
    });
  }

  return chartData;
};
