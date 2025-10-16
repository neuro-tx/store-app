import { List, Package } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-svh">
      <div className="container mx-auto">
        <div className="p-4 lg:px-6 py-3">
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/admin/products"
              className="flex items-center gap-1.5 text-sm px-5 py-2 bg-primary rounded-lg w-full md:w-fit"
            >
              <Package size={20} />
              إضافة منتج جديد
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center gap-1.5 text-sm px-5 py-2 bg-primary rounded-lg w-full md:w-fit"
            >
              <List size={18} />
              إضافة فئة جديد
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
