"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader, Plus, RefreshCcw } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ImagesInfo from "./ImagesInfo";
import { productSchema, ProductType } from "@/lib/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicInfo from "./BasicInfo";
import PricingInfo from "./PricingInfo";
import DescriptionInfo from "./DescriptionInfo";
import { toast } from "sonner";

const ProductForm = ({ defaultValues }: { defaultValues: ProductType }) => {
  const [submiting, startSubmit] = useTransition();
  const [clearUploader, setclearUploader] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    startSubmit(async () => {
      try {
        const res = await fetch("/api/product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
          toast.error(result.message || "حدث خطأ أثناء إنشاء المنتج");
          return;
        }
        toast.success(result.message || "تم إنشاء المنتج بنجاح");
      } catch (error) {
        toast.error("حدث خطأ غير متوقع أثناء إنشاء المنتج");
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

  const methods = useForm();
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues,
  });

  return (
    <div>
      <FormProvider {...methods}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ImagesInfo cleaner={clearUploader} />
            <BasicInfo />
            <PricingInfo />
            <DescriptionInfo />

            <div className="grid gap-3 md:grid-cols-2 items-baseline">
              <Button
                type="submit"
                disabled={submiting}
                className="w-full bg-primary text-white hover:bg-primary/90 cursor-pointer"
              >
                {submiting ? (
                  <div className="flex items-center gap-2 text-base">
                    <Loader className="animate-spin" />
                    <span>جارٍ الإنشاء...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus />
                    <span>إنشاء منتج</span>
                  </div>
                )}
              </Button>

              <Button
                type="button"
                disabled={submiting}
                variant="destructive"
                className="w-full flex items-center justify-center gap-2 cursor-pointer hover:opacity-90"
                onClick={() => handleReset()}
              >
                <RefreshCcw />
                إعادة ضبط النموذج
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default ProductForm;
