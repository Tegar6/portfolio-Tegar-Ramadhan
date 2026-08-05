import React from "react";
import { HERO_DATA } from "../data/portfolioData";
import { ThemeMode } from "../types";
import { ArrowRight, Download } from "lucide-react";
import { logEvent } from "../utils/analytics";
import { DiaTextReveal } from "./dia-text-reveal.tsx"; // Sesuaikan path komponen kamu

interface HeroProps {
  theme: ThemeMode;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const handleDownloadCV = () => {
    logEvent("download_cv", "engagement", {
      fileName: "CV_Muhammad_Tegar_Ramadhan.pdf",
    });

    const cvUrl = "/CV_Muhammad_Tegar_Ramadhan.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "CV_Muhammad_Tegar_Ramadhan.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about-hero"
      className="relative min-h-[85vh] pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-12 flex flex-col justify-center space-y-6">
          
          {/* Main Title */}
          <div className="space-y-3">
            {/* Baris 1: Hi, Muhammad Tegar Ramadhan. (Titik langsung dimasukkan ke dalam prop text) */}
            <h1
              className={`font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight flex flex-wrap items-center gap-x-3 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              <DiaTextReveal
                text={`Hi, ${HERO_DATA.name}.`}
                colors={["#00E5FF", "#3B82F6", "#00E5FF"]}
                delay={0} // Berjalan bersamaan di delay 0
              />
            </h1>

            {/* Baris 2: Frontend Developer */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <DiaTextReveal
                text="Frontend Developer"
                colors={["#94A3B8", "#00E5FF", "#94A3B8"]}
                className="text-slate-400/90"
                delay={0} // Set ke 0 agar muncul serentak bersama baris pertama
              />
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={() => logEvent("hero_cta_projects", "engagement")}
              className="px-6 py-3.5 rounded-full bg-[#00E5FF] text-slate-950 font-extrabold text-sm flex items-center space-x-2 hover:bg-[#00cbe4] transition-all transform hover:-translate-y-1 cyan-glow"
            >
              <span>Lihat Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleDownloadCV}
              className={`px-6 py-3.5 rounded-full border text-sm font-bold flex items-center space-x-2 transition-all hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-slate-900/80 border-slate-700 text-slate-200 hover:border-[#00E5FF] hover:text-white"
                  : "bg-white border-slate-300 text-slate-800 hover:border-[#00E5FF] shadow-sm"
              }`}
            >
              <Download className="w-4 h-4 text-[#00E5FF]" />
              <span>Unduh CV</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
