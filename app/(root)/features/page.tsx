import React from "react";
import ProductsGrid from "@/components/ProductsGrid";

export const metadata = {
  title: "المنتجات المميزة | دار الواحة",
  description:
    "اكتشف أفضل المنتجات المختارة بعناية من دار الواحة بجودة عالية ونكهة أصلية.",
  keywords: ["منتجات مميزة", "دار الواحة", "أفضل المنتجات", "طبيعي"],
};

export default async function FeaturesPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  async function getFeaturedProducts() {
    try {
      const res = await fetch(
        `${BASE_URL}/api/product?features=true&discount=true&limit=20`,
        {
          next: { revalidate: 10 },
        }
      );

      if (!res.ok) return [];

      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.error("Fetch featured products error:", err);
      return [];
    }
  }

  const products = await getFeaturedProducts();

  return (
    <div className="bg-neutral-950 text-white pt-[25vw] md:pt-[12vw]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 ">
            منتجاتنا المميزة والفريدة
          </h1>
          <p className="text-muted-foreground">
            اخترنا لك أفضل منتجاتنا بعناية، تشمل الخصومات والعروض الخاصة
          </p>
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 border border-amber-700 rounded-xl">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-lg text-amber-500">
              لا توجد منتجات مميزة متاحة حالياً
            </p>
            <p className="text-sm text-gray-400 mt-2">
              نعمل على إضافة المزيد قريباً. يرجى التحقق لاحقاً.
            </p>
          </div>
        )}

        <ProductsGrid products={products} applyRow />
      </div>
    </div>
  );
}
