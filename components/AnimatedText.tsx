"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, MotionProps } from "framer-motion";

interface AnimatedTextProps extends MotionProps {
  children: React.ReactElement;
  stagger?: number;
  custom?: {
    from: Record<string, any>;
    to: Record<string, any>;
  };
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  stagger = 0.04,
  custom = { from: { y: 50, opacity: 0 }, to: { y: 0, opacity: 1 } },
  ...motionProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [textParts, setTextParts] = useState<string[]>([]);

  useEffect(() => {
    if (
      children.props?.children &&
      typeof children.props.children === "string"
    ) {
      const text = children.props.children.trim();
      const parts = text.split(/(\s+)/);
      setTextParts(parts);
    } else {
      console.warn("AnimatedText: child element must contain plain text only.");
    }
  }, [children]);

  const animatedChildren = React.useMemo(
    () =>
      textParts.map((part, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={custom.from}
          animate={isInView && custom.to}
          transition={{
            duration: 0.6,
            delay: i * stagger,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          {...motionProps}
        >
          {part}
        </motion.span>
      )),
    [textParts, custom, motionProps, stagger]
  );

  const clonedElement = React.cloneElement(children, {
    ref: containerRef,
    children: animatedChildren,
  });

  return clonedElement;
};

export default AnimatedText;
