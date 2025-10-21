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
  }
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
