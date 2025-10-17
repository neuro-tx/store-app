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
import { categories } from "@/data/admin";
import React from "react";
import { useFormContext } from "react-hook-form";

const BasicInfo = () => {
  const { control } = useFormContext();
  return (
    <section className="border rounded-lg">
      <div className="p-3 border-b">
        <h2 className="text-lg font-semibold text-muted-foreground">
          المعلومات الأساسية
        </h2>
      </div>

      <div className="p-4 space-y-4">
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
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="w-full flex justify-end"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
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
      </div>
    </section>
  );
};

export default BasicInfo;
