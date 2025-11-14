import CategoryForm from "../../_components/CategoryForm";

interface CategoryParam {
  params: {
    id: string;
  };
}

export default async function EditCategory({ params }: CategoryParam) {
  const { id } = await params;
  const BAIS_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${BAIS_URL}/api/category/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return (
      <div className="w-full h-[75dvh] flex items-center justify-center">
        <p className="text-yellow-600 text-lg md:text-xl font-medium">
          لم يتم العثور على الفئة — تحقق من الرابط أو الموارد
        </p>
      </div>
    );
  }

  const { data } = await res.json();

  if (!data) {
    return (
      <div className="w-full h-[75dvh] flex items-center justify-center">
        <p className="text-red-600 text-lg md:text-xl font-medium">
          لم يتم العثور على الفئة في قاعدة البيانات
        </p>
      </div>
    );
  }

  const defValues = {
    name: data.name,
    description: data.description,
    image: data.image,
  };

  return (
    <div className="w-full min-h-svh">
      <div className="container mx-auto">
        <div className="p-4 lg:px-6 py-3 w-full">
          <div className="w-full space-y-6">
            <div>
              <h2 className="text-xl font-semibold">تعديل الفئة</h2>
              <p className="text-muted-foreground text-sm">
                قم بتحديث معلومات الفئة وتعديل التفاصيل الحالية.
              </p>
            </div>

            <CategoryForm mood="update" editId={id} defaultValues={defValues} />
          </div>
        </div>
      </div>
    </div>
  );
}
