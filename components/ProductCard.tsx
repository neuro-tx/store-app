"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
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

const ProductCard = ({
  _id,
  name,
  description,
  price,
  images,
  isAvailable = true,
  isFeatured = false,
  discount = 0,
  hasDiscount = false,
  capacity,
  endDate,
}: ProductCardProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg bg-neutral-900 border"
      onClick={() => router.push(`/products/${_id}`)}
    >
      <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-102"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500" />

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">
              خصم {discount} ج.م
            </span>
          )}
          {isFeatured && (
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-semibold">
              مميز
            </span>
          )}
          {!isAvailable && (
            <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded font-semibold">
              غير متوفر
            </span>
          )}
        </div>
      </div>

      <div className="p-4 text-right relative">
        <p className="text-lg font-semibold font-cairo text-neutral-100 mb-1">
          {name}
        </p>
        <p className="text-sm text-neutral-500 mb-2 text-ellipsis line-clamp-2">{description}</p>

        {capacity && (
          <p className="text-sm text-neutral-400 mb-1">السعة: {capacity}</p>
        )}

        <p className="text-base font-semibold text-neutral-300 flex items-center gap-3">
          {hasDiscount ? (
            <>
              <span className="line-through text-red-500 mr-2">
                {price} ج.م
              </span>
              <span>{price - discount} ج.م</span>
            </>
          ) : (
            <span>{price} ج.م</span>
          )}
        </p>

        {hasDiscount && endDate && (
          <p className="text-xs text-red-500 mt-1">
            ينتهي الخصم في: {new Date(endDate).toLocaleDateString("ar-EG")}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
