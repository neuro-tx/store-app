import AnimatedText from "../AnimatedText";
import { Suspense } from "react";
import Link from "next/link";
import CatsView from "../CatsView";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/api/category`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error loading categories:", error);
    return [];
  }
}

const CategoriesSection = async () => {
  const categories = await getCategories();

  return (
    <section className="relative w-full bg-neutral-900 py-20 px-3 md:px-6 lg:px-8 overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-1">
        <div>
          <AnimatedText>
            <p className="text-xl md:text-3xl font-cairo font-semibold text-neutral-100 mb-3">
              اكتشف فئات منتجاتنا
            </p>
          </AnimatedText>
          <AnimatedText>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
              نستعرض تشكيلتنا المتنوعة من العسل الطبيعي، التمور الفاخرة،
              والتوابل الأصيلة لتجد كل ما يعكس جودة وأصالة واحة سيوة.
            </p>
          </AnimatedText>
        </div>

        <Link
          href={"/categories"}
          className="mt-4 md:mt-0 cursor-pointer text-white"
        >
          عرض جميع الفئات
        </Link>
      </div>

      <Suspense
        fallback={
          <p className="text-center text-neutral-400">جارٍ تحميل الفئات...</p>
        }
      >
        <CatsView categories={categories} />
      </Suspense>
    </section>
  );
};

export default CategoriesSection;
