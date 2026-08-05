import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data/portfolioData";
import { ProjectItem, ThemeMode } from "../types";
import {
  ExternalLink,
  Github,
  Eye,
  Sparkles,
  X,
  ArrowUpRight,
} from "lucide-react";
import { logEvent } from "../utils/analytics";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  theme: ThemeMode;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Web Site", "UI Poster"];

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const handleOpenDemo = (project: ProjectItem) => {
    logEvent("view_project_demo", "portfolio", {
      title: project.title,
      url: project.demoUrl,
    });
    setSelectedProject(project);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading matching style: Projects. */}
        <div className="text-center mb-12">
          <h2
            className={`font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Projects
            <span className="text-[#00E5FF] font-black ml-0.5">.</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Kumpulan hasil karya terbaik dengan implementasi teknologi terkini
            dan desain interaktif.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  logEvent("filter_projects", "engagement", { category: cat });
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#00E5FF] text-slate-950 cyan-glow-sm"
                    : theme === "dark"
                      ? "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                      : "bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`group rounded-2xl border overflow-hidden transition-all duration-300 hover:border-[#00E5FF] hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-slate-900/80 border-slate-800 text-white"
                    : "bg-white border-slate-200 text-slate-900 shadow-sm"
                }`}
              >
                {/* Project Image Preview Frame */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-liniear-to-t from-[#0B1017] via-transparent to-transparent opacity-80" />

                  {/* Category Badge & Metrics */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#00E5FF] text-slate-950">
                      {project.category}
                    </span>
                    {project.metrics && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-cyan-300 backdrop-blur border border-cyan-500/30">
                        {project.metrics}
                      </span>
                    )}
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-[#0B1017]/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button
                      onClick={() => handleOpenDemo(project)}
                      className="px-4 py-2.5 rounded-full bg-[#00E5FF] text-slate-950 font-bold text-xs flex items-center space-x-1.5 hover:bg-[#00cbe4] transition-transform active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>

                    {/* Tombol GitHub HANYA akan dirender jika project.githubUrl ADA dan TIDAK KOSONG */}
                    {project.githubUrl && project.githubUrl !== "" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          logEvent("click_github", "portfolio", {
                            project: project.title,
                          })
                        }
                        className="p-2.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-transform active:scale-95"
                        title="Source Code GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-heading group-hover:text-[#00E5FF] transition-colors">
                      {project.title}
                    </h3>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#00E5FF] transition-colors"
                      title="Direct Link"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack List */}
                  <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-[11px] font-semibold bg-slate-800/80 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-2xl rounded-2xl border p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto ${
              theme === "dark"
                ? "bg-[#0B1017] border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00E5FF]/20 text-[#00E5FF]">
              {selectedProject.category}
            </span>

            <h3 className="text-2xl font-bold font-heading mt-3">
              {selectedProject.title}
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-cyan-950/50 text-cyan-300 border border-cyan-800/40"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center space-x-4 pt-4 border-t border-slate-800">
              {/* Tombol Demo / Preview */}
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#00E5FF] text-slate-950 font-bold text-xs flex items-center space-x-2"
                >
                  <span>
                    {selectedProject.category === "UI Poster"
                      ? "Preview Poster"
                      : "Kunjungi Live App"}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {/* Tombol Source Code (Hanya muncul jika githubUrl ada dan tidak kosong) */}
              {selectedProject.githubUrl &&
                selectedProject.githubUrl !== "" && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 hover:bg-slate-700"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
