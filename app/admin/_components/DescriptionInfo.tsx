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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";

const DescriptionInfo = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <div className="space-y-8">
      <Card className="border rounded-lg">
        <CardHeader className="border-b">
          <CardTitle className="font-cairo font-semibold text-lg">
            وصف المنتج
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            اكتب وصفًا دقيقًا وجذّابًا يوضّح مميزات المنتج وفوائده وطريقة
            استخدامه.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  تفاصيل المنتج
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="text-sm min-h-32"
                    placeholder="اكتب وصفًا دقيقًا للمنتج..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card className="border rounded-lg">
        <CardHeader className="border-b">
          <CardTitle className="font-cairo font-semibold text-lg">
            مميزات المنتج
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            اكتب وصفًا دقيقًا وجذّابًا يوضّح مميزات المنتج وفوائده وطريقة
            استخدامه. يجب أن يحتوي المنتج على 3 مميزات على الأقل.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {fields.map((field, index) => (
            <div className="flex items-center gap-4" key={field.id}>
              <Controller
                control={control}
                name={`features.${index}`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder={`الميزة ${index + 1}`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.length > 3 && (
                <Button
                  variant="destructive"
                  size="icon-sm"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash size={16} />
                </Button>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            type="button"
            onClick={() => append("")}
            className="mt-2"
          >
            <Plus />
            إضافة ميزة جديدة
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionInfo;
