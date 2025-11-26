"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Star,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductGalleryProps {
  images: string[];
  name: string;
  discount?: number;
  isFeatured?: boolean;
}

export default function ProductGallery({
  images,
  name,
  discount = 0,
  isFeatured = false,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-4">
        <motion.div
          className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br dark:from-neutral-800 to-neutral-900 shadow-2xl group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            {discount > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg text-base px-3 py-1">
                <Star className="w-4 h-4 ml-1 fill-current" />
                خصم {discount} ج.م
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-lg text-base px-3 py-1">
                <Sparkles className="w-4 h-4 ml-1 fill-current" />
                مميز
              </Badge>
            )}
          </div>

          <div className="relative w-full h-full">
            <Image
              src={images[selectedImage]}
              alt={`${name} - صورة ${selectedImage + 1}`}
              width={400}
              height={400}
              className="object-cover transition-transform duration-500 group-hover:scale-101 size-full"
              priority={selectedImage === 0}
            />
          </div>

          <motion.button
            onClick={() => setIsZoomOpen(true)}
            className="absolute bottom-4 left-4 text-white bg-neutral-800 p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize2 className="w-5 h-5" />
          </motion.button>

          {images.length > 1 && (
            <>
              <motion.button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
              </motion.button>
            </>
          )}
        </motion.div>

        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === index
                    ? "border-primary scale-101"
                    : "border-primary/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Image
                  src={image}
                  alt={`${name} صورة مصغرة ${index + 1}`}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-primary/10" />
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <button
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 text-white p-2 rounded-full transition-colors z-10 bg-neutral-800 hover:bg-neutral-700"
              >
                <X className="w-6 h-6" />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors z-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors z-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <motion.div
                className="relative max-w-5xl md:h-[80vh] aspect-square"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <Image
                  src={images[selectedImage]}
                  alt={`${name} - صورة ${selectedImage + 1}`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
