import type { Metadata } from "next";
import CategoryList from "@/components/sections/CategoryList";

export const metadata: Metadata = {
  title: "تصفح فئات المنتجات الطبيعية | دار الواحة",
  description:
    "تصفح جميع فئات المنتجات الغذائية الطبيعية من دار الواحة — التمور، العسل، القهوة، التوابل والمزيد. اختر الفئة المناسبة لك واكتشف منتجات عالية الجودة.",
  keywords: [
    "دار الواحة",
    "فئات المنتجات",
    "منتجات طبيعية",
    "منتجات غذائية",
    "تمر",
    "عسل",
    "قهوة",
    "توابل",
    "منتجات عربية",
  ],
};

const CategoriesPage = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const getAllCats = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/category`, {
        next: { revalidate: 1300 },
      });

      if (!res.ok) {
        return [];
      }

      const data = await res.json();
      return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      console.error("Fetch categories error:", error);
      return [];
    }
  };

  const cats = await getAllCats();

  return (
    <div className="min-h-screen transition-colors duration-300 bg-neutral-950 font-cairo pt-[25vw] md:pt-[12vw]">
      <CategoryList categories={cats} />
    </div>
  );
};

export default CategoriesPage;
