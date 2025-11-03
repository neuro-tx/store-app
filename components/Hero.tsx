"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="relative overflow-hidden bg-black py-6">
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 select-none pointer-events-none">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isMobile ? 0 : -80 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute top-10 md:top-20"
          >
            <img src="/images/hero/bg-2.svg" alt="moved-bg-1" />
          </motion.div>

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isMobile ? 0 : 120 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute -bottom-[20%] md:top-[45%] md:-translate-y-1/2 h-[80dvh]"
          >
            <img src="/images/hero/bg-1.svg" alt="moved-bg-2" className="" />
          </motion.div>
        </div>

        <div
          aria-hidden
          className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
        />

        <div className="mx-auto relative z-10 max-w-7xl px-6 pt-[15vw]">
          <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center"
            >
              <Link
                href="/products/features"
                className="hover:border-t-border bg-muted group flex w-fit items-center gap-4 rounded-full border py-1 px-4 shadow-md transition-colors duration-300 border-t-white/5 shadow-zinc-950"
              >
                <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                  <div className="flex w-12 translate-x-1/2 duration-500 ease-in-out group-hover:-translate-x-0">
                    <span className="flex size-6">
                      <ArrowLeft className="m-auto size-3" />
                    </span>
                    <span className="flex size-6">
                      <ArrowLeft className="m-auto size-3" />
                    </span>
                  </div>
                </div>
                {"|"}
                <span className="text-foreground text-sm">
                  اكتشف منتجاتنا المميزة
                </span>
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-10 max-w-4xl text-balance text-5xl font-scheherazade font-bold md:text-7xl lg:mt-16 xl:text-[5.25rem]"
            >
              نكهة الأصالة في كل لقمة
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mx-auto mt-13 max-w-2xl text-balance text-lg text-muted-foreground leading-relaxed text-center"
            >
              نقدم لك أفضل التمور والزيوت والتوابل والحلويات الطبيعية من قلب
              الواحة. منتجاتنا تمزج بين الأصالة والجودة لتصل إليك بطابعٍ عربيٍ
              فاخر.
            </motion.p>

            <div className="mask-b-from-55% relative -mr-52 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="inset-shadow-2xs ring-ring inset-shadow-white/20 bg-background/40 backdrop-blur-xs relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1"
              >
                <Image
                  className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block object-cover object-center"
                  src="/images/hero/main.jpg"
                  alt="app screen"
                  width="2700"
                  height="1440"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
