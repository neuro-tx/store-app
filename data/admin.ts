import { LayoutDashboard, Package, List, Home } from "lucide-react";

export const ADMIN_LINKS = [
  {
    title: "لوحة التحكم",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "إضافة منتج",
    path: "/admin/add-products",
    icon: Package,
  },
  {
    title: "إضافة فئة",
    path: "/admin/add-categories",
    icon: List,
  },
  {
    title: "الصفحة الرئيسية",
    path: "/",
    icon: Home,
  },
] as const;
