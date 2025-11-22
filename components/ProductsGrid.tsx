"use client";

import React from "react";
import { motion } from "framer-motion";
import { GridCard ,RowCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductCardProps } from "@/lib/types";

interface ProductGridProps {
  cols?: string;
  products: ProductCardProps[];
  applyRow?: boolean;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const ProductsGrid: React.FC<ProductGridProps> = ({
  products,
  cols,
  applyRow = false,
}) => {
  const isMobile = useIsMobile();

  return isMobile && applyRow ? (
    <motion.div 
      className="space-y-3"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {products.map((product) => (
        <RowCard key={product._id} product={product} />
      ))}
    </motion.div>
  ) : (
    <motion.div
      className={cn(
        "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3",
        cols
      )}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {products.map((product) => (
        <GridCard key={product._id} product={product} />
      ))}
    </motion.div>
  );
};

export default ProductsGrid;
