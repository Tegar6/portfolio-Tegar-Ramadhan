import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { initGoogleAnalytics, getStoredGaId, logEvent } from './utils/analytics';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { FormationSection } from './components/FormationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { GoogleAnalyticsModal } from './components/GoogleAnalyticsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeSection, setActiveSection] = useState<string>('about');
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [analyticsCount, setAnalyticsCount] = useState(1);

  // Initialize Theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Initialize Google Analytics on mount
  useEffect(() => {
    const gaId = getStoredGaId();
    initGoogleAnalytics(gaId);

    const handleGaEvent = () => {
      setAnalyticsCount((prev) => prev + 1);
    };
    window.addEventListener('ga-event-logged', handleGaEvent);
    return () => window.removeEventListener('ga-event-logged', handleGaEvent);
  }, []);

  // Track active section on scroll for navbar underline highlight
  useEffect(() => {
    const sections = ['about', 'experience', 'formation', 'projects', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0B1017] text-slate-100' : 'bg-[#F3F5F8] text-slate-900'
      }`}
    >
      {/* Navbar Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
        analyticsCount={analyticsCount}
      />

      {/* Main Content Layout */}
      <main>
        {/* Hero Section matching reference image */}
        <Hero theme={theme} />

        {/* Marquee Banner Ticker */}
        <MarqueeTicker theme={theme} />

        {/* About Section matching reference image bottom layout */}
        <AboutSection theme={theme} />

        {/* Experience Section */}
        <ExperienceSection theme={theme} />

        {/* Formation / Education Section */}
        <FormationSection theme={theme} />

        {/* Projects Section */}
        <ProjectsSection theme={theme} />

        {/* Contact Section */}
        <ContactSection theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Google Analytics Modal */}
      <GoogleAnalyticsModal
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
        theme={theme}
      />
    </div>
  );
}
