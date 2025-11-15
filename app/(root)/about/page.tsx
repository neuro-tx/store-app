"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Sparkles } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const brandSummary = [
  { en: "Where" },
  { en: "Heritage" },
  { en: "Meets" },
  { en: "Quality" },
  { en: "—" },
  { en: "Bringing" },
  { en: "the Spirit" },
  { en: "of Dar Al Waha" },
  { en: "to Every Home" },
];

const varient = [
  {
    icon: Sparkles,
    title: "التنوع",
    desc: "نقدّم مجموعة متنوعة من المنتجات لتناسب كل الأذواق والاحتياجات اليومية.",
  },
  {
    icon: Leaf,
    title: "الجودة",
    desc: "نهتم بأدق التفاصيل لنقدم لك منتجات طبيعية نقية وممتازة في كل مرة.",
  },
  {
    icon: Users,
    title: "الثقة",
    desc: "نحافظ على علاقة متينة مع عملائنا من خلال الشفافية والاهتمام الحقيقي بتجربتهم.",
  },
];

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full min-h-screen bg-neutral-900 z-10">
      <section className="relative w-full py-24 px-6 lg:px-10 flex flex-col items-center justify-center space-y-10 overflow-hidden">
        <div
          dir="ltr"
          className="flex flex-wrap justify-center gap-6 mt-10 text-center leading-none"
        >
          {brandSummary.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
              className="text-neutral-100 font-bold text-[clamp(1.6rem,4vw,3rem)]"
            >
              {word.en}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-center"
        >
          <Badge>حيث التراث يلتقي الجودة ننقل روح دار الواحة إلى كل منزل</Badge>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-neutral-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-neutral-200">
                من واحة سيوة إلى بيتك
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                بدأت دار الواحة رحلتها مع شغف للحفاظ على تراث واحة سيوة وتقديمه
                بطريقة معاصرة. كل منتج ننتجه يعكس جودة عالية، نكهة أصيلة، وحرصنا
                على التفاصيل لتصل إليك تجربة تجمع بين الأصالة والحداثة.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-64 rounded-2xl shadow-sm overflow-hidden">
                <Image
                  src="/images/about/store-1.jpg"
                  alt="store-interface"
                  width={200}
                  height={200}
                  className="object-cover size-full"
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            className="space-y-10 mt-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="mx-auto max-w-2xl text-center relative before:absolute before:w-full before:h-0.5 before:bg-primary before:right-0 before:top-1/2 before:translate-y-1/2 bg-neutral-900"
              variants={item}
            >
              <span className="bg-neutral-900 relative z-10 px-2 py-1 text-primary font-medium text-2xl font-cooper">
                واجهة المتجر
              </span>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-3"
              variants={container}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  className="h-64 w-full ring-1 ring-ring/50 rounded-xl overflow-hidden group"
                  key={i}
                  variants={item}
                >
                  <Image
                    src={`/images/about/store-${i + 1}.jpg`}
                    alt={`store-img-${i + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover scale-103 group-hover:scale-100 transition-transform duration-200 ease-out"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-neutral-900">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-semibold text-center text-white mb-12"
          >
            قيمنا الأساسية
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {varient.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-neutral-600 bg-neutral-900">
                  <CardContent className="py-10 px-6 text-center space-y-4">
                    <item.icon className="h-10 w-10 mx-auto text-primary" />
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="container mx-auto text-center px-3 md:px-5 py-10 space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold text-emerald-500"
            >
              نسعى دائمًا لتقديم أفضل تجربة ممكنة
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-1 w-28 bg-emerald-500 mx-auto rounded-full"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[clamp(1rem,2.5vw,1.25rem)] text-muted-foreground leading-relaxed"
            >
              نعمل على تحسين كل تفاصيل منتجاتنا وخدماتنا لتحقيق رضا عملائنا،
              ولصنع علامة فارقة في السوق تجمع بين الأصالة والابتكار.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 flex flex-col md:flex-row justify-center gap-6 text-left px-3 text-white"
            >
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✔</span> منتجات
                طبيعية 100%
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✔</span> جودة عالية
                وموثوقة
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✔</span> التزامنا
                بالأصالة في منتجاتنا
              </li>
            </motion.ul>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="container mx-auto text-center space-y-6 py-10 px-3 md:px-5"
          >
            <div className="space-y-3">
              <p className="text-xl text-neutral-300 font-semibold">
                📍 العنوان
              </p>

              <p className="text-muted-foreground">
                نحن متواجدون في:
                <br />
                <span className="font-medium text-white block mt-2">
                  مول وسط البلد {"–"} مدينة النوبارية الجديدة {"–"} محافظة
                  البحيرة
                </span>
              </p>
            </div>
            {/* <div className="w-full h-64 md:h-96 aspect-square rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/images/about/city.jpg"
                alt="city-image"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div> */}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
