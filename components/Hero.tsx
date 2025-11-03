"use client"

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen bg-black">
      <div className="absolute inset-0">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: -80 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 h-[250px]"
        >
          <img src="/images/bg-2.svg" alt="moved-bg" />
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 80 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-0 h-[357px]"
        >
          <img src="/images/bg-1.svg" alt="moved-bg" className="" />
        </motion.div>
      </div>

      <div className="relative h-screen flex items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
        />

        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
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
              initial={{ opacity: 0, y: 40 ,filter:"blur(5px)" }}
              animate={{ opacity: 1, y: 0 ,filter:"blur(0)"}}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto my-10 max-w-4xl text-balance text-5xl font-scheherazade font-bold md:text-7xl lg:mt-16 xl:text-[5.25rem]"
            >
              نكهة الأصالة في كل لقمة
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 ,filter:"blur(2px)" }}
              animate={{ opacity: 1, y: 0 ,filter:"blur(0)"}}
              transition={{ duration: 1, delay: 0.4 }}
              className="mx-auto mt-10 max-w-2xl text-balance text-lg text-muted-foreground leading-relaxed text-center"
            >
              نقدم لك أفضل التمور والزيوت والتوابل والحلويات الطبيعية من قلب
              الواحة. منتجاتنا تمزج بين الأصالة والجودة لتصل إليك بطابعٍ عربيٍ
              فاخر.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
