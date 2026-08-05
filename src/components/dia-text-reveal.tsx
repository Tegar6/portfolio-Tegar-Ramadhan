import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
} from "motion/react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface DiaTextRevealProps {
  text: string;
  colors?: string[];
  className?: string;
  delay?: number;
}

const DEFAULT_COLORS = ["#00E5FF", "#3B82F6", "#00E5FF"];
const BAND_HALF = 17;

const sweepEase = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

function buildGradient(pos: number, colors: string[], textColor: string) {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  }

  const p1 = Math.max(0, bandStart).toFixed(2);
  const p2 = Math.min(100, Math.max(0, pos)).toFixed(2);
  const p3 = Math.min(100, bandEnd).toFixed(2);

  return `linear-gradient(90deg, ${textColor} 0%, ${textColor} ${p1}%, ${colors[0]} ${p1}%, ${colors[1]} ${p2}%, ${colors[2]} ${p3}%, ${textColor} ${p3}%, ${textColor} 100%)`;
}

export const DiaTextReveal: React.FC<DiaTextRevealProps> = ({
  text,
  colors = DEFAULT_COLORS,
  className,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { amount: 0, once: true });

  const sweepPos = useMotionValue(-BAND_HALF);
  
  // SOLUSI 1: Ubah nilai default background agar tidak "transparent" saat di-load di mobile
  const [background, setBackground] = useState<string>(
    `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(sweepPos, 100 + BAND_HALF, {
        duration: 1.5,
        delay: delay,
        ease: sweepEase,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5,
        onUpdate: (latest) => {
          setBackground(buildGradient(latest, colors, "currentColor"));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, colors, delay]);

  return (
    <motion.span
      ref={containerRef}
      // SOLUSI 2: Gunakan "inline" & "max-w-full" agar rendering teks di mobile selalu pas
      className={cn("inline relative font-bold max-w-full leading-tight", className)}
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