import React from "react";
import ProductForm from "../../_components/ProductForm";
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
            <div>
              <h2 className="font-semibold text-xl font-cairo">
                إدارة منتجات المتجر
              </h2>
            </div>

            <ProductForm defaultValues={defaultVal}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPAdmin;
