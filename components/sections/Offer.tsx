import React from "react";
import AnimatedText from "../AnimatedText";
import ProductsGrid from "../ProductsGrid";
import RouterBtn from "../RouterBtn";

const Offer = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const featuredUrl = `${BASE_URL}/api/product?features=true&discount=true&limit=4`;
  const latestUrl = `${BASE_URL}/api/product?limit=4`;

  let featuredProducts: any[] = [];
  let latestProducts: any[] = [];
  let errorMessage = "";
  let emptyMessage = "";

  try {
    const [featuredRes, latestRes] = await Promise.all([
      fetch(featuredUrl, { next: { revalidate: 500 }, cache: "force-cache" }),
      fetch(latestUrl, { next: { revalidate: 1000 }, cache: "force-cache" }),
    ]);

    if (!featuredRes.ok || !latestRes.ok) {
      emptyMessage = "لا توجد منتجات متاحة حالياً.";
    }

    const [featuredData, latestData] = await Promise.all([
      featuredRes.json(),
      latestRes.json(),
    ]);

    featuredProducts = featuredData?.data ?? [];
    latestProducts = latestData?.data ?? [];

    if (!featuredProducts.length && !latestProducts.length) {
      emptyMessage = "لا توجد منتجات متاحة حالياً.";
    }
  } catch (error) {
    console.error("❌ Offer section fetch error:", error);
    errorMessage =
      "حدث خطأ أثناء تحميل المنتجات. تأكد من اتصالك بالإنترنت أو حاول لاحقاً.";
  }

  return (
    <section className="section">
      <div className="section-container">
        <div className="py-20 space-y-10 px-4">
          <div className="max-w-6xl mx-auto text-right mb-12">
            <AnimatedText>
              <h3 className="text-3xl md:text-4xl font-cairo font-semibold text-neutral-100 mb-3">
                منتجات مميزة وعروض خاصة
              </h3>
            </AnimatedText>
            <AnimatedText>
              <p className="text-muted-foreground text-base leading-relaxed">
                اكتشف أفضل منتجاتنا المختارة خصيصًا لك، سواء كانت مميزة أو ضمن
                العروض والتخفيضات الحالية، بالإضافة إلى أحدث منتجاتنا من خيرات
                واحة سيوة.
              </p>
            </AnimatedText>
          </div>

          {errorMessage ? (
            <p className="text-center text-red-500 text-lg mt-6 font-cairo">
              {errorMessage}
            </p>
          ) : emptyMessage ? (
            <p className="text-center text-yellow-500 text-lg mt-6 font-cairo">
              {emptyMessage}
            </p>
          ) : (
            <>
              {/* Featured & Discounted */}
              <div className="space-y-6">
                <AnimatedText>
                  <h4 className="text-xl font-cooper font-semibold text-neutral-300 text-center">
                    المنتجات المميزة والعروض المخفضة
                  </h4>
                </AnimatedText>
                <ProductsGrid products={featuredProducts} />
              </div>

              {/* Latest */}
              <div className="space-y-6">
                <AnimatedText>
                  <h4 className="text-xl font-cooper font-semibold text-neutral-300 text-center mt-16">
                    أحدث المنتجات
                  </h4>
                </AnimatedText>
                <ProductsGrid products={latestProducts} />
              </div>
            </>
          )}

          {!errorMessage && !emptyMessage && (
            <div className="w-fit mx-auto text-center">
              <RouterBtn
                cls="px-5 py-1.5 bg-primary text-white rounded-md font-cairo transition duration-200 hover:opacity-90 cursor-pointer hover:underline text-base font-medium"
                path="/products"
              >
                عرض المزيد من المنتجات
              </RouterBtn>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Offer;
