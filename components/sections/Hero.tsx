"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

const Hero = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-black py-6 pb-52">
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 select-none pointer-events-none">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isMobile ? 20 : -80 }}
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
            animate={{ y: isMobile ? 80 : 120 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute -bottom-[15%] lg:top-[45%] md:-translate-y-1/2 h-[50dvh] -rotate-x-6"
          >
            <img src="/images/hero/bg-1.svg" alt="moved-bg-2" />
          </motion.div>
        </div>

        <div
          aria-hidden
          className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
        />

        <div className="mx-auto relative z-10 container px-6 mt-[30vw] sm:mt-[20vw] md:mt-[12vw]">
          <div className="text-center mx-auto space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center"
            >
              <div
                className="hover:border-t-border bg-muted group flex w-fit items-center gap-4 rounded-full border py-1 px-4 shadow-md transition-colors duration-300 border-t-white/5 shadow-zinc-950 cursor-pointer"
                onClick={()=> router.push("/products/features")}
              >
                <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                  <div className="flex w-12 translate-x-0 duration-500 ease-in-out group-hover:translate-x-1/2">
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3" />
                    </span>
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3" />
                    </span>
                  </div>
                </div>
                {"|"}
                <span className="text-foreground text-sm">
                  اكتشف منتجاتنا المميزة
                </span>
              </div>
            </motion.div>

            <div className="space-y-4 w-full">
              <motion.h1
                initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: isMobile ? 0 : 120,
                  filter: "blur(0)",
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-balance font-cooper text-transparent bg-clip-text bg-radial from-primary via-orange-600 to-orange-200 text-[clamp(3rem,5vw,5rem)]"
              >
                متجر دار الواحة
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: -120,
                  filter: "blur(0)",
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-balance font-cooper hidden md:block font-thin text-neutral-200"
                style={{
                  fontSize: "clamp(2rem, 4vw , 3rem)",
                }}
              >
                دار تجمع الأصالة بروحٍ عصرية
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground leading-relaxed text-center"
            >
              نقدم لك أفضل التمور والزيوت والتوابل والحلويات الطبيعية من قلب
              الواحة. منتجاتنا تمزج بين الأصالة والجودة لتصل إليك بطابعٍ عربيٍ
              فاخر.
            </motion.p>

            <div className="mask-b-from-55% relative -mr-50 mt-10 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="inset-shadow-2xs ring-ring/60 inset-shadow-white/20 bg-black/30 backdrop-blur-xs relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-neutral-700 p-4 shadow-lg shadow-zinc-950/15 ring-1"
              >
                <Image
                  className="bg-black aspect-15/8 relative rounded-2xl block object-cover object-center brightness-90"
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
