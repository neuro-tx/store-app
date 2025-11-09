"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

interface ImageRevealProps {
  source: string;
  imgAlt: string;
  classVals?: string;
  spring?: boolean;
}

const ImageReveal: React.FC<ImageRevealProps> = ({
  source,
  classVals = "",
  imgAlt,
  spring = true,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 87%", "end 70%"],
  });

  const smoothProgress = spring
    ? useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 20,
        mass: 0.5,
      })
    : scrollYProgress;

  const clipPath = useTransform(
    smoothProgress,
    [0.25, 1],
    [
      "polygon(0 0, 100% 0, 100% 0, 0 0)",
      "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ]
  );

  return (
    <motion.div
      ref={elementRef}
      style={{ clipPath }}
      className={`overflow-hidden ${classVals}`}
    >
      <Image
        src={source}
        alt={imgAlt}
        width={560}
        height={500}
        className="w-full h-full object-cover rounded-xl"
        priority
      />
    </motion.div>
  );
};

export default ImageReveal;
