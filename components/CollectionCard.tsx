"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface CollectionProp {
  name: string;
  description: string;
  image: string | string[];
}

const CollectionCard = ({
  category,
  index,
}: {
  category: CollectionProp;
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  const imageSrc = (source: string | string[], idx = 0): string => {
    if (Array.isArray(source)) {
      return source[idx] ?? source[0] ?? "";
    }
    return source;
  };

  const enable = () => setHovered(true);
  const disable = () => setHovered(false);

  return (
    <motion.div
      initial={{ y: 40, opacity: 0, scale: 0.95 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="flex flex-col gap-4 cursor-pointer lg:gap-5 px-3 lg:px-4 pt-3 lg:pt-4 pb-5 lg:pb-6 rounded-xl lg:rounded-2xl bg-neutral-900 group relative overflow-hidden">
        <div
          className={`relative ${
            hovered ? "group hovered" : "group"
          } rounded-lg lg:rounded-xl overflow-hidden select-none  w-full h-[260px] md:h-[350px] lg:h-[clamp(470px,32vw,580px)]`}
          onMouseEnter={enable}
          onMouseLeave={disable}
          onTouchStart={enable}
          onTouchEnd={disable}
          onTouchCancel={disable}
        >
          <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-md z-10 opacity-0 group-[.hovered]:opacity-100 transition-opacity duration-500 ease-in-out" />

          <Image
            src={imageSrc(category.image, 0)}
            alt={category.name}
            width={500}
            height={500}
            className="absolute top-1/2 -translate-y-1/12 left-1/2 -translate-x-1/2 w-[clamp(300px,65%,600px)] h-[90%] md:h-auto rounded-lg object-cover z-20 [clip-path:polygon(30%_50%,70%_50%,70%_50%,30%_50%)] group-[.hovered]:[clip-path:polygon(0_100%,100%_100%,100%_0,0_0)] group-[.hovered]:-translate-y-6/12 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
          />

          <div ref={containerRef} className="w-full h-full">
            <motion.div
              className="absolute inset-0 w-full h-[120%] -top-[10%] lg:-top-[15%]"
              style={{ y }}
            >
              <Image
                src={imageSrc(category.image, 1)}
                alt={category.name}
                width={500}
                height={500}
                className="object-cover w-full h-full scale-105 group-[.hovered]:scale-100 transition-transform duration-500 ease-in-out"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4">
          <div className="flex justify-between items-center w-full relative">
            <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-100 tracking-wide font-cooper">
              {category.name}
            </p>
          </div>

          <div className="flex justify-center items-center h-4 md:h-4.5 overflow-hidden relative w-full">
            <div className="absolute left-0 h-full w-8 lg:w-10 bg-linear-to-r from-neutral-900/95 to-neutral-200/0 z-10" />
            <div className="absolute right-0 h-full w-8 lg:w-10 bg-linear-to-l from-neutral-900/95 to-neutral-200/0 z-10" />

            <div className="flex overflow-hidden py-1.5">
              <motion.p
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className={
                  "text-sm md:text-base tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5"
                }
              >
                {category.description}
              </motion.p>
              <motion.p
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className={
                  "text-sm md:text-base tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5"
                }
              >
                {category.description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionCard;
