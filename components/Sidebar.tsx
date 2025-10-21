"use client";

import { ADMIN_LINKS } from "@/data/admin";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { TreePalm } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTheme } from "next-themes";

const Sidebar = () => {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const { setTheme, theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn(
        "w-64 min-h-svh h-full border-l z-30 fixed top-0 right-0 transition-transform duration-300 overflow-x-hidden translate-x-full md:translate-x-0 bg-background",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="w-full h-full overflow-y-hidden hover:overflow-y-auto flex flex-col justify-between">
        <div className="w-full">
          <div className="border-b p-2 h-17 flex items-center">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold text-xl font-tajawal text-primary px-2 hover:text-yellow-400 transition-colors"
            >
              <TreePalm size={30} />
              <span>دار الواحة</span>
            </Link>
          </div>

          <div className="mt-5 p-2">
            <ul className="p-2 space-y-2">
              {ADMIN_LINKS.map((link) => (
                <li key={link.path} className="w-full">
                  <Link
                    href={link.path}
                    className={cn(
                      "flex items-center gap-3 px-2 py-1.5 text-base rounded-md text-muted-foreground hover:text-foreground transition-colors duration-300 hover:bg-primary/20",
                      path == link.path &&
                        "bg-primary text-white hover:bg-primary/90"
                    )}
                  >
                    <link.icon size={20} />
                    <span className="">{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full p-2 mb-6">
          {mounted && (
            <div className="flex items-center gap-2 p-2 rounded-md">
              <Switch
                dir="ltr"
                id="theme-toggle"
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
              <Label
                htmlFor="theme-toggle"
                className="font-medium text-muted-foreground"
              >
                {theme === "dark" ? "الوضع الليلي" : "الوضع النهاري"}
              </Label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
