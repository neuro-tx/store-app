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
import { Loader, Plus } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import Uploader from "./Uploader";
import { categorySchema, CategoryType } from "@/lib/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const CategoryForm = ({defaultValues} : {defaultValues : CategoryType}) => {
  const [submiting, startSubmit] = useTransition();
  const onSubmit = (data: any) => {
    startSubmit(async () => {
      console.log(data);
    });
  };

  const methods = useForm();
  const form = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues,
  });
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
                قم برفع صورة تعبّر عن الفئة لعرضها في واجهة المتجر.
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
                أدخل التفاصيل الأساسية الخاصة بالفئة، مثل الاسم والوصف
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

          <Button
            type="submit"
            disabled={submiting}
            className="w-full md:w-fit bg-primary text-white hover:bg-primary/90 cursor-pointer"
          >
            {submiting ? (
              <div className="flex items-center gap-2 text-base">
                <Loader className="animate-spin" />
                <span>جارٍ الإنشاء...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus />
                <span>إنشاء فئة</span>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
