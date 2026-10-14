# The Inner Method — International Digital Publishing Store
## Deployment & Gumroad Configuration Guide

This storefront is fully architected with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Three.js** interactive 3D WebGL book animations, optimized for instant global deployment on **Vercel** with zero monthly hosting costs.

---

### 1. How to Test Locally

1. Open your terminal in the project directory:
   ```bash
   cd the-inner-method-app
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

### 2. Updating Your Real Gumroad Checkout URLs

In accordance with our strict secure checkout policy:
- **No credit card numbers or banking secrets are ever collected on this website.**
- Customers are redirected to your genuine, hosted Gumroad checkout links where payment and instant digital delivery are handled securely.

To plug in your actual Gumroad checkout URLs:
1. Open [`data/products.ts`](file:///E:/andrew%20huberman%20tip%20talks/the-inner-method-app/data/products.ts).
2. Locate each product's `gumroadUrl` field:
   - **The Focus Reset**:
     ```ts
     gumroadUrl: 'https://gumroad.com/l/your-actual-focus-reset-slug',
     ```
   - **Understand Your Patterns**:
     ```ts
     gumroadUrl: 'https://gumroad.com/l/your-actual-patterns-slug',
     ```
   - **The Personal Growth Toolkit**:
     ```ts
     gumroadUrl: 'https://gumroad.com/l/your-actual-toolkit-slug',
     ```
3. Save the file. When customers click **Purchase** or **Unlock Full Edition**, they will seamlessly open your real Gumroad product checkout page.

---

### 3. Deploying to Vercel (100% Free Hosting)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial launch: The Inner Method 3D animated store"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/the-inner-method.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **Add New Project** and select your GitHub repository.
   - Framework Preset: **Next.js**
   - Root Directory: `./` (or `the-inner-method-app` if deploying the subfolder)
   - Click **Deploy**.
   - Your website will be live worldwide on a global edge CDN with automatic SSL encryption in under 60 seconds!

---

### 4. Optional Environment Variables (in Vercel Dashboard)

If you connect a free email marketing service (e.g. Resend, ConvertKit, or Mailchimp), configure these in your Vercel Project Settings > Environment Variables:

- `EMAIL_PROVIDER_API_KEY`: Your email service secret API key
- `EMAIL_LIST_ID`: Your audience list or tag ID

*Note: The store already safely captures and logs leads with explicit consent out of the box even without external keys.*

---

### 5. Google Search Console & SEO Verification

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your property (e.g. `https://your-custom-domain.com` or `https://theinnermethod.vercel.app`).
3. Under **Sitemaps**, submit:
   ```
   https://your-domain.com/sitemap.xml
   ```
   Next.js automatically generates this dynamic sitemap, listing all products, journal articles, and compliance pages.
