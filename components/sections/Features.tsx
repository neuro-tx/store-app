"use client";

import { motion } from "framer-motion";
import React from "react";
import { ShieldCheck, Leaf, Globe, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AnimatedText from "../AnimatedText";

const Features = () => {
  const featData = [
    {
      icon: ShieldCheck,
      title: "جودة مضمونة",
      description:
        "نختار منتجاتنا بعناية من أجود المصادر لضمان حصولك على تجربة أصيلة وموثوقة في كل مرة.",
    },
    {
      icon: Leaf,
      title: "منتجات طبيعية",
      description:
        "نؤمن أن الجمال والنكهة الحقيقية تأتي من الطبيعة — لذلك نقدم منتجات خالية من الإضافات الصناعية.",
    },
    {
      icon: Store,
      title: "أصالة دار الواحة",
      description:
        "متجر دار الواحة يجمع بين التراث والحداثة لتقديم أفضل المنتجات الطبيعية من قلب سيوة، محافظاً على جودة وأصالة كل منتج.",
    },
    {
      icon: Globe,
      title: "منتجات طبيعية محلية",
      description:
        "نختار منتجاتنا بعناية من مزارع وواحات سيوة الأصلية لضمان تجربة أصيلة وموثوقة لكل عميل.",
    },
  ];

  return (
    <section className="relative w-full bg-neutral-100 py-20 px-5 md:px-6 lg:px-8 overflow-x-hidden">
      <div className="text-right bg-neutral-900 rounded-2xl lg:rounded-3xl">
        <div className="py-20 space-y-10">
          <div className="text-center mb-12 max-w-3xl mx-auto px-5 md:px-8">
            <AnimatedText>
              <h2 className="text-3xl md:text-4xl font-cairo font-semibold text-neutral-100 mb-3">
                لماذا نحن؟
              </h2>
            </AnimatedText>
            <AnimatedText>
              <p className="text-muted-foreground text-base leading-relaxed">
                نلتزم بالجودة، الأصالة، والمنتجات الطبيعية لنقدم لك تجربة فريدة
                تشعرك بالثقة في كل اختيار.
              </p>
            </AnimatedText>
          </div>

          <motion.div
            className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 px-8 md:px-10 rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
          >
            {featData.map((card, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="text-center bg-[oklab(21.779% 0 -0.00002)] border-neutral-700">
                  <CardHeader>
                    <CardDecorator>{<card.icon />}</CardDecorator>
                    <CardTitle className="text-neutral-100">{card.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="text-neutral-400">{card.description}</CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)] ">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-neutral-950 absolute inset-0 m-auto flex size-12 items-center justify-center text-white border-[#404040] border-l border-t">
      {children}
    </div>
  </div>
);

export default Features;
