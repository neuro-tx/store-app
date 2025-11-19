"use server";

import dbConnect from "@/lib/db";
import { success } from "@/lib/states";
import { Category } from "@/model/category.model";
import { Product } from "@/model/product.model";
import { NextResponse } from "next/server";

interface DayData {
  date: string;
  products: number;
  categories: number;
}

await dbConnect();

export const getDashboardCards = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();

    const featuredProducts = await Product.countDocuments({ isFeatured: true });
    const discountedProducts = await Product.countDocuments({
      discount: { $gt: 0 },
    });

    const data = {
      categoryCount,
      productCount,
      featuredProducts,
      discountedProducts,
    };
    return success(data, 200);
  } catch (error) {
    console.error(error);
    const res = {
      categoryCount: 0,
      productCount: 0,
      featuredProducts: 0,
      discountedProducts: 0,
    };
    return NextResponse.json(
      {
        success: false,
        data: res,
      },
      { status: 400 }
    );
  }
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

export const getProductTable = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
  const search = searchParams.get("search")?.trim() || "";

  const filter: any = {};

  if (search) {
    filter.$text = { $search: search };
  }

  const skip = (page - 1) * limit;

  const projection = {
    name: 1,
    price: 1,
    images: { $slice: 1 },
    isAvailable: 1,
    isFeatured: 1,
    discount: 1,
    hasDiscount: 1,
    category: 1,
    createdAt: 1,
  };
  const sortOptions: any = search
    ? { score: { $meta: "textScore" } }
    : { createdAt: -1 };

  const [totalItems, items] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter, projection)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate("category", "name")
      .lean()
      .exec(),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  const data = {
    items,
    totalPages,
    totalItems,
    pageSize: items.length,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
  return success(data, 200);
};

export const getCategoryTable = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
  const search = searchParams.get("search")?.trim() || "";

  const matchFilter: any = {};
  if (search) {
    matchFilter.$or = [
      { name: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;
  const pipeline: any[] = [
    ...(search ? [{ $match: matchFilter }] : []),

    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "category",
        as: "products",
      },
    },
    {
      $addFields: {
        productCount: { $size: "$products" },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        slug: 1,
        image: 1,
        productCount: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];

  const [totalItems, categories] = await Promise.all([
    Category.aggregate([
      ...(search ? [{ $match: matchFilter }] : []),
      { $count: "total" },
    ]).then((result) => result[0]?.total || 0),

    Category.aggregate([...pipeline, { $skip: skip }, { $limit: limit }]),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  const data = {
    items: categories,
    totalItems,
    currentPage: page,
    totalPages,
    pageSize: categories.length,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  return success(data, 200);
};

export const getNextDayExpired = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  // Pagination
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
  const search = searchParams.get("search")?.trim() || "";

  const now = new Date();
  const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // Build filter
  const matchFilter: any = {
    hasDiscount: true,
    endDate: { $gte: now, $lte: next24h },
  };

  if (search) {
    matchFilter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }, // optional if you have description
    ];
  }

  const skip = (page - 1) * limit;

  // Get total count and paginated results in parallel
  const [totalItems, products] = await Promise.all([
    Product.countDocuments(matchFilter),
    Product.find(matchFilter)
      .sort({ endDate: 1 })
      .skip(skip)
      .limit(limit)
      .select("_id name images discount price hasDiscount isFeatured endDate"),
  ]);

  // Add duration field
  const productsWithDuration = products.map((product) => {
    const durationMs = product.endDate.getTime() - now.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    return {
      ...product.toObject(),
      duration: `${hours} ساعة و ${minutes} دقيقة`,
    };
  });

  const totalPages = Math.ceil(totalItems / limit);

  const data = {
    items: productsWithDuration,
    totalItems,
    currentPage: page,
    totalPages,
    pageSize: productsWithDuration.length,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  if (productsWithDuration.length === 0)
    return success(data, 200, "لا توجد منتجات ستنتهي خلال 24 ساعة القادمة");

  return success(
    data,
    200,
    "تم جلب المنتجات التي ستنتهي خلال 24 ساعة القادمة بنجاح"
  );
};
