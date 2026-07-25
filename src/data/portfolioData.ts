import { ExperienceItem, FormationItem, ProjectItem, TechItem } from "../types";
import project1Img from "./assets/LaporanWarga.webp";
import project2mg from "./assets/UI Poster.webp";

export const HERO_DATA = {
  name: "Muhammad Tegar Ramadhan",
  title: "Hi, I'm Muhammad Tegar Ramadhan.",
  role: "Frontend Dev",
  subtitle: "Web Developer transitioning to a career in technology.",
  bio: "Seorang Frontend Developer passionately crafting pixel-perfect, responsive, and high-performance web applications using modern web technologies like React, Next.js, Tailwind CSS, and GSAP.",
  location: "Indonesia",
  availableForHire: true,
};

export const TECH_STACK: TechItem[] = [
  {
    name: "Python",
    category: "frontend",
    icon: "python",
    level: 95,
    color: "#3776ab",
  },
  {
    name: "Golang",
    category: "frontend",
    icon: "golang",
    level: 90,
    color: "#1572B6",
  },
  {
    name: "Figma",
    category: "design",
    icon: "figma",
    level: 88,
    color: "#F24E1E",
  },
  {
    name: "JavaScript",
    category: "frontend",
    icon: "javascript",
    level: 92,
    color: "#F7DF1E",
  },
  { name: "Git", category: "tools", icon: "git", level: 85, color: "#F05032" },
  {
    name: "React.js",
    category: "frontend",
    icon: "react",
    level: 90,
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    category: "frontend",
    icon: "typescript",
    level: 88,
    color: "#3178C6",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    icon: "tailwind",
    level: 95,
    color: "#06B6D4",
  },
  {
    name: "Next.js",
    category: "frontend",
    icon: "nextjs",
    level: 85,
    color: "#000000",
  },
  {
    name: "GSAP",
    category: "tools",
    icon: "gsap",
    level: 82,
    color: "#88CE02",
  },
];

export const MARQUEE_ITEMS = [
  "WEB",
  "PROGRAMMING",
  "DEVELOPMENT",
  "JAVASCRIPT",
  "Golang",
  "FIGMA",
  "GIT",
  "PYTHON",
  "REACT.JS",
  "NEXT.JS",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "GSAP",
  "FRAMER MOTION",
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Frontend Developer & UI Poster",
    company: "Tech Studio Labs",
    period: "2024 - Present",
    location: "Jakarta (Remote)",
    type: "Full-time",
    description:
      "Memimpin pengembangan antarmuka web modern dengan arsitektur scalable, optimasi animasi GSAP/Framer Motion, serta pengujian responsif lintas perangkat.",
    achievements: [
      "Meningkatkan performa Core Web Vitals hingga 98/100 pada Lighthouse.",
      "Mengimplementasikan sistem desain modular berbasis Tailwind CSS dan Storybook.",
      "Mengintegrasikan Google Analytics 4 event tracking untuk 12+ produk digital.",
    ],
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Figma",
    ],
  },
  {
    id: "exp-2",
    role: "Junior Web Developer",
    company: "Digital Solutions ID",
    period: "2023 - 2024",
    location: "Bandung",
    type: "Contract",
    description:
      "Mengembangkan dashboard analitik dan landing page interaktif dengan fitur Dark/Light mode, SEO-friendly SSR, serta dynamic animations.",
    achievements: [
      "Membangun 15+ landing page klien dengan tingkat konversi naik 35%.",
      "Mengurangi bundle size JavaScript sebesar 40% menggunakan code splitting.",
    ],
    techStack: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Git"],
  },
  {
    id: "exp-3",
    role: "UI Poster & Frontend Apprentice",
    company: "Innovation Bootcamp",
    period: "2022 - 2023",
    location: "Indonesia",
    type: "Freelance",
    description:
      "Transisi karir ke dunia teknologi dengan mendalami desain antarmuka Figma dan implementasi kode frontend yang presisi pixel-perfect.",
    achievements: [
      "Menyelesaikan 10+ proyek portofolio dengan fokus pada aksesibilitas dan kemudahan penggunaan.",
    ],
    techStack: ["Figma", "HTML5", "CSS3", "JavaScript"],
  },
];

export const FORMATIONS: FormationItem[] = [
  {
    id: "edu-2",
    title: "IPS (Ilmu Pengetahuan Sosial)",
    institution: "SMAN 1 Jonggol",
    period: "2018 - 2021",
    description:
      "Lulus dengan fokus pembelajaran pada Ilmu Pengetahuan Sosial, Mengembangkan dasar kemampuan analisis, komunikasi, dan kerja sama tim.",
    badge: "SMA / Sederajat",
    skillsLearned: [
      "Berfikir Kritis",
      "komunikasi",
      "Kerja Sama Tim",
      "Dasar analisis",
    ],
  },
  {
    id: "form-2",
    title: "Mahasiswa aktif Sistem Informasi",
    institution: "Universitas Gunadarma",
    period: "2024 - Sekarang",
    description:
      "Fokus pada Algoritma, Pemrograman Web, Rekayasa Perangkat Lunak, dan Interaksi Manusia & Komputer (HCI).",
    badge: "Study Program",
    skillsLearned: [
      "Php",
      "Java",
      "Python",
      "javascript",
      "UI Poster",
      "Database Design",
      "Golang",
    ],
  },
  {
    id: "form-3",
    title: "Fullstack Web & Interaction Design Intensive",
    institution: "KodeLab Academy",
    period: "2023",
    description:
      "Pelatihan teknis mandiri animasi web (GSAP, Framer Motion, Three.js dasar), Tailwind CSS mastery, dan optimasi SEO Next.js.",
    badge: "Specialized Certification",
    skillsLearned: [
      "GSAP Animations",
      "Framer Motion",
      "Tailwind CSS",
      "SEO Optimization",
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  //Projects One
  {
    id: "proj-1",
    title: "Web Laporan Warga",
    category: "Web Site",
    description:
      "Sistem pelaporan warga digital dengan Role-Based Access Control (RBAC) yang mempermudah warga menyampaikan keluhan dan membantu pengurus RT mengelola arsip secara real-time.",
    image: project1Img,
    techStack: ["PHP", "HTML", "Tailwind", "JAVA SCRIPT", "SQL"],
    demoUrl:
      "https://ais-dev-xb3fnvziu5zn23a4irm4qi-699444241829.asia-east1.run.app",
    githubUrl: "https://github.com/Tegar6/Web-Laporan-Warga",
    featured: true,
    metrics: "Core Web Vitals 99 / 100",
  },
  //Projects Two
  {
    id: "proj-2",
    title: "Gudang Ototmatis",
    category: "Web Site",
    description:
      "Sistem Manajemen Gudang (WMS) adalah aplikasi desktop berbasis Java Swing dengan antarmuka modern FlatLaf Dark Mode. Aplikasi ini mengimplementasikan konsep Object-Oriented Programming (OOP), Multithreading, dan Synchronization untuk mensimulasikan serta memantau alur keluar-masuk barang secara real-time.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    techStack: ["Java Swing"],
    demoUrl: "#",
    githubUrl: "https://github.com/Tegar6/gudang-ototmatis",
    featured: true,
    metrics: "10k+ Daily Active Users",
  },
  //Projects Three
  {
    id: "proj-3",
    title: "Poster Makanan",
    category: "UI Poster",
    description:
      'Poster ini adalah desain promosi bergaya modern untuk menu "Spicy Original Hamburger". Visualnya berfokus pada gambar burger berlapis yang detail dan menggugah selera, didukung oleh tipografi tebal yang mencolok.',
    image: project2mg,
    techStack: ["Figma"],
    demoUrl: project2mg, // Diisi variabel gambar poster agar saat diklik Preview langsung membuka gambarnya
    featured: true,
    metrics: "40+ Components Library",
  },
  //Projects Four
  {
    id: "proj-4",
    title: "Aether Mobile Commerce App",
    category: "Mobile",
    description:
      "Aplikasi belanja modern dengan checkout cepat, efek micro-interactions animasi, serta navigasi gesture yang intuitif.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
    techStack: ["React Native", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "https://github.com/example/aether-mobile",
    featured: false,
    metrics: "4.9 ★ User Rating",
  },
];
