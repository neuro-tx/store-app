import { productSchema } from "@/lib/product-schema";
import mongoose, { Schema, Model, Document } from "mongoose";
import { ICategory } from "./category.model";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  brand?: string;
  discount: number;
  capacity?: string;
  category: mongoose.Types.ObjectId;
  hasDiscount: boolean;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "اسم المنتج مطلوب."],
    },
    description: {
      type: String,
      required: [true, "وصف المنتج مطلوب."],
      trim: true,
      minlength: [20, "يجب أن يحتوي الوصف على 20 حرفًا على الأقل."],
    },
    price: {
      type: Number,
      required: [true, "سعر المنتج مطلوب."],
      min: [1, "يجب أن يكون السعر أكبر من صفر."],
    },
    images: {
      type: [String],
      validate: {
        validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0,
        message: "يجب إضافة صورة واحدة على الأقل للمنتج.",
      },
    },
    isAvailable: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false, index: true },
    brand: { type: String, trim: true },
    discount: {
      type: Number,
      default: 0,
      min: [0, "لا يمكن أن تكون نسبة الخصم سالبة."],
    },
    capacity: { type: String, trim: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "يجب تحديد الفئة الخاصة بالمنتج."],
    },
    hasDiscount: { type: Boolean, default: false },
    endDate: {
      type: Date,
      validate: {
        validator: function (this: IProduct, value: Date) {
          if (this.discount > 0 && !value) {
            return true;
          }
          return true;
        },
        message: "يجب تحديد تاريخ انتهاء الخصم عند وجود خصم.",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

ProductSchema.index({ name: "text", description: "text" });
ProductSchema.index({ category: 1, isAvailable: 1 });

ProductSchema.pre<IProduct>("save", function (next) {
  this.hasDiscount = this.discount > 0;
  next();
});

ProductSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  if (update.$set?.discount !== undefined) {
    update.$set.hasDiscount = update.$set.discount > 0;
  } else if (update.discount !== undefined) {
    update.hasDiscount = update.discount > 0;
  }

  next();
});

ProductSchema.statics.findByCategory = function (
  categoryId: string,
  options?: { available?: boolean; featured?: boolean }
) {
  const query: any = { category: categoryId };

  if (options?.available !== undefined) {
    query.isAvailable = options.available;
  } else if (options?.featured !== undefined) {
    query.isFeatured = options.featured;
  }

  return this.find({ query }).populate("category");
};

export const Product: Model<IProduct> =
  (mongoose.models.Product as IProductModel) ||
  mongoose.model<IProduct, IProductModel>("Product", ProductSchema);

export interface IProductModel extends Model<IProduct> {
  findByCategory(
    categoryId: string,
    options?: { available?: boolean; featured?: boolean }
  ): Promise<IProduct[]>;
}
