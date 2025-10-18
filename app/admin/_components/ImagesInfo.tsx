import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";
import Uploader from "./Uploader";

const ImagesInfo = () => {
  const { control } = useFormContext();
  return (
    <section className="border rounded-lg">
      <div className="border-b p-2">
        <h2 className="text-lg font-semibold capitalize text-muted-foreground">
          رفع الصور
        </h2>
      </div>

      <div className="p-4">
        <FormField
          control={control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Uploader multiple dir="products" maxFiles={3} onChange={(files) => field.onChange(files)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
};

export default ImagesInfo;
