import React from "react";
import DashboardCards from "./_components/DashboardCards";
import { AdminChart } from "@/components/AdminChart";
import ProductsPage from "./_components/ProductTable";

const page = async () => {
  return (
    <div className="w-full min-h-svh">
      <div className="container mx-auto">
        <div className="p-4 lg:px-6 py-3 w-full">
          <div className="w-full space-y-6">
            <DashboardCards />
            <AdminChart />
            <ProductsPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
