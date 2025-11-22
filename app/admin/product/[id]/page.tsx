import { ProductType } from "@/lib/product-schema";
import ProductEditForm from "../../_components/ProductEditForm";

interface ProductParam {
  params: {
    id: string;
  };
}

export default async function EditProduct({ params }: ProductParam) {
  const { id } = await params;
  const BAIS_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${BAIS_URL}/api/product/${id}?recommends=false`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return (
      <div className="w-full h-[75dvh] flex items-center justify-center">
        <p className="text-yellow-600 text-lg md:text-xl font-medium">
          لم يتم العثور على المنتج — تحقق من الرابط أو المورد
        </p>
      </div>
    );
  }

  const { data } = await res.json();

  if (!data) {
    return (
      <div className="w-full h-[75dvh] flex items-center justify-center">
        <p className="text-red-600 text-lg md:text-xl font-medium">
          لم يتم العثور على المنتج في قاعدة البيانات
        </p>
      </div>
    );
  }
  const product = data.product;

  const defValues: ProductType = {
    name: product.name,
    category: product.category,
    description: product.description,
    images: product.images || [],
    brand: product.brand || "",
    discount: product.discount || 0,
    endDate: product.endDate || null,
    isAvailable: product.isAvailable,
    isFeatured: product.isFeatured,
    price: product.price || 0,
    capacity: product.capacity || "",
    features: product?.features || ["", "", ""],
  };

  return (
    <div className="w-full min-h-svh">
      <div className="container mx-auto">
        <div className="p-4 lg:px-6 py-3 w-full">
          <div className="w-full space-y-6">
            <div>
              <h2 className="text-xl font-semibold">تعديل المنتج</h2>
              <p className="text-muted-foreground text-sm">
                قم بتحديث معلومات المنتج وتعديل التفاصيل الحالية.
              </p>
            </div>

            <ProductEditForm initialValue={defValues} prodId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
