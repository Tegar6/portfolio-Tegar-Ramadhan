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

          {/* Tech Stack Icons Row matching reference image: 5 3 Figma JS Git */}
          <div className="pt-2 flex items-center space-x-4 sm:space-x-5 flex-wrap gap-y-3">
            {/* Python Icon */}
            <div
              title="Python"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-700 hover:border-[#3776AB]'
                  : 'bg-white border-slate-300 hover:border-[#3776AB] shadow-sm'
              }`}
            >
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                alt="Python" 
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
            </div>

            {/* PHP Icon */}
            <div
              title="PHP"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-700 hover:border-[#777BB4]'
                  : 'bg-white border-slate-300 hover:border-[#777BB4] shadow-sm'
              }`}
            >
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" 
                alt="PHP" 
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
            </div>

            {/* Figma Icon */}
            <div
              title="Figma"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-700 text-white hover:border-[#F24E1E]'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-[#F24E1E] shadow-sm'
              }`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 38 57" fill="none">
                <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#FF7262"/>
                <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#1ABCFE"/>
                <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
              </svg>
            </div>

            {/* JS Icon */}
            <div
              title="JavaScript"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-700 text-white hover:border-[#F7DF1E]'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-[#F7DF1E] shadow-sm'
              }`}
            >
              <div className="px-1.5 py-0.5 rounded bg-[#F7DF1E] text-black font-extrabold text-xs sm:text-sm tracking-tighter">
                JS
              </div>
            </div>

            {/* SQL Icon */}
            <div
              title="SQL / Database"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-700 text-white hover:border-[#00E5FF]'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-[#00E5FF] shadow-sm'
              }`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E5FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
            </div>
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