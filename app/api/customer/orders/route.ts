import { NextRequest, NextResponse } from 'next/server';
import { getOrdersByEmail } from '@/lib/orders';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid purchase email address.' },
        { status: 400 }
      );
    }

    const orders = await getOrdersByEmail(email);

    const sanitizedOrders = orders.map((o) => ({
      id: o.id,
      receiptNumber: o.receiptNumber,
      productTitle: o.items[0]?.productTitle || 'Digital Publication',
      totalAmount: o.totalAmount,
      currency: o.currency,
      paymentMethod: o.paymentMethod,
      paymentChannel: o.paymentChannel,
      paymentStatus: o.paymentStatus,
      paymentReference: o.paymentReference,
      createdAt: o.createdAt,
      downloadCount: o.downloadCount,
      maxDownloads: o.maxDownloads,
      downloadUrl: `/api/download/${o.id}?token=${o.downloadToken}`,
      cardBrand: o.cardBrand,
      cardLast4: o.cardLast4,
      customer: {
        name: o.customer.name,
        email: o.customer.email,
        country: o.customer.country,
      },
    }));

    return NextResponse.json({
      success: true,
      count: sanitizedOrders.length,
      orders: sanitizedOrders,
    });
  } catch (error: unknown) {
    console.error('Customer orders lookup error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to look up orders. Please try again later.' },
      { status: 500 }
    );
  }
}
