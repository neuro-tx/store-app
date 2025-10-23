interface ProductParam {
  params: {
    id: string;
  };
}

export default async function EditProduct({ params }: ProductParam) {
  const { id } = await params;
  const BAIS_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${BAIS_URL}/api/product/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await res.json();

  const defValues = {
    name: data.name,
    category: data.category,
    description: data.description,
    images: data.images,
    capacity: data.capacity,
    discount: data.discount,
    price: data.price,
    brand: data.brand,
    isAvailable: data.isAvailable,
    isFeatured: data.isFeatures,
    endDate: data.endDate,
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

            {/* ProductEditForm */}
          </div>
        </div>
      </div>
    </div>
  );
}
