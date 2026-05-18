/**
 * ╔══════════════════════════════════════════════════════╗
 * ║           LADITTO PORTFOLIO — DATA CONFIG            ║
 * ║   Edit file ini untuk mengubah seluruh konten web    ║
 * ╚══════════════════════════════════════════════════════╝
 */

const DB = {

  name:       "Raditya Anugrah",
  initials:   "LaDitto.",
  bio:        "Mahasiswa Sistem Informasi di UPN \"Veteran\" Jawa Timur. Berfokus pada pengembangan kreativitas digital, infrastruktur IT, dan solusi teknologi inovatif.",
  university: "UPN \"Veteran\" Jawa Timur",
  location:   "Karangpilang, Surabaya, Indonesia",
  gpa:        "3.72 / 4.00",
  semester:   "4",

  roleList: [
    "Information System Student",
    "Future Developer",
    "Technology Learner",
    "Creative Enthusiast",
    "Problem Solver",
    "AI Explorer",
  ],

  // Hero 3D globe texture (foto formal)
  photo:  "assets/images/Villain.png",
  // About section — foto full body pakai PNG transparan
  photo2: "assets/images/photo.jpeg",

  socials: {
    linkedin:  "https://www.linkedin.com/in/raditya-taufiqul-anugrah-pradana/",
    github:    "https://github.com/RadityaPradana21",
    instagram: "https://www.instagram.com/laditto._/",
    youtube:   "https://www.youtube.com/@LaDitto.",
  },

  stats: [
    { number: "3.72", label: "GPA / IPK"  },
    { number: "4",    label: "Semester"   },
    { number: "3",    label: "Projects"   },
    { number: "3",    label: "Sertifikat" },
  ],

  experiences: [
    {
      period:  "Juli 2024 — Agustus 2024",
      title:   "Pelatihan Digital Marketing",
      company: "Balai Latihan Kerja (BLK) Surabaya",
      desc:    "Mempelajari Analisis SWOT pada Produk dengan memahami cara memasarkan produk dengan efektif. Juga mempromosikan produk melalui iklan, postingan sosmed, dan broadcast copywriting.",
    },
    {
      period:  "Oktober 2024 — November 2024",
      title:   "Workshop Soft Skills",
      company: "Laboratorium MSI — UPN Veteran Jawa Timur",
      desc:    "Memahami potensi pada diri sendiri dan cara mengembangkan soft skills untuk karier yang sukses.",
    },
  ],

  // ─── SKILLS ───────────────────────────────────────────
  // CATATAN: icon adalah URL SVG logo resmi, bukan icon generik
  skills: [
    { name: "HTML 5",      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",           level: 80 },
    { name: "CSS 3",       icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",             level: 78 },
    { name: "JavaScript",  icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",  level: 70 },
    { name: "PHP",         icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",               level: 75 },
    { name: "Laravel",     icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",        level: 60 },
    { name: "MySQL",       icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",            level: 85 },
    { name: "Figma",       icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg",            level: 75 },
    { name: "Flutter",     icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg",        level: 55 },
    { name: "Canva",       icon: "https://cdn.freelogovectors.net/wp-content/uploads/2021/12/canva-logo-app-freelogovectors.net_.png",                             level: 96 },
    { name: "VS Code",     icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",          level: 85 },
  ],

  // ─── CERTIFICATES ─────────────────────────────────────
  certificates: [
    {
      name:   "Workshop Boost Your Soft Skill for a Successful Career",
      issuer: "Laboratorium MSI — UPN Veteran Jawa Timur",
      img:    "assets/images/cert-workshop.png",
      link:   "#",
    },
    {
      name:   "Python Developer",
      issuer: "Sololearn",
      img:    "assets/images/cert-python.jpg",
      link:   "#",
    },
    {
      name:   "SQL Intermediate",
      issuer: "Sololearn",
      img:    "assets/images/cert-sql.jpg",
      link:   "#",
    },
  ],

  // ─── PROJECTS ─────────────────────────────────────────
  projects: [
    {
      title: "SI PALING — Sistem Informasi Pelaporan Lingkungan",
      desc:  "Aplikasi mobile yang memungkinkan masyarakat melaporkan masalah lingkungan seperti pencemaran sampah, penebangan pohon, dan pencemaran air secara langsung dengan sistem poin dan reward.",
      img:   "assets/images/project-sipaling.png",
      emoji: "🌿",
      tags:  ["Figma", "UI/UX Design", "Mobile Design"],
      link:  "#",
    },
    {
      title: "DILAJU — Disiplin Lalu-Lintas Jangan Ugal-Ugalan",
      desc:  "Aplikasi mobile edukasi lalu lintas berbasis Flutter & Firebase. Dilengkapi modul pembelajaran, quiz interaktif, sistem streak harian, leaderboard, dan reward poin untuk mendorong kesadaran berkendara aman.",
      img:   "assets/images/project-dilaju.png",
      emoji: "🚦",
      tags:  ["Flutter", "Firebase", "Mobile App"],
      link:  "#",
    },
    {
      title: "DIMARI — Digital Marketing Interactive",
      desc:  "Platform web pembelajaran digital marketing yang mencakup materi modul, quiz, forum diskusi, achievements, dan manajemen profil. Dibangun dengan Laravel, Tailwind CSS, dan PHP untuk pengalaman belajar yang interaktif.",
      img:   "assets/images/project-dimari.png",
      tags:  ["Laravel", "Tailwind CSS", "PHP", "MySQL"],
      link:  "#",
    },
  ],

};
