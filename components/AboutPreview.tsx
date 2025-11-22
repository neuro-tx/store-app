"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const brandSummary = [
  "Where",
  "Heritage",
  "Meets",
  "Quality",
  "—",
  "Bringing",
  "the Spirit",
  "of Dar Al Waha",
  "to Every Home",
];

const values = [
  {
    icon: Sparkles,
    title: "التنوع",
    desc: "مجموعة متنوعة تناسب كل الأذواق والاحتياجات.",
  },
  {
    icon: Leaf,
    title: "الجودة",
    desc: "منتجات طبيعية ممتازة ونهتم بأدق التفاصيل.",
  },
  {
    icon: Users,
    title: "الثقة",
    desc: "علاقة متينة مع عملائنا عبر الشفافية والاهتمام.",
  },
];

export default function AboutPreview() {
  return (
    <section className="w-full bg-neutral-900 py-24 px-6 lg:px-10">
      <div className="container mx-auto">
        <div dir="ltr" className="flex flex-wrap justify-center gap-4 text-center mb-10 leading-none">
          {brandSummary.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-neutral-100 font-bold text-[clamp(1.5rem,4vw,3rem)]"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <div className="text-center mb-16">
          <Badge>حيث التراث يلتقي الجودة</Badge>
        </div>

        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-2xl md:text-3xl font-thin text-neutral-200 font-cooper">
              من واحة سيوة إلى بيتك
            </p>
            <p className="text-muted-foreground">
              نقدم تجربة تجمع بين الأصالة والحداثة عبر منتجات طبيعية عالية
              الجودة تعكس روح واحة سيوة واهتمامنا بالتفاصيل.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-center text-white mb-12"
        >
          قيمنا الأساسية
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <Card className="rounded-2xl bg-neutral-900 border border-neutral-700">
                <CardContent className="py-10 px-6 text-center space-y-4">
                  <item.icon className="h-10 w-10 mx-auto text-primary" />
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
