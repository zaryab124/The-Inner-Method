import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface OrderCustomer {
  name: string;
  email: string;
  country: string;
  postalCode?: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  unitPriceUsd: number;
  pricePaid: number;
  currency: string;
  pdfFileName: string;
}

export type PaymentMethod =
  | 'paysafe_card'
  | 'paysafecard'
  | 'skrill'
  | 'apple_pay'
  | 'google_pay'
  | 'bank_wire';

export interface Order {
  id: string; // e.g. "TIM-ORD-2026-A8K2M"
  customer: OrderCustomer;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentChannel: 'paysafe';
  paymentStatus: 'completed' | 'processing' | 'refunded';
  paymentReference: string; // e.g. "PAYSAFE-TXN-..."
  downloadToken: string; // Secure random UUID
  downloadCount: number;
  maxDownloads: number;
  createdAt: string; // ISO
  receiptNumber: string; // "REC-2026-XXXXX"
  cardLast4?: string;
  cardBrand?: string;
}

export interface CreateOrderInput {
  customer: OrderCustomer;
  productId: string;
  productTitle: string;
  unitPriceUsd: number;
  pricePaid: number;
  currency: string;
  pdfFileName: string;
  paymentMethod: PaymentMethod;
  cardLast4?: string;
  cardBrand?: string;
  paymentReference?: string;
}

export interface SupportTicket {
  id: string; // "TIM-TKT-2026-XXXX"
  name: string;
  email: string;
  orderId?: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const TICKETS_FILE = path.join(DATA_DIR, 'support_tickets.json');

// Ensure directory and JSON files exist
function ensureFilesExist() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      // Seed with a verified reference sample order so customers can test order lookup right away
      const initialOrders: Order[] = [
        {
          id: 'TIM-ORD-2026-VIP01',
          customer: {
            name: 'Editorial Review Sample',
            email: 'sample@theinnermethod.com',
            country: 'United States',
          },
          items: [
            {
              productId: 'the-huberman-blueprint',
              productTitle: 'The Huberman Blueprint',
              quantity: 1,
              unitPriceUsd: 19.0,
              pricePaid: 19.0,
              currency: 'USD',
              pdfFileName: 'The_Huberman_Blueprint_EBook.pdf',
            },
          ],
          totalAmount: 19.0,
          currency: 'USD',
          paymentMethod: 'paysafe_card',
          paymentChannel: 'paysafe',
          paymentStatus: 'completed',
          paymentReference: 'PAYSAFE-DEMO-994821',
          downloadToken: 'sample-huberman-token-2026',
          downloadCount: 1,
          maxDownloads: 50,
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          receiptNumber: 'REC-2026-88019',
          cardLast4: '4242',
          cardBrand: 'Visa',
        },
      ];
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), 'utf-8');
    }
    if (!fs.existsSync(TICKETS_FILE)) {
      fs.writeFileSync(TICKETS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error ensuring storage files exist:', error);
  }
}

export async function getAllOrders(): Promise<Order[]> {
  ensureFilesExist();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(raw) as Order[];
  } catch (error) {
    console.error('Failed to read orders.json:', error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await getAllOrders();
  const normalizedId = id.trim().toUpperCase();
  return orders.find((o) => o.id.toUpperCase() === normalizedId) || null;
}

export async function getOrdersByEmail(email: string): Promise<Order[]> {
  const orders = await getAllOrders();
  const normalizedEmail = email.trim().toLowerCase();
  return orders.filter((o) => o.customer.email.toLowerCase() === normalizedEmail);
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  ensureFilesExist();
  const orders = await getAllOrders();

  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  const orderId = `TIM-ORD-2026-${randomSuffix}`;
  const receiptNumber = `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const downloadToken = crypto.randomUUID();
  const paymentReference =
    input.paymentReference || `PAYSAFE-TXN-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

  const newOrder: Order = {
    id: orderId,
    customer: {
      name: input.customer.name.trim(),
      email: input.customer.email.trim().toLowerCase(),
      country: input.customer.country || 'International',
      postalCode: input.customer.postalCode,
    },
    items: [
      {
        productId: input.productId,
        productTitle: input.productTitle,
        quantity: 1,
        unitPriceUsd: input.unitPriceUsd,
        pricePaid: input.pricePaid,
        currency: input.currency,
        pdfFileName: input.pdfFileName,
      },
    ],
    totalAmount: input.pricePaid,
    currency: input.currency,
    paymentMethod: input.paymentMethod,
    paymentChannel: 'paysafe',
    paymentStatus: 'completed',
    paymentReference,
    downloadToken,
    downloadCount: 0,
    maxDownloads: 50,
    createdAt: new Date().toISOString(),
    receiptNumber,
    cardLast4: input.cardLast4,
    cardBrand: input.cardBrand,
  };

  orders.unshift(newOrder);

  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  return newOrder;
}

export async function verifyDownloadToken(
  orderId: string,
  token: string
): Promise<{ valid: boolean; order?: Order; error?: string }> {
  const order = await getOrderById(orderId);
  if (!order) {
    return { valid: false, error: 'Order not found.' };
  }
  if (order.paymentStatus !== 'completed') {
    return { valid: false, error: 'Payment is not completed.' };
  }
  if (order.downloadToken !== token) {
    return { valid: false, error: 'Invalid or expired download authorization token.' };
  }
  if (order.downloadCount >= order.maxDownloads) {
    return {
      valid: false,
      error: 'Download limit exceeded. Please contact customer support for a link reset.',
    };
  }
  return { valid: true, order };
}

export async function incrementOrderDownload(orderId: string): Promise<void> {
  ensureFilesExist();
  const orders = await getAllOrders();
  const idx = orders.findIndex((o) => o.id.toUpperCase() === orderId.toUpperCase());
  if (idx !== -1) {
    orders[idx].downloadCount += 1;
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  }
}

export async function createSupportTicket(input: {
  name: string;
  email: string;
  orderId?: string;
  subject: string;
  message: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}): Promise<SupportTicket> {
  ensureFilesExist();
  let tickets: SupportTicket[] = [];
  try {
    const raw = fs.readFileSync(TICKETS_FILE, 'utf-8');
    tickets = JSON.parse(raw);
  } catch {
    tickets = [];
  }

  const ticketId = `TIM-TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newTicket: SupportTicket = {
    id: ticketId,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    orderId: input.orderId?.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
    priority: input.priority || 'medium',
    status: 'open',
    createdAt: new Date().toISOString(),
  };

  tickets.unshift(newTicket);
  fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2), 'utf-8');
  return newTicket;
}
