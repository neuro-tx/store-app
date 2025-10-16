import z from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "يجب أن يحتوي اسم المنتج على 3 أحرف على الأقل."),
  category: z.string({ message: "يجب اختيار الفئة." }),
  description: z.string().min(20, "يجب أن يحتوي الوصف على 20 حرفًا على الأقل."),
  images: z
    .array(z.string().url())
    .min(1, "يجب إضافة صورة واحدة على الأقل للمنتج."),
  capacity: z.string().optional(),
  discount: z.coerce.number().min(0).default(0),
  price: z.coerce.number().min(1, "يجب أن يكون السعر أكبر من صفر."),
  brand: z.string().optional(),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export type ProductType = z.infer<typeof productSchema>;
