"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { links } from "@/data/home";
import Image from "next/image";
import { useClickout } from "@/hooks/use-clickout";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const path = usePathname();
  const [menuState, setMenuState] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const mainUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const isMobile = useIsMobile();

  const menuRef = useClickout<HTMLDivElement>({
    onClickout: () => setMenuState(false),
  });

  useEffect(() => {
    setMenuState(false);
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checker = async () => {
      try {
        const res = await fetch(`${mainUrl}/api/auth`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsAdmin(!!data?.auth);
      } catch {
        setIsAdmin(false);
      }
    };
    checker();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
        initial={{ top: 0 }}
        animate={{ top: isScrolled ? 15 : 5 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={cn(
            "mx-auto container px-4 transition-all duration-300 md:px-6",
            isScrolled &&
              "rounded-2xl border max-w-6xl md:px-4 backdrop-blur-sm bg-background/50"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between flex-row-reverse gap-6 py-3 md:gap-0 md:py-4">
            <div className="flex w-full md:w-auto justify-between items-center">
              <div className="flex items-center gap-3 md:hidden">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setMenuState(true)}
                      disabled={menuState}
                      aria-label={menuState ? "Close Menu" : "Open Menu"}
                      variant="ghost"
                      className="border"
                      size="icon"
                    >
                      <Menu className="size-6 duration-200" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">فتح القائمة</TooltipContent>
                </Tooltip>

                <ModeToggle />
              </div>

              <div>
                <Link href="/">
                  <Image
                    src="/images/logo.svg"
                    alt="Dar El Waha"
                    width={135}
                    height={40}
                    priority
                  />
                </Link>
              </div>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit md:block">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
                className="flex gap-2 text-base"
              >
                {links.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: -5 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        "block duration-150 font-medium py-1 px-2",
                        item.path == path
                          ? "text-primary dark:text-accent-foreground border-b border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div className="md:flex hidden items-center gap-3">
              <ModeToggle />
              {isAdmin && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button asChild variant="default" className="text-foreground">
                    <Link href="/admin">لوحة الإدارة</Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuState && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 right-0 top-0 mt-20 mx-2 z-40 rounded-xl border bg-background p-4 shadow-lg md:hidden"
            >
              <ul className="text-base flex flex-col-reverse gap-1">
                {links.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0.85, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.05 * index }}
                    className={cn(
                      "relative before:absolute before:w-2.5 before:top-0 before:-right-1.5 before:h-full before:rounded-r-md",
                      item.path === path
                        ? "before:bg-accent-foreground"
                        : "bg-transparent"
                    )}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMenuState(false)}
                      className={cn(
                        "block duration-150 p-3 rounded-lg font-medium",
                        item.path === path
                          ? "bg-gradient-to-l from-primary/50 text-accent-foreground"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4">
                {isAdmin && (
                  <Button asChild variant="default" className="w-full">
                    <Link href="/admin">لوحة الإدارة</Link>
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
};
