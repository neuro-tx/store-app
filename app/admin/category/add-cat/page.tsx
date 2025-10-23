import React from "react";
import CategoryForm from "../../_components/CategoryForm";
import { CategoryType } from "@/lib/category-schema";

const CategoriesAdmin = () => {
  const defaultVals: CategoryType = {
    name: "",
    description: "",
    image: "",
  };
  return (
    <div className="w-full min-h-svh overflow-x-hidden">
      <div className="container mx-auto">
        <div className="p-4 lg:px-6 py-3">
          <div className="space-y-6 px-2">
            <div>
              <h2 className="font-semibold text-xl font-cairo">
                إدارة تصنيفات المنتجات
              </h2>
            </div>

            <CategoryForm defaultValues={defaultVals} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAdmin;
