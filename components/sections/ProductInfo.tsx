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

export default function ProductInfo({ product }: ProductInfoProps) {
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
            <Badge
              variant="outline"
              className="text-sm font-medium text-white bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 border-none shadow-md shadow-amber-500/30 px-3 py-1 rounded-full"
            >
              {product.brand}
            </Badge>
          </motion.div>
        )}

        <motion.h1
          className="text-4xl font-bold text-white leading-tight"
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
            <div className="flex items-center gap-2 text-green-400">
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
            <Badge className="bg-gradient-to-r py-1 from-yellow-400 to-orange-400 text-white border-0">
              <Sparkles className="w-3 h-3 ml-1" />
              منتج مميز
            </Badge>
          )}
        </motion.div>
      </div>

      <Separator className="bg-muted-foreground" />

      <div className="space-y-5">
        <div className="font-cairo text-base text-neutral-200">السعر</div>
        <motion.div
          className="bg-gradient-to-br from-blue-950/30 to-indigo-950/30 rounded-2xl p-6 space-y-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-5xl font-bold text-white">
              {finalPrice.toFixed(2)}
            </span>
            <span className="text-2xl text-gray-400"> ج.م </span>
            {product.hasDiscount && (
              <>
                <span className="text-2xl text-gray-500 line-through">
                  {product.price.toFixed(2)}
                </span>
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 text-base px-3 py-1">
                  وفّر {savings.toFixed(2)} ج.م
                </Badge>
              </>
            )}
          </div>

          {product.discount > 0 && product.endDate && (
            <div className="flex items-center gap-2 text-pink-400">
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
          <label className="text-sm font-semibold text-neutral-200">
            السعة
          </label>
          <div className="flex items-center mt-1.5 gap-2">
            <Badge
              variant="outline"
              className="text-base text-white px-4 py-1.5"
            >
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
          className="h-12 rounded-xl w-full bg-[#40404030] border-neutral-700 text-white transition duration-300 hover:bg-[#40404050] hover:text-[#fde68a]"
        >
          <Share2 className="w-5 h-5 ml-2" />
          مشاركة
        </Button>
      </motion.div>

      <Separator className="bg-muted-foreground" />

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <h2 className="text-2xl font-bold text-white">الوصف</h2>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
          {product.description}
        </p>
      </motion.div>
      {product.features && product.features.length > 0 && (
        <motion.div
          className="space-y-5 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <h2 className="text-2xl font-bold text-white">مميزات المنتج</h2>

          <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/30 p-5 rounded-2xl space-y-3 border border-slate-700/30">
            {product.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 py-px"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + idx * 0.1 }}
              >
                <CheckCircle2 className="text-green-400" size={22} />
                <span className="text-lg leading-relaxed text-green-200">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
