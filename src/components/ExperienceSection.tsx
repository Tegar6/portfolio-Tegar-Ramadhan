import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceSectionProps {
  theme: ThemeMode;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ theme }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.children ? Array.from(timelineRef.current.children) : [];
      items.forEach((item) => {
        gsap.from(item as Element, {
          scrollTrigger: {
            trigger: item as Element,
            start: 'top 85%',
          },
          opacity: 0,
          x: -30,
          duration: 0.9,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading matching style: Experience. */}
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Experience
            <span className="text-[#00E5FF] font-black ml-0.5">.</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Realisasi ide menjadi produk digital, mulai dari sistem informasi web interaktif hingga desain visual UI dan poster.
          </p>
        </div>

        {/* Timeline List */}
        <div ref={timelineRef} className="max-w-4xl mx-auto space-y-8 relative">
          {/* Vertical line indicator */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#00E5FF] via-cyan-500/40 to-transparent pointer-events-none" />

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative pl-12 sm:pl-20 group">
              {/* Timeline Dot */}
              <div className="absolute left-2.5 sm:left-6.5 top-2 w-3.5 h-3.5 rounded-full bg-[#00E5FF] ring-4 ring-[#00E5FF]/20 group-hover:scale-125 transition-transform" />

              {/* Experience Card */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:border-[#00E5FF]/60 hover:shadow-xl ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/60">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#00E5FF]/20 text-[#00E5FF]">
                      {exp.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading mt-2">{exp.role}</h3>
                    <p className="text-sm font-medium text-cyan-400">{exp.company}</p>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs text-slate-400 space-y-1">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-300 leading-relaxed">{exp.description}</p>

                {/* Achievements */}
                <div className="mt-4 space-y-2">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        theme === 'dark'
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
