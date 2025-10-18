import z from "zod";

export const categorySchema = z.object({
  name: z
    .string({ required_error: "اسم الفئة مطلوب." })
    .min(3, { message: "يجب أن يكون اسم الفئة مكوّنًا من 3 أحرف على الأقل." }),

  description: z
    .string({ required_error: "وصف الفئة مطلوب." })
    .min(15, { message: "يجب أن يكون الوصف مكوّنًا من 15 حرفًا على الأقل." }),

  image: z.string().url({ message: "يجب إدخال رابط صورة صالح." }).optional(),
});

export type CategoryType = z.infer<typeof categorySchema>;
