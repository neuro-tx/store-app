"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Share2,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { IProduct } from "@/model/product.model";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface ProductInfoProps {
  product: IProduct;
  productId: string;
}

export default function ProductInfo({ product, productId }: ProductInfoProps) {
  const finalPrice = product.hasDiscount
    ? product.price - product.discount
    : product.price;

  const savings = product.discount > 0 ? product.price - finalPrice : 0;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ الرابط");
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-3">
        {product.brand && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Badge variant="outline" className="text-sm font-medium">
              {product.brand}
            </Badge>
          </motion.div>
        )}

        <motion.h1
          className="text-4xl font-bold text-gray-900 dark:text-white leading-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {product.name}
        </motion.h1>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {product.isAvailable ? (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">متوفر</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">غير متوفر</span>
            </div>
          )}
          {product.isFeatured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
              <Sparkles className="w-3 h-3 ml-1" />
              منتج مميز
            </Badge>
          )}
        </motion.div>
      </div>

      <Separator />

      <div className="space-y-5">
        <div className="font-cairo text-base">السعر</div>
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 space-y-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-5xl font-bold text-gray-900 dark:text-white">
              {finalPrice.toFixed(2)}
            </span>
            <span className="text-2xl text-gray-600 dark:text-gray-400">
              {" "}
              ج.م{" "}
            </span>
            {product.hasDiscount && (
              <>
                <span className="text-2xl text-gray-500 dark:text-gray-500 line-through">
                  {product.price.toFixed(2)}
                </span>
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 text-base px-3 py-1">
                  وفّر {savings.toFixed(2)} ج.م
                </Badge>
              </>
            )}
          </div>

          {product.discount > 0 && product.endDate && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                ينتهي العرض في:{" "}
                {new Date(product.endDate).toLocaleDateString("ar-EG", {
                  day: "2-digit",
                  month: "long",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {product.capacity && (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            السعة
          </label>
          <div className="flex items-center mt-1.5 gap-2">
            <Badge variant="outline" className="text-base px-4 py-1.5">
              <Package className="w-4 h-4 ml-2" />
              {product.capacity}
            </Badge>
          </div>
        </motion.div>
      )}

      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <Button
          variant="outline"
          onClick={handleShare}
          className="h-12 rounded-xl w-full"
        >
          <Share2 className="w-5 h-5 ml-2" />
          مشاركة
        </Button>
      </motion.div>

      <Separator />

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          الوصف
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
          {product.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
