"use client";

import React, { useEffect, useState } from "react";
import { links } from "@/data/home";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { TextAlignJustify, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useClickout } from "@/hooks/use-clickout";

const Header = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMoblie = useIsMobile();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const mainUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    setIsOpen(false);
  }, [isMoblie]);

  const dropMenuRef = useClickout<HTMLDivElement>({
    onClickout: () => {
      setIsOpen(false);
    },
  });

  useEffect(() => {
    const checker = async () => {
      try {
        const res = await fetch(`${mainUrl}/api/auth`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsAdmin(!!data?.auth);
      } catch (error) {
        setIsOpen(false);
      }
    };

    checker();
  }, []);

  return (
    <header className="min-h-10 w-full bg-transparent backdrop-blur-xs fixed top-0 left-0 z-50">
      <div className="mx-auto container relative">
        <div className="w-full flex flex-row-reverse items-center justify-between border-b p-4 lg:px-6 py-3">
          <Link href="/">
            <Image
              src="/imgs/logo.svg"
              alt="date tree"
              width={135}
              height={40}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((li) => (
              <Link
                key={li.label}
                href={li.path}
                className={cn(
                  "p-2 px-3 overflow-hidden font-cairo text-base font-medium",
                  li.path === path
                    ? "text-primary"
                    : "hover:text-muted-foreground"
                )}
              >
                {li.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border md:hidden"
                  onClick={() => setIsOpen(true)}
                  disabled={isOpen}
                >
                  <TextAlignJustify />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">فتح القائمة</TooltipContent>
            </Tooltip>

            <ModeToggle />

            {isAdmin && (
              <Link
                href="/admin"
                className="text-white bg-primary font-medium rounded-lg text-sm px-4 lg:px-5 py-1.5 lg:py-2 transition-all duration-200 border border-transparent hover:border-primary hover:bg-transparent hover:text-primary"
              >
                لوحة الادارة
              </Link>
            )}
          </div>
        </div>

        <div
          ref={dropMenuRef}
          className={cn(
            "absolute w-full bg-primary/10 backdrop-blur-sm z-10 left-0 top-18 transition-all duration-500 md:hidden",
            isOpen
              ? "top-16 opacity-100"
              : "top-13 pointer-events-none opacity-0 z-0"
          )}
        >
          <div className="py-5 px-3">
            <div className="flex flex-col-reverse gap-1">
              {links.map((li) => (
                <Link
                  href={li.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "w-full rounded-md",
                    path === li.path
                      ? "bg-primary text-white"
                      : "hover:bg-primary/50"
                  )}
                  key={li.label}
                >
                  <div className="px-3 py-2 w-full">{li.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
