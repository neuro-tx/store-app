"use client";

import {
  TableData,
  BooleanBadge,
  DateCell,
  type TableColumn,
  ImageCell,
} from "@/components/TableData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy, Package, Plus } from "lucide-react";
import { useState } from "react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export default function CategoryTable() {
  const BAIS_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const mainUrl = `${BAIS_URL}/api/category`;
  const categoryUrl = `${BAIS_URL}/api/dashboard/category-table`;

  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const copySlug = async (slug: string) => {
    await navigator.clipboard.writeText(slug);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 1000);
  };

  const columns: TableColumn<Category>[] = [
    {
      key: "image",
      header: "الصورة",
      render: (category) => (
        <ImageCell src={category.image} alt={category.name} />
      ),
    },
    {
      key: "name",
      header: "اسم الفئة",
      render: (category) => (
        <div className="flex flex-col">
          <span className="font-medium text-base">{category.name}</span>
          <span className="text-xs text-muted-foreground">
            {category._id}
          </span>
        </div>
      ),
    },
    {
      key: "slug",
      header: "معرف الفئة",
      render: (category) => (
        <div className="flex items-center gap-2">
          <code className="text-xs bg-muted px-2 py-1 rounded">
            {category.slug}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              copySlug(category.slug);
            }}
          >
            {copiedSlug === category.slug ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      ),
    },
    {
      key: "productCount",
      header: "عدد المنتجات",
      render: (category) => (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Package className="h-3 w-3" />
            <span className="font-semibold">{category.productCount || 0}</span>
          </Badge>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "تاريخ الإنشاء",
      render: (category) => <DateCell date={category.createdAt} />,
    },
    {
      key: "updatedAt",
      header: "آخر تحديث",
      render: (category) => <DateCell date={category.updatedAt} />,
    },
  ];

  return (
    <div className="space-y-5 py-3">
      <div>
        <div>
          <h3 className="text-2xl font-bold">الفئات</h3>
          <p className="text-muted-foreground mt-1">
            إدارة فئات المنتجات في المتجر
          </p>
        </div>
      </div>

      <TableData<Category>
        fetchUrl={categoryUrl}
        columns={columns}
        actions={{
          deleteUrl: mainUrl,
          editUrl: "/admin/category",
        }}
        pageSize={5}
        searchPlaceholder="ابحث عن فئة بالاسم أو بمعرّف الفئة..."
        emptyMessage="لا توجد فئات حاليا!"
      />
    </div>
  );
}
