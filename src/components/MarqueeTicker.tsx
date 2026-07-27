import React from 'react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiPython, 
  SiJavascript, 
  SiFigma, 
  SiPhp 
} from 'react-icons/si';
import { ThemeMode } from '../types';

interface MarqueeTickerProps {
  theme: ThemeMode;
  speed?: number;       // default 90 (kecepatan animasi dalam detik)
  logoHeight?: number;  // default 60 (tinggi/ukuran logo dalam pixel)
}

// Data Logo
const techLogos = [
  { node: (size: number) => <SiReact size={size} className="text-[#61DAFB]" /> },
  { node: (size: number) => <SiNextdotjs size={size} /> },
  { node: (size: number) => <SiTypescript size={size} className="text-[#3178C6]" /> },
  { node: (size: number) => <SiTailwindcss size={size} className="text-[#06B6D4]" /> },
  { node: (size: number) => <SiPython size={size} className="text-[#3776AB]" /> },
  { node: (size: number) => <SiJavascript size={size} className="text-[#F7DF1E]" /> },
  { node: (size: number) => <SiFigma size={size} className="text-[#F24E1E]" /> },
  { node: (size: number) => <SiPhp size={size} className="text-[#777BB4]" /> },
];

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ 
  theme, 
  speed = 20, 
  logoHeight = 60 
}) => {
  const duplicatedLogos = [
  ...techLogos, ...techLogos, ...techLogos, ...techLogos,
  ...techLogos, ...techLogos, ...techLogos, ...techLogos
];

  return (
    <div
      className={`w-full py-4 overflow-hidden transition-colors ${
        theme === 'dark'
          ? 'bg-[#0B1017] border-slate-800/80 text-slate-300'
          : 'bg-slate-100/90 border-slate-200 text-slate-800'
      }`}
    >
      <div 
        className="animate-marquee flex items-center whitespace-nowrap gap-12"
        style={{ animationDuration: `${speed}s` }} // Mengatur speed=90
      >
        {duplicatedLogos.map((logo, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-center transition-transform hover:scale-110"
            style={{ height: `${logoHeight}px` }} // Mengatur logoHeight=60
          >
            {logo.node(logoHeight)}
          </div>
        ))}
      </div>
    </div>
  );
};