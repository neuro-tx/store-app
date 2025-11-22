"use client";

import {
  TableData,
  AvailabilityBadge,
  FeaturedBadge,
  DiscountBadge,
  PriceCell,
  ImageCell,
  CategoryBadge,
  DateCell,
  type TableColumn,
} from "@/components/TableData";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  discount: number;
  hasDiscount: boolean;
  category: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export default function ProductTable() {
  const BAIS_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const mainUrl = `${BAIS_URL}/api/product`;
  const productUrl = `${BAIS_URL}/api/dashboard/product-table`;

  const columns: TableColumn<Product>[] = [
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
      key: "category",
      header: "الفئة",
      render: (product) => <CategoryBadge name={product?.category?.name} />,
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
      key: "isAvailable",
      header: "التوافر",
      render: (product) => (
        <AvailabilityBadge isAvailable={product.isAvailable} />
      ),
    },
    {
      key: "isFeatured",
      header: "مميز",
      render: (product) => <FeaturedBadge isFeatured={product.isFeatured} />,
    },
    {
      key: "createdAt",
      header: "تاريخ الإضافة",
      render: (product) => <DateCell date={product.createdAt} />,
    },
    {
      key: "updatedAt",
      header: "آخر تحديث",
      render: (product) => {
        if (!product.updatedAt) return <span>—</span>;

        const date = new Date(product.updatedAt);
        const formatted = new Intl.DateTimeFormat("ar-EG", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date);

        return <span className="text-primary font-medium">{formatted}</span>;
      },
    },
  ];

  return (
    <div className="space-y-5 py-3">
      <div>
        <h3 className="text-2xl font-bold">المنتجات</h3>
        <p className="text-muted-foreground">إدارة مخزون المنتجات الخاص بك</p>
      </div>

      <TableData<Product>
        fetchUrl={productUrl}
        columns={columns}
        pageSize={7}
        searchPlaceholder="ابحث عن المنتجات بالاسم ..."
        emptyMessage="لا توجد منتجات حاليا!"
        actions={{
          deleteUrl: mainUrl,
          editUrl: "/admin/product",
        }}
      />
    </div>
  );
}
