import Link from "next/link";
import React from "react";
import ProductForm from "../_components/ProductForm";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { MoveLeft } from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { ProductType } from "@/lib/product-schema";

const ProductPAdmin = () => {
  const defaultVal : ProductType = {
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
    endDate: null
  };
  return (
    <div className="w-full min-h-svh overflow-x-hidden">
      <div className="container mx-auto">
        <div className="p-4 lg:px-6 py-3">
          <div className="space-y-6 px-2">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-xl font-cairo">
                إدارة منتجات المتجر
              </h2>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin"
                    className="px-2 py-1 bg-primary/20 rounded-xl"
                  >
                    <MoveLeft size={22} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span className="text-sm">رجوع</span>
                </TooltipContent>
              </Tooltip>
            </div>

            <ProductForm defaultValues={defaultVal}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPAdmin;
