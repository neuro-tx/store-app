"use client";

import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { TextAlignJustify } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";

const Navbar = () => {
  const { isOpen, openSidebar } = useSidebar();
  return (
    <div className="container mx-auto border-b flex items-center h-20">
      <div className="px-4 lg:px-6 py-2 w-full">
        <div className="w-full flex items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl font-bold font-cairo text-primary">
              لوحة التحكم الإدارية
            </h1>
            <p className="text-muted-foreground text-sm">
              إدارة المحتوى وإعدادات النظام من مكان واحد.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border"
                    onClick={openSidebar}
                    disabled={isOpen}
                  >
                    <TextAlignJustify />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">فتح القائمة</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
