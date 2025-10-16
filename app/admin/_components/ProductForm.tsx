"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader, Plus } from "lucide-react";
import React, { useTransition } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ImagesInfo from "./ImagesInfo";
import { productSchema, ProductType } from "@/lib/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductForm = () => {
  const [submiting, startSubmit] = useTransition();
  const onSubmit = (data: any) => {
    startSubmit(async () => {
      console.log(data);
    });
  };

  const methods = useForm();
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      images: [],
      capacity: "",
      discount: 0,
      price: 0,
      brand: "",
      isAvailable: true,
      isFeatured: false,
    },
  });
  
  return (
    <div>
      <FormProvider {...methods}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ImagesInfo />
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
                  <span>إنشاء منتج</span>
                </div>
              )}
            </Button>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default ProductForm;
