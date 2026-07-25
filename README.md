# 🚀 Personal Portfolio — Frontend Developer

Website portofolio interaktif dan responsif yang dibangun menggunakan **React**, **TypeScript**, **Tailwind CSS**, dan animasi **GSAP**. Proyek ini dirancang dengan estetika modern, *clean code*, serta optimasi performa tinggi.

---

## ✨ Fitur Utama

- **🎨 Modern & Responsive UI:** Tampilan *dark mode* futuristik dengan *cyan accent glow* yang responsif di semua ukuran layar (Mobile & Desktop).
- **🎭 Smooth Scroll Animations:** Animasi elemen & teks yang halus memanfaatkan **GSAP (GreenSock Animation Platform)** dan **ScrollTrigger**.
- **⚡ High Performance & Lightweight:** Dibangun menggunakan **Vite** dan **Bun** untuk proses pembangunan (*build*) dan pemuatan (*load*) super cepat.
- **📊 Analytics Ready:** Integrasi pemantauan interaksi pengguna menggunakan **Google Analytics 4 (GA4)**.
- **🔍 SEO & Accessibility Friendly:** Struktur HTML semantik dengan optimasi aset untuk skor Core Web Vitals yang maksimal.

---

## 🛠️ Tech Stack

- **Framework / Core:** [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) / [Bun](https://bun.sh/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [GSAP](https://greensock.com/gsap/) & ScrollTrigger
- **Icons:** [Lucide React](https://lucide.dev/)
- **Analytics:** Google Analytics 4

---

## 📂 Struktur Direktori Proyek

```text
├── public/              # Aset statis (favicon, 3D models, dll)
├── src/
│   ├── components/      # Komponen UI Reusable (About, Hero, Projects, dll)
│   ├── data/            # Data statis & aset gambar (assets/Fotoprofil.png, dll)
│   ├── types/           # Definisi TypeScript Interfaces
│   ├── utils/           # Utility functions & Analytics tracking
│   ├── App.tsx          # Komponen Utama
│   └── main.tsx         # Entry point aplikasi
├── index.html
├── package.json
├── vite.config.ts
└── README.md