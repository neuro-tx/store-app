import { toast } from "sonner";

const BAIS_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const categoryFormCreate = async (data: any) => {
  try {
    const res = await fetch(`${BAIS_URL}/api/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      toast.error(result.message || "حدث خطأ أثناء إنشاء التصنيف");
      return;
    }

    toast.success(result.message || "تم إنشاء التصنيف بنجاح");
  } catch (error) {
    toast.error("حدث خطأ أثناء إنشاء التصنيف");
  }
};

export const categoryFormUpdate = async (data: any, id: string) => {
  try {
    const res = await fetch(`${BAIS_URL}/api/category/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      toast.error(result.message || "حدث خطأ أثناء تحديث التصنيف");
      return;
    }

    toast.success(result.message || "تم تحديث التصنيف بنجاح");
  } catch (error) {
    toast.error("حدث خطأ أثناء إنشاء التصنيف");
  }
};

export const productFormCreate = async (data: any) => {
  try {
    const res = await fetch(`${BAIS_URL}/api/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.message || "حدث خطأ أثناء إنشاء المنتج");
      return;
    }
    toast.success(result.message || "تم إنشاء المنتج بنجاح");
  } catch (error) {
    toast.error("حدث خطأ غير متوقع أثناء إنشاء المنتج");
  }
};
