import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue } from "motion/react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface DiaTextRevealProps {
  text: string;
  colors?: string[];
  className?: string;
  delay?: number;
  duration?: number;
}

const DEFAULT_COLORS = ["#00E5FF", "#3B82F6", "#00E5FF"];
const BAND_HALF = 20;

const sweepEase = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

function buildGradient(pos: number, colors: string[]) {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;

  if (bandEnd <= 0 || bandStart >= 100) {
    return `linear-gradient(90deg, currentColor 0%, currentColor 100%)`;
  }

  const p1 = Math.max(0, bandStart).toFixed(2);
  const p2 = Math.min(100, Math.max(0, pos)).toFixed(2);
  const p3 = Math.min(100, bandEnd).toFixed(2);

  return `linear-gradient(90deg, currentColor 0%, currentColor ${p1}%, ${colors[0]} ${p1}%, ${colors[1]} ${p2}%, ${colors[2]} ${p3}%, currentColor ${p3}%, currentColor 100%)`;
}

export const DiaTextReveal: React.FC<DiaTextRevealProps> = ({
  text,
  colors = DEFAULT_COLORS,
  className,
  delay = 0,
  duration = 1.2,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1, once: false });

  const sweepPos = useMotionValue(-BAND_HALF);
  
  const [background, setBackground] = useState<string>(
    "linear-gradient(90deg, currentColor 0%, currentColor 100%)"
  );

  useEffect(() => {
    if (isInView) {
      sweepPos.set(-BAND_HALF);
      const controls = animate(sweepPos, 100 + BAND_HALF, {
        duration: duration,
        delay: delay,
        ease: sweepEase,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5,
        onUpdate: (latest) => {
          setBackground(buildGradient(latest, colors));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, colors, delay, duration]);

  return (
    <motion.span
      ref={containerRef}
      className={cn("inline-block font-bold leading-tight", className)}
      style={{
        backgroundImage: background,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {text}
    </motion.span>
  );
};