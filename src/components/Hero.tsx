import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { HERO_DATA } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { ArrowRight, Code2, Download, Sparkles, Terminal } from 'lucide-react';
import { logEvent } from '../utils/analytics';

interface HeroProps {
  theme: ThemeMode;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Animation for hero elements on mount
    const ctx = gsap.context(() => {
      gsap.from(textRef.current?.children ? Array.from(textRef.current.children) : [], {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadCV = () => {
    logEvent('download_cv', 'engagement', { fileName: 'Dev_Frontend_Resume.pdf' });
    alert('Mengunduh Resume / CV Dev Frontend Developer...');
  };

  return (
    <section
      ref={heroRef}
      id="about-hero"
      className="relative min-h-[85vh] pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Right Side: Typography matching reference image */}
        <div ref={textRef} className="lg:col-span-12 flex flex-col justify-center space-y-6">
          {/* Main Title: Hi, I'm Tegar. */}
          <div className="space-y-2">
            <h1
              className={`font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              Hi, {HERO_DATA.name} 
              <span className="text-[#00E5FF] inline-block ml-1 font-black">.</span>
            </h1>

            <div className="w-full lg:w-1/2 flex justify-center items-center">
</div>

            {/* Subtitle: Frontend Developer & UI/UX Enthusiast */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-400/90 tracking-tight">
              Frontend Developer
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={() => logEvent('hero_cta_projects', 'engagement')}
              className="px-6 py-3.5 rounded-full bg-[#00E5FF] text-slate-950 font-extrabold text-sm flex items-center space-x-2 hover:bg-[#00cbe4] transition-all transform hover:-translate-y-1 cyan-glow"
            >
              <span>Lihat Proyek</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleDownloadCV}
              className={`px-6 py-3.5 rounded-full border text-sm font-bold flex items-center space-x-2 transition-all hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-[#00E5FF] hover:text-white'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-[#00E5FF] shadow-sm'
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