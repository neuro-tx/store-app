"use client";

import {
  DateCell,
  DiscountBadge,
  FeaturedBadge,
  ImageCell,
  PriceCell,
  TableColumn,
  TableData,
} from "@/components/TableData";
import React from "react";

interface ExpiringProduct {
  _id: string;
  name: string;
  discount: number;
  endDate: string;
  duration: string;
  price: number;
  hasDiscount: boolean;
  images: string[];
  isFeatured: boolean;
}

const ExpiringTable = () => {
  const BAIS_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const mainUrl = `${BAIS_URL}/api/dashboard/expired-prods`;

  const columns: TableColumn<ExpiringProduct>[] = [
    {
      key: "images",
      header: "الصورة",
      render: (product) => (
        <ImageCell src={product.images[0]} alt={product.name} />
      ),
    },
    {
      key: "name",
      header: "اسم المنتج",
      render: (product) => (
        <div className="max-w-40 truncate line-clamp-1 flex flex-col">
          <span className="font-medium">{product.name}</span>
          <span className="text-xs text-muted-foreground">{product._id}</span>
        </div>
      ),
    },
    {
      key: "price",
      header: "السعر",
      render: (product) => (
        <PriceCell
          price={product.price}
          hasDiscount={product.hasDiscount}
          discount={product.discount}
        />
      ),
    },
    {
      key: "hasDiscount",
      header: "الخصم",
      render: (product) => (
        <DiscountBadge
          hasDiscount={product.hasDiscount}
          discount={product.discount}
        />
      ),
    },
    {
      key: "isFeatured",
      header: "مميز",
      render: (product) => <FeaturedBadge isFeatured={product.isFeatured} />,
    },
    {
      key: "endDate",
      header: "تاريخ الانتهاء",
      render: (product) => <DateCell date={product.endDate} />,
    },
    {
      key: "duration",
      header: "المدة المتبقية",
      render: (product) => (
        <div>
          <span className="font-medium">{product.duration}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 py-3">
      <div>
        <h3 className="text-2xl font-bold">
          المنتجات التي ستنتهي خلال 24 ساعة القادمة
        </h3>
        <p className="text-muted-foreground">
          إليك جميع المنتجات التي تنتهي خصوماتها خلال 24 ساعة القادمة
          تابعها واتخذ الإجراءات اللازمة قبل انتهاء الخصم.
        </p>
      </div>

      <TableData<ExpiringProduct>
        fetchUrl={mainUrl}
        columns={columns}
        pageSize={5}
        searchPlaceholder="ابحث عن المنتجات بالاسم ..."
        emptyMessage="لا توجد منتجات ستنتهي خلال 24 ساعة القادمة!"
        actions={{
          deleteUrl: `${BAIS_URL}/api/product`,
          editUrl: "/admin/product",
        }}
      />
    </div>
  );
};

export default ExpiringTable;
