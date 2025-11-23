"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productSchema, ProductType } from "@/lib/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Uploader from "./Uploader";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader, Save, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { productFormUpdate } from "@/lib/formSubmition";
import { toast } from "sonner";

const ProductEditForm = ({
  initialValue,
  prodId,
}: {
  initialValue: ProductType;
  prodId: string;
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const router = useRouter();
  const [submitting, startSubmit] = useTransition();

  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema as any),
    defaultValues: initialValue,
  });

  const onSubmit = (data: any) => {
    startSubmit(async () => {
      try {
        await productFormUpdate(data, prodId);
        setTimeout(() => {
          router.push("/admin");
        }, 500);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const onError = (errors: any) => {
    console.error(errors);
    toast.error("يوجد أخطاء في النموذج. يرجى التحقق من جميع الحقول.");
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      setIsDirty(
        form.formState.isDirty ||
          JSON.stringify(value) !== JSON.stringify(initialValue)
      );
    });
    return () => subscription.unsubscribe();
  }, [form, initialValue]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-8"
        >
          <div className="space-y-5">
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="font-cairo font-semibold text-lg">
                  تحديث صور المنتج
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  يمكنك تحديث الصور الحالية أو رفع صور جديدة لعرض المنتج في
                  المتجر.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Uploader
                          multiple={true}
                          dir="products"
                          maxFiles={3}
                          defaultValue={initialValue.images}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b">
                <CardTitle className="font-cairo font-semibold text-lg">
                  المعلومات الأساسية للمنتج
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  قم بتحديث المعلومات الأساسية.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid md:grid-cols-3 gap-4 md:items-start">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          اسم المنتج
                        </FormLabel>
                        <FormControl>
                          <Input className="text-sm" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
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
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
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
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:items-start">
                  <FormField
                    control={form.control}
                    name="isAvailable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base font-semibold">
                            متاح للبيع
                          </FormLabel>
                          <FormDescription className="text-sm text-muted-foreground">
                            فعّل هذا الخيار إذا كان المنتج متوفرًا وجاهزًا
                            للبيع.
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
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base font-semibold">
                            منتج مميز
                          </FormLabel>
                          <FormDescription className="text-sm text-muted-foreground">
                            فعّل هذا الخيار لإظهار المنتج في الصفحة الرئيسية أو
                            قسم المنتجات المميزة.
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
                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          تفاصيل المنتج
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-28"
                            placeholder="اكتب وصفًا دقيقًا للمنتج..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-cairo font-semibold text-lg">
                  تفاصيل التسعير
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  قم يتحديث سعر المنتج، نسبة الخصم، وتاريخ انتهاء الخصم.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 md:items-start">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          سعر المنتج
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-sm"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          الخصم
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-sm"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          تاريخ انتهاء الخصم
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="text-sm"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(e.target.value || null)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <FormDescription className="text-sm text-muted-foreground">
                  المدة الافتراضية للخصم هي يوم واحد في حال لم يتم تحديد تاريخ
                  انتهاء.
                </FormDescription>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="font-cairo font-semibold text-lg">
                  مميزات المنتج
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  قم بتحديث مميزات المنتج أو إضافة المزيد.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {form.watch("features")?.map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`features.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold mb-2">
                          الميزة رقم {index + 1}
                        </FormLabel>

                        <div className="flex items-center gap-3">
                          <FormControl className="flex-1">
                            <Input
                              {...field}
                              placeholder={`الميزة ${index + 1}`}
                              className="text-sm"
                            />
                          </FormControl>

                          {form.watch("features").length > 3 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => {
                                const updated = form
                                  .watch("features")
                                  .filter((_: any, i: number) => i !== index);

                                form.setValue("features", updated, {
                                  shouldDirty: true,
                                });
                              }}
                              className="whitespace-nowrap cursor-pointer"
                            >
                              <Trash className="size-4" />
                            </Button>
                          )}
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.setValue("features", [...form.watch("features"), ""], {
                      shouldDirty: true,
                    });
                  }}
                  className="mt-2"
                >
                  إضافة ميزة جديدة
                </Button>
              </CardContent>
            </Card>
          </div>

          <Button
            type="submit"
            disabled={submitting || !isDirty}
            variant="outline"
            className="w-full md:w-fit lg:w-xs cursor-pointer"
          >
            {submitting ? (
              <div className="flex items-center gap-2 text-base">
                <Loader className="animate-spin" />
                <span>جارٍ التحديث...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save />
                <span>تحديث المنتج</span>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductEditForm;
