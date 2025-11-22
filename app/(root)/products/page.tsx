import React from "react";
import ShowProducts from "@/components/sections/ShowProducts";

export const metadata = {
  title: "جميع المنتجات | دار الواحة",
  description:
    "استعرض جميع منتجات دار الواحة مع خيارات متقدمة للبحث والترتيب. اكتشف منتجات عالية الجودة تناسب احتياجاتك.",
  keywords: [
    "جميع المنتجات",
    "دار الواحة",
    "منتجات طبيعية",
    "تسوق",
    "منتجات عالية الجودة",
  ],
};

const ProductsPage = () => {
  return (
    <main className="py-24 overflow-x-hidden bg-neutral-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-10">
          <section className="text-center">
            <h1 className="text-balance font-cooper text-transparent bg-clip-text bg-radial from-primary via-orange-600 to-orange-200 text-[clamp(1.5rem,5vw,3rem)]">
              جميع المنتجات
            </h1>
            <p className="text-muted-foreground mt-1 text-base">
              استعرض كل المنتجات المتاحة مع خيارات الفرز والبحث المتقدمة.
            </p>
          </section>

          <section>
            <ShowProducts />
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
