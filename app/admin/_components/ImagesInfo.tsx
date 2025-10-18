import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";
import Uploader from "./Uploader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ImagesInfo = () => {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="font-cairo font-semibold text-lg">
          رفع الصور
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          قم برفع صور عالية الجودة لعرض المنتج بشكل مميز في واجهة المتجر.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormField
          control={control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Uploader
                  multiple
                  dir="products"
                  maxFiles={3}
                  onChange={(files) => field.onChange(files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ImagesInfo;
