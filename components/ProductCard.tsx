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

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

const PriceDisplay = ({ price, discount, hasDiscount }: ProductCardProps) => (
  <p className="text-base font-semibold text-neutral-300 flex items-center gap-3">
    {hasDiscount ? (
      <>
        <span className="line-through text-red-500 mr-2">{price} ج.م</span>
        <span>{price - (discount || 0)} ج.م</span>
      </>
    ) : (
      <span>{price} ج.م</span>
    )}
  </p>
);

const Badges = ({
  hasDiscount,
  discount,
  isFeatured,
  isAvailable,
}: ProductCardProps) => (
  <div className="absolute top-2 right-2 flex flex-col gap-1">
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
);

const ProductImage = ({ product }: { product: ProductCardProps }) => (
  <div className="relative w-full h-full overflow-hidden">
    <Image
      src={product.images[0]}
      alt={product.name}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500" />

    <Badges {...product} />
  </div>
);

// Product Card (Grid style)
export const GridCard = ({ product }: { product: ProductCardProps }) => {
  const router = useRouter();

  return (
    <motion.div
      {...fadeUp}
      className="group relative overflow-hidden rounded-2xl shadow-lg bg-neutral-900 border border-neutral-700"
    >
      <div className="h-64 relative">
        <ProductImage product={product} />
      </div>

      <div className="p-4 text-right space-y-2">
        <p className="text-lg font-semibold font-cairo text-neutral-100">
          {product.name}
        </p>

        <p className="text-sm text-neutral-500 line-clamp-2">
          {product.description}
        </p>

        {product.capacity && (
          <p className="text-sm text-neutral-400">السعة: {product.capacity}</p>
        )}

        <PriceDisplay {...product} />

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

// Product Row (Horizontal style)
export const RowCard = ({ product }: { product: ProductCardProps }) => {
  const router = useRouter();

  return (
    <motion.div
      {...fadeUp}
      className="group relative overflow-hidden rounded-2xl shadow-lg bg-neutral-900 border border-neutral-700"
    >
      <div className="w-full h-52 flex">
        <div className="flex-2 relative rounded-r-2xl overflow-hidden">
          <ProductImage product={product} />
        </div>

        <div className="flex-3 flex flex-col justify-between space-y-2 px-2 mr-1 py-3">
          <p className="text-lg font-semibold font-cairo text-neutral-100">
            {product.name}
          </p>

          <p className="text-sm text-neutral-500 line-clamp-2">
            {product.description}
          </p>

          {product.capacity && (
            <p className="text-sm text-neutral-400">
              السعة: {product.capacity}
            </p>
          )}

          <PriceDisplay {...product} />

          <Button
            className="w-full text-white cursor-pointer font-medium font-cairo"
            onClick={() => router.push(`/products/${product._id}`)}
          >
            عرض التفاصيل
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
