"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  cols?: string;
  products: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    images: string[];
    isAvailable?: boolean;
    isFeatured?: boolean;
    discount?: number;
    hasDiscount?: boolean;
    capacity?: string;
    endDate?: Date;
  }[];
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const ProductsGrid: React.FC<ProductGridProps> = ({ products, cols }) => {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
        cols
      )}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </motion.div>
  );
};

export default ProductsGrid;
