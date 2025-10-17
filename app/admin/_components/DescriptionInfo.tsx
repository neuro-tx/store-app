import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormContext } from "react-hook-form";

const DescriptionInfo = () => {
  const { control } = useFormContext();
  return (
    <section className="border rounded-lg">
      <div className="p-3 border-b">
        <h2 className="text-lg font-semibold text-muted-foreground">
          المعلومات الأساسية
        </h2>
      </div>

      <div className="p-4">
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
      </div>
    </section>
  );
};

export default DescriptionInfo;
