# 📖 The Inner Method — International Digital Publishing Store

> **A high-end, responsive digital publishing storefront for psychology, attention design, and self-investigation literature.** Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Three.js WebGL 3D, physical page-turn dynamics with Web Audio API sound synthesis, and hosted Gumroad checkout integration.

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-orange?style=flat&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features & Highlights

### 🎨 Visual & Editorial Design
- **Luxury Editorial Aesthetic:** Dark Obsidian (`#08090C`, `#0E1117`), 24K Royal Gold (`#D4AF37`, `#F3D382`), and Emerald accents with typography combining Playfair Display, Cinzel, and Inter.
- **Dynamic Real-Time Theme Engine:** Seamless switching between **Royal Gold**, **Emerald Glow**, and **Warm Ivory** palettes with persistent CSS class bindings.
- **Morphing Scroll-Responsive Navbar:** Sticky glassmorphism header that contracts into a floating pill on scroll, featuring an interactive live reading progress tracker, catalog quick-jump dropdown, and instantaneous theme changer.

### 📚 Interactive 3D & Audio Experience
- **Realistic 3D FlipBook (`Realistic3DFlipBook.tsx`):** Physical double-sided page turns with dynamic shadows, interactive worksheet checkboxes, guided breathing animation, and custom page navigation.
- **Synthesized Tactile Audio (`lib/sound.ts`):** Realistic paper-turn rustle generated in real-time via the browser's Web Audio API (white noise with bandpass filtering) — zero external audio assets required.
- **WebGL 3D Hardcover Model (`ThreeBookCanvas.tsx`):** 360° interactive orbit rotation, cover opening hinge, procedural high-res canvas book textures, and studio point lighting.
- **Hardware-Accelerated 3D Cards (`BookCard3D.tsx`):** Perspective hover tilts with metallic foil reflections and realistic spine creases.

### 🛒 Commerce & Conversion Architecture
- **Zero-Liability Hosted Checkout:** Direct integration with Gumroad hosted checkouts (`GumroadButton.tsx`). Customers checkout securely on Gumroad without storing cardholder or private data on your server.
- **Lead Generation Engine (`/free-resources`):** High-converting lead magnet form with explicit GDPR/consent checkboxes, instant PDF download triggers, celebratory confetti bursts, and welcome email previews.
- **Comprehensive Page Suite:**
  - 🏠 **Home (`/`)**: Hero with 3D model, sample flipbook reader, value proposition, and customer reviews.
  - 🛍️ **Shop (`/shop`)**: Filterable product catalog with quick preview modals and badge indicators.
  - 📖 **Product Detail (`/shop/[slug]`)**: Deep dives into TOC, benefits, sample excerpts, and FAQ.
  - 📑 **Interactive Sample Reader (`/reader/[slug]`)**: Full-screen book reading environment.
  - 🎁 **Free Resources (`/free-resources`)**: 24-page field guide lead capture page.
  - 📰 **Journal (`/journal` & `/journal/[slug]`)**: Cognitive science and attention essays.
  - ℹ️ **About (`/about`)**: Editorial mission, methodology, and publishing philosophy.
  - ❓ **FAQ (`/faq`)**: Customer assistance, format information, and device compatibility.
  - 📬 **Contact (`/contact`)**: Customer inquiry form with responsive validation.
  - ⚖️ **Legal (`/privacy`, `/terms`, `/refunds`)**: Compliant privacy policy, terms of service, and refund guarantees.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18.17.0 or newer
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zaryab124/The-Inner-Method.git
   cd The-Inner-Method
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14** | App Router, Server-Side Rendering & Static Site Generation (SSG) |
| **TypeScript** | Type safety across products, articles, and components |
| **Tailwind CSS** | Styling, custom gradients, shadows, and animations |
| **Three.js** | 3D WebGL Hardcover Book rendering and lighting |
| **Framer Motion** | Physics-based page turns, modal overlays, and entry transitions |
| **Lucide React** | Consistent, modern iconography |
| **Canvas Confetti**| Celebratory reward effects on lead generation completion |
| **Web Audio API** | Real-time procedural paper flip audio synthesis |

---

## 📦 Project Structure

```text
the-inner-method-app/
├── app/
│   ├── layout.tsx             # Root layout with fonts, metadata, and theme wrapper
│   ├── page.tsx               # Homepage with 3D hero, flipbook, and catalog preview
│   ├── shop/                  # Shop listing and dynamic [slug] product pages
│   ├── reader/[slug]/         # Full-screen sample flipbook reader
│   ├── free-resources/        # Free guide landing page & lead capture
│   ├── journal/               # Editorial essays & psychological articles
│   ├── about/                 # Brand story, editorial principles, and publishing team
│   ├── contact/               # Contact support page
│   ├── faq/                   # Frequently asked questions & answers
│   ├── privacy/               # GDPR-compliant Privacy Policy
│   ├── terms/                 # Terms of Service
│   ├── refunds/               # 30-Day Money-Back Guarantee policy
│   ├── sitemap.ts             # Auto-generated SEO sitemap
│   └── robots.ts              # SEO robots rules
├── components/
│   ├── Navbar.tsx             # Dynamic morphing navbar with theme switcher
│   ├── Footer.tsx             # Editorial footer with navigation and guarantees
│   ├── Realistic3DFlipBook.tsx# 3D interactive book with physics & sound
│   ├── ThreeBookCanvas.tsx    # WebGL 3D book model canvas
│   ├── BookCard3D.tsx         # 3D hover book cards
│   ├── BookReaderModal.tsx    # Modal overlay book viewer
│   ├── EmailLeadForm.tsx      # Email capture with confetti & consent
│   └── GumroadButton.tsx      # Hosted Gumroad checkout button
├── data/
│   ├── products.ts            # Central catalog data & Gumroad URLs
│   └── articles.ts            # Published editorial articles
└── lib/
    ├── sound.ts               # Synthesized Web Audio paper-turn effect
    └── analytics.ts           # Privacy-preserving event analytics
```

---

## 🚢 Deploying to Vercel (Recommended)

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete The Inner Method 3D animated store"
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your repository **`zaryab124/The-Inner-Method`**.
4. Keep the default settings (Framework: Next.js) and click **Deploy**.
5. Your store will be live with full SSL, global CDN, and automated preview branches.

---

## 🔒 Security & Payment Notice

* **Hosted Checkout:** All transactions are directed to verified hosted checkouts (e.g. Gumroad). No credit cards, CVVs, or payment passwords ever touch this server.
* **Consent & Privacy:** Subscriber capture includes explicit opt-in confirmation and single-click unsubscribe links.

---

© 2026 The Inner Method Publishing. All rights reserved.
