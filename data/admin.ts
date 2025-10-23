import { LayoutDashboard, Package, List, Home } from "lucide-react";

export const ADMIN_LINKS = [
  {
    title: "لوحة التحكم",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "إضافة منتج",
    path: "/admin/product/add-product",
    icon: Package,
  },
  {
    title: "إضافة فئة",
    path: "/admin/category/add-cat",
    icon: List,
  },
  {
    title: "الصفحة الرئيسية",
    path: "/",
    icon: Home,
  },
] as const;
