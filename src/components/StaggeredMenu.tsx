import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  href: string;
}

interface StaggeredMenuProps {
  isOpen: boolean;
  navLinks: MenuItem[];
  onNavClick: (name: string, href: string) => void;
  theme: 'dark' | 'light';
  onOpenAnalytics: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  isOpen,
  navLinks,
  onNavClick,
  theme,
  onOpenAnalytics,
}) => {
  // Variasi animasi container drawer
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'calc(100vh - 70px)',
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.1, // Jeda antar item (efek Staggered)
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  // Variasi animasi tiap teks link
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`md:hidden fixed inset-x-0 top-[70px] z-40 px-8 py-8 flex flex-col justify-between overflow-hidden backdrop-blur-2xl border-t ${
            theme === 'dark'
              ? 'bg-[#0B1017]/95 border-slate-800 text-white'
              : 'bg-white/95 border-slate-200 text-slate-900'
          }`}
        >
          {/* Daftar Link Navigasi Staggered */}
          <div className="flex flex-col space-y-6 pt-2">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                variants={itemVariants}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(link.name, link.href);
                }}
                className="text-3xl font-extrabold tracking-tight flex items-center justify-between group"
              >
                <span className="group-hover:text-[#00E5FF] transition-colors">
                  {link.name}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  0{idx + 1}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Tombol Aksi di Bagian Bawah */}
          <motion.div variants={itemVariants} className="pt-6 border-t border-slate-800/80 flex flex-col space-y-3">
            <button
              onClick={onOpenAnalytics}
              className="w-full py-3 px-4 rounded-xl bg-cyan-950/40 text-cyan-300 border border-cyan-800/50 text-sm font-semibold flex justify-between items-center"
            >
              <span>Google Analytics Manager</span>
              <span className="text-xs bg-[#00E5FF] text-black px-2 py-0.5 rounded-full font-bold">GA4</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavClick('Contact', '#contact');
              }}
              className="w-full text-center py-3.5 bg-[#00E5FF] text-slate-950 font-black rounded-xl text-sm"
            >
              Hubungi Saya
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};