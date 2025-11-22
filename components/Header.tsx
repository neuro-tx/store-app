"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { links } from "@/lib/gen-data";
import Image from "next/image";
import { useClickout } from "@/hooks/use-clickout";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowScroll } from "@/hooks/use-scroll";

export const Header = () => {
  const path = usePathname();
  const [menuState, setMenuState] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const mainUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const isMobile = useIsMobile();

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const { scrollY: currentScrollY } = useWindowScroll();

  useEffect(() => {
    setIsScrolled(currentScrollY > 50);

    if (currentScrollY === 0) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  const menuRef = useClickout<HTMLDivElement>({
    onClickout: () => setMenuState(false),
  });

  useEffect(() => {
    setMenuState(false);
  }, [isMobile]);

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
  }, [mainUrl]);

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
        animate={{
          y: isVisible ? 0 : -120,
          top: isScrolled ? 15 : 5,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={cn(
            "mx-auto container px-4 rounded-md transition-all duration-500 md:px-6",
            isScrolled &&
              "rounded-2xl border border-neutral-600 dark:border-neutral-600 max-w-5xl md:px-4 backdrop-blur-sm"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between flex-row-reverse gap-6 py-3 md:gap-0 md:py-3">
            <div className="flex w-full md:w-auto justify-between items-center">
              <div className="inline-flex md:hidden">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setMenuState(true)}
                      disabled={menuState}
                      aria-label={menuState ? "Close Menu" : "Open Menu"}
                      variant="ghost"
                      className="border border-neutral-600 text-neutral-400 cursor-pointer transition duration-300 bg-neutral-950 hover:bg-neutral-900 dark:hover:bg-neutral-900 dark:text-neutral-400 hover:text-neutral-300 dark:hover:text-neutral-300"
                      size="icon"
                    >
                      <Menu className="size-6 duration-200" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">فتح القائمة</TooltipContent>
                </Tooltip>
              </div>

              <div>
                <Link href="/">
                  <Image
                    src="/images/logo.svg"
                    alt="Dar El Waha"
                    width={190}
                    height={50}
                    priority
                    className="select-none"
                  />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex md:space-x-7">
              {isAdmin && (
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button asChild variant="default" className="text-white">
                    <Link href="/admin">لوحة الإدارة</Link>
                  </Button>
                </motion.div>
              )}

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
                        "relative px-2 py-1 text-base after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left",
                        item.path == path
                          ? "text-amber-400 after:scale-x-100 after:bg-amber-400"
                          : "text-neutral-400 hover:text-neutral-200 after:bg-neutral-200 hover:after:scale-x-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
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
              className="absolute left-0 right-0 top-0 mt-20 mx-2 z-40 rounded-xl border border-neutral-600 bg-neutral-950 p-4 shadow-lg md:hidden"
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
                        ? "before:bg-primary"
                        : "bg-transparent"
                    )}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMenuState(false)}
                      className={cn(
                        "block duration-200 p-3 rounded-lg font-medium",
                        item.path === path
                          ? "bg-gradient-to-l from-primary/50 text-amber-100"
                          : "text-neutral-400 hover:bg-primary/20 hover:text-neutral-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4">
                {isAdmin && (
                  <Button
                    asChild
                    variant="default"
                    className="w-full text-white"
                  >
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
