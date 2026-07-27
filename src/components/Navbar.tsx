import React, { useState, useEffect } from 'react';
import { Sun, Moon, BarChart2, Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeMode } from '../types';
import { logEvent } from '../utils/analytics';
import { StaggeredMenu } from './StaggeredMenu';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  activeSection: string;
  onOpenAnalytics: () => void;
  analyticsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  activeSection,
  onOpenAnalytics,
  analyticsCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Formation', href: '#formation' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (name: string, href: string) => {
    logEvent('nav_click', 'navigation', { target: name });
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-[#0B1017]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo matching image: Dev / */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            logEvent('logo_click', 'navigation');
          }}
          className="group flex items-center space-x-1 font-heading text-2xl md:text-3xl font-extrabold tracking-tight transition-transform active:scale-95"
        >
          <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Tegar</span>
          <span className="text-[#00E5FF] font-bold transition-transform group-hover:translate-x-1">
            /
          </span>
        </a>

        {/* Desktop Navigation matching layout */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name.toLowerCase();
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.name, link.href);
                }}
                className={`relative text-sm font-medium tracking-wide transition-colors py-1 ${
                  isActive
                    ? theme === 'dark'
                      ? 'text-white'
                      : 'text-slate-900'
                    : theme === 'dark'
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-2px bg-[#00E5FF] rounded-full cyan-glow-sm transition-all duration-300" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions: Dark/Light Mode, Analytics Badge, CTA (SAMA / TIDAK DIUBAH) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* GA4 Button */}
          <button
            onClick={() => {
              logEvent('open_ga_dashboard', 'analytics');
              onOpenAnalytics();
            }}
            title="Google Analytics Tracking Manager"
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              theme === 'dark'
                ? 'bg-slate-900/80 text-cyan-300 border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800'
                : 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>GA4 Active</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-[#00E5FF] text-slate-950 font-bold rounded-full">
              {analyticsCount}
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              toggleTheme();
              logEvent('theme_toggle', 'user_preference', { newTheme: theme === 'dark' ? 'light' : 'dark' });
            }}
            className={`p-2 rounded-full transition-all border ${
              theme === 'dark'
                ? 'bg-slate-800/80 text-amber-400 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            aria-label="Toggle dark/light mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Contact', '#contact');
            }}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-full bg-[#00E5FF] text-slate-950 hover:bg-[#00cbe4] transition-all transform hover:-translate-y-0.5 cyan-glow-sm"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-slate-800 text-amber-400 border-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenAnalytics}
            className="p-2 rounded-lg border bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00E5FF]"
          >
            <BarChart2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border transition-transform active:scale-95 ${
              theme === 'dark'
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-slate-100 text-slate-900 border-slate-200'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Disisipkan Komponen StaggeredMenu dari React Bits Khusus Mobile */}
      <StaggeredMenu
        isOpen={mobileMenuOpen}
        navLinks={navLinks}
        onNavClick={handleNavClick}
        theme={theme}
        onOpenAnalytics={() => {
          setMobileMenuOpen(false);
          onOpenAnalytics();
        }}
      />
    </header>
  );
};