import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FORMATIONS } from "../data/portfolioData";
import { ThemeMode } from "../types";
import { GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FormationSectionProps {
  theme: ThemeMode;
}

export const FormationSection: React.FC<FormationSectionProps> = ({
  theme,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!FORMATIONS || FORMATIONS.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Animasi Header
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // 2. Animasi Cards Grid (Dengan clearProps)
      if (cardsRef.current && cardsRef.current.children.length > 0) {
        const cards = Array.from(cardsRef.current.children);

        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            clearProps: "all", // Menghapus inline style GSAP setelah animasi selesai
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="formation"
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div ref={headerRef} className="text-center mb-10">
          <h2
            className={`font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Formation
            <span className="text-[#00E5FF] font-black ml-0.5">.</span>
          </h2>
          <p
            className={`mt-3 text-sm sm:text-base max-w-xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Latar belakang pendidikan formal, sertifikasi profesional, dan
            kursus teknis.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FORMATIONS &&
            FORMATIONS.map((form) => (
              <div
                key={form.id}
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:border-[#00E5FF] hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-slate-900/80 border-slate-800 text-white"
                    : "bg-white border-slate-200 text-slate-900 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center border border-[#00E5FF]/20">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    {form.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00E5FF]/15 text-[#00E5FF]">
                        {form.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold font-heading mt-5">
                    {form.title}
                  </h3>

                  {/* Nama Institusi: Gunakan text-cyan-600 untuk mode terang agar kontras & terbaca */}
                  <p
                    className={`text-sm font-semibold mt-1 ${
                      theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  >
                    {form.institution}
                  </p>

                  {/* Tahun/Periode */}
                  <p
                    className={`text-xs mt-0.5 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {form.period}
                  </p>

                  {/* Deskripsi: Gunakan text-slate-600 di mode terang */}
                  <p
                    className={`mt-4 text-xs leading-relaxed ${
                      theme === "dark" ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {form.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
