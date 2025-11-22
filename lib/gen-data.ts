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

export const links = [
  {
    path: "/features",
    label: "المميزة",
  },
  {
    path: "/products",
    label: "المنتجات",
  },
  {
    path: "/categories",
    label: "الفئات",
  },
  {
    path: "/",
    label: "الرئيسية",
  },
];

export const collectiones = [
  {
    name: "التمور الفاخرة",
    description:
      "تمور طبيعية مختارة بعناية من مزارعنا في قلب الواحة، تجمع بين الطعم الأصيل والقيمة الغذائية العالية.",
    image: ["/images/category/date-1.jpg", "/images/category/date-2.jpg"],
  },
  {
    name: "العسل الطبيعي",
    description:
      "عسل نقي من أجود المراعي البرية، يُعبأ بعناية ليحافظ على فوائده الصحية ومذاقه الغني بالأصالة.",
    image: ["/images/category/honey-1.jpg", "/images/category/honey-2.jpg"],
  },
  {
    name: "الزيتون و الزيوت الطبيعية",
    description:
      "زيوت مستخلصة بطرق تقليدية من الزيتون والنباتات العطرية، مثالية للطهي والعناية الصحية اليومية.",
    image: ["/images/category/olives-1.jpg", "/images/category/olives-2.jpg"],
  },
  {
    name: "الأطعمة المتنوعة والقهوة والتوابل",
    description:
      "مجموعة متنوعة من المنتجات التي تمزج بين النكهات العربية الأصيلة — من القهوة العربية العطرة إلى التوابل الغنية التي تضيف سحر المذاق لكل وجبة.",
    image: ["/images/category/varient-2.jpg", "/images/category/varient-1.jpg"],
  },
];
