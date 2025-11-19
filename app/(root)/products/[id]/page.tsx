import React from "react";
import { Metadata } from "next";
import { IProduct } from "@/model/product.model";
import ProductGallery from "@/components/sections/ProductGallery";
import ProductInfo from "@/components/sections/ProductInfo";
import { SearchX } from "lucide-react";

interface ParamsProps {
  params: {
    id: string;
  };
}

export const revalidate = 500;
export const dynamicParams = true;

async function getProduct(id: string) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/product/${id}`,
      {
        next: {
          revalidate: 500,
          tags: ["product"],
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data as IProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "المنتج غير موجود",
      description: "عذراً، المنتج الذي تبحث عنه غير متوفر.",
    };
  }

  const finalPrice = product.hasDiscount
    ? product.price - product.discount
    : product.price;

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "دار الواحة";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: `${product.name} | ${siteName}`,
    description: product.description.slice(0, 160),
    keywords: [
      product.name,
      product.brand || "",
      product.category?.toString() || "",
      "شراء",
      "متجر إلكتروني",
      "منتجات",
    ].filter(Boolean),
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      url: `${siteUrl}/products/${id}`,
      siteName: siteName,
      images: product.images.map((image, index) => ({
        url: image,
        width: 1200,
        height: 1200,
        alt: `${product.name} - صورة ${index + 1}`,
      })),
      locale: "ar_EG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.images[0],
      creator: `@${siteName}`,
    },
    robots: {
      index: product.isAvailable,
      follow: true,
      googleBot: {
        index: product.isAvailable,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteUrl}/products/${id}`,
    },
    other: {
      "price:amount": finalPrice.toString(),
      "price:currency": "SAR",
      "product:availability": product.isAvailable ? "in stock" : "out of stock",
      "product:condition": "new",
      "product:brand": product.brand || "",
    },
  };
}

export default async function ProductPage({ params }: ParamsProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return ProductNotFound();
  }

  return (
    <>
      <main className="pt-24 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <ProductGallery
              images={product.images}
              name={product.name}
              discount={product.discount}
              isFeatured={product.isFeatured}
            />

            <div className="lg:col-span-2">
              <ProductInfo product={product} productId={id} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function ProductNotFound() {
  return (
    <div className="w-full py-40 text-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 p-3">
            <SearchX className="w-10 h-10 text-primary" />
          </div>

          <h2 className="text-2xl font-bold mb-2 text-foreground">
            لا توجد منتجات مطابقة للبحث
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            حاول تغيير الكلمة المفتاحية أو تصفح التصنيفات الأخرى.
          </p>
        </div>
      </div>
    </div>
  );
}
