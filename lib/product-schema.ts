import z from "zod";

export const productSchema = z
  .object({
    name: z.string().min(3, "يجب أن يحتوي اسم المنتج على 3 أحرف على الأقل."),
    category: z
      .string({ required_error: "يجب اختيار الفئة." })
      .min(1, "يجب اختيار الفئة."),
    description: z
      .string()
      .min(20, "يجب أن يحتوي الوصف على 20 حرفًا على الأقل."),
    images: z
      .array(z.string().url())
      .min(1, "يجب إضافة صورة واحدة على الأقل للمنتج."),
    capacity: z.string().optional(),
    discount: z.coerce.number().min(0).default(0),
    price: z.coerce.number().min(1, "يجب أن يكون السعر أكبر من صفر."),
    brand: z.string().optional(),
    isAvailable: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    endDate: z
      .union([z.string(), z.date()])
      .optional()
      .nullable()
      .transform((val) => (val ? new Date(val) : null)),

    features: z
      .array(z.string().min(1, "الميزة لا يمكن أن تكون فارغة"))
      .min(3, "يجب أن يحتوي المنتج على 3 مميزات على الأقل"),
  })
  .superRefine((data, ctx) => {
    if (data.discount > 0) {
      if (!data.endDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        data.endDate = tomorrow;
      }
    } else {
      data.endDate = null;
    }
  });

export type ProductType = z.infer<typeof productSchema>;
