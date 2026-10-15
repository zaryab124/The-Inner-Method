# 📖 The Inner Method — International Digital Publishing Store

> **A high-end, responsive digital publishing storefront for neuroscience, peak cognitive performance, and international education literature.** Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Three.js WebGL 3D, physical page-turn dynamics with Web Audio API sound synthesis, multi-currency pricing, and a private **Paysafe Secure Payment Channel** backend.

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-orange?style=flat&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Paysafe](https://img.shields.io/badge/Payment-Paysafe_Secured-emerald?style=flat&logo=lock)](https://www.paysafe.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features & Highlights

### 🎨 Visual & Editorial Design
- **Luxury Editorial Aesthetic:** Dark Obsidian (`#08090C`, `#0E1117`), 24K Royal Gold (`#D4AF37`, `#F3D382`), and Emerald accents with typography combining Playfair Display, Cinzel, and Inter.
- **Dynamic Real-Time Theme Engine:** Seamless switching between **Royal Gold**, **Emerald Glow**, and **Warm Ivory** palettes with persistent CSS class bindings.
- **Morphing Scroll-Responsive Navbar:** Sticky glassmorphism header that contracts into a floating pill on scroll, featuring an interactive live reading progress tracker, catalog quick-jump dropdown, global multi-currency selector, and instantaneous theme changer.

### 📚 Interactive 3D & Audio Experience
- **Realistic 3D FlipBook (`Realistic3DFlipBook.tsx`):** Physical double-sided page turns with dynamic shadows, interactive worksheet checkboxes, guided breathing animation, and custom page navigation.
- **Synthesized Tactile Audio (`lib/sound.ts`):** Realistic paper-turn rustle generated in real-time via the browser's Web Audio API (white noise with bandpass filtering) — zero external audio assets required.
- **WebGL 3D Hardcover Model (`ThreeBookCanvas.tsx`):** 360° interactive orbit rotation, cover opening hinge, procedural high-res canvas book textures, and studio point lighting.
- **Hardware-Accelerated 3D Cards (`BookCard3D.tsx`):** Perspective hover tilts with metallic foil reflections and realistic spine creases.

### 💳 Private Paysafe Payment Channel & Multi-Currency Engine
- **No Third-Party Redirects:** All checkouts are processed on-site via our secure **Paysafe Payment Channel**.
- **Supported Payment Methods:**
  - 💳 **Credit & Debit Cards:** Visa, Mastercard, American Express, Discover (tokenized client-side with 3D Secure 2.0).
  - 🎟️ **paysafecard:** 16-digit cash-based prepaid voucher PINs (popular in 50+ countries).
  - 🟣 **Skrill & Neteller:** 1-click digital wallet checkout.
  - 📱 **Digital Wallets:** Apple Pay and Google Pay.
  - 🏛️ **International Bank Wire:** Direct wire/IBAN transfer processing for corporate orders.
- **Global Multi-Currency Pricing (`lib/currency.tsx`):**
  - Instant conversion between **USD ($)**, **GBP (£)**, **EUR (€)**, **CAD (CA$)**, **AUD (A$)**, and **PKR (Rs)**.
  - Live currency switcher in Navbar and inside the Checkout Modal.
- **Authenticated Digital Delivery Engine (`/api/download/[orderId]`):**
  - Cryptographically signed, expiring download tokens.
  - Rate limiting & download count tracking.
  - Secure streaming of master PDF assets (`The_Huberman_Blueprint_EBook.pdf` & `Study_Abroad_Playbook_EBook.pdf`).

### 🛡️ Customer Care & Self-Service Order Vault (`/support`)
- **Order Lookup:** Customers enter their purchase email to immediately recover all purchased books.
- **Official VAT Invoice Generator:** View and print tax receipts with transaction reference numbers.
- **Priority Customer Support Desk:** Submit inquiries directly to our backend service desk with automatic ticket ID generation (`TIM-TKT-XXXX`).

---

## 📁 Project Architecture

```
├── app/
│   ├── api/
│   │   ├── checkout/route.ts        # Paysafe payment processor & order creator
│   │   ├── download/[orderId]/      # Authenticated PDF streaming route
│   │   ├── customer/orders/route.ts # Customer order lookup endpoint
│   │   ├── support/ticket/route.ts  # Priority support ticket handler
│   │   └── subscribe/route.ts       # Newsletter lead capture endpoint
│   ├── support/page.tsx             # Customer Order Vault, Invoices & Helpdesk
│   ├── shop/                        # Catalog & dynamic product detail pages
│   ├── free-resources/              # Lead generation & sample field guide
│   ├── journal/                     # Editorial neuroscience & career essays
│   ├── about/, contact/, faq/       # Brand & customer guidance pages
│   └── privacy/, terms/, refund/    # Legal & compliance disclosures
├── components/
│   ├── PaysafeCheckoutModal.tsx     # High-converting on-site checkout modal
│   ├── PaysafeCheckoutButton.tsx    # Drop-in checkout trigger button
│   ├── Navbar.tsx                   # Morphing navbar with currency switcher
│   ├── Footer.tsx                   # Global editorial footer with trust badges
│   ├── Realistic3DFlipBook.tsx      # 3D interactive book with physics & sound
│   ├── ThreeBookCanvas.tsx          # WebGL 3D book model canvas
│   └── BookCard3D.tsx               # 3D hover book cards
├── data/
│   ├── products.ts                  # Central catalog data & Paysafe metadata
│   ├── orders.json                  # Persistent backend order store
│   └── support_tickets.json         # Support desk tickets database
└── lib/
    ├── currency.tsx                 # Multi-currency provider & exchange rates
    ├── orders.ts                    # Order CRUD & token verification engine
    └── sound.ts                     # Web Audio API page-turning sound engine
```

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: migrate to private Paysafe payment channel and order vault"
   git push origin main
   ```
2. Link the repository in [Vercel](https://vercel.com/) and deploy.
3. Configure environment variables in the Vercel dashboard:
   - `PAYSAFE_API_KEY` (optional, for live mode)
   - `PAYSAFE_MERCHANT_ACCOUNT_NUMBER` (optional)
   - `PAYSAFE_ENVIRONMENT` (`test` or `live`)

---

## 🔒 Security & Privacy

* **Zero Plaintext Storage:** Credit card numbers and CVVs are never saved on the server.
* **PCI-DSS Level 1 Standards:** Client-side tokenization and secure 256-bit TLS communication.
* **30-Day Money-Back Guarantee:** Customers can request refunds through `/support` or email `support@theinnermethod.com`.

---

© 2026 The Inner Method Publishing. All rights reserved.
