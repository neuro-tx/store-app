import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const PricingInfo = () => {
  const { control } = useFormContext();
  return (
    <section className="border rounded-lg">
      <div className="p-3 border-b">
        <h2 className="text-lg font-semibold text-muted-foreground">
          تفاصيل التسعير
        </h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid md:grid-cols-2 gap-3 items-start">
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  سعر المنتج
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="١٠٠ جنيه"
                    type="number"
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  الخصم
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="٥٠ جنيه"
                    type="number"
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingInfo;
