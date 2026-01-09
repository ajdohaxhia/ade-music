# 💎 ADE MUSIC - Official Portfolio

> *“Dove il suono incontra l'eterno.”*

This repository contains the **Official Single-Page Prototype** for **Ade Music**, an independent Artist, Producer, and Sound Engineer.

The project is built as a **High-Performance Single-File SPA**, designed with a **"Mobile-First"** philosophy and a **"Crystal Vision"** aesthetic (Deep Black, Ambient Light, High-End Glassmorphism).

## ✨ Key Features

- **📱 Mobile-First Architecture:** Designed natively for smartphones. Touch-optimized navigation (>48px targets), fluid font scaling, and full-screen glass menus.
- **🚀 SPA Simulation (Zero-Reload):** Uses **GSAP** to manage navigation state (`/#artist`, `/#discography`). Transitions are cinematic (Fade Out / Fade In) with automatic Scroll-to-Top restoration.
- **🎨 "Crystal Vision" Design:**
  - Deep Void Background (`#050505`).
  - Hypnotic Ambient Orbs (CSS Animations with `will-change` optimization).
  - Editorial Glass Layouts for text readability.
- **🔍 SEO Optimized:** Full Semantic HTML5, dynamic Meta Tags, Open Graph support for social sharing, and Accessibility best practices.
- **⚡ Lightweight:** Zero build steps required. Runs purely on minimal HTML, Tailwind (CDN), and GSAP (CDN).

## 🛠️ Tech Stack

*   **Core:** HTML5, Modern JavaScript (ES6+)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3 via CDN)
*   **Animations:** [GSAP](https://greensock.com/) (GreenSock Animation Platform)
*   **Icons:** [Lucide Icons](https://lucide.dev/)

## 📂 Structure

The entire application logic resides in a **single file** for maximum portability:

```
/
└── index.html  <-- Contains Layout, Styles, Logic, and Assets (SVG Data URIs)
```

## 🚀 How to Run / Deploy

### Local Development
Simply open `index.html` in any modern web browser. No `npm install` or server required.

### Deployment
This project is "Drop-to-Deploy" ready.
1.  **GitHub Pages:** Push this repo and enable GitHub Pages from Settings.
2.  **Netlify / Vercel:** Simply drag and drop the `index.html` file into their dashboard.

## 📝 Sections

1.  **Home:** Impactful entrance with specific "Manifesto" removal (clean look).
2.  **L'Artista:** Official Bio styled as an editorial magazine piece on glass.
3.  **Discografia:** Interactive track list with custom CSS waveforms and visual playback controls.
4.  **Servizi:** "L'Atelier Sonoro" - A bento-grid layout showcasing skills (Songwriting, Beatmaking, Mixing, Mastering).
5.  **Contatti:** Floating Glass Form with iOS-optimized inputs (16px base font to prevent auto-zoom).

---

**© 2026 ADE MUSIC. All Rights Reserved.**
*Concept & Development by Antigravity*
