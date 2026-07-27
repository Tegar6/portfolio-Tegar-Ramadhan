import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface FooterProps {
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`py-12 border-t transition-colors ${
        theme === 'dark'
          ? 'bg-[#0B1017] border-slate-800 text-slate-400'
          : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div className="flex items-center space-x-2 font-heading font-bold text-xl">
          <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Tegar</span>
          <span className="text-[#00E5FF]">/</span>
          <span className="text-xs font-mono font-normal text-slate-500 ml-2">
            © {new Date().getFullYear()} All Rights Reserved.
          </span>
        </div>

        {/* Right Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`p-3 rounded-full border transition-all hover:scale-110 active:scale-95 ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-white hover:border-[#00E5FF]'
              : 'bg-white border-slate-200 text-slate-900 hover:border-[#00E5FF] shadow-sm'
          }`}
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="w-4 h-4 text-[#00E5FF]" />
        </button>
      </div>
    </footer>
  );
};
