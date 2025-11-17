"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import Link from "next/link";

interface CategoryProps {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
}

const CategoryList = ({ categories }: { categories: CategoryProps[] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const safeCats: CategoryProps[] = Array.isArray(categories) ? categories : [];

  const filteredCats = safeCats.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-12"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-white">
            الفئات المتاحة
          </h1>
          <p className="text-base text-muted-foreground">
            استعرض مجموعتنا المميزة من الفئات الغذائية الطبيعية
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-12"
      >
        <div className="relative max-w-2xl">
          <Search
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            type="text"
            placeholder="ابحث عن فئة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full font-cairo pr-12 pl-4 py-6 text-base rounded-xl bg-neutral-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-0 focus-visible:border-ring focus-visible:ring-ring/10"
          />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {filteredCats.map((cate) => (
          <motion.div
            key={cate._id}
            whileHover={{ y: -5, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Card className="pt-0 pb-3 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cate.image}
                  alt={cate.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <CardHeader className="px-3">
                <CardTitle className="text-xl text-neutral-50">
                  {cate.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-ellipsis text-sm text-muted-foreground">
                  {cate.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-3">
                <Link
                  href={`/category/${cate._id}?slug=${cate.slug}`}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium shadow-md text-sm flex items-center justify-center py-2 rounded-lg duration-200 transition-colors gap-1"
                >
                  <ShoppingBag className="h-4 w-4" />
                  عرض المنتجات المندرجة
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {safeCats.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 border border-red-800/50 bg-red-950/20 rounded-xl"
        >
          <div className="flex justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C7 2 3 4.5 3 8v6c0 3.5 4 6 9 6s9-2.5 9-6V8c0-3.5-4-6-9-6z" />
              <path d="M8 10h.01" />
              <path d="M16 10h.01" />
              <path d="M8 15c1.5 1 3.5 1 5 0" />
            </svg>
          </div>

          <p className="text-2xl text-red-400 font-medium mb-2">
            لا توجد فئات متاحة حالياً
          </p>
          <p className="text-red-300 text-sm">
            لم نتمكن من العثور على أي بيانات في قاعدة البيانات، أو حدث خطأ أثناء
            التحميل. يرجى المحاولة لاحقًا.{" "}
          </p>
        </motion.div>
      )}

      {/* No Results */}
      {filteredCats.length === 0 && safeCats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 border border-amber-700 rounded-xl bg-amber-600/15"
        >
          <div className={`text-6xl mb-4`}>🔍</div>
          <p className="text-xl text-amber-600">
            لم يتم العثور على فئات مطابقة{" "}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryList;
