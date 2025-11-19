"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export interface ProductCardProps {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  isAvailable?: boolean;
  isFeatured?: boolean;
  brand?: string;
  discount?: number;
  capacity?: string;
  hasDiscount?: boolean;
  endDate?: Date;
}

const ProductCard = ({ product }: { product: ProductCardProps }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg bg-neutral-900 border border-neutral-700"
    >
      <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
        <Image
          src={product?.images[0]}
          alt={product?.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500" />

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product?.hasDiscount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">
              خصم {product?.discount} ج.م
            </span>
          )}
          {product?.isFeatured && (
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-semibold">
              مميز
            </span>
          )}
          {!product?.isAvailable && (
            <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded font-semibold">
              غير متوفر
            </span>
          )}
        </div>
      </div>

      <div className="p-4 text-right relative space-y-2">
        <p className="text-lg font-semibold font-cairo text-neutral-100">
          {product?.name}
        </p>
        <p className="text-sm text-neutral-500 mb-2 text-ellipsis line-clamp-2">
          {product?.description}
        </p>

        {product?.capacity && (
          <p className="text-sm text-neutral-400">السعة: {product?.capacity}</p>
        )}

        <p className="text-base font-semibold text-neutral-300 flex items-center gap-3">
          {product?.hasDiscount ? (
            <>
              <span className="line-through text-red-500 mr-2">
                {product?.price} ج.م
              </span>
              <span>{product?.price - (product?.discount || 0)} ج.م</span>
            </>
          ) : (
            <span>{product?.price} ج.م</span>
          )}
        </p>

        <Button
          className="mt-3 w-full text-white cursor-pointer font-medium font-cairo"
          onClick={() => router.push(`/products/${product._id}`)}
        >
          عرض التفاصيل
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
