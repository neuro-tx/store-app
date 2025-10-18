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
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormContext } from "react-hook-form";

const DescriptionInfo = () => {
  const { control } = useFormContext();
  return (
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
  );
};

export default DescriptionInfo;
