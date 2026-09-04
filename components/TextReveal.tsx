"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  as?: keyof typeof motion;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
};

/** Line-masked heading reveal using Framer Motion whileInView */
export default function TextReveal({
  children,
  className,
  delay = 0,
  style,
}: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
