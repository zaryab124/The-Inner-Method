# 📘 The Inner Method — Private Paysafe Payment & Store Operations Guide

Welcome to the production guide for **The Inner Method** international digital publishing storefront.

This guide details your private on-site **Paysafe Payment Channel**, the backend order persistence engine, multi-currency pricing, and the customer self-service portal.

---

## 1. Overview of Payment Infrastructure

Unlike third-party hosted redirect checkouts (such as Gumroad), your application now runs on an **on-site, private Paysafe payment architecture**:

1. **Brand Autonomy:** Customers never leave `theinnermethod.com`. Checkouts open in a high-converting, luxury Obsidian & 24K Gold modal.
2. **Global Payment Rails:**
   - **Credit / Debit Cards:** Visa, Mastercard, American Express, Discover, Maestro (tokenized client-side with 3D Secure 2.0).
   - **paysafecard:** 16-digit prepaid PIN vouchers sold in 650,000+ local retail stores across 50+ countries.
   - **Skrill & Neteller:** 1-click digital wallet balance checkout.
   - **Mobile Wallets:** Apple Pay and Google Pay.
   - **International Wire Transfers:** IBAN and SWIFT instructions for high-value purchases.
3. **Multi-Currency Pricing Engine:**
   - Automatic currency conversion for **USD ($)**, **GBP (£)**, **EUR (€)**, **CAD (CA$)**, **AUD (A$)**, and **PKR (Rs)**.
   - Customers can switch currencies from the Navbar or within the Checkout dialog.
4. **Instant Digital Fulfillment:**
   - Customers receive an on-screen instant download link immediately upon payment completion.
   - Digital orders are fulfilled through cryptographically signed streaming endpoints (`/api/download/[orderId]?token=...`).

---

## 2. Order Management & Persistence

Orders are persisted in `data/orders.json` on your server. Each order contains:

- `id`: Unique Order Reference (e.g. `TIM-ORD-2026-A8K2M`)
- `receiptNumber`: Official Tax Receipt ID (e.g. `REC-2026-88019`)
- `customer`: Name, Email, Country, Postal Code
- `items`: Product Title, Price Paid, Currency, PDF File Name
- `paymentMethod`: `paysafe_card`, `paysafecard`, `skrill`, `apple_pay`, `bank_wire`
- `paymentReference`: Paysafe Gateway Transaction ID
- `downloadToken`: Expiring cryptographic token
- `downloadCount` & `maxDownloads`: Prevents unauthorized scraping/sharing

### Inspecting Orders
You can view orders directly by opening `data/orders.json` or by querying `/api/customer/orders` with a customer's email.

---

## 3. Customer Self-Service & Support Portal (`/support`)

Your customers have a dedicated portal at `/support` that provides:

1. **Order Lookup & Instant Re-Download:**
   - Customers enter their checkout email address.
   - The portal finds all associated purchases and generates valid download links.
2. **Official VAT Invoice Generator:**
   - One-click printable tax invoice with company details, order ID, payment method, and VAT note.
3. **Priority Support Desk:**
   - Inquiries submitted via `/support` are saved to `data/support_tickets.json` with unique ticket IDs (`TIM-TKT-2026-XXXX`).

---

## 4. Environment Variables Configuration

For live production processing with Paysafe credentials, create or update `.env.local` (and add the same variables to your Vercel Dashboard):

```env
# Paysafe Payment Gateway Configuration
PAYSAFE_API_KEY=your_live_paysafe_api_key
PAYSAFE_MERCHANT_ACCOUNT_NUMBER=your_merchant_account_number
PAYSAFE_ENVIRONMENT=live # 'test' for sandbox, 'live' for production
PAYSAFE_WEBHOOK_SECRET=your_webhook_secret

# Store Security Key
STORE_SECRET_KEY=your_generated_random_secret_32_characters
```

*Note: In sandbox/development mode, the store automatically simulates valid Paysafe 3D Secure 2.0 authorizations without needing live API keys, allowing full end-to-end checkout and download testing.*

---

## 5. Adding New Books & Products

To add a new book to your store catalog:

1. Place the master PDF file in `public/` (e.g. `public/Your_New_Book.pdf`).
2. Add the cover image in `public/` (e.g. `public/your_new_cover.png`).
3. Open `data/products.ts` and add an entry to the `PRODUCTS` array:

```ts
{
  id: 'your-book-slug',
  slug: 'your-book-slug',
  title: 'Your Book Title',
  subtitle: 'Your Subtitle',
  price: 19.00,
  currency: 'USD',
  status: 'available',
  pdfFileName: 'Your_New_Book.pdf',
  paysafeProductId: 'TIM-PAYSAFE-YOURBOOK-2026',
  coverImage: '/your_new_cover.png',
  ...
}
```

The checkout modal, flipbook reader, order vault, and download routes will immediately support the new product.
