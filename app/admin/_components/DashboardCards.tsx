import { List, Package, Percent, Star } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title: string;
  data: string | number;
  description: string;
  icon: React.ElementType;
  style?: string;
}

const DashboardCards = async () => {
  const getCardsData = async () => {
    const mainUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${mainUrl}/api/dashboard/cards`);
    return await res.json();
  };

  const data = await getCardsData();

  const catCount = data.categoryCount;
  const prodCount = data.productCount;
  const featCount = data.featuredProducts;
  const discount = data.discountedProducts;

  const DASHBOARD_CARDS = [
    {
      title: "إجمالي المنتجات",
      description: "عدد المنتجات المسجلة في المتجر",
      icon: Package,
      count: prodCount,
      style: "text-purple-600 bg-purple-100",
    },
    {
      title: "إجمالي الفئات",
      description: "عدد الفئات المضافة في لوحة التحكم",
      icon: List,
      count: catCount,
      style: "text-green-600 bg-green-100",
    },
    {
      title: "المنتجات المخفضة",
      description: "المنتجات التي تحتوي على خصومات حالية",
      icon: Percent,
      count: discount,
      style: "text-blue-600 bg-blue-100",
    },
    {
      title: "المنتجات المميزة",
      description: "المنتجات المعروضة في الواجهة كمميزة",
      icon: Star,
      count: featCount,
      style: "text-yellow-600 bg-yellow-100",
    },
  ] as const;

  return (
    <div className="py-3">
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DASHBOARD_CARDS.map((card) => (
          <DataCard
            key={card.title}
            title={card.title}
            data={card.count}
            description={card.description}
            icon={card.icon}
            style={card.style}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;

const DataCard = ({
  title,
  data,
  description,
  icon: Icon,
  style,
}: DataCardProps) => {
  return (
    <Card className="text-right">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className={cn("size-8 grid place-items-center rounded-full", style)}
        >
          <Icon className="w-5 h-5" />{" "}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
