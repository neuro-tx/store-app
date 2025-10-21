import React from "react";
import DashboardCards from "./_components/DashboardCards";

const page = async () => {
  return (
    <div className="w-full min-h-svh">
      <div className="container mx-auto">
        <div className="p-4 lg:px-6 py-3 w-full">
          <div className="w-full space-y-6">
            <DashboardCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
