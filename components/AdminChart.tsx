"use client";

import * as React from "react";
import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  products: {
    label: "المنتجات",
    color: "var(--chart-1)",
  },
  categories: {
    label: "الأقسام",
    color: "var(--chart-2)",
  },
};

export function AdminChart() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const mainUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${mainUrl}/api/dashboard/chart`);
        const json = await res.json();
        console.log(json.data);
        if (json.success) setChartData(json.data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Card dir="rtl" className="pt-0">
      <CardHeader className="border-b py-5">
        <div className="grid gap-1 text-right">
          <CardTitle>نظرة عامة على المنتجات والأقسام</CardTitle>
          <CardDescription>عرض البيانات لآخر 30 أيام</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            جارِ تحميل البيانات...
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            لا توجد بيانات متاحة للعرض حالياً
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillProducts" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-products)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-products)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillCategories" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-categories)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-categories)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("ar-EG", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("ar-EG", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    indicator="dot"
                  />
                }
              />

              <Area
                dataKey="categories"
                type="natural"
                fill="url(#fillCategories)"
                stroke="var(--color-categories)"
                strokeWidth={2}
              />
              <Area
                dataKey="products"
                type="natural"
                fill="url(#fillProducts)"
                stroke="var(--color-products)"
                strokeWidth={2}
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
