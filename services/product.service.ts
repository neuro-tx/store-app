import "server-only";

import dbConnect from "@/lib/db";
import { fail, success } from "@/lib/states";
import { Product } from "@/model/product.model";
import { extractKey } from "@/lib/utils";
import { deleteFromS3 } from "@/lib/fileOperations";

await dbConnect();

const getAllProducts = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const discount = searchParams.get("discount") || "false";
  const features = searchParams.get("features")?.trim() || "false";

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));

  const skip = (page - 1) * limit;

  const matcher = {} as any;

  if (discount === "true" && features === "true") {
    matcher.$or = [{ hasDiscount: true }, { isFeatured: true }];
  } else if (discount === "true") {
    matcher.hasDiscount = true;
  } else if (features === "true") {
    matcher.isFeatured = true;
  }

  const products = await Product.find(matcher)
    .populate("category", "name slug _id")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();

  if (!products.length) return success([], 404, "لا توجد منتجات حتى الآن.");

  return success(products, 200);
};

const createProduct = async (data: any) => {
  const newProduct = await Product.create(data);
  if (!newProduct) return fail(400, "فشل في إنشاء المنتج");

  await newProduct.populate("category", "name slug");

  return success(newProduct, 201, "تم إنشاء المنتج بنجاح");
};

const getProductById = async (id: string, getRecs: boolean = false) => {
  const product = await Product.findById(id).lean();

  if (!product) {
    return fail(404, "المنتج غير موجود");
  }

  if (!getRecs) {
    return success(product, 200);
  }

  const catId = product.category?._id;
  const recommended = await Product.find({
    category: catId,
    _id: { $ne: product._id },
  })
    .limit(4)
    .lean();

  return success({ product, recommend: recommended }, 200);
};

const updateProduct = async (id: string, data: any) => {
  const targetProduct = await Product.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).populate("category", "name slug _id");

  if (!targetProduct)
    return success(null, 404, "المنتج غير موجود أو فشل التحديث");

  return success(targetProduct, 200, "تم تحديث المنتج بنجاح");
};

const deleteProduct = async (id: string) => {
  try {
    const cat = await getProductById(id);
    const res = await cat.json();
    if (!res?.data) {
      return fail(404, "المنتج غير موجود");
    }

    const deletePromises = res.data.images.map((img: string) =>
      deleteFromS3(extractKey(img))
    );

    const deleteResults = await Promise.allSettled(deletePromises);

    const failed = deleteResults.filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      console.warn("⚠️ بعض الصور لم تُحذف من S3");
    }

    const result = await Product.deleteOne({ _id: id });
    if (result.deletedCount === 0)
      return success(null, 404, "المنتج غير موجود");

    return success(null, 201, "تم حذف المنتج بنجاح");
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return fail(500, "حدث خطأ أثناء حذف المنتج");
  }
};

const getProductsWithFilter = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const discount = searchParams.get("discount") || "false";
  const features = searchParams.get("features")?.trim() || "false";
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "999999");
  const search = searchParams.get("search")?.trim() || "";
  const category = searchParams.get("category") || "";

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.max(1, parseInt(searchParams.get("limit") || "4"));

  const skip = (page - 1) * limit;

  const sortField = searchParams.get("sort") || "createdAt";
  const sortOrder = searchParams.get("order") === "asc" ? 1 : -1;

  const query = {} as any;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (category) query.category = category;
  query.price = { $gte: minPrice, $lte: maxPrice };
  if (discount === "true") query.hasDiscount = true;
  if (features === "true") query.isFeatured = true;

  try {
    const products = await Product.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    const res = {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
    return success(res, 200);
  } catch (error: any) {
    return fail(400, "حدث خطأ أثناء جلب المنتجات");
  }
};

const syncDiscountProducts = async () => {
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
    state: `${result.modifiedCount} document(s) updated`,
  };
};

export const productServices = {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductsWithFilter,
  syncDiscountProducts,
};
