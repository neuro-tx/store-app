import { LayoutDashboard, Package, List } from "lucide-react";

export const ADMIN_LINKS = [
  {
    title: "لوحة التحكم",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "المنتجات",
    path: "/admin/products",
    icon: Package,
  },
  {
    title: "الفئات",
    path: "/admin/categories",
    icon: List,
  },
] as const;
