"use client";

import { Button } from "../ui/button";
import AnimatedText from "../AnimatedText";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";

interface CategoryProps {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CategoriesSection = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const apiUrl = `${BASE_URL}/api/category`;

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data.data || data.data.length === 0) {
          setIsError(true);
        } else {
          setCategories(data.data);
          setIsError(false);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  return (
    <section className="relative w-full bg-neutral-900 py-20 px-3 md:px-6 lg:px-8 overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-1">
        <div>
          <AnimatedText>
            <p className="text-xl md:text-3xl font-cairo font-semibold text-neutral-100 mb-3">
              اكتشف فئات منتجاتنا
            </p>
          </AnimatedText>
          <AnimatedText>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
              نستعرض تشكيلتنا المتنوعة من العسل الطبيعي، التمور الفاخرة،
              والتوابل الأصيلة لتجد كل ما يعكس جودة وأصالة واحة سيوة.
            </p>
          </AnimatedText>
        </div>

        <Button
          onClick={() => router.push("/categories")}
          className="mt-4 md:mt-0 cursor-pointer text-white"
        >
          عرض جميع الفئات
        </Button>
      </div>

      {isError ? (
        <p className="text-center text-red-500 text-lg mt-10">
          لم نتمكن من تحميل الفئات حالياً. حاول مرة أخرى لاحقاً.
        </p>
      ) : isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden shadow-lg relative h-52 md:h-64"
            >
              <Skeleton className="absolute inset-0 w-full h-full" />
              <div className="absolute bottom-6 right-6 space-y-2 w-3/4">
                <Skeleton className="h-6 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : categories.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.slice(0 ,6).map((cat) => (
            <Link key={cat._id} href={`/categories/${cat._id}`} passHref>
              <motion.div
                variants={cardVariants}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              >
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-700 group-hover:from-black/80" />
                </div>

                <div className="relative z-10 flex flex-col justify-end h-64 p-6 text-right">
                  <h3 className="text-white text-2xl font-semibold font-cairo mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-neutral-200 text-sm line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-neutral-400 mt-10">
          جارٍ تحميل الفئات...
        </p>
      )}
    </section>
  );
};

export default CategoriesSection;
