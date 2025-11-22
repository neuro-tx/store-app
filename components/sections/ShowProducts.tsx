"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ProductsGrid from "@/components/ProductsGrid";
import { ProductCardProps } from "../ProductCard";
import { Loader, Search } from "lucide-react";
import { Button } from "../ui/button";

interface CategoryProps {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

type ProductFilterOption =
  | "latest"
  | "discount"
  | "features"
  | "priceAsc"
  | "priceDesc"
  | "oldest";

const ShowProducts = () => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCat, setLoadingCat] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState(false);
  const [features, setFeatures] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const hasFiltersApplied = useMemo(
    () =>
      !!search ||
      !!category ||
      discount ||
      features ||
      minPrice > 0 ||
      maxPrice < 999999,
    [search, category, discount, features, minPrice, maxPrice]
  );

  const buildFetchUrl = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (discount) params.append("discount", "true");
    if (features) params.append("features", "true");
    params.append("minPrice", minPrice.toString());
    params.append("maxPrice", maxPrice.toString());
    params.append("sort", sortField);
    params.append("order", sortOrder);
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    return `/api/product/match?${params.toString()}`;
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/${buildFetchUrl()}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setError(true);
          setProducts([]);
          setPagination({ page: 1, limit, total: 0, totalPages: 0 });
          return;
        }

        const data = await res.json();
        if (data.success) {
          setProducts(data.data.products || []);
          setPagination({
            page,
            limit,
            total: data.data.pagination.total,
            totalPages: data.data.pagination.totalPages,
          });
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(true);
        setProducts([]);
        setPagination({ page: 1, limit, total: 0, totalPages: 0 });
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [
    debouncedSearch,
    category,
    discount,
    features,
    minPrice,
    maxPrice,
    sortField,
    sortOrder,
    page,
    limit,
  ]);

  useEffect(() => {
    async function getCats() {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      try {
        const res = await fetch(`${baseUrl}/api/category`);
        if (!res.ok) setCategories([]);
        const data = await res.json();
        setCategories(data?.data || []);
      } catch (err) {
        setCategories([]);
      } finally {
        setLoadingCat(false);
      }
    }
    getCats();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const actions: Record<ProductFilterOption, () => void> = {
    latest: () => {
      setSortField("createdAt");
      setSortOrder("desc");
      setDiscount(false);
      setFeatures(false);
    },
    oldest: () => {
      setSortField("createdAt");
      setSortOrder("asc");
      setDiscount(false);
      setFeatures(false);
    },
    discount: () => {
      setDiscount(true);
      setFeatures(false);
    },
    features: () => {
      setFeatures(true);
      setDiscount(false);
    },
    priceAsc: () => {
      setSortField("price");
      setSortOrder("asc");
      setDiscount(false);
      setFeatures(false);
    },
    priceDesc: () => {
      setSortField("price");
      setSortOrder("desc");
      setDiscount(false);
      setFeatures(false);
    },
  };

  const isEmptyDB = products.length === 0 && !hasFiltersApplied;
  const isEmptyFiltered = products.length === 0 && hasFiltersApplied;
  const emptyState = isEmptyDB || isEmptyFiltered;
  const emptyIcon = isEmptyDB ? "📦" : "⭐";
  const emptyTitle = isEmptyDB
    ? "لا توجد منتجات متاحة حالياً"
    : "لا توجد منتجات مطابقة";
  const emptyDesc = isEmptyDB
    ? "نحن نعمل على إضافة المزيد قريباً."
    : "حاول تعديل معايير البحث أو التصفية.";
  const emptyDescClass = isEmptyDB
    ? "text-fuchsia-500 font-medium"
    : "text-gray-400";

  // Render
  if (loading) {
    return (
      <div className="text-center flex items-center justify-center flex-col py-20">
        <Loader className="animate-spin text-primary size-7 mb-3.5" />
        <p className="text-muted-foreground">جاري تحميل المنتجات…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 border border-red-500 rounded-xl">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-lg text-red-500">حدث خطأ أثناء جلب المنتجات</p>
        <p className="text-sm text-gray-400 mt-2">
          حدث خطأ من الخادم أو أثناء الاتصال، يرجى المحاولة لاحقاً.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="px-3 py-4 flex md:items-center justify-between gap-5 flex-col lg:flex-row">
        <div className="w-full relative lg:max-w-xl xl:max-w-2xl">
          <Search
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="ابحث عن منتج…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 h-11 lg:h-9"
          />
        </div>
        <div className="grid grid-cols-3 gap-3 w-full">
          <Select
            onValueChange={(value) => {
              setPage(1);
              actions[value as ProductFilterOption]?.();
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="الترتيب" />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="latest">الأحدث</SelectItem>
              <SelectItem value="oldest">الأقدم</SelectItem>
              <SelectItem value="discount">الخصومات</SelectItem>
              <SelectItem value="features">المميزة</SelectItem>
              <SelectItem value="priceAsc">السعر: الأقل أولاً</SelectItem>
              <SelectItem value="priceDesc">السعر: الأعلى أولاً</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              setPage(1);
              if (value === "all") {
                setMinPrice(0);
                setMaxPrice(999999);
              } else {
                const [min, max] = value.split("-");
                setMinPrice(Number(min));
                setMaxPrice(Number(max));
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="السعر" />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="0 - 500">الكل</SelectItem>
              <SelectItem value="0-50">0 - 50</SelectItem>
              <SelectItem value="50-100">50 - 100</SelectItem>
              <SelectItem value="100-250">100 - 250</SelectItem>
              <SelectItem value="250-400">250 - 400</SelectItem>
              <SelectItem value="400-999999">أعلى من 400</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => setCategory(value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="الفئة" />
            </SelectTrigger>
            <SelectContent align="start" className="max-h-52">
              <SelectItem value="all">كل الفئات</SelectItem>
              {loadingCat ? (
                <p className="text-center p-1 text-sm">جارِ التحميل ...</p>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))
              ) : (
                <div className="text-center p-1.5 text-sm text-muted-foreground">
                  لا توجد فئات حالياً
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {emptyState ? (
        <div className="text-center py-24 border border-primary rounded-xl">
          <div className="text-6xl mb-4">{emptyIcon}</div>
          <p className={`text-xl font-semibold text-amber-600`}>{emptyTitle}</p>
          <p className={`text-sm mt-2 ${emptyDescClass}`}>{emptyDesc}</p>
        </div>
      ) : (
        <ProductsGrid products={products} applyRow />
      )}

      {products.length > 0 && (
        <div className="flex flex-row justify-between items-center gap-4 mt-6 flex-wrap">
          <div className="text-sm text-muted-foreground">
            عرض{" "}
            <span className="font-medium">
              {Math.min(
                (pagination.page - 1) * pagination.limit + 1,
                pagination.total
              )}
            </span>{" "}
            إلى{" "}
            <span className="font-medium">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{" "}
            من <span className="font-medium">{pagination.total}</span> نتائج
          </div>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              disabled={pagination.page === pagination.totalPages}
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page + 1 })
              }
            >
              التالي
            </Button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (p) => (
                <Button
                  key={p}
                  variant={pagination.page === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPagination({ ...pagination, page: p })}
                >
                  {p}
                </Button>
              )
            )}
            <Button
              variant="outline"
              disabled={pagination.page === 1}
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page - 1 })
              }
            >
              السابق
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProducts;
