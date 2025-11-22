import { ProductCardProps } from "@/lib/types";
import ProductsGrid from "@/components/ProductsGrid";
import { Metadata } from "next";

interface ParamsProps {
  params: { id: string };
  searchParams: { slug: string };
}

export const revalidate = 1000;
export const dynamicParams = true;

async function getCatData(id: string, slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${base}/api/category/${id}?slug=${slug}`, {
      next: { revalidate: 1000, tags: ["categories", "products"] },
    });
    if (!res.ok) {
      console.log(res.status);
      return null;
    }
    const result = await res.json();
    return result.data[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: ParamsProps): Promise<Metadata> {
  const { id } = await params;
  const { slug } = await searchParams;
  const data = await getCatData(id, slug);

  if (!data) {
    return {
      title: "الفئة غير موجودة",
      description: "تعذر العثور على هذه الفئة.",
    };
  }

  return {
    title: `منتجات فئة ${data.name}`,
    description: `${data.description}`,
    openGraph: {
      title: `منتجات فئة ${data.name}`,
      description: `كل المنتجات المتوفرة ضمن فئة ${data.name}.`,
    },
  };
}

export default async function CatePage({ params, searchParams }: ParamsProps) {
  const { id } = await params;
  const { slug } = await searchParams;
  const data = await getCatData(id, slug);

  const products = (data?.products as ProductCardProps[]) || [];

  if (!data) {
    return (
      <div className="w-full pt-32 pb-16 text-center px-3 md:px-6 lg:px-8">
        <div className="container py-40 rounded-xl border mx-auto bg-primary/15 border-primary">
          <h1 className="text-3xl font-bold mb-4">الفئة غير موجودة</h1>
          <p className="text-muted-foreground">
            لم نتمكن من العثور على الفئة التي تبحث عنها.
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full pt-32 pb-16 text-center px-3 md:px-6 lg:px-8">
        <div className="container py-40 rounded-xl border mx-auto">
          <h1 className="text-3xl font-bold mb-4">
            لا توجد منتجات في هذه الفئة
          </h1>
          <p className="text-muted-foreground my-2">
            فئة: <span className="font-bold underline text-emerald-500 underline-offset-2">{data.name}</span>
          </p>
          <p className="text-sm text-primary font-medium">
            نعمل على إضافة المزيد قريباً — يرجى التحقق لاحقاً.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto py-32 px-3 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-balance font-cooper text-transparent bg-clip-text bg-radial from-primary via-orange-600 to-orange-200 text-[clamp(2rem,5vw,3.5rem)]">
            منتجات فئة <span> : {data?.name}</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            استعرض جميع المنتجات المتاحة ضمن هذه الفئة.
          </p>
        </div>

        <div className="mt-10">
          {products.length === 0 ? (
            <div className="text-center py-20 border border-amber-700 rounded-xl">
              <div className="text-6xl mb-4">📦</div>

              <p className="text-xl font-semibold text-amber-600">
                لا توجد منتجات متاحة حالياً في هذه الفئة
              </p>

              {data?.name && (
                <p className="text-sm text-amber-500 mt-1">
                  فئة: <span className="font-bold">{data.name}</span>
                </p>
              )}

              <p className="text-sm text-gray-400 mt-3">
                نعمل على إضافة المزيد قريباً — يرجى التحقق لاحقاً.
              </p>
            </div>
          ) : (
            <ProductsGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
