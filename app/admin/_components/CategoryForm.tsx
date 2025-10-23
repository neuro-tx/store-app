"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Plus, RefreshCcw } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Uploader from "./Uploader";
import { categorySchema, CategoryType } from "@/lib/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormCreate, categoryFormUpdate } from "@/lib/formSubmition";
import { useRouter } from "next/navigation";

type Mood = "create" | "update";

const CategoryForm = ({
  defaultValues,
  mood = "create",
  editId,
}: {
  defaultValues: CategoryType;
  mood?: Mood;
  editId?: string;
}) => {
  const [submiting, startSubmit] = useTransition();
  const [clearUploader, setclearUploader] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const hasChanges =
        JSON.stringify(values) !== JSON.stringify(defaultValues);
      setIsDirty(hasChanges);
    });
    return () => subscription.unsubscribe();
  }, [form, defaultValues]);

  const onSubmit = (data: any) => {
    startSubmit(async () => {
      if (mood === "create") {
        await categoryFormCreate(data);
      } else {
        await categoryFormUpdate(data, editId as string);
        setTimeout(() => router.push("/admin"), 1000);
      }
    });
  };

  const handleReset = () => {
    setclearUploader(true);
    form.reset(defaultValues);
  };

  useEffect(() => {
    if (clearUploader) {
      const timer = setTimeout(() => {
        setclearUploader(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [clearUploader]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="font-cairo font-semibold text-lg">
                صورة الفئة
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {mood === "create"
                  ? " قم برفع صورة تعبّر عن الفئة لعرضها في واجهة المتجر."
                  : "قم بتحديث صورة الفئة الحالية أو رفع صورة جديدة لعرضها في واجهة المتجر."}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Uploader
                        multiple={false}
                        dir="categories"
                        maxFiles={1}
                        clear={clearUploader}
                        defaultValue={
                          mood === "update" ? defaultValues.image : undefined
                        }
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
                المعلومات الأساسية
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {mood === "create"
                  ? "أدخل التفاصيل الأساسية الخاصة بالفئة، الاسم والوصف"
                  : "قم بتعديل التفاصيل الأساسية الخاصة بالفئة، الاسم والوصف."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 mt-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      اسم الفئة
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="مثال: التوابل والأعشاب"
                        className="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      وصف الفئة
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-sm min-h-32"
                        placeholder="اكتب وصفًا موجزًا للفئة يوضح نوع المنتجات التي تضمها..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row gap-3">
            <Button
              type="submit"
              disabled={submiting || (mood === "update" && !isDirty)}
              variant="outline"
              className="w-full md:w-fit lg:w-xs cursor-pointer"
            >
              {submiting ? (
                <div className="flex items-center gap-2 text-base">
                  <Loader className="animate-spin" />
                  {mood === "create" ? (
                    <span>جارٍ الإنشاء...</span>
                  ) : (
                    <span>جارٍ التحديث...</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus />
                  {mood === "create" ? (
                    <span>إنشاء فئة</span>
                  ) : (
                    <span>تحديث الفئة</span>
                  )}
                </div>
              )}
            </Button>

            <Button
              type="button"
              disabled={submiting}
              variant="destructive"
              className="w-full md:w-fit lg:w-xs flex items-center justify-center gap-2 cursor-pointer hover:opacity-90"
              onClick={() => handleReset()}
            >
              <RefreshCcw />
              إعادة ضبط النموذج
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
