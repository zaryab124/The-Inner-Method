import { NextRequest, NextResponse } from 'next/server';
import { createSupportTicket } from '@/lib/orders';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, orderId, subject, message, priority } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Full name, email address, subject, and inquiry message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const ticket = await createSupportTicket({
      name,
      email,
      orderId,
      subject,
      message,
      priority,
    });

    return NextResponse.json({
      success: true,
      message: 'Support ticket successfully submitted. Our senior support team will respond within 2 to 4 hours.',
      ticket: {
        id: ticket.id,
        subject: ticket.subject,
        createdAt: ticket.createdAt,
        status: ticket.status,
      },
    });
  } catch (error: unknown) {
    console.error('Support ticket error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create support ticket. Please email support@theinnermethod.com.' },
      { status: 500 }
    );
  }
}
