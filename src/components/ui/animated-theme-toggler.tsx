"use client";

import React, { useRef } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

export interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  isDark?: boolean;
  onToggle?: () => void;
}

export function AnimatedThemeToggler({
  isDark = false,
  onToggle,
  className = "",
  ...props
}: AnimatedThemeTogglerProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Fallback jika browser tidak mendukung
    if (!document.startViewTransition) {
      if (onToggle) onToggle();
      return;
    }

    // 1. Dapatkan koordinat klik
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = e.clientX ?? (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
    const y = e.clientY ?? (rect ? rect.top + rect.height / 2 : window.innerHeight / 2);

    // 2. Hitung radius akhir yang menutupi seluruh layar
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 3. Jalankan View Transition
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        if (onToggle) onToggle(); // Tema berubah di sini
      });
    });

    // 4. Setelah DOM diperbarui, jalankan animasi pada clip-path
    transition.ready.then(() => {
      // Bentuk Lingkaran
      const circleStart = `circle(0px at ${x}px ${y}px)`;
      const circleEnd = `circle(${endRadius}px at ${x}px ${y}px)`;

      /* 
        LOGIKA YANG DISEDUHANAKAN:
        Kita SELALU menganimasikan layer `new` (pseudoElement: "::view-transition-new(root)")
        untuk mekar dari titik klik [circleStart, circleEnd].
        
        Karena CSS kita sudah memaksa layer `new` di atas, animasi ini akan
        terlihat konsisten baik saat pindah ke Dark Mode maupun Light Mode.
      */
      document.documentElement.animate(
        {
          clipPath: [circleStart, circleEnd],
        },
        {
          duration: 500, // Sesuaikan durasi (dalam ms)
          easing: "ease-out", // Gunakan ease-out agar terasa lebih responsif saat mekar
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className={`p-2 rounded-xl border transition-all ${
        isDark
          ? "bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700"
          : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
      } ${className}`}
      aria-label="Toggle theme"
      {...props}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}