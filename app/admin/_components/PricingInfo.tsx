"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const PricingInfo = () => {
  const { control, watch } = useFormContext();
  const discount = watch("discount");
  const isActive = discount > 0;

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
                <FormLabel className="text-base font-semibold">الخصم</FormLabel>
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

        <div>
          <FormField
            control={control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  تاريخ انتهاء الخصم
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    type="date"
                    disabled={!isActive}
                    value={
                      isActive && field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormDescription className="text-sm text-muted-foreground">
                  المدة الافتراضية للخصم هي يوم واحد في حال لم يتم تحديد تاريخ
                  انتهاء.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingInfo;
