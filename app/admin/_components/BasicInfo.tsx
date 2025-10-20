import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const BasicInfo = () => {
  const { control } = useFormContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoader(true);
        const res = await fetch("/api/category", { cache: "no-store" });
        const data = await res.json();
        setCategories(data.data);
      } catch (err) {
        toast.error("حدث خطأ أثناء تحميل الفئات");
        console.error("Error fetching categories:", err);
      } finally {
        setLoader(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="font-cairo font-semibold text-lg">
          المعلومات الأساسية
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          أضف أو عدّل التفاصيل الأساسية الخاصة بالمنتج مثل الاسم، الفئة، والسعة
          أو العلامة التجارية.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 w-full items-start">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  اسم المنتج
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="مثال: زيت زيتون فاخر"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">الفئة</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          loading ? "جارِ تحميل الفئات..." : "اختر الفئة"
                        }
                      />
                    </SelectTrigger>
                    {loading ? (
                      <SelectContent className="max-h-72">
                        <p className="text-center p-1 text-sm">جاري التحميل...</p>
                      </SelectContent>
                    ) : (
                      <SelectContent className="max-h-72">
                        {categories.map((cat: any) => (
                          <SelectItem
                            key={cat.slug}
                            value={cat._id}
                            className="w-full flex justify-end"
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2 w-full items-start">
          <FormField
            control={control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  السعة / الحجم
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="زجاجة 500 مل"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  اسم العلامة التجارية
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="واحة سيوة"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 w-full items-start">
            <FormField
              control={control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-semibold">
                      متاح للبيع
                    </FormLabel>
                    <FormDescription className="text-sm text-muted-foreground">
                      فعّل هذا الخيار إذا كان المنتج متوفرًا وجاهزًا للبيع.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      dir="ltr"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-semibold">
                      منتج مميز
                    </FormLabel>
                    <FormDescription className="text-sm text-muted-foreground">
                      فعّل هذا الخيار لإظهار المنتج في الصفحة الرئيسية أو قسم
                      المنتجات المميزة.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      dir="ltr"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
