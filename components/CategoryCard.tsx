"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CategoryProps {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  delay?: number;
}

const CategoryCard = ({
  _id,
  name,
  description,
  image,
  slug,
  delay = 0,
}: CategoryProps) => {
  return (
    <Link href={`/categories/${_id}`} passHref>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay }}
        className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer"
      >
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-700 group-hover:from-black/80" />
        </div>

        <div className="relative z-10 flex flex-col justify-end h-64 p-6 text-right">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: delay + 0.1, duration: 0.6 }}
            className="text-white text-2xl font-semibold font-cairo mb-2"
          >
            {name}
          </motion.h3>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: delay + 0.4, duration: 0.6 }}
            className="text-neutral-200 text-sm leading-relaxed line-clamp-2"
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
