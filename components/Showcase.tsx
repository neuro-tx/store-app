"use client";

import { categories } from "@/data/show-data";
import React from "react";
import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedText from "./AnimatedText";

const Showcase = () => {
  const isMobile = useIsMobile();
  const count = isMobile ? 3 : 4;

  return (
    <section
      className="relative z-10 w-full py-20 px-5 md:px-6 lg:px-8 text-center bg-gradient-to-b from-black dark:from-black/50 via-neutral-100 to-neutral-100"
      aria-labelledby="what-we-produce-title"
    >
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h3 className="text-balance font-cooper font-semibold tracking-tight text-neutral-200 text-3xl">
            ما نُقدّمه لك
          </h3>

          <AnimatedText
            custom={{
              from: { x: -35, opacity: 0 },
              to: { x: 0, opacity: 1 },
            }}
          >
            <p className="mt-4 text-muted-foreground leading-relaxed text-base mx-auto max-w-xl">
              في دار الواحة نُقدّم لك خلاصة الطبيعة من التمور الفاخرة، العسل
              النقي، والزيوت الطبيعية المستخلصة بعناية. نؤمن أن الجودة تبدأ من
              الأصل وتنتهي بتجربةٍ تليقُ بك.
            </p>
          </AnimatedText>
        </motion.div>

        <div className="my-15">
          <motion.ul
            className="flex flex-col md:grid md:grid-cols-2 gap-3 lg:gap-4 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {categories.slice(0, count).map((cat, i) => (
              <li key={i}>
                <CategoryCard category={cat} index={i} />
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto text-center mt-20 max-w-3xl space-y-6"
        >
          <h3 className="text-3xl font-cooper font-semibold text-neutral-700">
            اكتشف أصل الجودة
          </h3>

          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            منتجاتنا{" "}
            <span className="text-primary font-semibold">
              مستوحاة من أصالة الأرض
            </span>{" "}
            — نأخذك في رحلةٍ من النكهة والأصالة. اكتشف كل ما نقدّمه الآن.
          </p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Link
              href="/products"
              className="inline-block bg-primary text-white px-6 py-2.5 rounded-full w-xs text-sm font-medium hover:bg-primary/90 transition-all duration-300"
            >
              اكتشف منتجاتنا
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
