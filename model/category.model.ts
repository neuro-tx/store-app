import mongoose, { Schema, Model, Document } from "mongoose";
import { nanoid } from "nanoid";
import { IProduct } from "./product.model";

export interface ICategory extends Document {
  name: string;
  description: string;
  slug: string;
  image: string;
}

const CategorySchema = new Schema<ICategory, ICategoryModel, CategoryMethods>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "اسم الفئة مطلوب."],
    },
    description: {
      type: String,
      trim: true,
      minLength: [15, "يجب أن يحتوي الوصف على 15 حرفًا على الأقل."],
    },
    slug: {
      type: String,
      unique: true,
      default: () => nanoid(),
    },
    image: {
      type: String,
      required: [true, "صورة الفئة مطلوبة."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});

CategorySchema.static("findBySlugWithProducts", async function (slug: string) {
  return this.find({ slug }).populate({
    path: "products",
    options: { sort: { createdAt: -1 } },
  });
});

CategorySchema.method("getFeaturedProducts", async function (limit = 6) {
  const Product = mongoose.model<ICategory>("Product");
  return Product.find({
    category: this._id,
    isFeatured: true,
    isAvailable: true,
  })
    .limit(limit)
    .sort({ createdAt: -1 });
});

export interface CategoryMethods {
  getFeaturedProducts(limit?: number): Promise<IProduct[]>;
}

export interface ICategoryModel extends Model<ICategory, CategoryMethods> {
  findBySlugWithProducts(slug: string): Promise<ICategory | null>;
}

export const Category =
  (mongoose.models.Category as ICategoryModel) ||
  mongoose.model<ICategory, ICategoryModel>("Category", CategorySchema);
