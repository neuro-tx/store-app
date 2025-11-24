import z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "اسم الفئة مطلوب.")
    .min(3, "يجب أن يكون اسم الفئة مكوّنًا من 3 أحرف على الأقل."),

  description: z
    .string()
    .min(1, "وصف الفئة مطلوب.")
    .min(15, "يجب أن يكون الوصف مكوّنًا من 15 حرفًا على الأقل."),

  image: z.string().url("يجب إدخال رابط صورة صالح.").optional(),
});

export type CategoryType = z.infer<typeof categorySchema>;
