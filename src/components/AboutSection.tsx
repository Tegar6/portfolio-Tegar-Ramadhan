import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_DATA, TECH_STACK } from "../data/portfolioData";
import { ThemeMode } from "../types";
import {
  CheckCircle2,
  Code2,
  Cpu,
  Layout,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import { logEvent } from "../utils/analytics";
import profileImg from "../data/assets/Fotoprofil.png";

// Import TiltedCard tanpa ekstensi .tsx
import TiltedCard from "./TiltedCard";

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  theme: ThemeMode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation on scroll
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      // Card animation on scroll
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Tahun Pengalaman", value: "2+", icon: Terminal },
    { label: "Proyek Selesai", value: "3+", icon: Code2 },
    { label: "Tingkat Kepuasan", value: "100%", icon: Users },
    { label: "Core Web Vitals", value: "98/100", icon: Sparkles },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading matching image: About. */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className={`font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            About
            <span className="text-[#00E5FF] font-black ml-0.5">.</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Mengenal lebih dekat perjalanan, prinsip pengembangan, dan keahlian
            teknis saya.
          </p>
        </div>

        {/* Content Layout */}
        <div
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Side: TiltedCard Component */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm flex justify-center">
              <TiltedCard
                imageSrc={profileImg}
                altText="Muhammad Tegar Ramadhan"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={20}
                scaleOnHover={1.15}
                showTooltip={true}
              />
            </div>
          </div>

          {/* Right Side Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h3
                className={`text-2xl sm:text-3xl font-bold font-heading leading-tight ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                Frontend Developer{" "}
                <span className="text-[#00E5FF]">
                  building scalable & high-performance applications.
                </span>
              </h3>

              <p
                className={`text-base leading-relaxed ${
                  theme === "dark" ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Saya adalah seorang Mahasiswa S1 Sistem Informasi semester 5 di
                Universitas Gunadarma yang memiliki semangat tinggi untuk
                belajar dan berkontribusi dalam dunia teknologi. Meskipun masih
                dalam proses pembelajaran, Saya memiliki ketertarikan yang
                sangat kuat terhadap bidang frontend dan desain grafis. Saya
                berpengalaman dalam mengerjakan proyek-proyek bebas dari
                internet untuk mengasah skill saya. Saya memiliki fondasi yang
                kuat di bidang teknologi melalui partisipasi aktif dalam kursus
                pemrograman berbasis web (Front-end dan Back-end Developer) di
                VMLepkom, Universitas.
              </p>

              <p
                className={`text-base leading-relaxed ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Hal ini menunjukkan komitmen saya untuk terus belajar dan
                berkembang di lingkungan yang mendukung kreativitas dan
                keterampilan teknis. Selain itu, saya melengkapi kemampuan
                teknis saya dengan keahlian desain grafis, yang saya pelajari
                secara otodidak melalui YouTube dan bimbingan dari teman-teman
                yang lebih berpengalaman. Kombinasi keterampilan teknis dan
                kreativitas visual ini menjadikan saya individu yang serbaguna,
                siap untuk berkontribusi, baik dalam perencanaan sistematis
                maupun kebutuhan presentasi visual.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              {stats.map((st, idx) => {
                const Icon = st.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all hover:border-[#00E5FF]/50 ${
                      theme === "dark"
                        ? "bg-slate-900/60 border-slate-800"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-[#00E5FF] mb-2" />
                    <p className="font-heading font-extrabold text-2xl text-[#00E5FF]">
                      {st.value}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      {st.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};