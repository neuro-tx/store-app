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

export const categories = [
  { id: "zeyt-zaytoun", name: "زيوت الزيتون" },
  { id: "tamr", name: "التمور" },
  { id: "montajat-nakhl", name: "منتجات النخيل" },
  { id: "tawabel-aashab", name: "التوابل والأعشاب" },
  { id: "marahim-zuyut", name: "المراهم والزيوت الطبيعية" },
  { id: "halawiyat-taqlidiyya", name: "الحلويات التقليدية" },
  { id: "asal-washarab", name: "العسل والشراب الطبيعي" },
  { id: "moksarat-bodoor", name: "المكسرات والبذور" },
  { id: "shai-khalatat", name: "الشاي والخلطات العشبية" },
  { id: "olob-hadaya", name: "علب الهدايا والمجموعات" },
] as const;
