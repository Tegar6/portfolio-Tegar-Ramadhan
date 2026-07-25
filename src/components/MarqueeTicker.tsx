import React from 'react';
import { MARQUEE_ITEMS } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface MarqueeTickerProps {
  theme: ThemeMode;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ theme }) => {
  // Duplicate array for seamless infinite marquee loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className={`w-full py-4 overflow-hidden border-y transition-colors ${
        theme === 'dark'
          ? 'bg-[#0B1017] border-slate-800/80 text-slate-300'
          : 'bg-slate-100/90 border-slate-200 text-slate-800'
      }`}
    >
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-6 mx-4">
            <span className="font-heading font-extrabold text-sm sm:text-base tracking-wider uppercase">
              {item}
            </span>
            <span className="text-[#00E5FF] font-bold text-base sm:text-lg select-none">
              /
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
