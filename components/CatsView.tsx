"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CategoryProps {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
}

interface CategoriesGridProps {
  categories: CategoryProps[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CatsView = ({ categories }: CategoriesGridProps) => {
  if (!categories.length)
    return (
      <p className="text-center text-neutral-400 mt-10">
        لا توجد فئات متاحة حالياً.
      </p>
    );

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.slice(0, 6).map((cat) => (
        <motion.div
          key={cat._id}
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
            <p className="text-white text-2xl font-semibold font-cairo mb-2">
              {cat.name}
            </p>
            <p className="text-neutral-200 text-sm line-clamp-2">
              {cat.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CatsView;
